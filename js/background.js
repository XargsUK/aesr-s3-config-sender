chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchS3FileContent') {
    AWS.config.update({
      accessKeyId: request.accessKeyId,
      secretAccessKey: request.secretAccessKey,
      region: request.region,
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: request.bucket,
      Key: request.key,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.error('Failed to fetch S3 file content:', err);
        sendResponse({ success: false, error: err.message });
      } else {
        const content = data.Body.toString('utf-8');
        console.log('Received S3 file content:', content);
        sendResponse({ success: true, content });
      }
    });

    return true;
  }
});
