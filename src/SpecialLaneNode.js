import { LaneNode } from "./LaneNode.js";

export class SpecialLaneNode extends LaneNode{
    constructor(laneNode, ruleset){
        super(laneNode.x, laneNode.y, laneNode.lanes);
        this._ruleset = ruleset;
    }
    set ruleset(value){
        this._ruleset = value;
    }
    get ruleset(){
        return this._ruleset;
    }
    tick(){

    }
    checkRuleset(){
        
    }
}