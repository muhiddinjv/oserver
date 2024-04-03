import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, JwtService],
  exports: [TypeOrmModule]
})
export class GoogleModule {}