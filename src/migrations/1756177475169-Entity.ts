import { MigrationInterface, QueryRunner } from "typeorm";

export class Entity1756177475169 implements MigrationInterface {
    name = 'Entity1756177475169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_group" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "PK_user" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "street" character varying(200) NOT NULL, "number" character varying(50), "complement" character varying(150), "neighborhood" character varying(100), "city" character varying(100), "state" character varying(50), "zip_code" character varying(20), "country" character varying(100), "coordinates" json, CONSTRAINT "PK_address" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_zip_code" ON "addresses" ("zip_code") `);
        await queryRunner.query(`CREATE TABLE "persons" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying NOT NULL, "email" character varying NOT NULL, "type" "public"."PersonTypeEnum" NOT NULL DEFAULT 'individual', "user_id" integer NOT NULL, CONSTRAINT "UQ_person_cpf" UNIQUE ("cpf"), CONSTRAINT "UQ_person_email" UNIQUE ("email"), CONSTRAINT "PK_person_user_id" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "person_address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "person_id" integer NOT NULL, "address_id" integer NOT NULL, CONSTRAINT "PK_person_address" PRIMARY KEY ("person_id", "address_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_user_group_id" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persons" ADD CONSTRAINT "FK_person_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_address" ADD CONSTRAINT "FK_person_address_person_id" FOREIGN KEY ("person_id") REFERENCES "persons"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_address" ADD CONSTRAINT "FK_person_address_address_id" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person_address" DROP CONSTRAINT "FK_person_address_address_id"`);
        await queryRunner.query(`ALTER TABLE "person_address" DROP CONSTRAINT "FK_person_address_person_id"`);
        await queryRunner.query(`ALTER TABLE "persons" DROP CONSTRAINT "FK_person_user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_user_group_id"`);
        await queryRunner.query(`DROP TABLE "person_address"`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_zip_code"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
