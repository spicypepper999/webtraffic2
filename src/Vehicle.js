import { Lane } from "./Lane.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";

export class Vehicle {
    constructor(position, direction, lane, speed, power, ruleset, sprite) {
        this._position = position;
        this._direction = direction;
        this._lane = lane;
        this._speed = speed;
        this._power = power;
        this._ruleset = ruleset;
        this._color = "black";
        this._lane.vehicles.push(this);
        this._sprite = sprite;
    }
    set position(value) {
        this._position = value;
    }
    get position() {
        return this._position;
    }
    set direction(value) {
        this._direction = value;
    }
    get direction() {
        return this._direction;
    }
    set lane(value) {
        this._lane = value;
    }
    get lane() {
        return this._lane;
    }
    set speed(value) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }
    set power(value) {
        this._power = value;
    }
    get power() {
        return this._power;
    }
    set ruleset(value) {
        this._ruleset = value;
    }
    get ruleset() {
        return this._ruleset;
    }
    set color(value) {
        this._color = value;
    }
    get color() {
        return this._color;
    }
    set sprite(value) {
        this._sprite = value;
    }
    get sprite() {
        return this._sprite;
    }
    XYDir() {
        let XYDir = this.lane.XYDirFromPosition(this.position);
        if (this.direction == -1) {
            XYDir.dir = XYDir.dir - Math.PI;
        }
        return XYDir;
    }
    move(delta) {
        this.position += (this.speed * this.direction * delta);
        if (this.position > this.lane.length()) {
            this.checkRuleset();
        }
        //COME BACK!!! MANUALLY SETTING OBSTACLE CHECK DISTANCE!!!!
        if (this.lane.speedLimit < this.speed || this.returnObstacles(50).length > 0) {
            this.brake(delta);
        } else if (this.lane.speedLimit > this.speed) {
            this.accelerate(delta);
        }else{
            this.color = "black";
        }
    }
    brake(delta) {
        if (this.speed > 0) {
            this.speed -= (this.power * delta);
        }
        if (this.speed < 0) {
            this.speed = 0;
        }
        this.color = "red";
    }
    accelerate(delta) {
        if (this.speed < this.lane.speedLimit) {
            this.speed += (this.power * delta);
        }
        if (this.speed > this.lane.speedLimit) {
            this.speed = this.lane.speedLimit;
        }
        this.color = "green";
    }
    returnObstacles(distance) {
        return this.lane.returnObstacles(this.position, distance, this);
    }
    isObstacle() {
        return true;
    }
    checkRuleset() {
        if (this.ruleset.length == 0) {
            this.lane.nodes[this.lane.nodes.length - 1].transferVehicle(this, this.lane.nodes[this.lane.nodes.length - 1].getStartLanes()[0]);
        } else {
            for (let i = 0; i < this.ruleset.length; i += 2) {
                const checkNode = this.ruleset[i];
                const nextLane = this.ruleset[i + 1];
                if (checkNode == this.lane.nodes[this.lane.nodes.length - 1] && checkNode.lanes.includes(nextLane)) {
                    checkNode.transferVehicle(this, nextLane);
                } else {
                    this.lane.nodes[this.lane.nodes.length - 1].transferVehicle(this, this.lane.nodes[this.lane.nodes.length - 1].getStartLanes()[0]);
                }
            }
        }
    }
    getNextLane(){
        if(this.ruleset.length == 0){
            if(this.lane.nodes[this.lane.nodes.length - 1].getStartLanes().length > 0){
                return this.lane.nodes[this.lane.nodes.length - 1].getStartLanes()[0];
            }else{
                return null;
            }
        }else{
            for (let i = 0; i < this.ruleset.length; i += 2) {
                    const checkNode = this.ruleset[i];
                    const nextLane = this.ruleset[i + 1];
                    if (checkNode == this.lane.nodes[this.lane.nodes.length - 1] && checkNode.lanes.includes(nextLane)) {
                        return nextLane;
                    } else {
                        if(this.lane.nodes[this.lane.nodes.length - 1].getStartLanes().length > 0){
                            return this.lane.nodes[this.lane.nodes.length - 1].getStartLanes()[0];
                        }else{
                            return null;
                        }
                    }
                }
        }
    }
    updateSprite(){
        const XYDir = this.XYDir();
        this.sprite.position.set(XYDir.x, XYDir.y);
        this.sprite.rotation = XYDir.dir;
        this.sprite.fill = this.color;
    }
}