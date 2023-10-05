import { BasicNode } from "./BasicNode.js";

export class RoadNode extends BasicNode {
    constructor(x, y, road, laneNodes = []) {
        super(x, y);
        this._road = road;
        this._laneNodes = laneNodes;
    }
    set road(value) {
        this._road = value;
    }
    get road() {
        return this._road;
    }
    set laneNodes(value) {
        this._laneNodes = value;
    }
    get laneNodes() {
        return this._laneNodes;
    }
    updateLaneNodeReference(oldNode, newNode) {
        this.road.updateLaneNodeReference(oldNode, newNode);
        //for of loop didnt work here with references
        for (let i = 0; i < this.laneNodes.length; i++) {
            if (this.laneNodes[i] == oldNode) {
                this.laneNodes[i] = newNode;
            }
        }
    }
    getSourceNodes() {
        const intake = [];
        for (let i = 0; i < (this.laneNodes.length / 2); i++) {
            intake.push(this.laneNodes[i]);
        }
        return intake;
    }

    getExitNodes() {
        const exit = [];
        for (let i = (this.laneNodes.length / 2); i < this.laneNodes.length; i++) {
            exit.push(this.laneNodes[i]);
        }
        exit.reverse();
        return exit;
    }

    //high potency and high yield autismo code down here

    getSourceNodesNormalized() {
        if (this.road.lastNode() == this) {
            this.laneNodes.reverse();
        }
        const intake = [];
        for (let i = 0; i < (this.laneNodes.length / 2); i++) {
            intake.push(this.laneNodes[i]);
        }
        if (this.road.lastNode() == this) {
            this.laneNodes.reverse();
        }
        return intake;
    }
    getExitNodesNormalized() {
        if (this.road.lastNode() == this) {
            this.laneNodes.reverse();
        }
        const exit = [];
        for (let i = (this.laneNodes.length / 2); i < this.laneNodes.length; i++) {
            exit.push(this.laneNodes[i]);
        }
        exit.reverse();
        if (this.road.lastNode() == this) {
            this.laneNodes.reverse();
        }
        return exit;
    }
}