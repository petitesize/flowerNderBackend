const { v4: uuidv4 } = require("uuid");
const s3 = require("../config/aws");

class ImageService {
  async imageUpload(file) {
    // 환경 변수 검증
    if (!process.env.AWS_S3_BUCKET_NAME) {
      throw new Error("요청받은 이름의 AWS S3 bucket을 찾을 수 없습니다");
    }

    const imageKey = `images/${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
      Body: file.buffer,
      ContentType: file.mimetype, // 업로드하는 파일의 MIME 타입(인터넷 상에서 파일의 포맷을 식별하기 위한 표준 방법)을 설정하는 부분!
    };

    try {
      await s3.upload(params).promise();
      console.log(`Image uploaded successfully: ${imageKey}`);
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;
    } catch (e) {
      console.error(`이미지 업로드 실패: ${e.message}`);
      throw e;
    }
  }
}

module.exports = new ImageService();