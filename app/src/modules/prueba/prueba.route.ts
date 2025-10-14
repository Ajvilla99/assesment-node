// prueba.route.ts
import { Router } from 'express';
import { getAllPrueba } from './prueba.controller';

const router = Router();

router.get('/', getAllPrueba);

export default router;
