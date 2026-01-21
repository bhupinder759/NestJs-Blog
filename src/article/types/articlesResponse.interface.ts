import { Article } from '@/article/types/article.type';

export interface IArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
