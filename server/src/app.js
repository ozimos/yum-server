import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';
import routers from './routes';
import validationErrors from './middleware/validationErrors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/meals', routers.mealRouter);
app.use('/api/v1/menu', routers.menuRouter);
app.use('/api/v1/orders', routers.orderRouter);
app.use('/api/v1/auth', routers.authRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome To Book-A-Meal API!!!');
});

app.use(validationErrors);
export default app;
