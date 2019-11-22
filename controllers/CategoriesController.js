const pool = require('../pool');
const CategoriesRepository = require('../Repository/CategoriesRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new CategoriesRepository(pool);
  }

  async getAll(req, res, next) {
    const categories = await this.repo.getAll();
    handler.sendResponse(res, 200, categories);
  }

  async getOne(req, res, next) {
    const { categoryId } = req.params;
    const category = await this.repo.getOne(categoryId);
    handler.sendResponse(res, 200, category);
  }

  async getProductCategory(req, res, next) {
    const { productId } = req.params;
    const category = await this.repo.getProductCategory(productId);
    handler.sendResponse(res, 200, category);
  }

  async getDepartmentCategory(req, res, next) {
    const { departmentId } = req.params;
    const category = await this.repo.getDepartmentCategory(departmentId);
    handler.sendResponse(res, 200, category);
  }
};
