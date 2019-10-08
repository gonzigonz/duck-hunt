import { GameObjectPosition } from './GameObject';
export interface IGameObject {
  pos: GameObjectPosition;
  width: number;
  height: number;
  color: string;
  nextFrame: (ctx: CanvasRenderingContext2D) => void;
}
