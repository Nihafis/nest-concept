import { Injectable } from '@nestjs/common';
import { DummyService } from './dummy/dummy.service';
import { LoggerService } from './logger/logger.service';
import { AppConfig } from './config/app.config';
import { TypeConfigService } from './config/typed-config.service';

@Injectable()
export class AppService {
  constructor(
    private readonly dummyService: DummyService, // Assuming DummyService is imported correctly 
    private readonly loggerService: LoggerService, // Assuming LoggerService is imported correctly
    private readonly configService: TypeConfigService // Assuming ConfigService is imported correctly
  ) { }
  getHello(): string {
    const prefix = this.configService.get<AppConfig>('app')?.messagePrefix;
    return this.loggerService.log(`${prefix}` + this.dummyService.work());
  }
}
