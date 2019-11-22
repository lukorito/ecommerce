const pool = require('../pool');
const ProductsRepository = require('../Repository/ProductsRepository');
const handler = require('../helpers/handlers');

module.exports = class ProductsController {
  constructor() {
    this.repo = new ProductsRepository(pool);
  }

  async getAll(req, res, next) {
    const { descriptionLength = 200, limit = 10, page = 1 } = req.query;
    const startingPage = (page - 1) * limit;
    const products = await this.repo.getAll(descriptionLength, limit, startingPage);
    const counts = await this.repo.countProduct();
    const count = counts[Object.keys(counts)[0]];
    const response = { count, products };
    handler.sendResponse(res, 200, response);
  }

  async search(req, res, next) {
    const {
      query, allWords = 'on', descriptionLength = 200, limit = 10, page = 1,
    } = req.query;
    const startingPage = (page - 1) * limit;
    const search = await this.repo.search(query, allWords, descriptionLength, limit, startingPage);
    handler.sendResponse(res, 200, search);
  }

  async getOne(req, res, next) {
    const { productId } = req.params;
    const product = await this.repo.getOne(productId);
    return product.length
      ? handler.sendResponse(res, 200, product)
      : handler.sendError(
        res,
        'USR_02',
        400,
        'productId',
        'productId not found!!',
      );
  }

  async getAllByCategory(req, res, next) {
    const { categoryId } = req.params;
    const { descriptionLength = 200, limit = 20, page = 1 } = req.query;
    const startingPage = (page - 1) * limit;
    const products = await this.repo.getAllByCategory(categoryId, descriptionLength, limit, startingPage);
    return products.length
      ? handler.sendResponse(res, 200, products)
      : handler.sendError(
        res,
        'USR_02',
        500,
        'products',
        'products not found',
      );
  }

  async getAllByDepartment(req, res, next) {
    const { departmentId } = req.params;
    const { descriptionLength = 200, limit = 20, page = 1 } = req.query;
    const startingPage = (page - 1) * limit;
    const products = await this.repo.getAllByDepartment(departmentId, descriptionLength, limit, startingPage);
    return products.length
      ? handler.sendResponse(res, 200, { products })
      : handler.sendError(
        res,
        'USR_02',
        500,
        'products',
        'products not found',
      );
  }

  async getProductLocation(req, res, next) {
    const { productId } = req.params;
    const location = await this.repo.getProductLocation(productId);
    return location.length
      ? handler.sendResponse(res, 200, location)
      : handler.sendError(
        res,
        'USR_02',
        500,
        'products',
        'products not found',
      );
  }

  async getProductReview(req, res, next) {
    const { productId } = req.params;
    const review = await this.repo.getProductReview(productId);
    return review.length
      ? handler.sendResponse(res, 200, review)
      : handler.sendError(
        res,
        'USR_02',
        500,
        'products',
        'products not found',
      );
  }

  async createProductReview(req, res, next) {
    const { productId } = req.params;
    const { id: customerId } = req.user;
    const { reviewText, rating } = req.body;
    await this.repo.createProductReview(customerId, productId, reviewText, rating);
    handler.sendResponse(res, 200, { message: 'Review added' });
  }
};
