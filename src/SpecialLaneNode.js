import { LaneNode } from "./LaneNode.js";
import { Vehicle } from "./Vehicle.js";

export class SpecialLaneNode extends LaneNode {
    constructor(laneNode, ruleset) {
        super(laneNode.x, laneNode.y, laneNode.lanes);
        this._ruleset = ruleset;
        this._timer = 0;
        this._counter = 0;
    }
    set ruleset(value) {
        this._ruleset = value;
    }
    get ruleset() {
        return this._ruleset;
    }
    set timer(value) {
        this._timer = value;
    }
    get timer() {
        return this._timer;
    }
    set counter(value) {
        this._counter = value;
    }
    get counter() {
        return this._counter;
    }
    tick(delta, map) {
        this.timer += delta;
        const vehicles = [];
        if (this.ruleset[0] == "source") {
            //MANUALLY SETTING CHECKING DISTANCE!! STINKY!!!
            if (this.timer > this.ruleset[2] && this.ruleset[1][2].returnObstacles(this.ruleset[1][0], 100) == 0) {
                const newVehicle = new Vehicle(...this.ruleset[1]);
                map.vehicles.push(newVehicle);
                vehicles.push(newVehicle);
                this.timer = 0;
                //return true;
                return ["source", vehicles];
            }
        }
        if (this.ruleset[0] == "exit") {
            //MANUALLY SETTING DISTANCE!! STINKY!!!
            if (this.timer > this.ruleset[3]) {
                for (let vehicle of this.ruleset[1].returnVehicles(this.ruleset[1].positionOfNode(this) - this.ruleset[2], this.ruleset[2])) {
                    const index = map.vehicles.indexOf(vehicle);
                    vehicles.push(map.vehicles[index]);
                    this.counter++;
                    //map.vehicles.splice(index, 1);
                    //THIS DOESNT WORK ^ NEED TO UPDATE REFERENCES SPRITE AND LANES
                }
                this.timer = 0;
                return ["exit", vehicles];
            }
        }
    }
    checkRuleset() {

    }
    isObstacle(){
        return true;
    }
}