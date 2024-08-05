import { Test, TestingModule } from '@nestjs/testing';
import { CspService } from './csp.service';

describe('CspService', () => {
  let service: CspService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CspService],
    }).compile();

    service = module.get<CspService>(CspService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
