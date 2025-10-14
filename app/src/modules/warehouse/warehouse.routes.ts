import { Router } from 'express';
import * as service from './warehouse.service';

const router = Router();

/**
 * @openapi
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
router.get('/', async (req, res) => {
  const warehouses = await service.getAllWarehouses();
  res.json(warehouses);
});

/**
 * @openapi
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
router.post('/', async (req, res) => {
  try {
    const warehouse = await service.createWarehouse(req.body);
    res.status(201).json(warehouse);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @openapi
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
router.patch('/status', async (req, res) => {
  try {
    const updated = await service.setWarehouseStatus(req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
