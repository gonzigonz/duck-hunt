import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, NgZone } from '@angular/core';

class GameObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public higth: number,
    public color: string) {

  }
}

class BackGround extends GameObject {
  constructor(width: number, higth: number) {
    super(0, 0, width, higth, 'skyblue')
  }
}
class Grass extends GameObject {
  constructor(private backGround: BackGround) {
    super(0, 0, backGround.width, backGround.higth / 10, 'green')
    // Place land at bottom
    this.y = backGround.higth - (backGround.higth * 0.1);
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  @Input('initGrassY') initGrassY: number;
  @ViewChild('canvasScene') canvasRef: ElementRef;

  running: boolean;
  backGround: BackGround;
  grass: Grass;
  canvas: any;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.backGround = new BackGround(this.canvas.width, this.canvas.height)
    this.grass = new Grass(this.backGround);
    
    this.running = true;
    this.ngZone.runOutsideAngular(() => this.draw());
  }
  ngOnDestroy(): void {
    this.running = false;
  }
  draw() {
    // Check that we're still running.
    if (!this.running) {
      return;
    }
  
    // Paint current frame
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

    ctx.fillStyle = this.backGround.color;
    ctx.fillRect(this.backGround.x, this.backGround.y, this.backGround.width, this.backGround.higth);
    ctx.fillStyle = this.grass.color;

    // Move grass
    this.initGrassY ++;
    if (this.initGrassY == this.backGround.higth)
      this.initGrassY = - this.grass.higth;
    ctx.fillRect(this.grass.x, this.initGrassY, this.grass.width, this.grass.higth)
  
    // Schedule next
    requestAnimationFrame(() => this.draw());
  }

}
