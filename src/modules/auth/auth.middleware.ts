import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization Bearer Token is missing' });
        }

        next();
    }
}