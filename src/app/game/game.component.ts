import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CanvasPosition } from '../model/GameAsset';
import { IGameAsset } from '../model/IGameAsset';
import { GameBackGround } from '../model/game-assets/BackGroundAsset';
import { GameLevel } from '../model/GameLevel';
import { ITargetAsset } from '../model/game-assets/ITargetAsset';

const FRAMES_TO_LIVE_AFTER_HIT = 6;

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
    @ViewChild('canvasScene', { static: true }) canvasRef: ElementRef;

    drawFuncLoaded: boolean;
    running: boolean;
    backGround: IGameAsset;
    targets: ITargetAsset[];
    canvas: any;
    gameLevel: GameLevel;
    lastClick: CanvasPosition;

    constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
        this.running = false;
    }

    ngOnInit(): void {
        this.canvas = this.canvasRef.nativeElement;
        this.backGround = new GameBackGround(this.canvas.width, this.canvas.height);
        this.gameLevel = new GameLevel(this.backGround.width, this.backGround.height);
        this.targets = this.gameLevel.newTargets();
    }
    ngOnDestroy(): void {
        this.running = false;
    }

    startPause() {
        this.running = !this.running;
        this.changeDetectorRef.detectChanges();
        if (this.running) {
            this.ngZone.runOutsideAngular(() => this.draw());
        }
    }

    reset() {
        this.running = false;
        this.clearCanvas();
        this.gameLevel.reset();
        this.targets = this.gameLevel.newTargets();
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.startPause();
        }, 300);
    }

    onMouseClick(e: { pageX: number; pageY: number; }) {
        this.lastClick = new CanvasPosition();
        this.lastClick.x = e.pageX - this.canvas.offsetLeft;
        this.lastClick.y = e.pageY - this.canvas.offsetTop;
    }

    draw() {
        // Check that we're still running.
        if (!this.running) {
            return;
        }

        // Paint Scene
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        this.backGround.nextFrame(ctx);

        // Paint Targets
        let i = 0;
        if (!this.targets.length) {
            console.log('Level ' + this.gameLevel.current + ' Complete!');
            this.nextLevel();
            return;
        }

        while (i < this.targets.length) {
            const t = (this.targets[i] as ITargetAsset);
            if (this.lastClick) {
                if (t.checkIfHit(this.lastClick)) {
                    // DUCK HIT!!!
                    t.hit = true;
                    t.color = 'red';
                }
            }
            if (t.framesSinceHit > FRAMES_TO_LIVE_AFTER_HIT) {
                this.targets.splice(i, 1);
                this.changeDetectorRef.detectChanges();
            } else {
                t.nextFrame(ctx);
            }
            i++;
        }

        this.lastClick = null;

        // Schedule next
        requestAnimationFrame(() => this.draw());
    }

    private nextLevel() {
        this.clearCanvas();
        this.gameLevel.nextLevel();
        this.targets = this.gameLevel.newTargets();
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.ngZone.runOutsideAngular(() => this.draw());
        }, 300);
    }

    private clearCanvas() {
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
