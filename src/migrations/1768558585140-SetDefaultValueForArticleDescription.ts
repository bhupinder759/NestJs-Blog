import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForArticleDescription1768558585140 implements MigrationInterface {
    name = 'SetDefaultValueForArticleDescription1768558585140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`);
    }

}
