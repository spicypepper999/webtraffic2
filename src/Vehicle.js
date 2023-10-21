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

    tempCheckDistance(){
        return this.getLaneStoppingDistance() + 50;
    }
    //i dont think this works properly
    getStoppingDistance() {
        return ((this.speed ** 2) / (this.power * 2));
    }
    getLaneStoppingDistance() {
        return ((this.lane.speedLimit ** 2) / (this.power * 2));
    }

    XYDir() {
        let XYDir = this.lane.XYDirFromPosition(this.position);
        if (this.direction == -1) {
            XYDir.dir = XYDir.dir - Math.PI;
        }
        return XYDir;
    }
    transferLanes(nextLane = null) {
        const node = this.lane.lastNode();
        if (!node.lanes.includes(nextLane) || !node.lanes.includes(this.lane)) {
            nextLane = node.getStartLanes()[0];
        }
        this.lane.vehicles.splice(this.lane.vehicles.indexOf(this), 1);
        this.lane = nextLane;
        this.position = nextLane.positionOfNode(node);
        nextLane.vehicles.push(this);
    }
    move(delta) {
        if (this.position > this.lane.length()) {
            this.transferLanes(this.getNextLane());
        }
        //COME BACK!!! MANUALLY SETTING OBSTACLE CHECK DISTANCE!!!!
        if (this.lane.speedLimit < this.speed || this.returnObstacles(this.tempCheckDistance()).length > 0) {
            this.brake(delta);
        } else if (this.lane.speedLimit > this.speed) {
            this.accelerate(delta);
        } else {
            this.color = "black";
        }
        this.position += (this.speed * this.direction * delta);
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
        const obstacles = [];
        obstacles.push(...this.lane.returnObstacles(this.position, distance, this));
        const distanceLeft = this.position + distance - this.lane.length();
        if (distanceLeft > 0) {
            const nextLane = this.getNextLane();
            if (nextLane != null) {
                obstacles.push(...nextLane.returnObstacles(0, distanceLeft, this));
            }
        }
        return obstacles;
    }
    isObstacle() {
        return true;
    }
    getNextLane() {
        const lastNode = this.lane.lastNode();
        let nextLane = lastNode.getStartLanes()[0];
        if (this.ruleset != null) {
            for (let i = 0; i < this.ruleset.length; i++) {
                if (this.ruleset[i] == "direction") {
                    const checkNode = this.ruleset[i + 1];
                    const newLane = this.ruleset[i + 2];
                    if (checkNode == this.lane.lastNode() && checkNode.lanes.includes(newLane)) {
                        nextLane = newLane;
                    }
                    i += 3;
                }
            }
        }
        return nextLane;
    }
    updateSprite() {
        const XYDir = this.XYDir();
        this.sprite.position.set(XYDir.x, XYDir.y);
        this.sprite.rotation = XYDir.dir;
        this.sprite.fill = this.color;
    }
    returnCurrentObstacles(){
        return this.returnObstacles(this.tempCheckDistance());
    }
}