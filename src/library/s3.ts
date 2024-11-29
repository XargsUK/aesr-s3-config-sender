import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function getS3FileContent(
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string,
  region: string,
  bucket: string,
  key: string
): Promise<string> {
  // Create a new S3 client
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    },
  });

  // Create the GetObjectCommand with the required parameters
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    // Send the command and get the response
    const response = await s3Client.send(getObjectCommand);
    
    if (!response.Body) {
      throw new Error("No content received from S3");
    }
    
    const content = new TextDecoder("utf-8").decode(
      await new Response(response.Body as ReadableStream).arrayBuffer()
    );
    return content;
  } catch (error) {
    throw new Error(`Failed to get S3 file content: ${(error as Error).message}`);
  }
} 