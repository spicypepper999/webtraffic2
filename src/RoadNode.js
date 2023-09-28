import { BasicNode } from "./BasicNode.js";

export class RoadNode extends BasicNode{
    constructor(x, y, roads=[], laneNodes=[]){
        super(x, y);
        this._roads = roads;
        this._laneNodes = laneNodes;
    }
    set roads(value){
        this._roads = value;
    }
    get roads(){
        return this._roads;
    }
    set laneNodes(value){
        this._laneNodes = value;
    }
    get laneNodes(){
        return this._laneNodes;
    }
}