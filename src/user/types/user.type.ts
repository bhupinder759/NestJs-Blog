import { UserEntiry } from '@/user/user.entity';

export type UserType = Omit<UserEntiry, 'hashPassword'>;
