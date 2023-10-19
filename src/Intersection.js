import { RoadNode } from "./RoadNode.js";
import { LaneNode } from "./LaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";
import { Lane } from "./Lane.js";

export class Intersection {
    constructor(type, interfaceNodes) {
        this._interfaceNodes = interfaceNodes;
        this._intersectionNodes = [];
        this._lanes = [];
        this._type = type;
        this.generateIntersection(type);
        this._timer = 0;
        this._currentVehicle = null;
        this._vehicleQueue = [];
    }
    set type(value) {
        this._type = value;
    }
    get type() {
        return this._type;
    }
    set interfaceNodes(value) {
        this._interfaceNodes = value;
    }
    get interfaceNodes() {
        return this._interfaceNodes;
    }
    set intersectionNodes(value) {
        this._intersectionNodes = value;
    }
    get intersectionNodes() {
        return this._intersectionNodes;
    }
    set lanes(value) {
        this._lanes = value;
    }
    get lanes() {
        return this._lanes;
    }
    set timer(value) {
        this._timer = value;
    }
    get timer() {
        return this._timer;
    }
    set currentVehicle(value) {
        this._currentVehicle = value;
    }
    get currentVehicle() {
        return this._currentVehicle;
    }
    set vehicleQueue(value) {
        this._vehicleQueue = value;
    }
    get vehicleQueue() {
        return this._vehicleQueue;
    }
    generateIntersection(type) {
        if (type == "T2-2-2-YIELD") {

            const newIntersection1 = new IntersectionLaneNode(this.interfaceNodes[0].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getSourceNodesNormalized()[0], newIntersection1);
            this.intersectionNodes.push(newIntersection1);

            const newIntersection2 = new IntersectionLaneNode(this.interfaceNodes[0].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getExitNodesNormalized()[0], newIntersection2);
            this.intersectionNodes.push(newIntersection2);

            const newIntersection3 = new IntersectionLaneNode(this.interfaceNodes[1].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getSourceNodesNormalized()[0], newIntersection3);
            this.intersectionNodes.push(newIntersection3);

            const newIntersection4 = new IntersectionLaneNode(this.interfaceNodes[1].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getExitNodesNormalized()[0], newIntersection4);
            this.intersectionNodes.push(newIntersection4);

            const newIntersection5 = new IntersectionLaneNode(this.interfaceNodes[2].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getSourceNodesNormalized()[0], newIntersection5);
            this.intersectionNodes.push(newIntersection5);

            const newIntersection6 = new IntersectionLaneNode(this.interfaceNodes[2].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getExitNodesNormalized()[0], newIntersection6);
            this.intersectionNodes.push(newIntersection6);

            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 40));

            //newIntersection4.ruleset = ["YIELD", this.lanes[0], this.lanes[0].findIntersectPosition(this.lanes[3]).thisPosition - 100, 100, this.lanes[2]];

            newIntersection4.ruleset = ["YIELD", this.lanes[4], this.lanes[4].findIntersectPosition(this.lanes[3]).thisPosition, 100, "YIELD", this.lanes[0], this.lanes[0].findIntersectPosition(this.lanes[3]).thisPosition - 100, 100, "PRIORITY", this.lanes[2]];

        }
        if (type == "T2-2-2-STOP") {
            const newIntersection1 = new IntersectionLaneNode(this.interfaceNodes[0].getSourceNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getSourceNodesNormalized()[0], newIntersection1);
            this.intersectionNodes.push(newIntersection1);

            const newIntersection2 = new IntersectionLaneNode(this.interfaceNodes[0].getExitNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getExitNodesNormalized()[0], newIntersection2);
            this.intersectionNodes.push(newIntersection2);

            const newIntersection3 = new IntersectionLaneNode(this.interfaceNodes[1].getSourceNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getSourceNodesNormalized()[0], newIntersection3);
            this.intersectionNodes.push(newIntersection3);

            const newIntersection4 = new IntersectionLaneNode(this.interfaceNodes[1].getExitNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getExitNodesNormalized()[0], newIntersection4);
            this.intersectionNodes.push(newIntersection4);

            const newIntersection5 = new IntersectionLaneNode(this.interfaceNodes[2].getSourceNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getSourceNodesNormalized()[0], newIntersection5);
            this.intersectionNodes.push(newIntersection5);

            const newIntersection6 = new IntersectionLaneNode(this.interfaceNodes[2].getExitNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getExitNodesNormalized()[0], newIntersection6);
            this.intersectionNodes.push(newIntersection6);

            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 40));
        }
    }



}