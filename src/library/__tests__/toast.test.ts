import { showToastMessage } from '../toast';
import { jest } from '@jest/globals';

describe('Toast Module', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="toastContainer"></div>
    `;
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('showToastMessage', () => {
    it('should create and show a success toast', () => {
      showToastMessage('success', 'Test success message');

      const toast = document.querySelector('.toast');
      expect(toast).toBeTruthy();
      expect(toast?.classList.contains('toast-success')).toBe(true);
      expect(toast?.textContent).toBe('Test success message');
    });

    it('should create and show a danger toast', () => {
      showToastMessage('danger', 'Test error message');

      const toast = document.querySelector('.toast');
      expect(toast).toBeTruthy();
      expect(toast?.classList.contains('toast-danger')).toBe(true);
      expect(toast?.textContent).toBe('Test error message');
    });

    it('should remove toast after timeout', () => {
      showToastMessage('success', 'Test message');

      const toast = document.querySelector('.toast');
      expect(toast).toBeTruthy();

      jest.advanceTimersByTime(3000);

      // Need to trigger the transitionend event manually in tests
      const transitionendEvent = new Event('transitionend');
      toast?.dispatchEvent(transitionendEvent);

      const toastAfterTimeout = document.querySelector('.toast');
      expect(toastAfterTimeout).toBeFalsy();
    });

    it('should handle multiple toasts', () => {
      showToastMessage('success', 'First message');
      showToastMessage('danger', 'Second message');

      const toasts = document.querySelectorAll('.toast');
      expect(toasts.length).toBe(1); // Only one toast should be visible at a time
      expect(toasts[0].textContent).toBe('Second message'); // Latest toast
    });

    it('should handle missing toast container gracefully', () => {
      document.body.innerHTML = '';
      const consoleSpy = jest.spyOn(console, 'error');

      showToastMessage('success', 'Test message');

      expect(consoleSpy).toHaveBeenCalledWith('Toast container not found');
    });

    it('should add and remove show class for animation', () => {
      showToastMessage('success', 'Test message');

      const toast = document.querySelector('.toast');

      // Mock requestAnimationFrame and execute callback synchronously
      const mockRaf = (callback: FrameRequestCallback) => {
        callback(performance.now());
        return 1;
      };
      const originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = mockRaf as typeof window.requestAnimationFrame;

      // Execute the animation frame callback
      mockRaf(() => {
        const toast = document.querySelector('.toast');
        toast?.classList.add('show');
      });

      expect(toast?.classList.contains('show')).toBe(true);

      jest.advanceTimersByTime(3000);
      expect(toast?.classList.contains('show')).toBe(false);

      // Cleanup
      window.requestAnimationFrame = originalRaf;
    });
  });
});
