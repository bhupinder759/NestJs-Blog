import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorArticleRelation1768552128889 implements MigrationInterface {
    name = 'AddAuthorArticleRelation1768552128889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "authorId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorId"`);
    }

}
