type ToastColor = 'success' | 'danger' | 'warning' | 'info';
let currentToast: HTMLElement | null = null;
let currentTimeout: NodeJS.Timeout | null = null;

export function showToastMessage(color: ToastColor, message: string): void {
  // Remove existing toast if present
  if (currentToast) {
    currentToast.remove();
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
  }

  // Get toast container
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    console.error('Toast container not found');
    return;
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${color}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  // Add message
  toast.textContent = message;

  // Add to container
  toastContainer.appendChild(toast);
  currentToast = toast;

  // Trigger show animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto hide after 3s
  currentTimeout = setTimeout(() => {
    hideToast(toast);
  }, 3000);
}

function hideToast(toast: HTMLElement): void {
  toast.classList.remove('show');
  toast.addEventListener(
    'transitionend',
    () => {
      toast.remove();
      if (currentToast === toast) {
        currentToast = null;
      }
    },
    { once: true },
  );
}
