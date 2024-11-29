declare namespace browser {
  export const runtime: {
    openOptionsPage(): Promise<void>;
    sendMessage: typeof chrome.runtime.sendMessage;
    getURL(path: string): string;
  };
  export const storage: typeof chrome.storage;
  export const permissions: {
    request(permissions: { origins: string[] }): Promise<boolean>;
    contains(permissions: { origins: string[] }): Promise<boolean>;
  };
  export const webRequest: typeof chrome.webRequest;
  export const tabs: {
    create(createProperties: { url: string }): Promise<chrome.tabs.Tab>;
  };
}

// This needs to be declared globally
declare global {
    const InstallTrigger: any;
    const browser: typeof browser;
}

export {}; // Make this a module 