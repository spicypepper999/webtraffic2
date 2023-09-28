import { BasicNode } from "./BasicNode.js"

export class LaneNode extends BasicNode{
    constructor(x, y, lanes=[]){
        super(x, y);
        this._lanes = lanes;
    }
    set lanes(value){
        this._lanes = lanes;
    }
    get lanes(){
        return this._lanes;
    }
}