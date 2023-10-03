import { Lane } from "./Lane.js"

export class TrafficMap{
    constructor(roads, vehicles, intersections, specialNodes){
        this._roads = roads;
        this._vehicles = vehicles;
        this._intersections = intersections;
        this._specialNodes = specialNodes;
    }
    set roads(value) {
        this._roads = value;
    }
    get roads() {
        return this._roads;
    }
    set vehicles(value) {
        this._vehicles = value;
    }
    get vehicles() {
        return this._vehicles;
    }
    set intersections(value) {
        this._intersections = value;
    }
    get intersections() {
        return this._intersections;
    }
    set specialNodes(value) {
        this._specialNodes = value;
    }
    get specialNodes() {
        return this._specialNodes;
    }
    tick(delta){
        let event;
        for(let vehicle of this.vehicles){
            vehicle.move(delta);
        }
        for(let specialNode of this.specialNodes){
            event = specialNode.tick(delta, this);
        }
        // for(let intersection of this.intersections){
        //     //intersection.tick(delta);
        // }
        return {event: event}
    }
}