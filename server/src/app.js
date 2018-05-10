import express from 'express';
import bodyParser from 'body-parser';

import routers from './routes';
import validationErrors from './middleware/validationErrors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/meals', routers.mealRoutes);
app.use('/api/v1/menu', routers.menuRoutes);
app.use('/api/v1/orders', routers.orderRoutes);
app.use('/api/v1/auth', routers.userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome To Book-A-Meal API!!!');
});

app.use(validationErrors);
export default app;
