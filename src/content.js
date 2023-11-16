// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSAMLResponse") {
    try {
      const samlResponse = document.getElementsByName("SAMLResponse")[0]?.value;
      sendResponse({ samlResponse: samlResponse });
    } catch (e) {
      console.error("Error fetching SAMLResponse:", e);
      sendResponse({}); // Send back an empty response
    }
  }
  return true; // Indicate that the response will be sent asynchronously
});
