import { Router } from 'express';
import * as service from './product.service';
import { ProductController } from './product.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: P001
 *         name:
 *           type: string
 *           example: Box
 *         description:
 *           type: string
 *           example: Cardboard box
 *         stock:
 *           type: integer
 *           example: 100
 *         isDeleted:
 *           type: boolean
 *           example: false
 *       required:
 *         - code
 *         - name
 *         - description
 *         - stock
 *     CreateProduct:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: P011
 *         name:
 *           type: string
 *           example: New Product
 *         description:
 *           type: string
 *           example: Product description
 *         stock:
 *           type: integer
 *           example: 10
 *       required:
 *         - code
 *         - name
 *         - description
 *         - stock
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
 * @swagger
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
router.get('/:code', authenticateJWT, authorizeRoles('admin', 'analyst'), ProductController.getByCode);
/**
 * @swagger
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
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: P011
 *               name:
 *                 type: string
 *                 example: New Product
 *               description:
 *                 type: string
 *                 example: Product description
 *               stock:
 *                 type: integer
 *                 example: 10
 *             required:
 *               - code
 *               - name
 *               - description
 *               - stock
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 */
router.post('/', authenticateJWT, authorizeRoles('admin'), ProductController.create);

/**
 * @swagger
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
router.delete('/:code', authenticateJWT, authorizeRoles('admin'), ProductController.delete);

export default router;
