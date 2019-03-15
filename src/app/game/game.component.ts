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

  running: boolean;
  backGround: IGameObject;
  targets: IGameObject[];
  canvas: any;
  level: LevelObject;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.backGround = new GameBackGround(this.canvas.width, this.canvas.height);
    this.level = new LevelObject(this.backGround.width, this.backGround.height);
    this.targets = this.level.generateTargetsForLevel(3);
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
