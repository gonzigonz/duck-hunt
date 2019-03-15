import { GameTargetObject } from './GameTargetObject';
import { GameObjectPosition } from '../GameObject';
import { IGameObject } from "../IGameObject";
import { IFlightPath } from './IFlightPath';

export class RubberDuck extends GameTargetObject implements IGameObject {
    radis: number;
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 20;
        this.height = 20;
        this.radis = this.width/2;
        this.color = 'rgba(255, 255, 0, 1)';
        this.flightPath = new RubberDuckFlightPath(xBoundary, yBoundary);
        this.draw = this.drawFunc;
        this.checkIfHit = this.checkIfHitFunc;
    }
    drawFunc(ctx: CanvasRenderingContext2D) {
            // Draw your target object here
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radis, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
    }
    checkIfHitFunc(lastClick: GameObjectPosition) {
        // Define your hit criteria here
        let lc = lastClick;
        let isXCorrect = lc.x > this.pos.x - this.radis && lc.x < this.pos.x + this.radis;
        let isYCorrect = lc.y > this.pos.y - this.radis && lc.y < this.pos.y + this.radis;
        return isXCorrect && isYCorrect
    }
}

export class RubberDuckFlightPath implements IFlightPath {
    direction: number[];
    xBoundary: any;
    yBoundary: number;
    speed: any;
    constructor(xBoundary: number, yBoundary: number) {
        this.speed = 0;
        this.direction = [0,0];
        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary;
    }
    updatePos(pos: GameObjectPosition, size: number) {
        return pos
    }
}