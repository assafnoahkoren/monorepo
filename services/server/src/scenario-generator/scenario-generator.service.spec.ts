import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioGeneratorService } from './scenario-generator.service';

describe('ScenarioGeneratorService', () => {
  let service: ScenarioGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScenarioGeneratorService],
    }).compile();

    service = module.get<ScenarioGeneratorService>(ScenarioGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
