export class CanvasPosition {
  x: number;
  y: number;
}

export class GameAsset {
  pos: CanvasPosition;
    constructor() {
      this.pos = new CanvasPosition();
      this.pos.x = 0;
      this.pos.y = 0;
    }
  }
