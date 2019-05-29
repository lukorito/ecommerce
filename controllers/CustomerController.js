const validator = require('validator');
const jwt = require('jsonwebtoken');
const pool = require('../pool');
const CustomerRepository = require('../Repository/CustomerRepository');
const handler = require('../helpers/handlers');
const passwords = require('../helpers/passwords');


module.exports = class CustomerController {
  constructor() {
    this.repo = new CustomerRepository(pool);
  }

  async signUp(req, res, next) {
    const name = req.body.name.trim();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const errors = [];
    if (!validator.isAlpha(name)) {
      errors.push({
        code: 'USR_02',
        message: 'The field(s) are/is required',
        field: 'name',
      });
    }
    if (!validator.isEmail(email)) {
      errors.push({
        code: 'USR_03',
        message: 'The email is invalid.',
        field: 'email',
      });
    }
    if (!password) {
      errors.push({
        code: 'USR_01',
        message: 'Email or Password is invalid.',
        field: 'password',
      });
    }
    const isUser = await this.repo.getIdByEmail(email);
    if (isUser) {
      errors.push({
        code: 'USR_04',
        message: 'The email already exists',
        field: 'email',
      });
    }
    if (errors.length > 0) {
      handler.sendErrors(res, 400, errors);
    } else {
      try {
        let customerId;
        const hashedPass = await passwords.hashPassword(password);
        const user = await this.repo.save(name, email, hashedPass);
        Object.keys(user).forEach((key) => {
          customerId = user[key];
        });
        const newUser = await this.repo.getById(customerId);
        handler.sendResponse(res, 201, { customer: newUser });
      } catch (error) {
        throw error;
      }
    }
  }

  async login(req, res, next) {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const errors = [];
    const { SECRET_KEY, JWT_EXPIRY } = process.env;

    if (!email || !password) {
      errors.push({
        code: 'USR_01',
        message: 'Email or Password is invalid.',
        field: 'email',
      });
    }
    if (!validator.isEmail(email)) {
      errors.push({
        code: 'USR_03',
        message: 'The email is invalid.',
        field: 'email',
      });
    }
    // check if user exists
    const isUser = await this.repo.getIdByEmail(email);
    if (!isUser) {
      errors.push({
        code: 'USR_05',
        message: 'The email doesn\'t exist',
        field: 'email',
      });
    } else {
      // check if password match
      const passMatch = await passwords.checkIfPasswordsMatch(password, isUser.password);
      if (passMatch) {
        const token = jwt.sign({ id: isUser.customer_id }, SECRET_KEY, { expiresIn: JWT_EXPIRY });
        const data = {
          id: isUser.customer_id,
          accessToken: token,
          expiresIn: JWT_EXPIRY,
        };
        handler.sendResponse(res, 200, data);
      } else {
        errors.push({
          code: 'USR_01',
          message: 'Email or Password is invalid.',
          field: 'email',
        });
      }
    }
    if (errors.length > 0) {
      handler.sendErrors(res, 400, errors);
    }
  }

  async getById(req, res, next) {
    const { id } = req.user;
    const user = await this.repo.getById(id);
    handler.sendResponse(res, 200, { customer: user });
  }

  async update(req, res, next) {
    const { id } = req.user;
    const user = await this.repo.getById(id);
    const { body } = req;
    const updateUser = {};
    // check validations
    Object.keys(body).forEach((item) => {
      if (body[item].trim()) {
        updateUser[item] = body[item];
      }
    });
    if (updateUser.password) {
      const passMatch = await passwords.checkIfPasswordsMatch(updateUser.password, user.password);
      if (passMatch) {
        updateUser.password = user.password;
      } else {
        updateUser.password = await passwords.hashPassword(updateUser.password);
      }
    }
    Object.keys(user).forEach((item) => {
      if (!updateUser[item]) {
        updateUser[item] = user[item];
      }
    });
    try {
      const updated = await this.repo.updateCustomer(
        updateUser.customer_id,
        updateUser.name,
        updateUser.email,
        updateUser.password,
        updateUser.day_phone,
        updateUser.eve_phone,
        updateUser.mob_phone,
      );
      if (updated) {
        handler.sendResponse(res, 200, { customer: updateUser });
      } else {
        handler.sendResponse(res, 500, { error: 'An error occurred!!' });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async updateCreditCard(req, res, next) {
    const { creditCard } = req.body;
    if (validator.isCreditCard(creditCard)) {
      try {
        const update = await this.repo.updateCreditCard(13, creditCard);
        if (update) {
          handler.sendResponse(res, 200, { message: 'Update successful' });
        } else {
          handler.sendError(res, 'USR_08', 400, 'creditCard', 'this is an invalid Credit Card');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      handler.sendError(res, 'USR_08', 400, 'creditCard', 'this is an invalid Credit Card');
    }
  }
};
