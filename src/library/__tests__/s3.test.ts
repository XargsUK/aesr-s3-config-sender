import { getS3FileContent } from '../s3';
import { S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { jest } from '@jest/globals';
import { Readable } from 'stream';

type S3SendFn = (command: any) => Promise<GetObjectCommandOutput>;

// Mock the AWS SDK
jest.mock('@aws-sdk/client-s3', () => {
  const mockSend = jest.fn() as jest.MockedFunction<S3SendFn>;
  return {
    S3Client: jest.fn().mockImplementation(() => ({
      send: mockSend,
    })),
    GetObjectCommand: jest.fn(),
  };
});

// Mock TextDecoder and TextEncoder
class MockTextDecoder {
  decode(buffer: Uint8Array | ArrayBuffer): string {
    return Buffer.from(buffer as ArrayBufferLike).toString('utf-8');
  }
}

class MockTextEncoder {
  encode(input: string): Uint8Array {
    return Buffer.from(input);
  }
}

// Mock ReadableStream if not available in test environment
if (typeof ReadableStream === 'undefined') {
  (global as any).ReadableStream = class MockReadableStream<T> {
    private reader: any;

    constructor(source: {
      start: (controller: { enqueue: (chunk: T) => void; close: () => void }) => void;
    }) {
      let data: T | null = null;

      this.reader = {
        read: async () => {
          if (data) {
            const value = data;
            data = null;
            return { value, done: false };
          }
          return { value: undefined, done: true };
        },
      };

      source.start({
        enqueue: (chunk: T) => {
          data = chunk;
        },
        close: () => {},
      });
    }

    getReader() {
      return this.reader;
    }
  };
}

(global as any).TextDecoder = MockTextDecoder;
(global as any).TextEncoder = MockTextEncoder;

// Mock Response
class MockResponse {
  constructor(private body: ReadableStream<Uint8Array> | null) {}

  async arrayBuffer(): Promise<ArrayBuffer> {
    if (!this.body) {
      throw new Error('No body');
    }
    const reader = this.body.getReader();
    const chunks: Uint8Array[] = [];

    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (result.value) {
        chunks.push(result.value);
      }
    }

    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result.buffer;
  }
}
(global as any).Response = MockResponse;

describe('S3 Functions', () => {
  const mockCredentials = {
    accessKeyId: 'test-access-key',
    secretAccessKey: 'test-secret-key',
    sessionToken: 'test-session-token',
  };

  const mockS3Config = {
    region: 'us-east-1',
    bucket: 'test-bucket',
    key: 'test-key',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getS3FileContent', () => {
    it('should get file content from S3', async () => {
      const mockContent = 'test content';
      const mockStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(mockContent));
          controller.close();
        },
      });

      const mockSendFn = jest.fn() as jest.MockedFunction<S3SendFn>;
      mockSendFn.mockResolvedValue({
        $metadata: {},
        Body: mockStream as unknown as GetObjectCommandOutput['Body'],
      } as GetObjectCommandOutput);

      (S3Client as jest.Mock).mockImplementation(() => ({
        send: mockSendFn,
      }));

      const result = await getS3FileContent(
        mockCredentials.accessKeyId,
        mockCredentials.secretAccessKey,
        mockCredentials.sessionToken,
        mockS3Config.region,
        mockS3Config.bucket,
        mockS3Config.key,
      );

      expect(result).toBe(mockContent);
      expect(S3Client).toHaveBeenCalledWith({
        region: mockS3Config.region,
        credentials: mockCredentials,
      });
    });

    it('should handle missing body in response', async () => {
      const mockSendFn = jest.fn() as jest.MockedFunction<S3SendFn>;
      const mockBody = null as unknown as Readable;
      mockSendFn.mockResolvedValue({
        $metadata: {},
        Body: mockBody,
      } as GetObjectCommandOutput);

      (S3Client as jest.Mock).mockImplementation(() => ({
        send: mockSendFn,
      }));

      await expect(
        getS3FileContent(
          mockCredentials.accessKeyId,
          mockCredentials.secretAccessKey,
          mockCredentials.sessionToken,
          mockS3Config.region,
          mockS3Config.bucket,
          mockS3Config.key,
        ),
      ).rejects.toThrow('No content received from S3');
    });

    it('should handle S3 client errors', async () => {
      const mockSendFn = jest.fn() as jest.MockedFunction<S3SendFn>;
      mockSendFn.mockRejectedValue(new Error('S3 error'));

      (S3Client as jest.Mock).mockImplementation(() => ({
        send: mockSendFn,
      }));

      await expect(
        getS3FileContent(
          mockCredentials.accessKeyId,
          mockCredentials.secretAccessKey,
          mockCredentials.sessionToken,
          mockS3Config.region,
          mockS3Config.bucket,
          mockS3Config.key,
        ),
      ).rejects.toThrow('Failed to get S3 file content: S3 error');
    });
  });
});
