import { Router } from 'express';
import * as service from './product.service';

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
router.get('/', async (req, res) => {
  const products = await service.getAllProducts();
  res.json(products);
});

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
router.get('/:codigo', async (req, res) => {
  const product = await service.getProductByCodigo(req.params.codigo);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

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
router.post('/', async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

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
router.delete('/:codigo', async (req, res) => {
  try {
    const deleted = await service.deleteProduct(req.params.codigo);
    res.json(deleted);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
