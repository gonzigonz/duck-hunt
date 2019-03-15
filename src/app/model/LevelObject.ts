import { IGameObject } from './GameObject';
import { GameTarget } from '../model/GameTarget';

export class LevelObject {
    constructor(private xBoundary: number, private yBoundary: number) {
    }

    generateTargetsForLevel(level: number){
        let list: IGameObject[] = [];
        let startingX = -80;
        let startingY = this.yBoundary * (Math.floor(Math.random() * 60)/100);
        for (let i = 0; i < level; i++) {
            let target = new GameTarget(this.xBoundary, this.yBoundary);
            target.pos.x = startingX;
            target.pos.y = startingY;
            target.flightPath.speed = target.flightPath.speed * level * (Math.floor(Math.random() * 20) + 40)/100;
            list.push(target);
            startingX -= this.xBoundary * (Math.floor(Math.random() * 100) + 100)/100;
            startingY = this.yBoundary * (Math.floor(Math.random() * 60)/100);
        }
        return list;
    }
}