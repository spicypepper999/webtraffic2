import { Lane } from "./Lane.js";
import { LaneNode } from "./LaneNode.js";
import { Vehicle } from "./Vehicle.js";

export class LaneIntersectionNode extends LaneNode {
    constructor(x, y, ruleset, lanes = []) {
        super(x, y, lanes);
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
    // updateLaneReferences(){
    //     for(let lane of this.lanes){
    //         lane.addSelfToNodes();
    //     }
    // }
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
    transferVehicle(vehicle, nextLane) {
        if (this.lanes.includes(nextLane) && this.lanes.includes(vehicle.lane)) {
            if (vehicle.position >= vehicle.lane.positionOfNode(this)) {
                vehicle.lane.vehicles.splice(vehicle.lane.vehicles.indexOf(vehicle), 1);
                vehicle.lane = nextLane;
                vehicle.lane.vehicles.push(vehicle);
                vehicle.position = vehicle.lane.positionOfNode(this);
            }
        }
    }
    getStartLanes(){
        let startLanes = [];
        for(let lane of this.lanes){
            if(lane.positionOfNode(this) == 0){
                startLanes.push(lane);
            }
        }
        console.log(startLanes);
        return startLanes;
    }
}