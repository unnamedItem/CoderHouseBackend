import express from 'express';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { __dirname } from './utils.js';
import viewRoutes from './routes/view.router.js';
import configAPI from './config.api.js';
import configSocket from './config.socket.js';

dotenv.config();

const app = express();
const httpServer = app.listen(process.env.PORT, () => console.log(`Server run on port ${process.env.PORT}`));
const socketServer = new Server(httpServer);

mongoose.connect(process.env.DB_STRING, (error) => {
    if (error) {
        console.log("Cannot connect to database: " + error);
        process.exit();
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configAPI(app, socketServer)
configSocket(socketServer)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewRoutes);