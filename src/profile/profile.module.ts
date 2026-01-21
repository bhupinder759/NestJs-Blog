import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntiry } from '@/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntiry])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
