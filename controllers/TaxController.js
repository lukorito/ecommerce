const pool = require('../pool');
const TaxRepository = require('../Repository/TaxRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new TaxRepository(pool);
  }

  async getAll(req, res, next) {
    const taxes = await this.repo.getAll();
    handler.sendResponse(res, 200, taxes);
  }

  async getOne(req, res, next) {
    const { taxId } = req.params;
    const tax = await this.repo.getOne(taxId);
    handler.sendResponse(res, 200, tax);
  }
};
