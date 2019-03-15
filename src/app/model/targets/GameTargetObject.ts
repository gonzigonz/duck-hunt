import { GameObject, GameObjectPosition } from '../GameObject';
import { IFlightPath } from './IFlightPath';

export class GameTargetObject extends GameObject {
    width: number;
    height: number;
    color: string;
    flightPath: IFlightPath;
    hit: boolean;
    framesSinceHit: number = 0;
    draw: (ctx: CanvasRenderingContext2D) => void;
    checkIfHit: (lastClick: GameObjectPosition) => boolean;
    nextFrame(ctx: CanvasRenderingContext2D) {
        if (!this.hit) {
            this.flightPath.updatePos(this.pos, this.height);
        } else {
            this.framesSinceHit ++;
        }
        this.draw(ctx);
    }
}
