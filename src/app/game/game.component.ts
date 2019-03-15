import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { IGameObject, Position } from '../model/GameObject';
import { GameBackGround } from '../model/GameBackGround';
import { LevelObject } from '../model/LevelObject';
import { GameTarget } from '../model/GameTarget';

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
  lastClick: Position;

  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
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
  restart(level) {
    this.running = false;
    this.level = level;
    this.changeDetectorRef.detectChanges() 
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.targets = this.levelObject.generateTargetsForLevel(this.level);
    setTimeout(() => {
      this.startPause();
    }, 300)
  }
  onMouseClick(e) {
    this.lastClick = new Position();
    this.lastClick.x = e.pageX - this.canvas.offsetLeft;
    this.lastClick.y = e.pageY - this.canvas.offsetTop;
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
    const FRAMES_TO_LIVE_AFTER_HIT: number = 6;
    let i = 0;
    if (!this.targets.length) {
      console.log('Level ' + this.level + ' Complete!');
      this.restart(this.level + 1);
      return;
    }
      
    while (i < this.targets.length) {
      let t = (this.targets[i] as GameTarget);
      if (this.lastClick) {
        const lc = this.lastClick
        if (
          lc.y > t.pos.y && lc.y < t.pos.y + t.height &&
          lc.x > t.pos.x && lc.x < t.pos.x + t.width) {
            // DUCK HIT!!!
            t.hit = true;
            t.color = 'red'
        }
        this.lastClick = null;
      }
      if (t.framesSinceHit > FRAMES_TO_LIVE_AFTER_HIT) {
        this.targets.splice(i, 1);
      } else {
        t.nextFrame(ctx);
      }
      i++;
    }

    // Schedule next
    requestAnimationFrame(() => this.draw());
  }

}
