import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangedNames1587505053617 implements MigrationInterface {
    name = 'ChangedNames1587505053617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "AppointmentProvider"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "providerId" uuid NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_2428e01f899c4edb909e8798b63" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_2428e01f899c4edb909e8798b63"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "providerId"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "AppointmentProvider" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`, undefined);
    }

}
