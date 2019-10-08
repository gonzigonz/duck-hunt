import { GameTargetObject } from './GameTargetObject';
import { GameObjectPosition } from '../GameObject';
import { IGameObject } from "../IGameObject";
import { IFlightPath } from './IFlightPath';

export class WoodenDuck extends GameTargetObject implements IGameObject {
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 20;
        this.height = 12;
        this.color = 'rgba(196, 154, 57, 1)';
        this.flightPath = new WoodenDuckFlightPath(xBoundary, yBoundary);
        this.draw = this.drawFunc;
        this.checkIfHit = this.checkIfHitFunc;
    }
    drawFunc(ctx: CanvasRenderingContext2D) {
        // Draw your target object here
            let headRadius = this.height * 0.8;
            ctx.beginPath();
            ctx.ellipse(this.pos.x, this.pos.y, this.width, this.height, 0, 0, 2 * Math.PI);
            ctx.arc(this.pos.x - headRadius, this.pos.y - this.height -3, headRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
    }
    checkIfHitFunc(lastClick: GameObjectPosition) {
        // Define your hit criteria here
        let lc = lastClick;
        let isXCorrect = lc.x > this.pos.x - this.width/2 && lc.x < this.pos.x + this.width/2;
        let isYCorrect = lc.y > this.pos.y - this.height/2 && lc.y < this.pos.y + this.height/2;
        return isXCorrect && isYCorrect
    }
}

export class WoodenDuckFlightPath implements IFlightPath {
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