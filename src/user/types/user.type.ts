import { UserEntiry } from '@/user/user.entity';

export type IUser = Omit<UserEntiry, 'hashPassword'>;
