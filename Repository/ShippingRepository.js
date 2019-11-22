module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll() {
    const [row] = await this.pool.query(
      'SELECT * from shipping_region;',
    );
    return row;
  }

  async getOne(shippingRegionId) {
    const [row] = await this.pool.query(
      `SELECT * from shipping_region WHERE shipping_region_id=${shippingRegionId};`,
    );
    return row;
  }
};
