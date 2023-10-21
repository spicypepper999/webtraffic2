import { Lane } from "./Lane.js";
import { Intersection } from "./Intersection.js";
import { LaneNode } from "./LaneNode.js";
import { Vehicle } from "./Vehicle.js";

export class IntersectionLaneNode extends LaneNode {
    constructor(laneNode, ruleset) {
        super(laneNode.x, laneNode.y, laneNode.lanes);
        this._ruleset = ruleset;
        this._currentVehicle = null;
        //this.updateLaneReferences();
    }
    set ruleset(value) {
        this._ruleset = value;
    }
    get ruleset() {
        return this._ruleset;
    }
    set currentVehicle(value) {
        this._currentVehicle = value;
    }
    get currentVehicle() {
        return this._currentVehicle;
    }
    isObstacle(vehicle) {
        if (this.ruleset[0] == "STOP") {
            if (this.ruleset[1] == undefined) {
                if (this.currentVehicle != null && !this.lanes.includes(this.currentVehicle.lane)) {
                    this.currentVehicle = null;
                }
                if (vehicle == this.currentVehicle) {
                    return false;
                } else {
                    if (vehicle.speed == 0 && this.currentVehicle == null) {
                        this.currentVehicle = vehicle;
                    }
                    return true;
                }
            }
            if (this.ruleset[1] instanceof Intersection) {
                //the line below gives me cancer.
                if (this.ruleset[1].currentVehicle != null && !this.ruleset[1].lanes.includes(this.ruleset[1].currentVehicle.lane) && !this.ruleset[1].lanes.includes(this.ruleset[1].currentVehicle.getNextLane()) && !this.ruleset[1].intersectionNodes.includes(this.ruleset[1].currentVehicle.lane.returnNodes(this.ruleset[1].currentVehicle.position, this.ruleset[1].currentVehicle.tempCheckDistance())[0]) && vehicle != this.ruleset[1].currentVehicle) {
                    this.ruleset[1].currentVehicle = null;
                }
                if (vehicle == this.ruleset[1].currentVehicle) {
                    return false;
                } else {
                    if (vehicle.speed == 0) {
                        if (!this.ruleset[1].vehicleQueue.includes(vehicle)) {
                            this.ruleset[1].vehicleQueue.push(vehicle);
                        }
                        if (this.ruleset[1].currentVehicle == null) {
                            const newVehicle = this.ruleset[1].vehicleQueue.shift();
                            this.ruleset[1].currentVehicle = newVehicle;
                        }
                    }
                    return true;
                }
            }
        }
        if (this.ruleset[0] == "FULLSTOP") {
            return true;
        }
        if (this.ruleset[0] == "YIELD") {
            let final = false;
            for (let i = 0; i < this.ruleset.length; i++) {
                if (this.ruleset[i] == "YIELD") {
                    if (vehicle.lane == this.ruleset[i + 1]) {
                        if (!final) {
                            final = false;
                        }
                    } else {
                        if (this.ruleset[i + 1].returnVehicles(this.ruleset[i + 2], this.ruleset[i + 3]).length == 0) {
                            if (!final) {
                                final = false;
                            }
                        } else {
                            final = true;
                        }
                    }
                }
                if (this.ruleset[i] == "PRIORITY") {
                    if (this.ruleset[i + 1] == vehicle.getNextLane()) {
                        final = false;
                    }
                }
            }
            return final;
        }
    }
}