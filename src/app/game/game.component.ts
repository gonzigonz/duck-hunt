import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, NgZone } from '@angular/core';
import { IGameObject } from '../model/GameObject';
import { BackGround } from '../model/GameBackGround';

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
  canvas: any;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.backGround = new BackGround(this.canvas.width, this.canvas.height)
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
    // Paint
    let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    this.backGround.nextFrame(ctx);
  
    // Schedule next
    requestAnimationFrame(() => this.draw());
  }

}
