const pool = require('../pool');
const AttributesRepository = require('../Repository/AttributesRepository');
const handler = require('../helpers/handlers');

module.exports = class AttributesController {
  constructor() {
    this.repo = new AttributesRepository(pool);
  }

  async getAll(req, res, next) {
    const attributes = await this.repo.getAll();
    handler.sendResponse(res, 200, attributes);
  }

  async getOne(req, res, next) {
    const { attributeId } = req.params;
    const attribute = await this.repo.getOne(attributeId);
    handler.sendResponse(res, 200, attribute);
  }

  async getValueFromAttribute(req, res, next) {
    const { attributeId } = req.params;
    const attribute = await this.repo.getValueFromAttribute(attributeId);
    handler.sendResponse(res, 200, attribute);
  }

  async getAttributeForProduct(req, res, next) {
    const { productId } = req.params;
    const attribute = await this.repo.getAttributeForProduct(productId);
    handler.sendResponse(res, 200, attribute);
  }
};
