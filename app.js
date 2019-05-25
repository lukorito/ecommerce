const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


//env config
require('dotenv').config();

const config = require('./config.js');
const departmentRepo = require('./controllers/DepartmentController')

//instantiate express application
const app = express();

//port
const port = process.env.PORT || 3001;

//middlewares
app.use(bodyParser.json())

// api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//logger
app.use(Logger('dev'));



// test endpoint
app.get('/',  (req, res) => {
    // const data = await departmentRepo.getAllDepartments()
    // res.send(data)
});

app.listen(port, () => console.log(`Server is running on port ${port}`))