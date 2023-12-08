import { BasicNode } from "./BasicNode.js";
import { RoadNode } from "./RoadNode.js";
import { Lane } from "./Lane.js";
import { LaneNode } from "./LaneNode.js";

export class Road {
    constructor(nodes = [], lanes = 2, speedLimit = 50, color = "red") {
        this._nodes = nodes;
        this.addSelfToNodes();
        this._speedLimit = speedLimit;
        this._color = color;
        this._lanes = [];
        this._lanes = this.generateLanes(nodes, lanes, 20);
        this.convertEndStop();
        this._sprites = [];
        //this.initializeRoadSprites('../textures/roadsmall2.png');
    }
    set nodes(value) {
        this._nodes = value;
    }
    get nodes() {
        return this._nodes;
    }
    set lanes(value) {
        this._lanes = value;
    }
    get lanes() {
        return this._lanes;
    }
    set speedLimit(value) {
        this._speedLimit = value;
    }
    get speedLimit() {
        return this._speedLimit;
    }
    set color(value) {
        this._color = value;
    }
    get color() {
        return this._color;
    }
    set sprites(value) {
        this._sprites = value;
    }
    get sprites() {
        return this._sprites;
    }
    firstNode() {
        return this.nodes[0];
    }
    lastNode() {
        return this.nodes[this.nodes.length - 1];
    }
    length() {
        let length = 0;
        let nodeCompare = this.nodes[0];
        for (let node of this.nodes) {
            length += node.distanceTo(nodeCompare);
            nodeCompare = node;
        }
        return length;
    }
    getSourceLanes() {
        const source = [];
        for (let i = 0; i < (this.nodes.length / 2); i++) {
            source.push(this.nodes[i]);
        }
        return source;
    }
    getExitLanes() {
        const exit = [];
        for (let i = (this.nodes.length / 2); i < this.nodes.length; i++) {
            exit.push(this.nodes[i]);
        }
        exit.reverse();
        return exit;
    }
    //add reference of self to nodes
    addSelfToNodes() {
        for (let node of this.nodes) {
            if (node instanceof RoadNode && node.road != this) {
                node.road = this;
            }
        }
    }
    //generates lanes, math logic is for keeping road width the same throughout sharp turns
    generateLanes(nodes, lanes, laneWidth) {
        const newLanes = [];
        for (let i = 0; i < lanes; i++) {
            let offset = (i - (lanes / 2 - 0.5)) * laneWidth;
            const newLane = new Lane([], this._speedLimit, this._color);
            for (let j = 0; j < nodes.length; j++) {
                const prevNode = nodes[j - 1];
                const node = nodes[j];
                const nextNode = nodes[j + 1];

                const bisectorAngle = this.calculateBisectorAngle(prevNode, node, nextNode);

                const angle1 = prevNode == undefined ? 0 : Math.atan2(node.y - prevNode.y, node.x - prevNode.x);
                const angle2 = nextNode == undefined ? 0 : Math.atan2(nextNode.y - node.y, nextNode.x - node.x);
                const angleDiff = angle2 - angle1;

                // Normalize angleDiff to [-PI, PI]
                const normalizedAngleDiff = angleDiff - Math.PI * 2 * Math.floor((angleDiff + Math.PI) / (Math.PI * 2));

                let adjustedOffset = offset;

                if (prevNode !== undefined && nextNode !== undefined) {
                    adjustedOffset = offset / Math.cos(normalizedAngleDiff / 2);
                }

                const dx = (Math.cos(bisectorAngle + Math.PI / 2) * adjustedOffset);
                const dy = (Math.sin(bisectorAngle + Math.PI / 2) * adjustedOffset);

                const newNode = new LaneNode(node.x + dx, node.y + dy);
                newLane.nodes.push(newNode);
                nodes[j].laneNodes.push(newNode);
            }
            newLane.addSelfToNodes();
            newLanes.push(newLane);
        }
        //reverses lanes for opposing traffic
        for (let i = 0; i < newLanes.length; i++) {
            if (i < (newLanes.length / 2)) {
                newLanes[i].reverse();
            }
        }
        return newLanes;
    }
    //chatgpt part 2 electric boogaloo
    calculateBisectorAngle(prevNode, node, nextNode) {
        if (prevNode == undefined) {
            return Math.atan2(nextNode.y - node.y, nextNode.x - node.x);
        } else if (nextNode == undefined) {
            return Math.atan2(node.y - prevNode.y, node.x - prevNode.x);
        } else {
            const angle1 = Math.atan2(node.y - prevNode.y, node.x - prevNode.x);
            const angle2 = Math.atan2(nextNode.y - node.y, nextNode.x - node.x);
            const angleDiff = angle2 - angle1;

            // Normalize angleDiff to [-PI, PI]
            const normalizedAngleDiff = angleDiff - Math.PI * 2 * Math.floor((angleDiff + Math.PI) / (Math.PI * 2));
            return angle1 + normalizedAngleDiff / 2;
        }
    }
    reverseOrder() {
        this.lanes.reverse();
    }
    convertEndStop() {
        for (let lane of this.lanes) {
            const nodes = lane.convertEndStop();
            this.updateLaneNodeReference(nodes.oldNode, nodes.newNode);
        }
    }
    convertEndGo() {
        for (let lane of this.lanes) {
            const nodes = lane.convertEndGo();
            this.updateLaneNodeReference(nodes.oldNode, nodes.newNode);
        }
    }
    updateLaneNodeReference(oldNode, newNode) {
        for (let node of this.nodes) {
            //for of loop didnt work here with references
            for (let i = 0; i < node.laneNodes.length; i++) {
                if (node.laneNodes[i] == oldNode) {
                    node.laneNodes[i] = newNode;
                }
            }
        }
        for (let lane of this.lanes) {
            //for of loop didnt work here with references
            for (let i = 0; i < lane.nodes.length; i++) {
                if (lane.nodes[i] == oldNode) {
                    lane.nodes[i] = newNode;
                }
            }
        }
    }
    findIntersectPosition(road) {
        const thisLength = this.lanes[0].length();
        const nextLength = road.lanes[0].length();

        let thisPosition = 0;
        let nextPosition = 0;
        let minDistance = thisLength + nextLength;
        for (let i = 0; i < thisLength; i++) {
            const thisCoord = this.lanes[0].XYDirFromPosition(i);
            for (let j = 0; j < nextLength; j++) {
                const nextCoord = road.lanes[0].XYDirFromPosition(j);
                const distance = Math.sqrt(((thisCoord.x - nextCoord.x) ** 2) + ((thisCoord.y - nextCoord.y) ** 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    thisPosition = i;
                    nextPosition = j;
                }
            }
        }
        if (minDistance < 1) {
            return thisPosition;
        } else {
            return null;
        }
    }

    // updateRoadSprites(roadTexture, two) {
    //     while(this.sprites.length > 0){
    //         const currentSprite = this.sprites.pop();
    //         two.remove(currentSprite);
    //     }
    //     for (let lane of this.lanes) {
    //         for (let i = 0; i < lane.nodes.length; i++) {
    //             if (i >= 1) {
    //                 const startX = lane.nodes[i - 1].x;
    //                 const startY = lane.nodes[i - 1].y;
    //                 const endX = lane.nodes[i].x;
    //                 const endY = lane.nodes[i].y;

    //                 const dx = endX - startX;
    //                 const dy = endY - startY;
    //                 const distance = Math.sqrt(dx * dx + dy * dy);
    //                 const angle = Math.atan2(dy, dx);

    //                 const roadSegment = two.makeRectangle((startX + endX) / 2, (startY + endY) / 2, 20, distance);
    //                 roadSegment.rotation = angle + Math.PI / 2;
    //                 roadSegment.fill = roadTexture;
    //                 this.sprites.push(roadSegment);
    //             }
    //         }
    //     }
    // }

    //this is where we generate the sprites!!!
    updateRoadSprites(two, roadTexture) {
        for(let lane of this.lanes){
            lane.updateAllSprites(two, roadTexture);
        }
    }

    removeRoadSprites(two) {
        for(let lane of this.lanes){
            lane.removeSprites(two);
        }
    }
}