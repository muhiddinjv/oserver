import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})

export class AuthModule {}