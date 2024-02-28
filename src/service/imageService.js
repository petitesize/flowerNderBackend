const { v4: uuidv4 } = require('uuid');
const s3 = require('../config/aws');

async function uploadImageToS3(file) {
  const imageKey = `images/${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imageKey,
    Body: file.buffer,
    ACL: 'public-read'
  };

  await s3.upload(params).promise();

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;
}

module.exports = {
  uploadImageToS3
};
