import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    //upload the file to aws s3 bucket.
    const file = data.get("file");

    const s3Client = new S3Client({
      region: "ap-southeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const ext = file.name.split(".").slice(-1)[0];

    const newFileName = uniqid() + "." + ext;
    const bucketName = "arogya-ordering";
    // An array to store file chunks
    const chunks = [];
    // Iterate over each chunk of the file's stream
    for await (const chunk of file.stream()) {
      // Add the current chunk to the array
      chunks.push(chunk);
    }
    // Concatenate all the chunks into a single buffer
    const buffer = Buffer.concat(chunks);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    const link = "https://" + bucketName + ".s3.amazonaws.com/" + newFileName;
    return Response.json(link);
  }
  return Response.json(true);
}
