import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

jest.mock('../debug', () => ({
  logDebugMessage: jest.fn(),
}));

jest.mock('../timestamp', () => ({
  setLastSentTimestamp: jest.fn(),
}));

import { sendConfigToAesr } from '../messaging';
import { setLastSentTimestamp } from '../timestamp';

describe('sendConfigToAesr', () => {
  const extensionId = 'test-extension-id';
  const configData = '[profile test]\nrole_arn = arn:aws:iam::123456789:role/TestRole';

  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(chrome.runtime, 'lastError', {
      get: () => undefined,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should resolve on successful response', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation(
      (...args: unknown[]) => {
        const callback = args[2] as () => void;
        callback();
      },
    );

    await sendConfigToAesr(extensionId, configData);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(
      extensionId,
      { action: 'updateConfig', dataType: 'ini', data: configData },
      expect.any(Function),
    );
    expect(setLastSentTimestamp).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should resolve when message port is closed', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation(
      (...args: unknown[]) => {
        const callback = args[2] as () => void;
        Object.defineProperty(chrome.runtime, 'lastError', {
          get: () => ({ message: 'The message port closed before a response was received' }),
          configurable: true,
        });
        callback();
        Object.defineProperty(chrome.runtime, 'lastError', {
          get: () => undefined,
          configurable: true,
        });
      },
    );

    await sendConfigToAesr(extensionId, configData);

    expect(setLastSentTimestamp).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should reject on genuine error', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation(
      (...args: unknown[]) => {
        const callback = args[2] as () => void;
        Object.defineProperty(chrome.runtime, 'lastError', {
          get: () => ({
            message: 'Could not establish connection. Receiving end does not exist.',
          }),
          configurable: true,
        });
        callback();
        Object.defineProperty(chrome.runtime, 'lastError', {
          get: () => undefined,
          configurable: true,
        });
      },
    );

    await expect(sendConfigToAesr(extensionId, configData)).rejects.toThrow(
      'Could not establish connection',
    );
    expect(setLastSentTimestamp).not.toHaveBeenCalled();
  });

  it('should reject with timeout error when no response is received', async () => {
    (chrome.runtime.sendMessage as jest.Mock).mockImplementation(() => {
      // Never calls callback — simulates no response
    });

    const promise = sendConfigToAesr(extensionId, configData);
    jest.advanceTimersByTime(10000);

    await expect(promise).rejects.toThrow('Timeout waiting for AESR response');
    expect(setLastSentTimestamp).not.toHaveBeenCalled();
  });
});
