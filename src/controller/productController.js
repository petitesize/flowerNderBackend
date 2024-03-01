const { productService } = require("../service");
const utils = require("../misc/utils");
const imageService = require("../service/imageService");

const productController = {
  // HTTP GET를 위한 controller(request handler)
  // 상품 하나
  async getProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const product = await productService.getProduct(productId);
      res.json(utils.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  // HTTP GET를 위한 controller(request handler)
  // 상품 카테고리별
  async getProducts(req, res, next) {
    try {
      const { category } = req.query;
      const products = await productService.getProducts({ category });
      res.json(utils.buildResponse(products));
    } catch (error) {
      next(error);
    }
  },

  // HTTP PUT를 위한 controller(request handler)
  async putProduct(req, res, next) {
    try {
      const { id } = req.params;
      const {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image,
        sub_image,
      } = req.body;

      const product = await productService.updateProduct(id, {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image,
        sub_image,
      });
      res.json(utils.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  // HTTP DELETE를 위한 controller(request handler)
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.deleteProduct(id);
      res.json(utils.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  // HTTP POST를 위한 controller(request handler)
  async postProduct(req, res, next) {
    try {
      //I. 메인이미지
      const main_img_file = req.files['main_image'] ? req.files['main_image'][0] : null;
      let main_img_url = ""; //I-1. 스키마에 할당할 main url 변수 및 값 초기화하기
      if (main_img_file) {
        main_img_url = await imageService.imageUpload(main_img_file);
      } else {
        return res.status(400).json({ error: "메인 이미지 파일이 없습니다."});
      }

      //II.서브이미지(required 아니기 때문에 400 조건 설정X)
      const sub_img_files = req.files['sub_image'] || []; //II-1.서브이미지는 arr 객체
      const sub_imgs = await Promise.all( //II-2. urls값들 all처리 
        sub_img_files.map(async (file) => { //II-3. map으로 값 저장
          const url = await imageService.imageUpload(file);
          return {
            url,
            alt: "상세 이미지 설명란" 
          };
        }),
      );

      //III. 유효한 데이터들 정보 스키마에 맞게 처리
      //III-1. 텍스트 형식으로 받아오는 필드들 설정
      const {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
      } = req.body;
      //III-2. file 형식으로 받아오는 필드(이미지 관련)들 설정 후 product 데이터 생성(post)
      const product = await productService.createProduct({
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image: {
          url: main_img_url, 
          alt: "상품 대표 사진 설명란" 
        },
        sub_images: sub_imgs
      });
      console.log("Product after saving:", product);

      //IV. 처리 성공된 데이터이자 new product 데이터 반환! 끝!
      res.status(201).json(utils.buildResponse(product));
    } catch (e) {
      console.error("상품 등록 실패:", e);
      next(e);
    }
  },
};

module.exports = productController;
