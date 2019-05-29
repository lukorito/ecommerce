const DepartmentController = require('../controllers/DepartmentController');
const CustomerController = require('../controllers/CustomerController');

module.exports = [
  // Departments
  {
    method: 'get',
    path: '/departments',
    Controller: DepartmentController,
    action: 'getAll',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/departments/:department_id',
    Controller: DepartmentController,
    action: 'getOne',
    authenticated: false,
  },
  // Customers
  {
    method: 'post',
    path: '/customers',
    Controller: CustomerController,
    action: 'signUp',
    authenticated: false,
  },
  {
    method: 'post',
    path: '/customers/login',
    Controller: CustomerController,
    action: 'login',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/customer',
    Controller: CustomerController,
    action: 'getById',
    authenticated: true,
  },
  {
    method: 'put',
    path: '/customer',
    Controller: CustomerController,
    action: 'update',
    authenticated: true,
  },
  {
    method: 'put',
    path: '/customers/creditCard',
    Controller: CustomerController,
    action: 'updateCreditCard',
    authenticated: true,
  },

];
