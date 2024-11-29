declare namespace chrome {
  namespace runtime {
    interface InstalledDetails {
      reason: string;
      previousVersion?: string;
      id?: string;
    }

    const lastError: {
      message: string;
    } | undefined;

    function getURL(path: string): string;
    function openOptionsPage(): Promise<void>;
    function sendMessage<T = any>(
      extensionId: string,
      message: any,
      callback?: (response: T) => void
    ): void;

    const onInstalled: {
      addListener(callback: (details: InstalledDetails) => void): void;
    };
  }

  namespace webRequest {
    interface RequestFilter {
      urls: string[];
    }

    interface WebRequestBodyDetails {
      requestBody?: {
        formData?: {
          [key: string]: string[];
        };
        raw?: {
          bytes: ArrayBuffer;
        }[];
      };
    }

    const onBeforeRequest: {
      addListener(
        callback: (details: WebRequestBodyDetails) => void,
        filter: RequestFilter,
        extraInfoSpec?: string[]
      ): void;
      hasListener(callback: (details: WebRequestBodyDetails) => void): boolean;
    };
  }

  namespace storage {
    interface StorageArea {
      get<T = any>(keys: string | string[] | null): Promise<T>;
      set(items: { [key: string]: any }): Promise<void>;
      remove(keys: string | string[]): Promise<void>;
    }

    const sync: StorageArea;
    const local: StorageArea;
  }

  namespace tabs {
    interface CreateProperties {
      url?: string;
      active?: boolean;
    }

    interface Tab {
      id?: number;
      url?: string;
    }

    function create(createProperties: CreateProperties): Promise<Tab>;
  }
} 