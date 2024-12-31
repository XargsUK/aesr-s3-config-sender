declare namespace chrome {
  export namespace storage {
    interface StorageChange {
      /** Optional. The new value of the item, if there is a new value. */
      newValue?: unknown;
      /** Optional. The old value of the item, if there was an old value. */
      oldValue?: unknown;
    }

    interface StorageArea {
      get(
        keys?: string | string[] | Record<string, unknown> | null,
      ): Promise<Record<string, unknown>>;
      // Using unknown instead of any for better type safety
      set(items: Record<string, unknown>): Promise<void>;
      remove(keys: string | string[]): Promise<void>;
      clear(): Promise<void>;
      getBytesInUse(keys?: string | string[]): Promise<number>;
    }

    interface StorageChange {
      /** Optional. The new value of the item, if there is a new value. */
      newValue?: unknown;
      /** Optional. The old value of the item, if there was an old value. */
      oldValue?: unknown;
    }

    interface Local extends StorageArea {
      QUOTA_BYTES: number;
    }

    interface Sync extends StorageArea {
      MAX_ITEMS: number;
      MAX_WRITE_OPERATIONS_PER_HOUR: number;
      MAX_WRITE_OPERATIONS_PER_MINUTE: number;
      QUOTA_BYTES: number;
      QUOTA_BYTES_PER_ITEM: number;
    }

    interface StorageChangedEvent
      extends chrome.events.Event<
        (changes: { [key: string]: StorageChange }, areaName: string) => void
      > {}

    interface Static {
      local: Local;
      sync: Sync;
      onChanged: StorageChangedEvent;
    }
  }

  export namespace runtime {
    interface Static {
      getManifest(): Record<string, unknown>;
      getURL(path: string): string;
      openOptionsPage(): Promise<void>;
      onMessage: chrome.events.Event<
        (
          message: unknown,
          sender: chrome.runtime.MessageSender,
          sendResponse: (response?: unknown) => void,
        ) => void | boolean
      >;
    }

    interface MessageSender {
      tab?: chrome.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    }
  }

  export namespace tabs {
    interface Tab {
      id?: number;
      index: number;
      windowId: number;
      highlighted: boolean;
      active: boolean;
      pinned: boolean;
      url?: string;
      title?: string;
      favIconUrl?: string;
      status?: string;
      incognito: boolean;
      width?: number;
      height?: number;
      sessionId?: string;
    }
  }

  export namespace events {
    // Using a more specific type instead of Function
    interface Event<T extends (...parameters: unknown[]) => void> {
      addListener(callback: T): void;
      removeListener(callback: T): void;
      hasListener(callback: T): boolean;
    }
  }
}
