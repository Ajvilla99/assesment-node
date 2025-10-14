import { Router } from 'express';
import { ClientController } from './client.controller';
import { checkUniqueDni } from '../../middlewares/clientUniqueDni.middleware';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dni:
 *           type: string
 *           example: "12345678"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@example.com"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Client already exists"
 */

/**
 * @swagger
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
router.get('/', authenticateJWT, authorizeRoles('admin', 'analyst'), ClientController.getAll);

/**
 * @swagger
 * /clients/search:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Find a client by national ID (dni)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
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
router.post('/search', authenticateJWT, authorizeRoles('admin', 'analyst'), ClientController.getByDni);

/**
 * @swagger
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
router.post('/', authenticateJWT, authorizeRoles('admin'), checkUniqueDni, ClientController.create);

export default router;
