import { Controller, Get } from '@nestjs/common';
import {
  AppService,
  UseClassLogger,
  UseValueLogger,
  UseFactoryLogger,
} from './app.service';

@Controller('/user')
export class AppController {
  constructor(
    private appService: AppService,
    private useClassLogger: UseClassLogger,
    private useValueLogger: UseValueLogger,
    private useFactoryLogger: UseFactoryLogger,
  ) {}

  @Get('/hello')
  hello() {
    this.useClassLogger.log('useClassLogger');
    this.useValueLogger.log('useValueLogger');
    this.useFactoryLogger.log('useFactoryLogger');
    return this.appService.hello();
  }
  @Get('/world')
  world() {
    return this.appService.world();
  }
}
