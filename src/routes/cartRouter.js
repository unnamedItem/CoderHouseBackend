import { Router } from "express";

import { CartManager } from "../CartManager.js";

const cartRouter = Router();
const cartManager = new CartManager('./src/data/carts.json');

cartRouter.post('/', (req, res) => {
    try {
        res.send(cartManager.createCart());
    } catch (err) {
        res.status(500).send(err);
    }
})

cartRouter.get('/', (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let carts = cartManager.getCartsList();
        res.send(limit ? carts.slice(0, limit) : carts);
    } catch (err) {
        res.status(500).send(err);
    }
})

cartRouter.get('/:cid', (req, res) => {
    try {
        let id = req.params.cid;
        res.send(cartManager.getCartById(id));
    } catch (err) {
        res.status(500).send(err);
    }
})

cartRouter.post('/:cid/product/:pid', (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        res.send(cartManager.addProduct(cid, pid));
    } catch (err) {
        res.status(500).send(err);
    }
})

cartRouter.delete('/:cid', (req, res) => {
    try {
        let id = req.params.cid;
        res.send(cartManager.deleteCart(id));
    } catch (err) {
        res.status(500).send(err);
    }
})

export default cartRouter;