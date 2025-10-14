import { Router } from 'express';
import { ClientController } from './client.controller';

const router = Router();

/**
 * @openapi
 * /clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: List all clients
 *     responses:
 *       200:
 *         description: Array of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/', ClientController.getAll);

/**
 * @openapi
 * /clients/search:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Find a client by national ID (cedula)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cedula:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/search', ClientController.getByDni);

/**
 * @openapi
 * /clients:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Create a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Client created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', ClientController.create);

export default router;
