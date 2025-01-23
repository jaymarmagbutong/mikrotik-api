import { Router } from "express";

import { getInterfaces } from "../controllers/interfaceController.js";
import { getSystemIdentity } from '../controllers/systemController.js';

import { getPppoeClients, disablePppoeSecrets, getPppoeActive } from "../controllers/pppController.js";

const router = Router();

router.get("/interfaces", getInterfaces);
router.get('/system-identity', getSystemIdentity);


// PPPOE
router.get('/pppoe-clients', getPppoeClients);
router.get('/pppoe-active-clients', getPppoeActive);
router.post('/pppoe-client-disable', disablePppoeSecrets);


getPppoeActive


export default router;