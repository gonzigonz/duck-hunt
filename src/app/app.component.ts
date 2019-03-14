import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Duck Hunt';
  @ViewChild('canvasScene') canvasRef: ElementRef;

  ngOnInit(): void {
    let canvas = this.canvasRef.nativeElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
