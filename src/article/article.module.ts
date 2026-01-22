import { ArticleController } from '@/article/article.controller';
import { ArticleEntity } from '@/article/article.entity';
import { ArticleService } from '@/article/article.service';
import { FollowEntity } from '@/profile/follow.entity';
import { UserEntiry } from '@/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntiry, FollowEntity]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
