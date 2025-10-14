import { Router } from 'express';
import { WarehouseController } from './warehouse.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';



const router = Router();

/**
 * @swagger
 * /warehouses:
 *   get:
 *     tags:
 *       - Warehouses
 *     summary: List all warehouses
 *     responses:
 *       200:
 *         description: Array of warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 */
router.get('/', authenticateJWT, authorizeRoles('admin', 'analyst'), WarehouseController.getAll);

/**
 * @swagger
 * /warehouses:
 *   post:
 *     tags:
 *       - Warehouses
 *     summary: Create a new warehouse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       201:
 *         description: Warehouse created
 *       400:
 *         description: Validation error
 */
router.post('/', WarehouseController.create);

/**
 * @swagger
 * /warehouses/status:
 *   patch:
 *     tags:
 *       - Warehouses
 *     summary: Activate or deactivate a warehouse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               activa:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Warehouse status updated
 *       404:
 *         description: Warehouse not found
 */
router.patch('/:id/status', authenticateJWT, authorizeRoles('admin'), WarehouseController.setStatus);

export default router;
