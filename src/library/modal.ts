import { deleteProfileAndUpdateUI } from './profile-ui';
import { showProfileSetup } from './ui';

export function showDeleteConfirmation(profileName: string): void {
  const modal = document.getElementById('deleteConfirmModal');
  const confirmBtn = document.getElementById('confirmDelete');
  const cancelBtn = document.getElementById('cancelDelete');

  modal?.classList.add('show');

  const handleDelete = async (): Promise<void> => {
    await deleteProfileAndUpdateUI(profileName);
    modal?.classList.remove('show');
    showProfileSetup(false);
    cleanup();
  };

  const handleCancel = (): void => {
    modal?.classList.remove('show');
    cleanup();
  };

  const cleanup = (): void => {
    confirmBtn?.removeEventListener('click', handleDelete);
    cancelBtn?.removeEventListener('click', handleCancel);
  };

  confirmBtn?.addEventListener('click', handleDelete);
  cancelBtn?.addEventListener('click', handleCancel);
}
