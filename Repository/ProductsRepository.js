module.exports = class ProductsRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll(descriptionLength, limit, page) {
    const [row] = await this.pool.query(
      `SELECT product_id, name,
        IF(LENGTH(description) <= ${descriptionLength},
                         description,
                         CONCAT(LEFT(description, ${descriptionLength}),
                                '...')) AS description
        FROM product
        ORDER BY product_id
        LIMIT ${page}, ${limit};`,
    );
    return row;
  }

  async search(queryString, allWords, descriptionLength, limit, page) {
    if (allWords === 'on') {
      const [row] = await this.pool.query(
        `SELECT product_id, name,
        IF(LENGTH(description) <= ${descriptionLength},
                         description,
                         CONCAT(LEFT(description, ${descriptionLength}),
                                '...')) AS description
        FROM product
        WHERE MATCH (name, description) AGAINST ('${queryString}' IN BOOLEAN MODE)
        ORDER BY product_id
        LIMIT ${page}, ${limit};`,
      );
      return row;
    }
    const [row] = await this.pool.query(
      `SELECT product_id, name,
        IF(LENGTH(description) <= ${descriptionLength},
                         description,
                         CONCAT(LEFT(description, ${descriptionLength}),
                                '...')) AS description
        FROM product
        WHERE MATCH (name, description) AGAINST ('${queryString}')
        ORDER BY product_id
        LIMIT ${page}, ${limit};`,
    );
    return row;
  }

  async getOne(productId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_product_details(${productId})`,
    );
    return row[0];
  }

  async getAllByCategory(categoryId, descriptionLength, limit, page) {
    const [row] = await this.pool.query(
      `SELECT product.product_id, name,
        IF(LENGTH(description) <= ${descriptionLength},
                         description,
                         CONCAT(LEFT(description, ${descriptionLength}),
                                '...')) AS description,
                         product.price, product.discounted_price, p.thumbnail
        FROM product
        INNER JOIN product_category ON
        product.product_id = product_category.product_id
        WHERE product_category.category_id = ${categoryId}
        ORDER BY product_id
        LIMIT ${page}, ${limit};`,
    );
    return row;
  }

  async getAllByDepartment(departmentId, descriptionLength, limit, page) {
    const [row] = await this.pool.query(
      `SELECT DISTINCT product.product_id, product.name,
        IF(LENGTH(product.description) <= ${descriptionLength},
                         product.description,
                         CONCAT(LEFT(product.description, ${descriptionLength}),
                                '...')) AS description, product.price, product.discounted_price, product.thumbnail
        FROM product
        INNER JOIN product_category ON product.product_id = product_category.product_id
        INNER JOIN category ON product_category.category_id = category.category_id
        WHERE category.department_id = ${departmentId}
        ORDER BY product.product_id
        LIMIT ${page}, ${limit};`,
    );
    return row;
  }

  async getProductLocation(productId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_product_locations(${productId})`,
    );
    return row[0];
  }

  async getProductReview(productId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_product_reviews(${productId})`,
    );
    return row[0];
  }

  async createProductReview(customerId, productId, reviewText, rating) {
    const row = await this.pool.query(
      `CALL catalog_create_product_review(${customerId}, ${productId}, '${reviewText}', ${rating})`,
    );
    return row[0];
  }
};
