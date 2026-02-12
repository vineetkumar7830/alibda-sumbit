import { Test, TestingModule } from '@nestjs/testing';
import { SubmitFromController } from './submitfrom.controller';
import { SubmitFromService } from './submitfrom.service';

describe('SubmitfromController', () => {
  let controller: SubmitFromController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitFromController],
      providers: [SubmitFromService],
    }).compile();

    controller = module.get<SubmitFromController>(SubmitFromController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
