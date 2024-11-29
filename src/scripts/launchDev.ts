import { exec } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';

// Chrome paths for different operating systems
const chromePaths = {
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    linux: '/usr/bin/google-chrome-stable'
} as const;

// Firefox paths for different operating systems
const firefoxPaths = {
    win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    darwin: '/Applications/Firefox.app/Contents/MacOS/firefox',
    linux: '/usr/bin/firefox'
} as const;

function findChromePath(): string {
    const platform = os.platform() as keyof typeof chromePaths;
    const possiblePaths = [
        chromePaths[platform],
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser'
    ];

    for (const browserPath of possiblePaths) {
        if (fs.existsSync(browserPath)) {
            return browserPath;
        }
    }

    throw new Error(`Chrome not found. Please install Chrome or Chromium and try again.
Checked paths:
${possiblePaths.join('\n')}`);
}

function getBrowserPath(browser: 'chrome' | 'firefox'): string {
    if (browser === 'chrome') {
        return findChromePath();
    }

    const paths = firefoxPaths;
    const platformPath = paths[os.platform() as keyof typeof firefoxPaths];
    
    if (!platformPath) {
        throw new Error(`Unsupported platform: ${os.platform()}`);
    }

    if (!fs.existsSync(platformPath)) {
        throw new Error(`Firefox not found at ${platformPath}`);
    }

    return platformPath;
}

function getExtensionPath(): string {
    return path.resolve(process.cwd(), 'dist/extension');
}

function launchChrome(extensionPath: string): void {
    const chromePath = getBrowserPath('chrome');
    const userDataDir = path.join(os.tmpdir(), 'chrome-dev-profile');

    // Ensure the extension directory exists and has a manifest
    if (!fs.existsSync(path.join(extensionPath, 'manifest.json'))) {
        throw new Error(`No manifest.json found in ${extensionPath}`);
    }

    const args = [
        `--load-extension="${extensionPath}"`,
        `--user-data-dir="${userDataDir}"`,
        '--no-first-run',
        '--no-default-browser-check'
    ];

    const command = isWindows
        ? `"${chromePath}" ${args.join(' ')}`
        : `"${chromePath}" ${args.join(' ')}`;

    console.log('Launching Chrome with command:', command);
    console.log('Extension path:', extensionPath);

    exec(command, (error) => {
        if (error) {
            console.error('Failed to launch Chrome:', error);
            process.exit(1);
        }
    });
}

function launchFirefox(extensionPath: string): void {
    const firefoxPath = getBrowserPath('firefox');
    const profileDir = path.join(os.tmpdir(), 'firefox-dev-profile');

    // Create a new Firefox profile for development
    if (!fs.existsSync(profileDir)) {
        fs.mkdirSync(profileDir, { recursive: true });
    }

    const args = [
        '-no-remote',
        '-profile',
        `"${profileDir}"`,
        '--browser',
        '--jsconsole'
    ];

    if (isWindows) {
        args.push(`--load-extension="${extensionPath}"`);
    } else {
        // On Unix-like systems, Firefox uses a different method to load extensions
        const extensionsDir = path.join(profileDir, 'extensions');
        if (!fs.existsSync(extensionsDir)) {
            fs.mkdirSync(extensionsDir, { recursive: true });
        }
        // Create a link to the extension in the profile's extensions directory
        const manifestPath = path.join(extensionPath, 'manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const extensionLink = path.join(extensionsDir, `${manifest.browser_specific_settings.gecko.id}`);
        if (!fs.existsSync(extensionLink)) {
            fs.symlinkSync(extensionPath, extensionLink);
        }
    }

    const command = isWindows
        ? `"${firefoxPath}" ${args.join(' ')}`
        : `"${firefoxPath}" ${args.join(' ')}`;

    exec(command, (error) => {
        if (error) {
            console.error('Failed to launch Firefox:', error);
            process.exit(1);
        }
    });
}

// Get browser choice from command line argument
const browser = process.argv[2] as 'chrome' | 'firefox';
if (!browser || !['chrome', 'firefox'].includes(browser)) {
    console.error('Please specify browser: chrome or firefox');
    process.exit(1);
}

// Build the extension first
exec('npm run build:dev', (error) => {
    if (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }

    const extensionPath = getExtensionPath();
    
    if (browser === 'chrome') {
        launchChrome(extensionPath);
    } else {
        launchFirefox(extensionPath);
    }
}); 