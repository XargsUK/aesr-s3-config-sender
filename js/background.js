/*
const AESR_ExtensionId = "xxxxxxxxxxxxxx";

  const rawIniStr = `
[profile marketingadmin]
role_arn = arn:aws:iam::123456789012:role/marketingadmin
color = ffaaee

[anotheraccount]
aws_account_id = 987654321987
role_name = anotherrole
region=ap-northeast-1

[athirdaccount]
aws_account_id = 987654321988
role_name = athirdrole
image = "https://via.placeholder.com/150"
`;

  chrome.runtime.sendMessage(AESR_ExtensionId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: rawIniStr
    }, function(response) {
      console.log(response)
    });
*/
