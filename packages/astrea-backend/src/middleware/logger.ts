import type {Request, Response, NextFunction} from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.originalUrl} - Request received`);

    res.on("finish", () => {
        console.log(`${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });

    next();
};

export default logger;
