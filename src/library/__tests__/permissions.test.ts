import { checkPermissions, requestPermissions } from '../permissions';
import { jest } from '@jest/globals';
import { logDebugMessage } from '../debug';

// Mock dependencies
jest.mock('../debug', () => ({
  logDebugMessage: jest.fn(),
}));

// Define types for our mock functions
type ContainsFn = (permissions: { permissions: string[]; origins: string[] }) => Promise<boolean>;
type RequestFn = (permissions: { permissions: string[]; origins: string[] }) => Promise<boolean>;

// Create typed mock functions
const mockContains = jest.fn<ContainsFn>();
const mockRequest = jest.fn<RequestFn>();

// Mock addOnBeforeRequestEventListener
const mockAddOnBeforeRequestEventListener = jest.fn();
(global as any).addOnBeforeRequestEventListener = mockAddOnBeforeRequestEventListener;

describe('Permissions Module', () => {
  const mockPermissionsApi = {
    contains: mockContains,
    request: mockRequest,
  };

  const requiredPermissions = {
    permissions: ['webRequest', 'webRequestBlocking', 'storage'],
    origins: ['https://signin.aws.amazon.com/saml'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup global browser/chrome API
    (global as any).chrome = { permissions: mockPermissionsApi };
  });

  describe('checkPermissions', () => {
    it('should handle existing permissions', async () => {
      mockContains.mockResolvedValue(true);

      checkPermissions();
      await new Promise(process.nextTick);

      expect(mockContains).toHaveBeenCalledWith(requiredPermissions);
      expect(logDebugMessage).toHaveBeenCalledWith(
        'DEBUG: The extension has the required permissions.',
      );
      expect(mockAddOnBeforeRequestEventListener).toHaveBeenCalled();
    });

    it('should request permissions if not granted', async () => {
      mockContains.mockResolvedValue(false);

      checkPermissions();
      await new Promise(process.nextTick);

      expect(mockContains).toHaveBeenCalledWith(requiredPermissions);
      expect(logDebugMessage).toHaveBeenCalledWith(
        'DEBUG: The extension does not have the required permissions.',
      );
    });

    it('should handle permission check errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockContains.mockRejectedValue(new Error('Permission check failed'));

      checkPermissions();
      await new Promise(process.nextTick);

      expect(consoleSpy).toHaveBeenCalledWith('Error checking permissions:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('requestPermissions', () => {
    it('should handle granted permissions', async () => {
      mockRequest.mockResolvedValue(true);

      requestPermissions(requiredPermissions);
      await new Promise(process.nextTick);

      expect(mockRequest).toHaveBeenCalledWith(requiredPermissions);
      expect(logDebugMessage).toHaveBeenCalledWith(
        'DEBUG: The required permissions have been granted.',
      );
      expect(mockAddOnBeforeRequestEventListener).toHaveBeenCalled();
    });

    it('should handle denied permissions', async () => {
      mockRequest.mockResolvedValue(false);

      requestPermissions(requiredPermissions);
      await new Promise(process.nextTick);

      expect(mockRequest).toHaveBeenCalledWith(requiredPermissions);
      expect(logDebugMessage).toHaveBeenCalledWith(
        'DEBUG: The required permissions have not been granted.',
      );
      expect(mockAddOnBeforeRequestEventListener).not.toHaveBeenCalled();
    });

    it('should handle permission request errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockRequest.mockRejectedValue(new Error('Permission request failed'));

      requestPermissions(requiredPermissions);
      await new Promise(process.nextTick);

      expect(consoleSpy).toHaveBeenCalledWith('Error requesting permissions:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
