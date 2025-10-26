import { Test, TestingModule } from '@nestjs/testing';
import { FidelityController } from './fidelity.controller';
import { FidelityService } from './fidelity.service';

describe('FidelityController', () => {
  let fidelityController: FidelityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FidelityController],
      providers: [FidelityService],
    }).compile();

    fidelityController = app.get<FidelityController>(FidelityController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fidelityController.getHello()).toBe('Hello World!');
    });
  });
});
