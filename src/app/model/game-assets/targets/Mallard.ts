import { GameObjectPosition } from '../GameObject';
import { IGameObject } from "../IGameObject";
import { GameTargetObject } from './GameTargetObject';
import { IFlightPath } from "./IFlightPath";

export class Mallard extends GameTargetObject implements IGameObject {
    constructor(xBoundary: number, yBoundary: number) {
        super();
        this.width = 26;
        this.height = 12;
        this.flightPath = new MarllardFlightPath(xBoundary, yBoundary);
        this.draw = this.drawFunc;
        this.checkIfHit = this.checkIfHitFunc;
    }
    drawFunc(ctx: CanvasRenderingContext2D) {
        // Draw your target object here

        // body
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.width, this.height, 0, 0, 2 * Math.PI);
        ctx.closePath();
        if (this.hit)
            ctx.fillStyle = this.color;
        else
            ctx.fillStyle = 'rgba(155, 138, 97, 1)';
        ctx.fill();

        // head
        let headWidth = this.width * 0.4;
        let headHeight = this.height * 0.5;
        ctx.beginPath();
        ctx.fill();
        ctx.ellipse(this.pos.x + this.width * 1.3, this.pos.y -3, headWidth, headHeight, 0, 0, 2 * Math.PI);
        ctx.closePath();
        if (this.hit)
            ctx.fillStyle = this.color;
        else
            ctx.fillStyle = 'rgba(22, 205, 101, 1';
        ctx.fill();
    }
    checkIfHitFunc(lastClick: GameObjectPosition) {
        // Define your hit criteria here
        let lc = lastClick;
        let isXCorrect = lc.x > this.pos.x - this.width/2 && lc.x < this.pos.x + this.width/2;
        let isYCorrect = lc.y > this.pos.y - this.height && lc.y < this.pos.y + this.height/2;
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