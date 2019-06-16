module.exports = class CustomerRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async save(name, email, password) {
    const [row] = await this.pool.query(
      `CALL customer_add('${name}','${email}','${password}')`,
    );
    return row[0][0];
  }

  async getById(customerId) {
    const [row] = await this.pool.query(
      `CALL customer_get_customer(${customerId})`,
    );
    return row[0][0];
  }

  async getIdByEmail(email) {
    const [row] = await this.pool.query(
      `CALL customer_get_login_info('${email}')`,
    );
    return row[0][0];
  }

  async updateCustomer(id, name, email, password, dayPhone, evePhone, mobPhone) {
    const row = await this.pool.query(
      `CALL customer_update_account(${id}, '${name}', '${email}', '${password}', '${dayPhone}', '${evePhone}', '${mobPhone}')`,
    );
    return Boolean(row[0].affectedRows > 0);
  }

  async updateCreditCard(id, creditCard) {
    const row = await this.pool.query(
      `CALL customer_update_credit_card(${id}, ${creditCard})`,
    );
    return Boolean(row[0].affectedRows > 0);
  }

  async updateAddress(customerId, address1, address2, city, region, postalCode, country, shippingRegion) {
    const [row] = await this.pool.query(
      `CALL customer_update_address(${customerId}, '${address1}', '${address2}', '${city}', '${region}', '${postalCode}', '${country}', ${shippingRegion})`,
    );
    return row;
  }
};
