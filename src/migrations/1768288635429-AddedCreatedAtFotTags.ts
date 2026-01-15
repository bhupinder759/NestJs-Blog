import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedAtFotTags1768288635429 implements MigrationInterface {
  name = 'AddedCreatedAtFotTags1768288635429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
  }
}
