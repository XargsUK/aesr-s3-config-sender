declare namespace browser {
  export const runtime: typeof chrome.runtime;
  export const storage: typeof chrome.storage;
  export const permissions: {
    request(permissions: { origins: string[] }): Promise<boolean>;
    contains(permissions: { origins: string[] }): Promise<boolean>;
  };
  export const webRequest: typeof chrome.webRequest;
}

declare const InstallTrigger: any; 