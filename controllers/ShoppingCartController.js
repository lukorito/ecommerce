const pool = require('../pool');
const ShoppingCardRepository = require('../Repository/ShoppingCartRepository');
const handler = require('../helpers/handlers');

module.exports = class OrderController {
  constructor() {
    this.repo = new ShoppingCardRepository(pool);
  }

  async generateUniqueId(req, res, next) {
    const cartId = Math.random().toString(36).substring(7);
    handler.sendResponse(res, 200, { cartId });
  }

  async addProductToCart(req, res, next) {
    const { cartId, productId, attributes } = req.body;
    const product = await this.repo.addProductToCart(cartId, parseInt(productId, 10), attributes);
    handler.sendResponse(res, 200, product);
  }

  async getProductsInCart(req, res, next) {
    const { cartId } = req.params;
    const products = await this.repo.getProductsInCart(cartId);
    handler.sendResponse(res, 200, products);
  }

  async updateCartQuantity(req, res, next) {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const product = await this.repo.updateCartQuantity(itemId, parseInt(quantity, 10));
    handler.sendResponse(res, 200, product);
  }

  async emptyCart(req, res, next) {
    const { cartId } = req.params;
    const emptiedCart = await this.repo.emptyCart(cartId);
    handler.sendResponse(res, 200, emptiedCart);
  }

  async moveToCart(req, res, next) {
    const { itemId } = req.params;
    const product = await this.repo.moveToCart(itemId);
    handler.sendResponse(res, 200, product);
  }

  async totalAmount(req, res, next) {
    const { cartId } = req.params;
    const total = await this.repo.totalAmount(cartId);
    handler.sendResponse(res, 200, total);
  }

  async saveForLater(req, res, next) {
    const { itemId } = req.params;
    const data = await this.repo.saveForLater(itemId);
    handler.sendResponse(res, 200, data);
  }

  async getSaved(req, res, next) {
    const { cartId } = req.params;
    const products = await this.repo.getSaved(cartId);
    handler.sendResponse(res, 200, products);
  }

  async removeProduct(req, res, next) {
    const { itemId } = req.params;
    const data = await this.repo.removeProduct(itemId);
    handler.sendResponse(res, 200, data);
  }
};
