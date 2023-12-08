import { BasicNode } from "./BasicNode.js";
import { LaneNode } from "./LaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";

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
        // for (let i = 0; i < this.laneNodes.length; i++) {
        //     if (this.laneNodes[i] == oldNode) {
        //         this.laneNodes[i] = newNode;
        //     }
        // }
    }
    getExitNodes() {
        const exit = [];
        for (let i = 0; i < (this.laneNodes.length / 2); i++) {
            exit.push(this.laneNodes[i]);
        }
        return exit;
    }
    getSourceNodes() {
        const source = [];
        for (let i = (this.laneNodes.length / 2); i < this.laneNodes.length; i++) {
            source.push(this.laneNodes[i]);
        }
        source.reverse();
        return source;
    }
    getSourceNodesNormalized() {
        const source = [];
        if (this.road.lastNode() == this) {
            for (let i = (this.laneNodes.length / 2) - 1; i >= 0; i--) {
                source.push(this.laneNodes[i]);
            }
        } else {
            for (let i = (this.laneNodes.length / 2); i < this.laneNodes.length; i++) {
                source.push(this.laneNodes[i]);
            }
        }
        source.reverse();
        return source;
    }
    getExitNodesNormalized() {
        const exit = [];
        if (this.road.lastNode() == this) {
            for (let i = this.laneNodes.length - 1; i >= (this.laneNodes.length / 2); i--) {
                exit.push(this.laneNodes[i]);
            }
        } else {
            for (let i = 0; i < (this.laneNodes.length / 2); i++) {
                exit.push(this.laneNodes[i]);
            }
        }
        return exit;
    }
    // convertGo() {
    //     for (let i = 0; i < this.laneNodes.length; i++) {
    //         const newNode = new IntersectionLaneNode(this.laneNodes[i], ["GO"]);
    //         this.laneNodes[i] = newNode;
    //     }
    // }
    //high potency and high yield autismo code down here
    // getSourceNodesNormalized() {
    //     if (this.road.lastNode() == this) {
    //         this.laneNodes.reverse();
    //     }
    //     const source = [];
    //     for (let i = (this.laneNodes.length / 2); i < this.laneNodes.length; i++) {
    //         source.push(this.laneNodes[i]);
    //     }
    //     source.reverse();
    //     if (this.road.lastNode() == this) {
    //         this.laneNodes.reverse();
    //     }
    //     return source;
    // }
    // getExitNodesNormalized() {
    //     if (this.road.lastNode() == this) {
    //         this.laneNodes.reverse();
    //     }
    //     const exit = [];
    //     for (let i = 0; i < (this.laneNodes.length / 2); i++) {
    //         exit.push(this.laneNodes[i]);
    //     }
    //     //exit.reverse();
    //     if (this.road.lastNode() == this) {
    //         this.laneNodes.reverse();
    //     }
    //     return exit;
    // }

    updateNodeSprite(two){
        two.remove(this.sprite);
        this.sprite = two.makeCircle(this.x, this.y, 5);
        this.sprite.fill = "LIGHTGRAY";
    }
}