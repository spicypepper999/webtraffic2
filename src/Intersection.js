import { RoadNode } from "./RoadNode.js";
import { LaneNode } from "./LaneNode.js";
import { LaneIntersectionNode } from "./LaneIntersectionNode.js";
import { Lane } from "./Lane.js";

export class Intersection{
    constructor(x, y, type, interfaceNodes){
        this._interfaceNodes = interfaceNodes;
        this._intersectionNodes = [];
        this._lanes = [];
        this._type = type;
        this.generateIntersection(type);
        this._timePassed = 0;
    }
    set type(value){
        this._type = value;
    }
    get type(){
        return this._type;
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
    set timePassed(value){
        this._timePassed = value;
    }
    get timePassed(){
        return this._timePassed;
    }
    generateIntersection(type){
        if(type == "T"){

            const newIntersection4 = new LaneIntersectionNode(this.interfaceNodes[0].getSourceNodes()[0].x, this.interfaceNodes[0].getSourceNodes()[0].y, ["GO"], this.interfaceNodes[0].getSourceNodes()[0].lanes);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getSourceNodes()[0], newIntersection4);
            this.intersectionNodes.push(newIntersection4);

            const newIntersection3 = new LaneIntersectionNode(this.interfaceNodes[0].getExitNodes()[0].x, this.interfaceNodes[0].getExitNodes()[0].y, ["GO"], this.interfaceNodes[0].getExitNodes()[0].lanes);
            this.interfaceNodes[0].updateLaneNodeReference(this.interfaceNodes[0].getExitNodes()[0], newIntersection3);
            this.intersectionNodes.push(newIntersection3);

            const newIntersection1 = new LaneIntersectionNode(this.interfaceNodes[1].getSourceNodes()[0].x, this.interfaceNodes[1].getSourceNodes()[0].y, ["YIELD"], this.interfaceNodes[1].getSourceNodes()[0].lanes);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getSourceNodes()[0], newIntersection1);
            this.intersectionNodes.push(newIntersection1);

            const newIntersection5 = new LaneIntersectionNode(this.interfaceNodes[1].getExitNodes()[0].x, this.interfaceNodes[1].getExitNodes()[0].y, ["GO"], this.interfaceNodes[1].getExitNodes()[0].lanes);
            this.interfaceNodes[1].updateLaneNodeReference(this.interfaceNodes[1].getExitNodes()[0], newIntersection5);
            this.intersectionNodes.push(newIntersection5);

            const newIntersection2 = new LaneIntersectionNode(this.interfaceNodes[2].getSourceNodes()[0].x, this.interfaceNodes[2].getSourceNodes()[0].y, ["GO"], this.interfaceNodes[2].getSourceNodes()[0].lanes);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getSourceNodes()[0], newIntersection2);
            this.intersectionNodes.push(newIntersection2);

            const newIntersection6 = new LaneIntersectionNode(this.interfaceNodes[2].getExitNodes()[0].x, this.interfaceNodes[2].getExitNodes()[0].y, ["GO"], this.interfaceNodes[2].getExitNodes()[0].lanes);
            this.interfaceNodes[2].updateLaneNodeReference(this.interfaceNodes[2].getExitNodes()[0], newIntersection6);
            this.intersectionNodes.push(newIntersection6);

             this.lanes.push(new Lane([this.interfaceNodes[0].getSourceNodes()[0], this.interfaceNodes[1].getExitNodes()[0]], 40));
             this.lanes.push(new Lane([this.interfaceNodes[0].getSourceNodes()[0], this.interfaceNodes[2].getExitNodes()[0]], 40));
             this.lanes.push(new Lane([this.interfaceNodes[1].getSourceNodes()[0], this.interfaceNodes[0].getExitNodes()[0]], 40));
              this.lanes.push(new Lane([this.interfaceNodes[1].getSourceNodes()[0], this.interfaceNodes[2].getExitNodes()[0]], 40));
              this.lanes.push(new Lane([this.interfaceNodes[2].getSourceNodes()[0], this.interfaceNodes[0].getExitNodes()[0]], 40));
              this.lanes.push(new Lane([this.interfaceNodes[2].getSourceNodes()[0], this.interfaceNodes[1].getExitNodes()[0]], 40));

            newIntersection1.ruleset = ["YIELD", this.lanes[0], 0];
        }
    }

    tick(delta){
        this.timePassed += delta;
        if(this.type == "T"){
            if(this.timePassed > 6){
                this.timePassed = 0;
                this.switchLights();
            }
        }
    }

    switchLights(){
        if(this.type == "T"){
            if(this.intersectionNodes[0].ruleset != "GO"){
                this.intersectionNodes[0].ruleset = "GO"; //righttop
                this.intersectionNodes[1].ruleset = "GO"; //bottomleft
                this.intersectionNodes[2].ruleset = "GO"; //leftbottom
                this.intersectionNodes[3].ruleset = "GO"; //lefttop
                this.intersectionNodes[4].ruleset = "GO"; //rightbottom
                this.intersectionNodes[5].ruleset = "FULLSTOP"; //bottomright
            }else{
                this.intersectionNodes[0].ruleset = "GO";
                this.intersectionNodes[1].ruleset = "GO";
                this.intersectionNodes[2].ruleset = "GO";
                this.intersectionNodes[3].ruleset = "GO";
                this.intersectionNodes[4].ruleset = "GO";
                this.intersectionNodes[5].ruleset = "GO";
            }
        }
    }
}