import { Point, Shape, Type } from "./shape.model";

export class Line implements Shape{
    readonly center:Point;
    readonly height:number;
    readonly width:number;
    readonly type:Type;

    /**
     * 
     * @param x : x coordinate of first point
     * @param y : y coordinate of first point
     * @param width : center.x + width will give x coordinate of second point
     * @param height : center.y + height will give y coordinate of second point
     */
    constructor(x:number, y:number, width:number, height:number){
        this.center = <Point>{x,y};
        this.type = Type.LINE;
        this.width = width;
        this.height = height;
    }

    collides(other:Shape):boolean{
        switch(other.type){
            case Type.CIRCLE:
                throw new Error("Implementation need");
            case Type.RECT:
                throw new Error("Implementation need");
            case Type.LINE:
                throw new Error("Im need");
            default:
                throw new Error("Invalid shape type!");
        }   
    }
}