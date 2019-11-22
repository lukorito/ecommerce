const pool = require('../pool');
const ShippingRepository = require('../Repository/ShippingRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new ShippingRepository(pool);
  }

  async getAll(req, res, next) {
    const shippingRegions = await this.repo.getAll();
    handler.sendResponse(res, 200, shippingRegions);
  }

  async getOne(req, res, next) {
    const { shippingRegionId } = req.params;
    const shippingRegion = await this.repo.getOne(shippingRegionId);
    handler.sendResponse(res, 200, shippingRegion);
  }
};
