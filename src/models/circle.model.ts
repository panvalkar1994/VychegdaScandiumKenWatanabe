import { ShapeDTO } from '../plentina.controller';
import { Point, Shape, Type } from './shape.model';

export class Circle implements Shape {
  readonly center: Point;
  readonly radius: number;
  readonly type: Type;

  constructor(x: number, y: number, radius: number) {
    this.center = <Point>{ x, y };
    this.type = Type.CIRCLE;
    this.radius = radius;
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Circle object
   */
  static fromShape(other: Shape): Circle {
    const polymorph = <any>other;
    if (!polymorph.radius) {
      throw new Error('Shape is invalid! Cannot convert to a Circle');
    }

    return new Circle(polymorph.center.x, polymorph.center.y, polymorph.radius);
  }

  /**
   * Create Circle from ShapeDTO
   * @param shape the ShapeDTO object
   * @return a circle object
   */
  static fromShapeDTO(shape:ShapeDTO){
     if (!shape.radius) {
       throw new Error('ShapeDTO Cannot convert to a Circle');
     }
     return new Circle(shape.x, shape.y, shape.radius);
  }
}
