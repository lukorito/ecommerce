module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async addProductToCart(cartId, productId, attributes) {
    try {
      const [row] = await this.pool.query(
        `CALL shopping_cart_add_product('${cartId}', ${productId}, '${attributes}')`,
      );
      return row;
    } catch (e) {
      throw e;
    }
  }

  async getProductsInCart(cartId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_get_products('${cartId}')`,
    );
    return row[0];
  }

  async updateCartQuantity(itemId, quantity) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_update('${itemId}', ${quantity})`,
    );
    return row[0];
  }

  async emptyCart(cartId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_empty('${cartId}')`,
    );
    return row.affectedRows;
  }

  async moveToCart(itemId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_move_product_to_cart('${itemId}')`,
    );
    return row.affectedRows;
  }

  async totalAmount(cartId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_get_total_amount('${cartId}')`,
    );
    return row[0][0];
  }

  async saveForLater(itemId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_save_product_for_later('${itemId}')`,
    );
    return row.affectedRows;
  }

  async getSaved(cartId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_get_saved_products('${cartId}')`,
    );
    return row[0][0];
  }

  async removeProduct(itemId) {
    const [row] = await this.pool.query(
      `CALL shopping_cart_remove_product('${itemId}')`,
    );
    return row.affectedRows;
  }
};
