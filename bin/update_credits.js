const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const creditsHtmlPath = path.join(__dirname, '../credits.html');

async function updateCredits() {
    const { stdout, stderr } = await exec('npx license-checker --json');

    if (stderr) {
        console.error(`error: ${stderr}`);
        return;
    }

    const licenseData = JSON.parse(stdout);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let creditsHtml = fs.readFileSync(creditsHtmlPath, 'utf8');

    let newCredits = '';

    for (let fullPackageName in licenseData) {
        // split the full package name into name and version
        let packageName = fullPackageName.substring(0, fullPackageName.lastIndexOf('@'));
        let version = fullPackageName.substring(fullPackageName.lastIndexOf('@') + 1);

        // skip if this is not a dependency listed in package.json
        if (!packageJson.dependencies[packageName]) {
            continue;
        }

        const packageLicenseData = licenseData[fullPackageName];

        if (packageLicenseData) {
            const licenses = packageLicenseData.licenses;
            const publisher = packageLicenseData.publisher;
            const url = packageLicenseData.url;

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
}

updateCredits();
