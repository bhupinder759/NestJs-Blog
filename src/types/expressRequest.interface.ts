import { UserEntiry } from '@/user/user.entity';
import { Request } from '@nestjs/common';

export interface AuthRequest extends Request {
  user: UserEntiry;
}
