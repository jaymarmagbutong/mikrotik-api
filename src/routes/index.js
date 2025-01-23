import { Router } from 'express';
import MikroTik from './mikrotik.js'; // Ensure storage.js exists in the same directory


const router = Router();

router.use('/mikrotik', MikroTik);



export default router;