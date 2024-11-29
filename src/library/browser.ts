/**
 * Browser utility functions for cross-browser compatibility
 */

interface FirefoxBrowser {
    runtime: typeof chrome.runtime;
    [key: string]: any;
}

declare global {
    interface Window {
        browser?: FirefoxBrowser;
    }
}

/**
 * Check if the current browser is Firefox
 */
function isFirefox(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).browser !== 'undefined';
}

/**
 * Get the appropriate browser API object
 */
function getBrowser(): typeof chrome {
    if (isFirefox() && (window as any).browser) {
        return (window as any).browser;
    }
    return chrome;
}

/**
 * Open the options page
 */
function openOptionsPage(): void {
    const browser = getBrowser();
    if (browser.runtime && browser.runtime.openOptionsPage) {
        browser.runtime.openOptionsPage();
    } else {
        // Fallback for older browsers or different manifest configurations
        const optionsUrl = browser.runtime.getURL('options.html');
        browser.tabs.create({ url: optionsUrl });
    }
}

// Export both named and default exports
export { isFirefox, getBrowser, openOptionsPage };
export default { isFirefox, getBrowser, openOptionsPage };
