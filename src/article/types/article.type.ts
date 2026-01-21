import { ArticleEntity } from '@/article/article.entity';

export type Article = Omit<ArticleEntity, 'updateTimestamp'>;
