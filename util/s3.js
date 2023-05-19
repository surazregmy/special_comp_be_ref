const AWS = require("aws-sdk");
const fs = require("fs");
const { v4 } = require("uuid");
require("dotenv").config();

const region = process.env.AWSREGION;
const bucketName = process.env.AWSBUCKETNAME;
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETACCESSKEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function uploadFile(file, folder, loggedInUserId) {
  console.log("file to upload");
  console.log(file);
  const imageName =
    loggedInUserId +
    "-" +
    file.fieldname +
    "-" +
    Date.now() +
    "." +
    file.originalname.split(".")[1];

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: folder + "/" + imageName,
  };

  return s3.upload(uploadParams).promise();
}

module.exports = { uploadFile };
