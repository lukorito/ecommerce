const handler = require('../helpers/handlers');

const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe');

module.exports = class PaymentController {
  constructor() {
    this.stripe = stripe(STRIPE_SECRET_KEY);
  }
  async makeCharge(req, res, next) {
  //  To be handled together with frontend
  }
};
