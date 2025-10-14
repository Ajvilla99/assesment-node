import { Router } from 'express';
import { WarehouseController } from './warehouse.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';



const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Bodega Central
 *         isActive:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
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
router.post('/', authenticateJWT, authorizeRoles('admin'), WarehouseController.create);

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
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Warehouse status updated
 *       404:
 *         description: Warehouse not found
 */
router.patch('/:id/status', authenticateJWT, authorizeRoles('admin'), WarehouseController.setStatus);

export default router;
