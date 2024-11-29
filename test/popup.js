document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded");
  const openOptionsLink = document.getElementById("openOptionsLink");
  console.log("openOptionsLink element:", openOptionsLink);

  if (openOptionsLink) {
    console.log("Setting up click handler");
    openOptionsLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Options link clicked");
      const browser = getBrowser();
      console.log("Got browser object:", browser);
      console.log("Calling openOptionsPage");
      browser.runtime.openOptionsPage();
      return false;
    });
  }
});
