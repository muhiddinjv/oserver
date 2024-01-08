import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "./roles.controller";
import { Role, RolesSchema } from "./role.schema";
import { RolesService } from "./roles.service";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Role.name, schema:RolesSchema }]),
],
    controllers: [RoleController],
    providers: [RolesService],
    exports: [RolesService],
  })
  export class RolesModule {}