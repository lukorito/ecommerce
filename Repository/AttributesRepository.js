module.exports = class AttributesRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll() {
    const [row] = await this.pool.query(
      'CALL catalog_get_attributes()',
    );
    return row[0];
  }

  async getOne(attributeId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_attribute_details(${attributeId})`,
    );
    return row[0];
  }

  async getValueFromAttribute(attributeId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_attribute_values(${attributeId})`,
    );
    return row[0];
  }

  async getAttributeForProduct(productId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_product_attributes(${productId})`,
    );
    return row[0];
  }
};
