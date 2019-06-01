const pool = require('../pool');
const ShippingCardRepository = require('../Repository/ShippingCartRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new ShippingCardRepository(pool);
  }

  async generateUniqueId(req, res, next) {
    const cardId = Math.random().toString(36).substring(7);
    handler.sendResponse(res, 200, { cardId });
  }

  async addProductToCart(req, res, next){
    const { cartId, productId, attributes} = req.body;
  }
};
