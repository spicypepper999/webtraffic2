import { BasicNode } from "./BasicNode.js";
import { LaneNode } from "./LaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";

export class Lane {
    constructor(nodes, speedLimit, color="red") {
        this._nodes = nodes;
        this.addSelfToNodes();
        this._speedLimit = speedLimit;
        this._color = color;
        this._vehicles = [];
    }
    set nodes(value) {
        this._nodes = value;
    }
    get nodes() {
        return this._nodes;
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
    set vehicles(value) {
        this._vehicles = value;
    }
    get vehicles() {
        return this._vehicles;
    }
    //add reference of self to nodes
    addSelfToNodes(){
        for(let node of this.nodes){
            if(node instanceof LaneNode && !node.lanes.includes(this)){
                node.lanes.push(this);
            }
        }
    }
    //Get total length of lane
    length() {
        let length = 0;
        let nodeCompare = this.nodes[0];
        for (let node of this.nodes) {
            length += node.distanceTo(nodeCompare);
            nodeCompare = node;
        }
        return length;
    }
    //Get coordinates and direction from given position.
    XYDirFromPosition(position) {
        const node = new BasicNode(0,0);
        let dir;
        //if position <= 0, sets coordinates to first node, pointing to second node
        if (position <= 0) {
            node.setToNode(this.nodes[0]);
            dir = Math.atan2(this.nodes[1].y - this.nodes[0].y, this.nodes[1].x - this.nodes[0].y);
            return {x: node.x, y: node.y, dir};
        }
        //if position > total length, sets coordinates to last node, pointing from second-to-last node to last node
        if (position > this.length()) {
            node.setToNode(this.nodes[this.nodes.length - 1]);
            dir = Math.atan2(this.nodes[this.nodes.length - 1].y - this.nodes[this.nodes.length - 2].y, this.nodes[this.nodes.length - 1].x - this.nodes[this.nodes.length - 2].y);
            return {x: node.x, y: node.y, dir};
        }
        //otherwise, go along lane and calculate coordinates/direction
        let distanceLeft = position;
        node.setToNode(this.nodes[0]);
        for (let i = 1; i < this.nodes.length && distanceLeft > 0; i++) {
            if (distanceLeft < node.distanceTo(this.nodes[i])) {
              let dx = (Math.cos(node.directionTo(this.nodes[i])) * distanceLeft);
              let dy = (Math.sin(node.directionTo(this.nodes[i])) * distanceLeft);
              dx = node.x - dx;
              dy = node.y - dy;
              node.x = dx;
              node.y = dy;
              dir = Math.atan2(this.nodes[i].y - this.nodes[i-1].y, this.nodes[i].x - this.nodes[i-1].x);
              return {x: node.x, y: node.y, dir};
            }
            distanceLeft -= node.distanceTo(this.nodes[i]);
            node.setToNode(this.nodes[i]);
            dir = Math.atan2(this.nodes[i].y - this.nodes[i-1].y, this.nodes[i].x - this.nodes[i-1].x);
          }
          return {x: node.x, y: node.y, dir};
    }
    //Get position of given node along lane (node must be part of lane);
    positionOfNode(node){
        let position = 0;
        let nodePrevious = this.nodes[0];
        for(let nodeCompare of this.nodes){
            position += nodePrevious.distanceTo(nodeCompare);
            if(node == nodeCompare){
                return position;
            }
            nodePrevious = nodeCompare;
        }
        return position;
    }
    reverse(){
        this.nodes.reverse();
    }
    returnObstacles(position, distance, vehicle){
        const obstacles = [];
        for(let vehicle2 of this.vehicles){
            if((vehicle != vehicle2) && ((vehicle2.position - position) <= distance) && ((vehicle2.position - position) >= 0)){
                obstacles.push(vehicle2);
            }
        }
        for(let node of this.nodes){
            if(((this.positionOfNode(node) - position) <= distance) && ((this.positionOfNode(node) - position) >= 0) && node.isObstacle(vehicle)){
                obstacles.push(node);
            }
        }
        //console.log(obstacles);
        return obstacles;
    }
    returnVehicles(position, distance){
        const obstacles = [];
        for(let vehicle of this.vehicles){
            if(((vehicle.position - position) <= distance) && ((vehicle.position - position) >= 0)){
                obstacles.push(vehicle);
            }
        }
        return obstacles;
    }
    //returns old and new node so road can update its own references
    convertEndStop(){
        const newNode = new IntersectionLaneNode(this.nodes[this.nodes.length - 1], ["FULLSTOP"]);
        const oldNode = this.nodes[this.nodes.length - 1];
        this.nodes[this.nodes.length - 1] = newNode;
        return {oldNode: oldNode, newNode: newNode};
    }
}