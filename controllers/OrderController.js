const pool = require('../pool');
const OrderRepository = require('../Repository/OrderRepository');

module.exports = class OrderController {
  constructor() {
    this.repo = new OrderRepository(pool);
  }

  async create(req, res, next) {
    console.log(req.user);
    const { cartId, shippingId, taxId } = req.body;
    const { id } = req.user;
    try {
      const order = await this.repo.addNewOrder(cartId, id, shippingId, taxId);
      console.log(order);
    } catch (e) {
      console.log(e);
    }
  }
};
