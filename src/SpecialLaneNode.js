import { LaneNode } from "./LaneNode.js";
import { Vehicle } from "./Vehicle.js";

export class SpecialLaneNode extends LaneNode {
    constructor(laneNode, ruleset) {
        super(laneNode.x, laneNode.y, laneNode.lanes);
        this._ruleset = ruleset;
        this._timer = 0;
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
    tick(delta, map) {
        this.timer += delta;
        if (this.ruleset[0] == "source") {
            //MANUALLY SETTING DISTANCE!! STINKY!!!
            if (this.timer > this.ruleset[2] && this.ruleset[1][2].returnObstacles(this.ruleset[1][0], 100) == 0) {
                const newVehicle = new Vehicle(...this.ruleset[1]);
                map.vehicles.push(newVehicle);
                this.timer = 0;
                return true;
            }
        }
    }
    checkRuleset() {

    }
}