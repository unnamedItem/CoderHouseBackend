import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

function configAPI(app, socket) {
    app.use('/api/products/', productRouter(socket));
    app.use('/api/carts/', cartRouter(socket));
}

export default configAPI;