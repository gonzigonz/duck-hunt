import { GameAsset, CanvasPosition } from '../GameAsset';
import { IFlightPath } from './IFlightPath';
import { ITargetAsset } from './ITargetAsset';

export class TargetAsset extends GameAsset implements ITargetAsset {
    width: number;
    height: number;
    color: string;
    flightPath: IFlightPath;
    hit: boolean;
    framesSinceHit: number;
    constructor() {
        super();
        this.framesSinceHit = 0;
    }
    draw: (ctx: CanvasRenderingContext2D) => void;
    checkIfHit: (lastClick: CanvasPosition) => boolean;
    nextFrame(ctx: CanvasRenderingContext2D) {
        if (!this.hit) {
            this.flightPath.updatePos(this.pos, this.height);
        } else {
            this.framesSinceHit ++;
        }
        this.draw(ctx);
    }
}
