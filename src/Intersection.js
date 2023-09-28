import { RoadNode } from "./RoadNode.js";
import { Lane } from "./Lane.js";

export class Intersection{
    constructor(x, y, type, interfaceNodes){
        this._interfaceNodes = interfaceNodes;
        this._intersectionNodes = [];
        this._lanes = [];
        this.generateIntersection(type);
        //this.generateInterfaceNodes(x, y, type);
    }
    set interfaceNodes(value){
        this._interfaceNodes = value;
    }
    get interfaceNodes(){
        return this._interfaceNodes;
    }
    set intersectionNodes(value){
        this._intersectionNodes = value;
    }
    get intersectionNodes(){
        return this._intersectionNodes;
    }
    set lanes(value){
        this._lanes = value;
    }
    get lanes(){
        return this._lanes;
    }
    // generateInterfaceNodes(x, y, type){
    //     if(type == "T"){
    //         this.interfaceNodes = [new RoadNode(x-100, y), new RoadNode(x+100, y), new RoadNode(x, y+100)];
    //     }
    // }
    generateIntersection(type){
        if(type == "T"){
            this.lanes.push(new Lane([this.interfaceNodes[1].laneNodes[0], this.interfaceNodes[0].laneNodes[0]], 10));
            this.lanes.push(new Lane([this.interfaceNodes[1].laneNodes[0], this.interfaceNodes[2].laneNodes[0]], 10));
            this.lanes.push(new Lane([this.interfaceNodes[0].laneNodes[1], this.interfaceNodes[1].laneNodes[1]], 10));
            this.lanes.push(new Lane([this.interfaceNodes[0].laneNodes[1], this.interfaceNodes[2].laneNodes[0]], 10));
            this.lanes.push(new Lane([this.interfaceNodes[2].laneNodes[1], this.interfaceNodes[0].laneNodes[0]], 10));
            this.lanes.push(new Lane([this.interfaceNodes[2].laneNodes[1], this.interfaceNodes[1].laneNodes[1]], 10));
        }
    }
}