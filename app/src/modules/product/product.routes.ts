import { Router } from 'express';
import * as service from './product.service';
import { ProductController } from './product.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: List all products
 *     responses:
 *       200:
 *         description: Array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', authenticateJWT, authorizeRoles('admin', 'analyst'), ProductController.getAll);

/**
 * @openapi
 * /products/{code}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:codigo', authenticateJWT, authorizeRoles('admin', 'analyst'), ProductController.getByCode);

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 */
router.post('/', ProductController.create);

/**
 * @openapi
 * /products/{code}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Logical delete of a product
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product marked as deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:codigo', authenticateJWT, authorizeRoles('admin'), ProductController.delete);

export default router;
