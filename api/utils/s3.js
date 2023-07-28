import dotenv from 'dotenv';
import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKETNAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

/*
    In Front-End
    1. get secure URL from the server
    2. post the image directly to the s3 bucket
    3. post request to the server to store extra data for media post
*/
export async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}
/*
    simplified index.js for front-end

    const imageForm = document.querySelector("#imageForm")
    const imageInput = document.querySelector("#imageInput")

    imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = imageInput.files[0]

    // get secure url from our server
    const { url } = await fetch("/s3Url").then(res => res.json())
    console.log(url)

    // post the image direclty to the s3 bucket
    await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split('?')[0]
    console.log(imageUrl)

    // post requst to my server to store any extra data
    
    
    const img = document.createElement("img")
    img.src = imageUrl
    document.body.appendChild(img)
    })
*/
