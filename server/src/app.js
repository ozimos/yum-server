import express from 'express';
import bodyParser from 'body-parser';

import routers from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/meals', routers.mealRoutes);
app.use('/api/v1/menu', routers.menuRoutes);
app.use('/api/v1/orders', routers.orderRoutes);
app.use('/api/v1/users', routers.userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome To Book-A-Meal API!!!');
});

export default app;
