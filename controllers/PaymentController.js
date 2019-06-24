const handler = require('../helpers/handlers');

const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe');

module.exports = class PaymentController {
  constructor() {
    this.stripe = stripe(STRIPE_SECRET_KEY);
  }

  async makeCharge(req, res, next) {
    const {
      stripeToken, orderId, description, amount,
    } = req.body;
    const total = parseInt(amount, 10) * 100;
    const response = await this.stripe.charges.create({
      source: stripeToken,
      amount: total,
      description,
      currency: 'usd',
      metadata: { orderId },
    });
    handler.sendResponse(res, 200, response);
  }
};
