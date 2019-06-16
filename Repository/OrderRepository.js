module.exports = class OrderRepository {
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * gets all departments
   */
  async createOrder(cartId, customerId, shippingId, taxId) {
    console.log(cartId, customerId, shippingId, taxId);
    const row = await this.pool.query(
      `CALL shopping_cart_create_order('${cartId}', ${customerId}, ${shippingId}, ${taxId})`,
    );
    return row[0][0];
  }

  async getOneOrder(orderId) {
    const [row] = await this.pool.query(
      `CALL orders_get_order_details(${orderId})`,
    );
    return row[0][0];
  }

  async getCustomerOrders(customerId) {
    const [row] = await this.pool.query(
      `CALL orders_get_by_customer_id(${customerId})`,
    );
    return row[0];
  }

  async orderShortDetail(orderId) {
    const [row] = await this.pool.query(
      `CALL orders_get_order_short_details(${orderId})`,
    );
    return row[0];
  }
};
