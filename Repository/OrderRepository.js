module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * gets all departments
   */
  async createOrder(cartId, customerId, shippingId, taxId) {
    console.log(cartId, customerId, shippingId, taxId)
    const row = await this.pool.query(
      `CALL shopping_cart_create_order('${cartId}', ${customerId}, ${shippingId}, ${taxId})`,
    );
    return row[0];
  }

  async getOneDepartment(departmentId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_department_details(${departmentId})`,
    );
    return row[0][0];
  }
};
