import { IGameObject, GameObject } from './GameObject';

export class BackGround extends GameObject implements IGameObject {
  color: string;
  skyColor: string;
  grassColor: string;
  constructor(public width: number, public hight: number) {
    super(0, 0);
    this.skyColor = 'skyblue';
    this.grassColor = 'green';
  }
  nextFrame(ctx: CanvasRenderingContext2D) {
    // Draw Sky
    ctx.fillStyle = this.skyColor;
    ctx.fillRect(this.x, this.y, this.width, this.hight);
    // Draw Grass
    ctx.fillStyle = this.grassColor;
    let grassY = this.hight - (this.hight * 0.1);
    let grassHight = this.hight * 0.1;
    ctx.fillRect(this.x, grassY, this.width, grassHight);
  }
}
