import {Module} from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalFile } from "./local.file.entity";
import { UploadsController } from "./uploads.controller";
import { LocalFileService } from "./local.file.service";
import { ConfigService } from "@nestjs/config";
 
@Module({
    imports: [
        TypeOrmModule.forFeature([LocalFile]),
    ],
    controllers: [UploadsController],
    providers: [LocalFileService, ConfigService],
    exports: [LocalFileService]
})
export class LocalFileModule {}
