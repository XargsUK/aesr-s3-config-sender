import { jest, beforeAll, beforeEach } from '@jest/globals';

interface StorageArea {
  get: jest.Mock;
  set: jest.Mock;
  remove?: jest.Mock;
}

interface ChromeStorage {
  sync: StorageArea;
  local: StorageArea;
}

interface ChromeRuntime {
  getManifest: jest.Mock;
  sendMessage: jest.Mock;
  onMessage: {
    addListener: jest.Mock;
    removeListener: jest.Mock;
  };
}

// Create base mock objects
const createStorageArea = (): StorageArea => ({
  get: jest.fn().mockImplementation((key) => {
    if (key === 'debugMode' || (Array.isArray(key) && key.includes('debugMode'))) {
      return Promise.resolve({ debugMode: false });
    }
    if (key === 'lastSentTimestamp' || (Array.isArray(key) && key.includes('lastSentTimestamp'))) {
      return Promise.resolve({ lastSentTimestamp: null });
    }
    return Promise.resolve({});
  }),
  set: jest.fn().mockImplementation(() => Promise.resolve()),
  remove: jest.fn().mockImplementation(() => Promise.resolve()),
});

const storageMock: ChromeStorage = {
  sync: createStorageArea(),
  local: createStorageArea(),
};

const runtimeMock: ChromeRuntime = {
  getManifest: jest.fn(() => ({ manifest_version: 3 })),
  sendMessage: jest.fn(),
  onMessage: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  },
};

// Setup function to initialize mocks
const setupChromeApi = () => {
  // Mock chrome API
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).chrome = {
    storage: storageMock,
    runtime: runtimeMock,
  };
};

// Run setup before all tests
beforeAll(() => {
  setupChromeApi();
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  setupChromeApi();
});

// Export mocks for use in tests
export { storageMock, runtimeMock };
