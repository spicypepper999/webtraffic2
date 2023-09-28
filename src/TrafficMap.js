import { Lane } from "./Lane.js"

export class TrafficMap{
    constructor(roads, vehicles, intersections){
        this._roads = roads;
        this._vehicles = vehicles;
        this._intersections = intersections;
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
}