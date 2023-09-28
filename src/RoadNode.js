import { BasicNode } from "./BasicNode.js";

export class RoadNode extends BasicNode{
    constructor(x, y, road=null, laneNodes=[]){
        super(x, y);
        this._road = road;
        this._laneNodes = laneNodes;
    }
    set road(value){
        this._road = value;
    }
    get road(){
        return this._road;
    }
    set laneNodes(value){
        this._laneNodes = value;
    }
    get laneNodes(){
        return this._laneNodes;
    }
}