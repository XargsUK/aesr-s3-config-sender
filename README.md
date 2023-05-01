# AESR S3 Config Sender

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Web Store](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?utm_source=github)

AESR S3 Config Sender is a Google Chrome extension that enables you to easily update your AESR configuration by pulling the latest configuration from an S3 bucket. 

## Installation
### Manual Unpacked
1. Clone the repository or download the source code as a ZIP file.
2. Extract the contents of the ZIP file (if necessary) to a local directory on your computer.
3. Open Google Chrome and type `chrome://extensions` in the address bar.
4. Turn on the "Developer mode" toggle switch (if it's not already on).
5. Click the "Load unpacked" button and select the directory where you extracted the source code in step 2.
6. The extension should now be loaded as an unpacked extension and ready to use.

### Chrome Web Store

You can download the latest stable version from the [Chrome Web Store here](https://chrome.google.com/webstore/detail/aesr-s3-config-sender/ikmgjpefodojiccmidahcblifopeimjf?hl=en-GB&authuser=0).

## Usage

### Saving Profiles

To save a new AWS configuration profile, enter the required information in the fields provided (access key, secret key, region, S3 bucket name, S3 file key, and AESR ID), and click the "Save Profile" button. The profile will be saved to your browser's local storage.

| Field Name | Description                                                                                              | Example                                       |
|------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Profile Name | A user-defined name for the AWS configuration profile being saved.                                      | `my-aws-profile`                              |
| AWS Access Key | The access key ID for the AWS account being used.                                                       | `AKIAYourAccessKey`                           |
| AWS Secret Key | The secret access key for the AWS account being used.                                                   | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`   |
| AWS Region | The region where the AWS resources being used are located.                                              | `us-west-2`                                   |
| S3 Bucket Name | The name of the S3 bucket where the AWS configuration file is stored.                                   | `my-s3-bucket`                                |
| S3 File Key | The object key for the AWS configuration file stored in the S3 bucket.                                  | `my-aws-config.ini`                           |
| AESR ID | The chrome extension ID of AWS Extend Switch Roles         | `jpmkfafbacpgapdghgdpembnojdlgkdl`                          |

You will also need to copy the extension ID of AESR S3 Config Reader in the URL bar, and paste this in the Extension API field in AWS Extend Switch Roles.

### Deleting Profiles
To delete an existing AWS configuration profile, select it from the dropdown list, and click the "Delete Profile" button.

### Setting a Default Profile

To set a default AWS configuration profile, select it from the dropdown list, and click the "Set Default Profile" button. The default profile will be saved to your browser's local storage.

### Pulling Configurations from S3

To pull the latest AWS configuration from an S3 bucket, enter the required information in the fields provided (access key, secret key, region, S3 bucket name, and S3 file key), and click the "Pull S3 Config" button. The latest configuration will be displayed in the text area below.

### Sending Configurations to AWS Extend Switch Roles

To send the AWS configuration to AWS Extend Switch Roles, enter the AESR ID in the field provided, and click the "Save" button. The configuration will be sent to the specified AESR ID.

## Appearance

![Screen Shot 1](https://github.com/XargsUK/aesr-s3-config-sender/blob/main/images/screenshot-1.png)

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
