import { GameTargetObject } from './GameTargetObject';
import { IGameObject, GameObjectPosition } from '../GameObject';
import { IFlightPath } from './IFlightPath';

export class WoodenDuck extends GameTargetObject implements IGameObject {
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 20;
        this.height = 20;
        this.color = 'rgba(196, 154, 57, 1)';
        this.flightPath = new WoodenDuckFlightPath(xBoundary, yBoundary);
        this.draw = this.drawFunc;
        this.checkIfHit = this.checkIfHitFunc;
    }
    drawFunc(ctx: CanvasRenderingContext2D) {
        // Draw your target object here
        ctx.fillStyle = this.color
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    checkIfHitFunc(lastClick: GameObjectPosition) {
        // Define your hit criteria here
        let lc = lastClick;
        let isXCorrect = lc.x > this.pos.x && lc.x < this.pos.x + this.width;
        let isYCorrect = lc.y > this.pos.y && lc.y < this.pos.y + this.height;
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