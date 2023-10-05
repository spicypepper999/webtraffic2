import { BasicNode } from "./BasicNode.js"

export class LaneNode extends BasicNode {
    constructor(x, y, lanes = []) {
        super(x, y);
        this._lanes = lanes;
    }
    set lanes(value) {
        this._lanes = value;
    }
    get lanes() {
        return this._lanes;
    }
    isObstacle() {
        return false;
    }
    getStartLanes() {
        const startLanes = [];
        for (let lane of this.lanes) {
            if (lane.nodes[0] == this) {
                startLanes.push(lane);
            }
        }
        return startLanes;
    }
    transferVehicle(vehicle, nextLane = null) {
            if (!this.lanes.includes(nextLane) || !this.lanes.includes(vehicle.lane)) {
                nextLane = this.getStartLanes()[0];
            }
            vehicle.lane.vehicles.splice(vehicle.lane.vehicles.indexOf(vehicle), 1);
            vehicle.lane = nextLane;
            vehicle.position = nextLane.positionOfNode(this);
            nextLane.vehicles.push(vehicle);
    }
}