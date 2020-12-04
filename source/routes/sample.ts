import express from 'express';
import controllers from '../controllers/sample';
const router = express.Router();

router.get('/ping', controllers.sampleHealthCheck);

export = router;
