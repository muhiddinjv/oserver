import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesModule } from "../roles/roles.module";
import { Role, RolesSchema } from "../roles/role.schema";
import { PermitController } from "./permits.controller";
import { Permit, PermitsSchema } from "./permit.schema";
import { Permitservice } from "./permits.service";


@Module({
    imports: [
      MongooseModule.forFeature([{ name: Permit.name, schema:PermitsSchema }]),
      MongooseModule.forFeature([{ name: Role.name, schema:RolesSchema }]),
],
    controllers: [PermitController],
    providers: [Permitservice,RolesModule],
    exports: [Permitservice],
  })
  export class PermitsModule {}