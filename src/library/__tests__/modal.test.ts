import { showDeleteConfirmation } from '../modal';
import { jest } from '@jest/globals';
import { deleteProfileAndUpdateUI } from '../profile-ui';
import { showProfileSetup } from '../ui';

type DeleteProfileFn = (profileName: string) => Promise<void>;
type ShowProfileSetupFn = (show: boolean) => void;

// Mock dependencies
jest.mock('../profile-ui', () => ({
  deleteProfileAndUpdateUI: jest.fn(),
}));

jest.mock('../ui', () => ({
  showProfileSetup: jest.fn(),
}));

// Create typed mock functions
const mockDeleteProfileAndUpdateUI = jest.fn<DeleteProfileFn>();
const mockShowProfileSetup = jest.fn<ShowProfileSetupFn>();

// Replace the auto-mocked functions with our typed versions
jest.mocked(deleteProfileAndUpdateUI).mockImplementation(mockDeleteProfileAndUpdateUI);
jest.mocked(showProfileSetup).mockImplementation(mockShowProfileSetup);

describe('Modal Functions', () => {
  let mockModal: HTMLDivElement;
  let mockConfirmBtn: HTMLButtonElement;
  let mockCancelBtn: HTMLButtonElement;

  beforeEach(() => {
    // Setup DOM elements
    mockModal = document.createElement('div');
    mockModal.id = 'deleteConfirmModal';
    mockConfirmBtn = document.createElement('button');
    mockConfirmBtn.id = 'confirmDelete';
    mockCancelBtn = document.createElement('button');
    mockCancelBtn.id = 'cancelDelete';

    document.body.appendChild(mockModal);
    document.body.appendChild(mockConfirmBtn);
    document.body.appendChild(mockCancelBtn);

    jest.clearAllMocks();
    mockDeleteProfileAndUpdateUI.mockResolvedValue();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('showDeleteConfirmation', () => {
    it('should show modal and handle confirm action', async () => {
      const profileName = 'Test Profile';
      showDeleteConfirmation(profileName);

      expect(mockModal.classList.contains('show')).toBe(true);

      mockConfirmBtn.click();
      await new Promise(process.nextTick);

      expect(mockDeleteProfileAndUpdateUI).toHaveBeenCalledWith(profileName);
      expect(mockModal.classList.contains('show')).toBe(false);
      expect(mockShowProfileSetup).toHaveBeenCalledWith(false);
    });

    it('should show modal and handle cancel action', () => {
      const profileName = 'Test Profile';
      showDeleteConfirmation(profileName);

      expect(mockModal.classList.contains('show')).toBe(true);

      mockCancelBtn.click();

      expect(mockDeleteProfileAndUpdateUI).not.toHaveBeenCalled();
      expect(mockModal.classList.contains('show')).toBe(false);
    });

    it('should cleanup event listeners after actions', async () => {
      const profileName = 'Test Profile';
      showDeleteConfirmation(profileName);

      mockConfirmBtn.click();
      await new Promise(process.nextTick);

      mockConfirmBtn.click();
      mockCancelBtn.click();
      await new Promise(process.nextTick);

      expect(mockDeleteProfileAndUpdateUI).toHaveBeenCalledTimes(1);
    });
  });
});
