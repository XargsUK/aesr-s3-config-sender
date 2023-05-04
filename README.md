# AESR S3 Config Sender

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ikmgjpefodojiccmidahcblifopeimjf.svg)](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?utm_source=github)

AESR S3 Config Sender is a Google Chrome extension that enables you to easily update your AESR configuration by pulling the latest configuration from an S3 bucket. 

## Installation
### Manual Unpacked
1. [Download](https://github.com/XargsUK/aesr-s3-config-sender/releases/latest) the latest build.
2. Extract the contents of the ZIP file to a local directory on your computer.
3. Open Google Chrome and type `chrome://extensions` in the address bar.
4. Turn on the "Developer mode" toggle switch (if it's not already on).
5. Click the "Load unpacked" button and select the directory where you extracted the extension in step 2.
6. The extension should now be loaded as an unpacked extension and ready to use.

### Chrome Web Store

You can download the latest stable version from the [Chrome Web Store here](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?hl=en-GB&authuser=0).

## Authentication

Currently, AESR Config Sender supports two authentication methods; IAM access keys and Cognito.

Cognito uses the following flow to authenticate users: 
![AESR Cognito Authentication Diagram](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/aesr-diagram.png). 

## How to Use

### S3 Configuration

| Field Name        | Description                                                             | Example                            |
|-------------------|-------------------------------------------------------------------------|------------------------------------|
| AESR Extension ID | The chrome extension ID of AWS Extend Switch Roles                      | `jpmkfafbacpgapdghgdpembnojdlgkdl` |
| Region            | The region where the AWS S3 objects are stored.                         | `us-west-2`                        |
| Bucket Name       | The name of the S3 bucket where the AWS configuration file is stored.   | `my-s3-bucket`                     |
| File Key          | The object key for the AESR configuration file stored in the S3 bucket. | `configs/my-aws-config.ini`        |

### Credentials

| Field Name            | Description                                           | Example                                                                            |
|-----------------------|-------------------------------------------------------|------------------------------------------------------------------------------------|
| AWS Access Key*       | The access key ID for the AWS account being used.     | `AKIAYourAccessKey`                                                                |
| AWS Secret Key*       | The secret access key for the AWS account being used. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                         |
| Cognito Session Token | This field is populated after Cognito Sign-In.        | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

### Cognito Sign In

| Field Name                      | Description                                                                  | Example                                          |
|---------------------------------|------------------------------------------------------------------------------|--------------------------------------------------|
| Username                        | Cognito username                                                             | `john.smith`                                     |
| Password                        | Cognito password                                                             | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`       |
| User Pool ID                    | User Pool ID the the user above                                              | `us-west-2_abcd1234`                             |
| Cognito User Pool Client App ID | Client App ID to allow the app to use the User Pool                          | `5abcdefg6hijklmnop7`                            |
| Cognito Identity Pool ID        | The Identity Pool ID which the User Pool trades its tokens for credentials.  | `us-west-2:1a2b3c4d-5e6f-7g8h-9i10-jk1lmnopqrs2` |
| Cognito Region                  | Region                                                                       | `us-west-2`                                      |

Note: The Cognito Identity Pool will have a role configured for Authenticated users. Ensure that this role has the correct permissions to access the S3 bucket. 

### Saving Profiles

To save a new AWS configuration profile, click Save Profile. Note that it will only save the Access Key and Secret Key if the Cognito Sign In fields are empty. 

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

![Screen Shot 1](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/screenshot-2.png)

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
