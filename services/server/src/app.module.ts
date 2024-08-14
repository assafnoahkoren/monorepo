import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CspService } from './csp/csp.service';
import { ScenarioGeneratorService } from './scenario-generator/scenario-generator.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CspService, ScenarioGeneratorService],
})
export class AppModule {}
