import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

async function getS3FileContent(
  accessKeyId,
  secretAccessKey,
  sessionToken,
  region,
  bucket,
  key
) {
  // Create a new S3 client
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    },
  });

  // Create the GetObjectCommand with the required parameters
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  // Send the command and get the response
  const response = await s3Client.send(getObjectCommand);
  const content = new TextDecoder("utf-8").decode(
    await new Response(response.Body).arrayBuffer()
  );
  return content;
}

export { getS3FileContent };
