// order.routes.js
import express from 'express';
import { createOrder, checkPaymentStatus } from './controller/order.controller.js';
import { checkClient } from '../../middleware/checkClient.js'; // Assuming you have this middleware

const orderRoutes = express.Router();

orderRoutes.post('/clients/:clientId/units/:unitId/carts/:cartId', checkClient, createOrder);
orderRoutes.get('/:orderId/payment-status', checkPaymentStatus);

// Add more routes here as needed

export default orderRoutes;