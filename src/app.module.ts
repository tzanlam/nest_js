import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './configs/database.config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './configs/jwt/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(database),
    AccountModule, AuthModule
  ],
})
export class AppModule {}