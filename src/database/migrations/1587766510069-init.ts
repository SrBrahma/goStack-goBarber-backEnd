import {MigrationInterface, QueryRunner} from "typeorm";

export class init1587766510069 implements MigrationInterface {
    name = 'init1587766510069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatarPath" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "providerId" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_2428e01f899c4edb909e8798b63" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_2428e01f899c4edb909e8798b63"`, undefined);
        await queryRunner.query(`DROP TABLE "appointments"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
