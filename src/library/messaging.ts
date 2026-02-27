import { logDebugMessage } from './debug';
import { setLastSentTimestamp } from './timestamp';

export function sendConfigToAesr(extensionId: string, configData: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout waiting for AESR response'));
    }, 10000);

    const messageData = {
      action: 'updateConfig',
      dataType: 'ini',
      data: configData,
    };

    chrome.runtime.sendMessage(extensionId, messageData, function () {
      clearTimeout(timeout);
      if (chrome.runtime.lastError) {
        const msg = chrome.runtime.lastError.message || '';
        // AESR processes the message asynchronously without keeping the
        // port open, so the port closes before the response arrives.
        // The config is still saved successfully on the AESR side.
        if (msg.includes('message port closed')) {
          logDebugMessage('Message port closed but config was delivered');
          setLastSentTimestamp(Date.now());
          resolve();
          return;
        }
        reject(new Error(msg));
        return;
      }
      setLastSentTimestamp(Date.now());
      resolve();
    });
  });
}
