import { Module } from '@nestjs/common';
import {
  AppService,
  UseClassLogger,
  UseValueLogger,
  UseFactoryLogger,
} from './app.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: UseClassLogger, // 通过类注入
      useClass: UseClassLogger,
    },
    {
      provide: UseValueLogger, // 通过实例注入
      useValue: new UseValueLogger(),
    },
    {
      provide: UseFactoryLogger, // 通过工厂方法注入
      useFactory: () => new UseFactoryLogger(),
    },
  ],
})
export class AppModule {}
