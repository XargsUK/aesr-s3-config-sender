import { openOptionsPage } from '../browser';
import { jest } from '@jest/globals';

// Define mock function types
type OpenOptionsPageFn = () => Promise<void>;
type GetURLFn = (path: string) => string;
type CreateTabFn = (properties: chrome.tabs.CreateProperties) => Promise<chrome.tabs.Tab>;

// Create typed mock functions
const mockOpenOptionsPage = jest.fn<OpenOptionsPageFn>().mockResolvedValue();
const mockGetURL = jest.fn<GetURLFn>().mockReturnValue('chrome://extension/options.html');
const mockCreateTab = jest.fn<CreateTabFn>().mockResolvedValue({ id: 1 } as chrome.tabs.Tab);

// Mock chrome API with complete runtime object
const mockChromeApi = {
  runtime: {
    openOptionsPage: mockOpenOptionsPage,
    getURL: mockGetURL,
  },
  tabs: {
    create: mockCreateTab,
  },
};

describe('Browser Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup global objects
    (global as any).chrome = mockChromeApi;
    (global as any).window = { browser: undefined };
  });

  describe('openOptionsPage', () => {
    it('should use runtime.openOptionsPage when available', async () => {
      await openOptionsPage();
      expect(mockOpenOptionsPage).toHaveBeenCalled();
      expect(mockCreateTab).not.toHaveBeenCalled();
    });

    it('should fallback to tabs.create when openOptionsPage is not available', async () => {
      // Remove openOptionsPage to test fallback
      mockChromeApi.runtime.openOptionsPage = undefined as any;

      await openOptionsPage();
      expect(mockGetURL).toHaveBeenCalledWith('options.html');
      expect(mockCreateTab).toHaveBeenCalledWith({
        url: 'chrome://extension/options.html',
      });

      // Restore openOptionsPage for other tests
      mockChromeApi.runtime.openOptionsPage = mockOpenOptionsPage;
    });
  });
});
