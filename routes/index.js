const DepartmentController = require('../controllers/DepartmentController');
const CustomerController = require('../controllers/CustomerController');
const OrderController = require('../controllers/OrderController');
const ShippingCartController = require('../controllers/ShippingCartController');
const TaxController = require('../controllers/TaxController');
const CategoriesController = require('../controllers/CategoriesController');
const ShippingController = require('../controllers/ShippingController');
const ProductsController = require('../controllers/ProductsController');

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
  //  Orders
  {
    method: 'post',
    path: '/orders',
    Controller: OrderController,
    action: 'create',
    authenticated: true,
  },
  // Shopping cart
  {
    method: 'get',
    path: '/shoppingcart/generateUniqueId',
    Controller: ShippingCartController,
    action: 'generateUniqueId',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/shoppingcart/add',
    Controller: ShippingCartController,
    action: 'addProductToCart',
    authenticated: false,
  },
  // Taxes
  {
    method: 'get',
    path: '/tax',
    Controller: TaxController,
    action: 'getAll',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/tax/:taxId',
    Controller: TaxController,
    action: 'getOne',
    authenticated: false,
  },
  // categories
  {
    method: 'get',
    path: '/categories',
    Controller: CategoriesController,
    action: 'getAll',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/categories/:categoryId',
    Controller: CategoriesController,
    action: 'getOne',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/categories/inProduct/:productId',
    Controller: CategoriesController,
    action: 'getProductCategory',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/categories/inDepartment/:departmentId',
    Controller: CategoriesController,
    action: 'getDepartmentCategory',
    authenticated: false,
  },
  // Shipping Region
  {
    method: 'get',
    path: '/shipping/regions',
    Controller: ShippingController,
    action: 'getAll',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/shipping/regions/:shippingRegionId',
    Controller: ShippingController,
    action: 'getOne',
    authenticated: false,
  },
  // Products
  {
    method: 'get',
    path: '/products',
    Controller: ProductsController,
    action: 'getAll',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/search',
    Controller: ProductsController,
    action: 'search',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/:productId',
    Controller: ProductsController,
    action: 'getOne',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/inCategory/:categoryId',
    Controller: ProductsController,
    action: 'getAllByCategory',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/inDepartment/:departmentId',
    Controller: ProductsController,
    action: 'getAllByDepartment',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/:productId/details',
    Controller: ProductsController,
    action: 'getOne',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/:productId/location',
    Controller: ProductsController,
    action: 'getProductLocation',
    authenticated: false,
  },
  {
    method: 'get',
    path: '/products/:productId/review',
    Controller: ProductsController,
    action: 'getProductReview',
    authenticated: false,
  },
  {
    method: 'post',
    path: '/products/:productId/review',
    Controller: ProductsController,
    action: 'createProductReview',
    authenticated: true,
  },
];
