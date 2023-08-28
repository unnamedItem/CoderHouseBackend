import express from 'express';
import dotenv from 'dotenv';

import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

app.listen(process.env.PORT, () => console.log(`Server run on port ${process.env.PORT}`))