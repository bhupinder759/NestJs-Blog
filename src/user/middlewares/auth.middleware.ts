import { AuthRequest } from '@/types/expressRequest.interface';
import { UserService } from '@/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction } from 'express';
import { UserEntiry } from '@/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = new UserEntiry();
      next();
      return;
    }

    const token = (req.headers['authorization'] as string).split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decode.id);

      req.user = user;
      next();
    } catch (err) {
      req.user = new UserEntiry();
      console.log('Auth middleware error', err);
      next();
    }
  }
}
