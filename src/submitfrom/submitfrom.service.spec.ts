import { Test, TestingModule } from '@nestjs/testing';
import { SubmitfromService } from './submitfrom.service';

describe('SubmitfromService', () => {
  let service: SubmitfromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitfromService],
    }).compile();

    service = module.get<SubmitfromService>(SubmitfromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
