import express from 'express';
import bodyParser from 'body-parser';

import mealRoutes from './models/meals.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/meals', mealRoutes);

app.get('/', (req, res) => {
  res.send('Welcome To Book-A-Meal API!!!');
});

export default app;
