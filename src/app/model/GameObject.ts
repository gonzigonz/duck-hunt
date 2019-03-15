export interface IGameObject {
  pos: GameObjectPosition;
  width: number;
  height: number;
  color: string;
  nextFrame: (ctx: CanvasRenderingContext2D) => void;
}

export class GameObject {
  pos: GameObjectPosition;
    constructor() {
      this.pos = new GameObjectPosition();
      this.pos.x = 0;
      this.pos.y = 0;
    }
  }

export class GameObjectPosition {
  x: number;
  y: number;
}