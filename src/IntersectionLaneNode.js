import { Lane } from "./Lane.js";
import { LaneNode } from "./LaneNode.js";
import { Vehicle } from "./Vehicle.js";

export class IntersectionLaneNode extends LaneNode {
    constructor(laneNode, ruleset) {
        super(laneNode.x, laneNode.y, laneNode.lanes);
        this._ruleset = ruleset;
        this._currentCar = null;
        //this.updateLaneReferences();
    }
    set ruleset(value) {
        this._ruleset = value;
    }
    get ruleset() {
        return this._ruleset;
    }
    set currentCar(value) {
        this._currentCar = value;
    }
    get currentCar() {
        return this._currentCar;
    }
    isObstacle(vehicle) {
        if (this.ruleset[0] == "STOP") {
            if (this.currentCar != null && !this.lanes.includes(this.currentCar.lane)) {
                this.currentCar = null;
            }
            if (vehicle == this.currentCar) {
                return false;
            } else {
                if (vehicle.speed == 0 && this.currentCar == null) {
                    this.currentCar = vehicle;
                }
                return true;
            }
        }
        if (this.ruleset[0] == "FULLSTOP") {
            return true;
        }
        if (this.ruleset[0] == "YIELD") {
            if (vehicle.lane == this.ruleset[1]) {
                return false;
            } else {
                //IMPORTANT!!!!! I AM MANUALLY SETTING DISTANCE RN!!! STINKY!!!!
                if (this.ruleset[1].returnVehicles(this.ruleset[2], 100).length == 0) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
}