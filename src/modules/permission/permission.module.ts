import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesModule } from "../role/role.module";
import { Role, RolesSchema } from "../role/role.schema";
import { PermissionController } from "./permission.controller";
import { Permission, PermissionsSchema } from "./permission.schema";
import { PermissionService } from "./permission.service";


@Module({
    imports: [
      MongooseModule.forFeature([{ name: Permission.name, schema:PermissionsSchema }]),
      MongooseModule.forFeature([{ name: Role.name, schema:RolesSchema }]),
],
    controllers: [PermissionController],
    providers: [PermissionService,RolesModule],
    exports: [PermissionService],
  })
  export class PermissionsModule {}