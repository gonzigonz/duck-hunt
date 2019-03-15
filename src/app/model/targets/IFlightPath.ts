import { GameObjectPosition } from '../GameObject';
export interface IFlightPath {
    speed: number;
    updatePos: (pos: GameObjectPosition, size: number) => GameObjectPosition;
}
