import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { IGameObject } from '../model/GameObject';
import { GameBackGround } from '../model/GameBackGround';
import { LevelObject } from '../model/LevelObject';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  // @Input('initGrassY') initGrassY: number;
  @ViewChild('canvasScene') canvasRef: ElementRef;

  drawFuncLoaded: boolean;
  running: boolean;
  backGround: IGameObject;
  targets: IGameObject[];
  canvas: any;
  levelObject: LevelObject;
  level: number;

  constructor(private ngZone: NgZone) {
    this.running = false;
    this.level = 1;
  }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.backGround = new GameBackGround(this.canvas.width, this.canvas.height);
    this.levelObject = new LevelObject(this.backGround.width, this.backGround.height);
    this.targets = this.levelObject.generateTargetsForLevel(this.level);
  }
  ngOnDestroy(): void {
    this.running = false;
  }
  startPause() {
    if (this.running) {
      this.running = false;
      return;
    }
    this.running = true;
    this.ngZone.runOutsideAngular(() => this.draw());
  }
  restart() {
    this.level = 1;
    this.running = false;
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.targets = this.levelObject.generateTargetsForLevel(this.level);
    setTimeout(() => {
      this.startPause();
    }, 300)
  }
  draw() {
    // Check that we're still running.
    if (!this.running) {
      return;
    }

    // Paint Scene
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    this.backGround.nextFrame(ctx);

    // Paint Targets
    this.targets.forEach((t) => {
      t.nextFrame(ctx);
    })
  
    // Schedule next
    requestAnimationFrame(() => this.draw());
  }

}
