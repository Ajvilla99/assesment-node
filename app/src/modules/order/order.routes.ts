import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for managing delivery orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clientId:
 *           type: integer
 *           example: 2
 *         warehouseId:
 *           type: integer
 *           example: 3
 *         status:
 *           type: string
 *           enum: [pending, in_transit, delivered]
 *           example: pending
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         orderId:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 5
 *         quantity:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: List all orders with their items
 *     description: Retrieve a list of all orders, including their associated items.
 *     responses:
 *       200:
 *         description: Array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', OrderController.getAll);

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Create a new delivery order. The order must include a valid client, warehouse, and at least one product with available stock.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 2
 *               warehouseId:
 *                 type: integer
 *                 example: 3
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 5
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error (e.g. insufficient stock, invalid client/warehouse/product)
 */
router.post('/', OrderController.create);

/**
 * @swagger
 * /orders/status:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update order status
 *     description: Update the status of an existing order. Allowed statuses: pending, in_transit, delivered.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [pending, in_transit, delivered]
 *                 example: in_transit
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.patch('/status', OrderController.updateStatus);

/**
 * @swagger
 * /orders/client/{clientId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order history for a client
 *     description: Retrieve all orders associated with a specific client.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the client
 *     responses:
 *       200:
 *         description: Orders for the client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Client not found
 */
router.get('/client/:clientId', OrderController.getByClient);

export default router;
