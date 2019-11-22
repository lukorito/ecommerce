module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll() {
    const [row] = await this.pool.query(
      'CALL catalog_get_categories()',
    );
    return row[0];
  }

  async getOne(categoryId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_category_details(${categoryId})`,
    );
    return row[0];
  }

  async getProductCategory(productId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_product_locations(${productId})`,
    );
    return row[0];
  }

  async getDepartmentCategory(departmentId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_department_categories(${departmentId})`,
    );
    return row[0];
  }
};
