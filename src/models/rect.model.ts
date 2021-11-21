import { Circle } from './circle.model';
import { Point, Shape, Type } from './shape.model';

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE: // this case is redundant as same implementation present in Circle
        try {
          const _circle = Circle.fromShape(other);
          return _circle.collides(this);
        } catch (error) {
          throw new Error('Eroor: ' + error);
        }
      case Type.RECT:
        try {
          const _rect = Rect.fromShape(other);
          const centerDistance: Point = <Point>{
            x: Math.abs(this.center.x - _rect.center.x),
            y: Math.abs(this.center.y - _rect.center.y),
          };
          if (
            centerDistance.x >= (this.width + _rect.width) / 2 ||
            centerDistance.y >= (this.height + _rect.height) / 2
          ) {
            return true;
          }
          return false;
        } catch (error) {
          throw new Error('Error: ' + error);
        }
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
