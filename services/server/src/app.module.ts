import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CspService } from './csp/csp.service';
import { SenerioGeneratorService } from './senerio-generator/senerio-generator.service';
import { ScenarioGeneratorService } from './scenario-generator/scenario-generator.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CspService, SenerioGeneratorService, ScenarioGeneratorService],
})
export class AppModule {}
