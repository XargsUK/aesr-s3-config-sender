import fs from 'fs';
import util from 'util';
import { exec as execCallback } from 'child_process';
import path from 'path';

const exec = util.promisify(execCallback);

interface LicenseData {
  licenses: string;
  publisher: string;
  url: string;
}

interface LicenseCheckerOutput {
  [key: string]: LicenseData;
}

const packageJsonPath = path.join(__dirname, '../../package.json');
const creditsHtmlPath = path.join(__dirname, '../../src/html/credits.html');

async function updateCredits(): Promise<void> {
    try {
        const { stdout, stderr } = await exec('npx license-checker --json');

        if (stderr) {
            console.error(`error: ${stderr}`);
            return;
        }

        const licenseData = JSON.parse(stdout) as LicenseCheckerOutput;
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        let creditsHtml = fs.readFileSync(creditsHtmlPath, 'utf8');

        let newCredits = '';

        for (const fullPackageName in licenseData) {
            // split the full package name into name and version
            const packageName = fullPackageName.substring(0, fullPackageName.lastIndexOf('@'));
            const version = fullPackageName.substring(fullPackageName.lastIndexOf('@') + 1);

            // skip if this is not a dependency listed in package.json
            if (!packageJson.dependencies[packageName]) {
                continue;
            }

            const packageLicenseData = licenseData[fullPackageName];

            if (packageLicenseData) {
                const { licenses, publisher, url } = packageLicenseData;

                newCredits += `
  <p><b>${packageName}</b></p>
  <pre>
    Licenses: ${licenses}
    Publisher: ${publisher}
    URL: ${url}
    Version: ${version}
  </pre>`;
            }
        }

        // Look for any existing credits between <!-- Placeholder for credits --> and <!-- End of Credits --> and remove them
        const regExp = /<!-- Placeholder for credits -->[\s\S]*<!-- End of Credits -->/;
        const replacementString = `<!-- Placeholder for credits -->\n<section>${newCredits}\n</section>\n<!-- End of Credits -->`;
        creditsHtml = creditsHtml.replace(regExp, replacementString);

        fs.writeFileSync(creditsHtmlPath, creditsHtml);
        console.log('Credits updated successfully');
    } catch (error) {
        console.error('Error updating credits:', error);
        process.exit(1);
    }
}

updateCredits(); 