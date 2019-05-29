const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

// env config
require('dotenv').config();

// passport
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Routes = require('./routes/index');
const CustomerController = require('./controllers/CustomerController');


const authMiddleware = require('./middleware/authMiddleware');
// instantiate express application
const app = express();

// port
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// logger
app.use(Logger('dev'));

// Routes

Routes.forEach((route) => {
  (app)[route.method](
    route.path,
    route.authenticated ? authMiddleware.verifyMiddleware : authMiddleware.passMiddleware,
    // eslint-disable-next-line consistent-return
    async (req, res, next) => {
      const controller = new route.Controller();
      try {
        const results = await controller[route.action](req, res, next);
        if (results) return res;
      } catch (e) {
        return new Error('Error');
      }
    },
  );
});

// Facebook auth
// TODO
// - Add a way to get email and token
passport.use(new FacebookStrategy({
  clientID: 600017860507700,
  clientSecret: 'c383bbef2c219e01f827ada4771bc4f9',
  callbackURL: 'http://localhost:3001/auth/facebook/callback',
},
((accessToken, refreshToken, profile, done) => {
  console.log(accessToken, profile);
})));
app.get('/customers/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { scope: 'email' }, data => console.log(data, 'data')));

app.listen(port, () => console.log(`Server is running on port ${port}`));
