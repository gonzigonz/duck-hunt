import { IGameObject, GameObject, Position } from './GameObject';

export class GameTarget extends GameObject implements IGameObject {
    width: number;
    height: number;
    color: string;
    flightPath: FlightPath;

    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 40;
        this.height = 40;
        this.color = 'rgba(255, 255, 210, 0.85)';
        this.flightPath = new FlightPath(xBoundary, yBoundary);
    }
    nextFrame(ctx: CanvasRenderingContext2D) {
        this.flightPath.updatePos(this.pos, this.height);
        ctx.fillStyle = this.color
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

export class FlightPath {
    direction: number[];
    xBoundary: any;
    yBoundary: number;
    speed: any;
    constructor(xBoundary: number, yBoundary: number) {
        this.speed = 1;
        this.direction = [1.5,1];
        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary * 0.7;
    }
    updatePos(pos: Position, height: number) {
        if (pos.x > this.xBoundary) {
            pos.x = -this.xBoundary * (Math.floor(Math.random() * 50)/100);
            this.direction[1] *= -1;
        }
        if (pos.y < -height) {
            this.direction[1] *= -1;
        }
        if (pos.y > this.yBoundary) {
            this.direction[1] *= -1;
        }
        pos.x += this.direction[0] * this.speed;
        pos.y += this.direction[1] * this.speed;
        return pos
    }
}