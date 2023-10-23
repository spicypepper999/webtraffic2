import { Lane } from "./Lane.js"
import { Road } from "./Road.js"
import { Vehicle } from "./Vehicle.js"
import { SpecialLaneNode } from "./SpecialLaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";

export class TrafficMap {
    constructor(roads = [], vehicles = [], intersections = [], specialNodes = []) {
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
    deleteVehicle(vehicle) {
        vehicle.lane.vehicles.splice(vehicle.lane.vehicles.indexOf(vehicle), 1);
        this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
    }
    generateBruteforcePathfind(lane1, lane2, directions = [], visitedLanes = []) {
        if (lane1.lastNode().lanes.includes(lane2)) {
            return [...directions, "direction", lane1.lastNode(), lane2];
        }
        if (lane1.lastNode().lanes.length == 1 && lane1.lastNode().lanes[0] == lane1) {
            return null;
        }
        visitedLanes.push(lane1);
        for (let lane of lane1.lastNode().lanes) {
            if (lane != lane1 && !visitedLanes.includes(lane)) {
                let newDirections = [...directions, "direction", lane1.lastNode(), lane];
                let newDirections2 = this.generateBruteforcePathfind(lane, lane2, newDirections, visitedLanes);
                if (newDirections2 != null) {
                    return newDirections2;
                }
            }
        }
        return null;
    }
    tick(delta) {
        const event = [];
        for (let vehicle of this.vehicles) {
            vehicle.move(delta);
        }
        for (let specialNode of this.specialNodes) {
            const nodeEvent = specialNode.tick(delta, this);
            if (nodeEvent != undefined) {
                event.push(nodeEvent);
            }
        }
        // for(let intersection of this.intersections){
        //     //intersection.tick(delta);
        // }
        //console.log(event);
        return event;
    }
    getIntersectionNodes() {
        const nodes = [];
        for (let road of this.roads) {
            for (let roadNode of road.nodes) {
                for (let node of roadNode.laneNodes) {
                    if (node instanceof IntersectionLaneNode && !nodes.includes(node)) {
                        nodes.push(node);
                    }
                }
            }
        }
        for (let intersection of this.intersections) {
            for (let node of intersection.intersectionNodes) {
                if (node instanceof IntersectionLaneNode && !nodes.includes(node)) {
                    nodes.push(node);
                }
            }
        }
        return nodes;
    }
    getLaneNodes() {
        const nodes = [];
        for (let road of this.roads) {
            for (let roadNode of road.nodes) {
                for (let node of roadNode.laneNodes) {
                    if (!nodes.includes(node)) {
                        nodes.push(node);
                    }
                }
            }
        }
        for (let intersection of this.intersections) {
            for (let node of intersection.intersectionNodes) {
                if (!nodes.includes(node)) {
                    nodes.push(node);
                }
            }
        }
        for (let node of this.specialNodes) {
            if (!nodes.includes(node)) {
                nodes.push(node);
            }
        }
        return nodes;
    }
    getRoadNodes() {
        const nodes = [];
        for (let road of this.roads) {
            for (let roadNode of road.nodes) {
                if (!nodes.includes(roadNode)) {
                    nodes.push(roadNode);
                }
            }
        }
        return nodes;
    }
    //temp function
    // splitRoad(road, position) {
    //     const road1 = new Road();
    //     const road2;
    // }
}