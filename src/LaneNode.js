import { BasicNode } from "./BasicNode.js"

export class LaneNode extends BasicNode{
    constructor(x, y, lanes=[]){
        super(x, y);
        this._lanes = lanes;
    }
    set lanes(value){
        this._lanes = value;
    }
    get lanes(){
        return this._lanes;
    }
    isObstacle() {
        return false;
    }
    getStartLanes(){
        const startLanes = [];
        for(let lane of this.lanes){
            if(lane.positionOfNode(this) == 0){
                startLanes.push(lane);
            }
        }
        return startLanes;
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
}