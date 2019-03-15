import { IGameObject } from './GameObject';
import { Mallard } from './targets/Mallard';
import { RubberDuck } from './targets/RubberDuck';
import { WoodenDuck } from './targets/WoodenDuck';

export class LevelObject {
    constructor(private xBoundary: number, private yBoundary: number) {
    }

    generateTargetsForLevel(level: number){
        let list: IGameObject[] = [];
        let startingX = -80;
        let startingY = this.yBoundary * (Math.floor(Math.random() * 60)/100);
        for (let i = 0; i < level; i++) {

            // Add Mallards
            let mallard = new Mallard(this.xBoundary, this.yBoundary);
            mallard.pos.x = startingX;
            mallard.pos.y = startingY;
            mallard.flightPath.speed = mallard.flightPath.speed * level * (Math.floor(Math.random() * 20) + 40)/100;
            list.push(mallard);
            startingX -= this.xBoundary * (Math.floor(Math.random() * 100) + 100)/200;
            startingY = this.yBoundary * (Math.floor(Math.random() * 60)/100);

            // Add Rubber Ducks
            let rubberDucky = new RubberDuck(this.xBoundary, this.yBoundary);
            rubberDucky.pos.x = Math.floor(Math.random() * this.xBoundary)
            rubberDucky.pos.y = this.yBoundary * 0.97;
            list.push(rubberDucky);

            // Add Rubber Ducks
            let woodenDuck = new WoodenDuck(this.xBoundary, this.yBoundary);
            woodenDuck.pos.x = Math.floor(Math.random() * this.xBoundary)
            woodenDuck.pos.y = this.yBoundary * 0.91;
            list.push(woodenDuck);
        }
        return list;
    }
}