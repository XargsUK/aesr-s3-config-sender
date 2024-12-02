# AESR S3 Config Sender

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Extension](https://img.shields.io/chrome-web-store/v/ikmgjpefodojiccmidahcblifopeimjf.svg)](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?utm_source=github)
[![Firefox Add-on](https://img.shields.io/amo/v/aesr-s3-config-sender.svg)](https://addons.mozilla.org/firefox/addon/aesr-s3-config-sender?utm_source=github)

AESR S3 Config Sender is a Google Chrome extension that enables you to easily update your AESR configuration by pulling the latest configuration from an S3 bucket.

## Installation

### Chrome Web Store

You can download the latest stable version from the [Chrome Web Store here](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?hl=en-GB&authuser=0).

### Manual Install: Unpacked Extension

1. [Download](https://github.com/XargsUK/aesr-s3-config-sender/releases/latest) the latest build.
2. Extract the contents of the ZIP file to a local directory on your computer.
3. Open Google Chrome and type `chrome://extensions` in the address bar.
4. Turn on the "Developer mode" toggle switch (if it's not already on).
5. Click the "Load unpacked" button and select the directory where you extracted the extension in step 2.
6. The extension should now be loaded as an u npacked extension and ready to use.

## Authentication

The Security Token Service (STS) from AWS provides an API action assumeRoleWithSAML. Using the SAML Assertion given by your IDP, the Chrome Extension will call this API action to fetch temporary credentials. (AccessKeyId, SecretAccessKey and SessionToken). This way, there is no need to create some anonymous user in AWS IAM used for executing scripts. This Chrome Extension, however, will make it super easy for you to use your corporate identity for making requests to an S3 bucket for the AWS Extend Switch Roles extension.

![AESR SSO Authentication Diagram](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/aesr-diagram.png)

## How to Use

### S3 Configuration

| Field Name        | Description                                                             | Example                            |
| ----------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| AESR Extension ID | The chrome extension ID of AWS Extend Switch Roles                      | `jpmkfafbacpgapdghgdpembnojdlgkdl` |
| Region            | The region where the AWS S3 objects are stored.                         | `us-west-2`                        |
| Bucket Name       | The name of the S3 bucket where the AWS configuration file is stored.   | `my-s3-bucket`                     |
| File Key          | The object key for the AESR configuration file stored in the S3 bucket. | `configs/my-aws-config.ini`        |

### Sign-In

Sign into AWS using SSO, and the extension will capture the SAML response automatically. Ensure that the user you are signing into has the access required to the bucket where your configuration is stored.

### Profile Management

Profiles can now be managed through the extension popup:

- Create and save multiple profiles
- Set a default profile
- Import/Export profiles
- Delete profiles
- Quick sync with selected profile

### Browser Permissions

The extension now requires the following permissions:

- Tabs access
- Storage access
- Web request permissions for SAML processing

### Pulling Configurations from S3

To pull the latest AWS configuration from an S3 bucket, enter the required information in the fields and click the "Pull S3 Config" button. The latest configuration will be displayed in the text area below.

Failures to pull the config are generally related to either Bucket Policy, IAM permissions, or the CORS policy from the bucket. You will see a log to the console regarding this.

### Sending Configurations to AWS Extend Switch Roles

To send the AWS configuration to AWS Extend Switch Roles, enter the chrome extension ID of AWS Extend Switch Roles. Then copy the AESR Config Sender ID, and put this in the `Config sender extension ID:` field in AWS Extend Switch Roles. Once these are saved, in future you can just click the `Push to AESR` button.

## Appearance

![Screen Shot 1](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/screenshot-1.png)

## Build

This section guides you through the process of building the project from the source code. Please follow these steps carefully to ensure a successful build.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js version 22.x (as specified in mise.toml)
- npm (latest version recommended)

### Development Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:XargsUK/aesr-s3-config-sender.git
   cd aesr-s3-config-sender
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Development Commands:

   ```bash
   npm run clean      # Clean build directories
   npm run build     # Build both Chrome and Firefox extensions
   npm run package   # Create distribution packages
   npm run typecheck # Run TypeScript type checking
   npm run lint      # Run ESLint checks
   npm run start     # Start development server
   ```

### Development in Browser

You can launch browsers with the development extension using VS Code:

1. Open the project in VS Code
2. Go to the Run and Debug view
3. Select either "Launch Chrome with Extension" or "Launch Firefox with Extension"
4. Press F5 to start debugging

## Project Structure

The project was modernised in v1.0.0 with:

- TypeScript support
- ESLint configuration
- Prettier code formatting
- Modern build system using webpack
- Browser-specific manifest files
- Lucide icons replacing FontAwesome

## Contributing

Contributions are welcome! Please ensure you:

1. Follow the TypeScript/ESLint/Prettier configurations
2. Run type checking and linting before submitting PRs
3. Test on both Chrome and Firefox browsers

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Please note that this is subject to change depending on the specific license chosen for the project.

## Acknowledgements and Credits

AWS Extend Switch Roles was developed and distributed by [tilfinltd](https://github.com/tilfinltd/), who without their work, this plugin wouldn't have been possible. I would like to acknowledge and thank tilfinltd for their contribution.

- [Chrome Extension](https://chrome.google.com/webstore/detail/aws-extend-switch-roles/jpmkfafbacpgapdghgdpembnojdlgkdl)
- [Firefox Add-on](https://addons.mozilla.org/firefox/addon/aws-extend-switch-roles3/)
- [Github: AWS Extend Switch Roles](https://github.com/tilfinltd/aws-extend-switch-roles)
- [Github: AESR Config Sender](https://github.com/tilfinltd/aesr-config-sender)
