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
6. The extension should now be loaded as an u   npacked extension and ready to use.

## Authentication

The Security Token Service (STS) from AWS provides an API action assumeRoleWithSAML. Using the SAML Assertion given by your IDP, the Chrome Extension will call this API action to fetch temporary credentials. (AccessKeyId, SecretAccessKey and SessionToken). This way, there is no need to create some anonymous user in AWS IAM used for executing scripts. This Chrome Extension, however, will make it super easy for you to use your corporate identity for making requests to an S3 bucket for the AWS Extend Switch Roles extension. 

![AESR SSO Authentication Diagram](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/aesr-diagram.png)

## How to Use

### S3 Configuration

| Field Name        | Description                                                             | Example                            |
|-------------------|-------------------------------------------------------------------------|------------------------------------|
| AESR Extension ID | The chrome extension ID of AWS Extend Switch Roles                      | `jpmkfafbacpgapdghgdpembnojdlgkdl` |
| Region            | The region where the AWS S3 objects are stored.                         | `us-west-2`                        |
| Bucket Name       | The name of the S3 bucket where the AWS configuration file is stored.   | `my-s3-bucket`                     |
| File Key          | The object key for the AESR configuration file stored in the S3 bucket. | `configs/my-aws-config.ini`        |

### Sign-In
Sign into AWS using SSO, and the extension will capture the SAML response automatically. Ensure that the user you are signing into has the access required to the bucket where your configuration is stored. 


### Cognito Sign In

Originally, this project utilised Cognito for authentication. This methodology has since been deprecated, and has since been replaced by the use of AWS STS. 


### Saving Profiles

To save a new AWS configuration profile, click Save Profile.

### Deleting Profiles
To delete an existing AESR S3 Config Sender profile, select it from the dropdown list, and click the "Delete Profile" button.

### Setting a Default Profile

To set a default AESR S3 Config Sender profile, select it from the dropdown list, and click the "Set Default Profile" button. The default profile will be saved to your browser's local storage.

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
Before you begin, ensure that you have Node.js version 20.x installed on your Linux system. This is a necessary prerequisite for the build process. You can download and install Node.js from [here](https://nodejs.org/en).

### Cloning the Repository

1. Open your terminal. 
2. Clone the repository by running the following command:
   `git clone git@github.com:XargsUK/aesr-s3-config-sender.git`

### Navigating to the Project Directory
After cloning the repository, navigate to the project directory:
`cd aesr-s3-config-sender`

This step is crucial as the build script must be run from the root of the project directory.

### Building the Project

1. In the project directory, you will find a build script named build.sh. This script is used to build the project for different environments.
2. While in the project root, execute the following command: `./bin/build.sh <chrome|firefox>`

Replace <chrome|firefox> with the target platform for which you are building. For example, use chrome to build for Google Chrome or firefox for Mozilla Firefox.

This command builds the project and places the output in the `dist/` directory.

### Post-Build Steps
After the build process completes, you will find the built project in the `dist/` directory. This directory contains the compiled code ready for deployment or further testing.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request on [GitHub](https://github.com/XargsUK/aesr-s3-config-sender/).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Please note that this is subject to change depending on the specific license chosen for the project.

## Acknowledgements and Credits

AWS Extend Switch Roles was developed and distributed by [tilfinltd](https://github.com/tilfinltd/), who without their work, this plugin wouldn't have been possible. I would like to acknowledge and thank tilfinltd for their contribution.

- [Chrome Extension](https://chrome.google.com/webstore/detail/aws-extend-switch-roles/jpmkfafbacpgapdghgdpembnojdlgkdl)
- [Firefox Add-on](https://addons.mozilla.org/firefox/addon/aws-extend-switch-roles3/)
- [Github: AWS Extend Switch Roles](https://github.com/tilfinltd/aws-extend-switch-roles)
- [Github: AESR Config Sender](https://github.com/tilfinltd/aesr-config-sender)
