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
    const order = await this.repo.createOrder(cartId, customerId, parseInt(shippingId, 10), parseInt(taxId, 10));
    return order
      ? handler.sendResponse(res, 200, order)
      : handler.sendError(res, 'USR_02', 500, 'order', 'Order not created');
  }

  async getOneOrder(req, res, next) {
    const { orderId } = req.params;
    const order = await this.repo.getOneOrder(orderId);
    return order
      ? handler.sendResponse(res, 200, order)
      : handler.sendError(res, 'USR_02', 500, 'order', 'Order not found');
  }

  async customerOrderById(req, res, next) {
    const { id: customerId } = req.user;
    const orders = await this.repo.getCustomerOrders(customerId);
    return orders
      ? handler.sendResponse(res, 200, orders)
      : handler.sendError(res, 'USR_02', 500, 'order', 'Orders not found');
  }

  async orderShortDetail(req, res, next) {
    const { orderId } = req.params;
    const order = await this.repo.orderShortDetail(orderId);
    return order
      ? handler.sendResponse(res, 200, order)
      : handler.sendError(res, 'USR_02', 500, 'order', 'Order not found');
  }
};
