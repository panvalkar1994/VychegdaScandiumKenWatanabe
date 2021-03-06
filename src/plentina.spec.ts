import { Test, TestingModule } from '@nestjs/testing';
import { CollisionDetectionService } from './collision-detection.service';
import { Circle } from './models/circle.model';
import { Rect } from './models/rect.model';
import { PlentinaController } from './plentina.controller';
import { PlentinaService } from './plentina.service';

describe('PlentinaController', () => {
  let plentinaController: PlentinaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlentinaController],
      providers: [PlentinaService],
    }).compile();

    plentinaController = app.get<PlentinaController>(PlentinaController);
  });

  describe('Health Check function', () => {
    it('should return "Vaibhav Panvalkar"', () => {
      const mockResponse = {
        status: jest.fn(),
      };
      expect(plentinaController.healthCheck(mockResponse as any).name).toBe(
        'Vaibhav Panvalkar',
      );
    });
  });
});

describe('Collision Detection', () => {
  describe('doesCircleAndRectCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(9, 9, 1, 1);

      it('should return true', () => {
        expect(
          CollisionDetectionService.isCircleAndRectInCollision(
            circle,
            rectangle,
          ),
        ).toBeTruthy;
      });
    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(
          CollisionDetectionService.isCircleAndRectInCollision(
            circle,
            rectangle,
          ),
        ).toBeFalsy;
      });
    });
  });

  describe('doesCircleAndCircleCollide', () => {
    const circle1 = new Circle(10, 10, 1);

    describe('two colliding circles', () => {
      [
        new Circle(12, 10, 1),
        new Circle(10, 12, 1),
        new Circle(11, 11, 1),
      ].forEach((circle2) => {
        it(`should return true for ${JSON.stringify(circle2)}`, () => {
          expect(
            CollisionDetectionService.isCircleAndCircleInCollision(
              circle1,
              circle2,
            ),
          ).toBeTruthy;
        });
      });
    });

    describe('two non-colliding circles', () => {
      const circle2 = new Circle(5, 5, 1);

      it(`should return false for ${JSON.stringify(circle2)}`, () => {
        expect(
          CollisionDetectionService.isCircleAndCircleInCollision(
            circle1,
            circle2,
          ),
        ).toBeFalsy;
      });
    });
  });

  describe('doesRectAndRectCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('two colliding rectangles', () => {
      const rectangle2 = new Rect(10, 10, 2, 2);
      it('should return true', () => {
        expect(
          CollisionDetectionService.isRectAndRectInCollision(
            rectangle1,
            rectangle2,
          ),
        ).toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const rectangle2 = new Rect(4, 4, 2, 2);
      it('should return false', () => {
        expect(
          CollisionDetectionService.isRectAndRectInCollision(
            rectangle1,
            rectangle2,
          ),
        ).toBeFalsy;
      });
    });
  });
});
