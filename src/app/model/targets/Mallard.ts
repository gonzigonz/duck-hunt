import { IGameObject, GameObjectPosition } from '../GameObject';
import { GameTargetObject } from './GameTargetObject';
import { IFlightPath } from "./IFlightPath";

export class Mallard extends GameTargetObject implements IGameObject {
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 40;
        this.height = 30;
        this.color = 'rgba(255, 255, 210, 0.85)';
        this.flightPath = new MarllardFlightPath(xBoundary, yBoundary);
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

export class MarllardFlightPath implements IFlightPath {
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
    updatePos(pos: GameObjectPosition, size: number) {
        if (pos.x > this.xBoundary) {
            pos.x = -this.xBoundary * (Math.floor(Math.random() * 50)/100);
            this.direction[1] *= -1;
        }
        if (pos.y < -size) {
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