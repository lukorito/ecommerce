module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll() {
    const [row] = await this.pool.query(
      'SELECT * from tax;',
    );
    return row;
  }

  async getOne(taxId) {
    const [row] = await this.pool.query(
      `SELECT * from tax WHERE tax_id=${taxId};`,
    );
    return row;
  }
};
