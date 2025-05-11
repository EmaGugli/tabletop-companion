import { Router } from 'express';
import userRoutes from './userRoutes';
import characterRoutes from './characterRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/characters', characterRoutes);

export default router; 