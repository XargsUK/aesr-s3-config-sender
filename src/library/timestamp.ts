import { logDebugMessage } from "./debug";

export async function setLastSentTimestamp(timestamp: number): Promise<void> {
  if (timestamp) {
    await chrome.storage.local.set({ lastSentTimestamp: timestamp });
    logDebugMessage("Last sent timestamp saved:", timestamp);
  }
}

export async function getLastSentTimestamp(): Promise<void> {
  const result = await chrome.storage.local.get(["lastSentTimestamp"]) as { lastSentTimestamp?: number };
  const lastSentElement = document.getElementById("lastSent");
  if (!lastSentElement) {
    throw new Error("Last sent element not found");
  }
  
  if (result.lastSentTimestamp) {
    lastSentElement.textContent =
      "Last sent: " +
      new Date(result.lastSentTimestamp).toLocaleString();
  } else {
    lastSentElement.textContent = "Last sent: Never";
  }
} 