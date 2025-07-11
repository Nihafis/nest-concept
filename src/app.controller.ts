import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './users/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  check() {
    return true
  }
}
