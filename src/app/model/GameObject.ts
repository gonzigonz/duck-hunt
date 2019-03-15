export interface IGameObject {
  pos: Position;
  width: number;
  height: number;
  color: string;
  nextFrame: (ctx: CanvasRenderingContext2D) => void;
}

export class GameObject {
  pos: Position;
    constructor() {
      this.pos = new Position();
      this.pos.x = 0;
      this.pos.y = 0;
    }
  }

export class Position {
  x: number;
  y: number;
}