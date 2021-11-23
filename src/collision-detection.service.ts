import { Circle } from "./models/circle.model";
import { Rect } from "./models/rect.model";
import { distanceBetween, Point } from "./models/shape.model";

export class CollisionDetectionService {
   
    static isCircleAndCircleInCollision(circle1:Circle, circle2:Circle):boolean{
        const distance = distanceBetween(circle1.center, circle2.center);
        return distance <= circle1.radius + circle2.radius;
    }

    static isCircleAndRectInCollision(cirlce:Circle, rect:Rect):boolean{
        const pointDistance: Point = <Point>{
          x: Math.abs(cirlce.center.x - rect.center.x),
          y: Math.abs(cirlce.center.y - rect.center.y),
        };

        if (pointDistance.x > rect.width / 2 + cirlce.radius) {
          return false;
        } else if (pointDistance.y > rect.height / 2 + cirlce.radius) {
          return false;
        } else if (pointDistance.x <= rect.width / 2) {
          return true;
        } else if (pointDistance.y <= rect.height / 2) {
          return true;
        }

        const circleToRectDistance =
          Math.pow(pointDistance.x - rect.width / 2, 2) +
          Math.pow(pointDistance.y - rect.height / 2, 2);

        return circleToRectDistance <= Math.pow(cirlce.radius, 2);
    }

    static isRectAndRectInCollision(rect1:Rect, rect2:Rect):boolean{
        // Calculate verticle sides of each rectangle
        const l1 = rect1.center.x - rect1.width / 2;
        const r1 = rect1.center.x + rect1.width / 2;
        const l2 = rect2.center.x - rect2.width / 2;
        const r2 = rect2.center.x + rect2.width / 2;
        // Calculate horizontal sides of each rectangle
        const b1 = rect1.center.y - rect1.height / 2;
        const t1 = rect1.center.y + rect1.height / 2;
        const b2 = rect2.center.y - rect2.height / 2;
        const t2 = rect2.center.y + rect2.height / 2;
        if (l1 <= r2 && l2 <= r1 && b1 <= t1 && b2 <= t2) {
          return true;
        }
        return false;
    }
}