const express = require ('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const registerRouter = require('./routes/registerRoutes'); 
const loginRoouter = require('./routes/loginRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const dataRetrivalRouter = require('./routes/dataRetrivalRoutes');
const authenticatedUsersRouter = require('./routes/authenticatedUsersRoutes');
const ethereumBalanceRouter = require('./routes/ethereumBalanceRoutes');
const swaggerJSDoc = require('swagger-jsdoc') ;
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger');

const app = express();
const PORT =3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/register', registerRouter);
app.use('/login', loginRoouter);
app.use('/logout', logoutRouter);
app.use('/dataRetrieve', dataRetrivalRouter);
app.use('/getUserData', authenticatedUsersRouter);
app.use('/balance', ethereumBalanceRouter);

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs',  swaggerUi.setup(swaggerSpec));

app.listen(PORT, ()=> console.log(`Server running on port: http://localhost:${PORT}`));