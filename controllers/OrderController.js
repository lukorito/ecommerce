const pool = require('../pool');
const OrderRepository = require('../Repository/OrderRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new OrderRepository(pool);
  }

  async createOrder(req, res, next) {
    const { cartId, shippingId, taxId } = req.body;
    const { id: customerId } = req.user;
    const order = await this.repo.createOrder(cartId, customerId, shippingId, taxId)
    return order ?
      handler.sendResponse(res, 200, order)
      : handler.sendError()
  }

};
