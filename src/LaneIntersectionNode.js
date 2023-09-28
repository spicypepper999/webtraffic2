import { BasicNode } from "./BasicNode.js";

export class LaneIntersectionNode extends BasicNode{
    constructor(x, y, ruleset){
        super(x, y);
        this._ruleset = ruleset;
        this._currentCar = null;
    }
    set ruleset(value){
        this._ruleset = value;
    }
    get ruleset(){
        return this._ruleset;
    }
    set currentCar(value){
        this._currentCar = value;
    }
    get currentCar(){
        return this._currentCar;
    }
}