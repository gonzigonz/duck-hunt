export interface IGameObject {
  x: number;
  y: number;
  width: number;
  hight: number;
  color: string;
  nextFrame: (ctx: CanvasRenderingContext2D) => void;
}

export class GameObject{
    constructor(
      public x: number,
      public y: number) {
    }
  }
