declare namespace browser {
  export namespace runtime {
    interface MessageSender {
      tab?: browser.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    }

    interface Static {
      getManifest(): Record<string, unknown>;
      getURL(path: string): string;
      openOptionsPage(): Promise<void>;
      onMessage: browser.events.Event<
        (
          message: unknown,
          sender: browser.runtime.MessageSender,
          sendResponse: (response?: unknown) => void,
        ) => void | boolean
      >;
    }
  }
}

// This needs to be declared globally
declare global {
  interface InstallTriggerInterface {
    enabled: boolean;
    install?: (data: unknown) => boolean;
    updateEnabled?: () => boolean;
    install?: (data: unknown) => boolean;
  }

  const InstallTrigger: InstallTriggerInterface;
  const browser: typeof browser;
}

export {}; // Make this a module
