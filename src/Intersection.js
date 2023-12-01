import { BasicNode } from "./BasicNode.js";
import { RoadNode } from "./RoadNode.js";
import { LaneNode } from "./LaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";
import { Lane } from "./Lane.js";

export class Intersection {
    constructor(type, interfaceNodes, x, y, rotation) {
        this._interfaceNodes = interfaceNodes;
        this._intersectionNodes = [];
        this._lanes = [];
        this._type = type;
        this._timer = 0;
        this._currentVehicle = null;
        this._vehicleQueue = [];
        this._node = new BasicNode(x, y, rotation);
        this.generateIntersection(type);
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
    set node(value) {
        this._node = value;
    }
    get node() {
        return this._node;
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
            //still playing around
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
        if (type == "X2-2-2-2-STOP") {
            const newIntersection1 = new IntersectionLaneNode(this.interfaceNodes[0].getSourceNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getSourceNodesNormalized()[0], newIntersection1);
            newIntersection1.setXY(this.node.x + (-10 * Math.cos(this.node.rotation) - (-10 * Math.sin(this.node.rotation))), this.node.y + (-10 * Math.cos(this.node.rotation) + (-10 * Math.sin(this.node.rotation))));
            //newIntersection1.setXY(0, 0);
            this.intersectionNodes.push(newIntersection1);

            const newIntersection2 = new IntersectionLaneNode(this.interfaceNodes[0].getExitNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getExitNodesNormalized()[0], newIntersection2);
            newIntersection2.setXY(this.node.x + (-10 * Math.cos(this.node.rotation) - (10 * Math.sin(this.node.rotation))), this.node.y + (10 * Math.cos(this.node.rotation) + (-10 * Math.sin(this.node.rotation))));
            //newIntersection2.setXY(this.node.x - (10 * Math.cos(this.node.rotation)), this.node.y + (10 * Math.sin(this.node.rotation)));
            this.intersectionNodes.push(newIntersection2);

            const newIntersection3 = new IntersectionLaneNode(this.interfaceNodes[1].getSourceNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getSourceNodesNormalized()[0], newIntersection3);
            newIntersection3.setXY(this.node.x + (10 * Math.cos(this.node.rotation) - (10 * Math.sin(this.node.rotation))), this.node.y + (10 * Math.cos(this.node.rotation) + (10 * Math.sin(this.node.rotation))));
            //newIntersection3.setXY(this.node.x + (10 * Math.cos(this.node.rotation)), this.node.y + (10 * Math.sin(this.node.rotation)));
            this.intersectionNodes.push(newIntersection3);

            const newIntersection4 = new IntersectionLaneNode(this.interfaceNodes[1].getExitNodesNormalized()[0], ["STOP", this]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getExitNodesNormalized()[0], newIntersection4);
            newIntersection4.setXY(this.node.x + (10 * Math.cos(this.node.rotation) - (-10 * Math.sin(this.node.rotation))), this.node.y + (-10 * Math.cos(this.node.rotation) + (10 * Math.sin(this.node.rotation))));
            //newIntersection4.setXY(this.node.x + (10 * Math.cos(this.node.rotation)), this.node.y - (10 * Math.sin(this.node.rotation)));
            this.intersectionNodes.push(newIntersection4);

            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getSourceNodesNormalized()[0], newIntersection4);
            newIntersection4.lanes.push(this.interfaceNodes[2].road.lanes[0]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getExitNodesNormalized()[0], newIntersection1);
            newIntersection1.lanes.push(this.interfaceNodes[2].road.lanes[1]);
            this.interfaceNodes[3].updateLaneNodeReference(this.interfaceNodes[3].getSourceNodesNormalized()[0], newIntersection2);
            newIntersection2.lanes.push(this.interfaceNodes[3].road.lanes[0]);
            this.interfaceNodes[3].updateLaneNodeReference(this.interfaceNodes[3].getExitNodesNormalized()[0], newIntersection3);
            newIntersection3.lanes.push(this.interfaceNodes[3].road.lanes[1]);

            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.interfaceNodes[3].getSourceNodesNormalized()[0]], 40));
            this.lanes.push(new Lane([this.interfaceNodes[3].getExitNodesNormalized()[0], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 40));

        }
        if(type == "X2-2-2-2-ROUND"){

            

            const newIntersection1 = new IntersectionLaneNode(new LaneNode(this.node.x + (-25 * Math.cos(this.node.rotation) - (-25 * Math.sin(this.node.rotation))), this.node.y + (-25 * Math.cos(this.node.rotation) + (-25 * Math.sin(this.node.rotation)))), ["STOP", this]);
            this.intersectionNodes.push(newIntersection1);

            const newIntersection2 = new IntersectionLaneNode(new LaneNode(this.node.x + (-25 * Math.cos(this.node.rotation) - (25 * Math.sin(this.node.rotation))), this.node.y + (25 * Math.cos(this.node.rotation) + (-25 * Math.sin(this.node.rotation)))), ["STOP", this]);
            this.intersectionNodes.push(newIntersection2);

            const newIntersection3 = new IntersectionLaneNode(new LaneNode(this.node.x + (25 * Math.cos(this.node.rotation) - (25 * Math.sin(this.node.rotation))), this.node.y + (25 * Math.cos(this.node.rotation) + (25 * Math.sin(this.node.rotation)))), ["STOP", this]);
            this.intersectionNodes.push(newIntersection3);

            const newIntersection4 = new IntersectionLaneNode(new LaneNode(this.node.x + (25 * Math.cos(this.node.rotation) - (-25 * Math.sin(this.node.rotation))), this.node.y + (-25 * Math.cos(this.node.rotation) + (25 * Math.sin(this.node.rotation)))), ["STOP", this]);
            this.intersectionNodes.push(newIntersection4);

            const newIntersection5 = new IntersectionLaneNode(this.interfaceNodes[0].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getSourceNodesNormalized()[0], newIntersection5);
            this.intersectionNodes.push(newIntersection5);

            const newIntersection6 = new IntersectionLaneNode(this.interfaceNodes[0].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getExitNodesNormalized()[0], newIntersection6);
            this.intersectionNodes.push(newIntersection6);

            const newIntersection7 = new IntersectionLaneNode(this.interfaceNodes[1].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getSourceNodesNormalized()[0], newIntersection7);
            this.intersectionNodes.push(newIntersection7);

            const newIntersection8 = new IntersectionLaneNode(this.interfaceNodes[1].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getExitNodesNormalized()[0], newIntersection8);
            this.intersectionNodes.push(newIntersection8);

            const newIntersection9 = new IntersectionLaneNode(this.interfaceNodes[2].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getSourceNodesNormalized()[0], newIntersection9);
            this.intersectionNodes.push(newIntersection9);

            const newIntersection10 = new IntersectionLaneNode(this.interfaceNodes[2].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getExitNodesNormalized()[0], newIntersection10);
            this.intersectionNodes.push(newIntersection10);

            const newIntersection11 = new IntersectionLaneNode(this.interfaceNodes[3].getSourceNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[3].updateLaneNodeReference(this.interfaceNodes[3].getSourceNodesNormalized()[0], newIntersection11);
            this.intersectionNodes.push(newIntersection11);

            const newIntersection12 = new IntersectionLaneNode(this.interfaceNodes[3].getExitNodesNormalized()[0], ["GO"]);
            this.interfaceNodes[3].updateLaneNodeReference(this.interfaceNodes[3].getExitNodesNormalized()[0], newIntersection12);
            this.intersectionNodes.push(newIntersection12);

            //wtf is this 31 shit
            this.lanes.push(new Lane([this.intersectionNodes[0], new LaneNode(this.node.x + (-31 * Math.cos(this.node.rotation) - (0 * Math.sin(this.node.rotation))), this.node.y + (0 * Math.cos(this.node.rotation) + (-31 * Math.sin(this.node.rotation)))), this.intersectionNodes[1]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[1], new LaneNode(this.node.x + (0 * Math.cos(this.node.rotation) - (31 * Math.sin(this.node.rotation))), this.node.y + (31 * Math.cos(this.node.rotation) + (0 * Math.sin(this.node.rotation)))),this.intersectionNodes[2]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[2], new LaneNode(this.node.x + (31 * Math.cos(this.node.rotation) - (0 * Math.sin(this.node.rotation))), this.node.y + (0 * Math.cos(this.node.rotation) + (31 * Math.sin(this.node.rotation)))) ,this.intersectionNodes[3]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[3], new LaneNode(this.node.x + (0 * Math.cos(this.node.rotation) - (-31 * Math.sin(this.node.rotation))), this.node.y + (-31 * Math.cos(this.node.rotation) + (0 * Math.sin(this.node.rotation)))),this.intersectionNodes[0]], 30));

            this.intersectionNodes[0].ruleset = ["YIELD", this.lanes[3], 0, 50];
            this.intersectionNodes[1].ruleset = ["YIELD", this.lanes[0], 0, 50];
            this.intersectionNodes[2].ruleset = ["YIELD", this.lanes[1], 0, 50];
            this.intersectionNodes[3].ruleset = ["YIELD", this.lanes[2], 0, 50];

            this.lanes.push(new Lane([this.interfaceNodes[0].getExitNodesNormalized()[0], this.intersectionNodes[1]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[1], this.interfaceNodes[3].getSourceNodesNormalized()[0]], 30));
            this.lanes.push(new Lane([this.interfaceNodes[3].getExitNodesNormalized()[0], this.intersectionNodes[2]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[2], this.interfaceNodes[1].getSourceNodesNormalized()[0]], 30));
            this.lanes.push(new Lane([this.interfaceNodes[1].getExitNodesNormalized()[0], this.intersectionNodes[3]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[3], this.interfaceNodes[2].getSourceNodesNormalized()[0]], 30));
            this.lanes.push(new Lane([this.interfaceNodes[2].getExitNodesNormalized()[0], this.intersectionNodes[0]], 30));
            this.lanes.push(new Lane([this.intersectionNodes[0], this.interfaceNodes[0].getSourceNodesNormalized()[0]], 30));

        }
    }



}