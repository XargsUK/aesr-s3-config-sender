function isFirefox() {
  const isFF = typeof window.browser !== "undefined";
  console.log("isFirefox check:", isFF);
  return isFF;
}

function getBrowser() {
  console.log("getBrowser called");
  if (isFirefox()) {
    console.log("Using Firefox browser API");
    return window.browser;
  }
  console.log("Using Chrome browser API");
  return chrome;
}
