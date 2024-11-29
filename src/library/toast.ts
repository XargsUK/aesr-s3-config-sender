import * as bootstrap from "bootstrap";

type ToastColor = 'success' | 'danger' | 'warning' | 'info';
let currentToast: bootstrap.Toast | null = null;

interface ToastOptions {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
}

export function showToastMessage(color: ToastColor, message: string): void {
  // Remove toast if already exists
  if (currentToast) {
    currentToast.hide();
  }

  // Create a wrapper for the toast message
  const toastWrapper = document.createElement("div");
  toastWrapper.style.position = "fixed";
  toastWrapper.style.top = "10px";
  toastWrapper.style.left = "50%";
  toastWrapper.style.transform = "translateX(-50%)";
  toastWrapper.style.zIndex = "10000";

  // Create a Bootstrap toast with a custom color
  const toastElement = document.createElement("div");
  toastElement.className = `toast align-items-center text-white bg-${color}`;
  toastElement.setAttribute("role", "alert");
  toastElement.setAttribute("aria-live", "assertive");
  toastElement.setAttribute("aria-atomic", "true");

  // Create the toast body with the message
  const toastBody = document.createElement("div");
  toastBody.className = "toast-body";
  toastBody.innerHTML = message;

  toastElement.appendChild(toastBody);
  toastWrapper.appendChild(toastElement);
  document.body.appendChild(toastWrapper);

  const toastOptions: ToastOptions = {
    autohide: true,
    delay: 1500
  };

  currentToast = new bootstrap.Toast(toastElement, toastOptions);
  currentToast.show();

  toastElement.addEventListener("hidden.bs.toast", () => {
    toastWrapper.remove();
  });
} 