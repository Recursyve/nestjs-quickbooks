import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuickBooksAuthService } from './services/auth.service';
import { ConfigModule } from '../config/config.module';
import { QuickBooksAuthController } from './controllers/auth.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenRefreshService } from './services/token-refresh.service';

@Module({
  imports: [ConfigModule, HttpModule, ScheduleModule.forRoot()],
  controllers: [QuickBooksAuthController],
  providers: [QuickBooksAuthService, TokenRefreshService],
  exports: [QuickBooksAuthService],
})
export class QuickBooksAuthModule {}
