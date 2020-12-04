import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Sample Healt route called');

    return res.status(200).json({
        message: 'pong'
    });

    next();
};

export default { sampleHealthCheck };
