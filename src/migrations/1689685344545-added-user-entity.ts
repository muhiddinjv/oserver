import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1689685344545 implements MigrationInterface {
    name = 'AddedUserEntity1689685344545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "businessname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "region" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ClientsGroup" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Clients" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "ShopType" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Categories" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Brands" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "ProductGroup" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "PriceType" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "ProductPrice" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Units" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Shops" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Warehouse" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "ProductWarehouse" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Permissions" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "firstname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Regions" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "Districts" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Districts" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Regions" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Address" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "firstname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Permissions" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "ProductWarehouse" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Warehouse" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Shops" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Products" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Units" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "ProductPrice" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "PriceType" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "ProductGroup" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Brands" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Categories" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "ShopType" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Clients" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "ClientsGroup" ALTER COLUMN "createdAt" SET DEFAULT '2023-06-03 12:49:38.749723'`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "businessname"`);
    }

}
