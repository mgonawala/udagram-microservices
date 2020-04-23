"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderAccess_1 = require("../dataLayer/OrderAccess");
const Order_1 = require("../models/Order");
const OrderItem_1 = require("../models/OrderItem");
const router = express_1.Router();
const orderAccess = new OrderAccess_1.OrderAccess();
function requireAuth(req, res, next) {
    //  return next();
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length != 2) {
        return res.status(401).send({ message: 'Malformed token.' });
    }
    const token = token_bearer[1];
}
exports.requireAuth = requireAuth;
// get all orders
router.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    console.log('Get all prders.');
    const items = yield orderAccess.getAllOrders();
    response.status(200).send({
        items: items
    });
}));
// Retrieve all orders of a buyer
router.get('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    let { id } = request.params;
    console.log('Id:', id);
    const item = yield orderAccess.getAllOrdersByBuyerId(id);
    if (item)
        response.status(200).send(item);
    else
        response.status(404).send({
            message: 'Product with given Id not found.'
        });
}));
// Create a new Order Item
router.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const createOrderRequest = request.body;
    console.log(JSON.stringify(createOrderRequest));
    // Validate Request parameters
    if (!createOrderRequest.buyerId) {
        return response.status(400).send({
            message: 'Buyer ID is a required field'
        });
    }
    if (!createOrderRequest.address) {
        return response.status(400).send({
            message: 'Address is a required field'
        });
    }
    if (!createOrderRequest.products) {
        return response.status(400).send({
            message: 'Please provide product details'
        });
    }
    let total = 0;
    createOrderRequest.products.forEach((product) => {
        let price = product.quantity * product.price;
        total = price + total;
    });
    const order = yield Order_1.Order.create({
        buyer_id: createOrderRequest.buyerId,
        address: createOrderRequest.address,
        status: 'NEW',
        total: total,
        products: createOrderRequest.products
    }, {
        include: [OrderItem_1.OrderItem]
    });
    response.status(201).send({
        order
    });
}));
exports.OrderRouter = router;
//# sourceMappingURL=order.router.js.map