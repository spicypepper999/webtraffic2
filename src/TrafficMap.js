import { Lane } from "./Lane.js"
import { Road } from "./Road.js"
import { RoadNode } from "./RoadNode.js"
import { Vehicle } from "./Vehicle.js"
import { SpecialLaneNode } from "./SpecialLaneNode.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";
import { Intersection } from "./Intersection.js";

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
    //temp function this is all broken fix this
    splitRoad(road, position, gap = 0) {
        const road1nodes = [];
        const road2nodes = [];
        const index = road.lanes[0].getIndexFromPosition(position);
        const newPosition = road.lanes[0].XYDirFromPosition(position);
        const newPosition2 = road.lanes[0].XYDirFromPosition(position + gap);
        for (let i = 0; i < road.lanes[0].nodes.length - index ; i++) {
            road1nodes.push(road.nodes[i]);
        }
        road1nodes.push(new RoadNode(newPosition2.x, newPosition2.y));
        road2nodes.push(new RoadNode(newPosition.x, newPosition.y));
        for (let i = road.lanes[0].nodes.length - index; i < road.lanes[0].nodes.length; i++) {
            road2nodes.push(road.nodes[i]);
        }
        const road1 = new Road(road1nodes, road.lanes.length, road.speedLimit, "red", false);
        const road2 = new Road(road2nodes, road.lanes.length, road.speedLimit, "red", false);
        this.roads.splice(this.roads.indexOf(road), 1);
        this.roads.push(road1, road2);
    }
    generateSplitIntersection(road1, road2, intersection){
        const gap = 50;
        const position1 = road1.findIntersectPosition(road2);
        const position2 = road2.findIntersectPosition(road1);
        const XYPosition = road1.lanes[0].XYDirFromPosition(position1);
        const index1 = this.roads.indexOf(road1);
        const index2 = this.roads.indexOf(road2);
        this.splitRoad(road1, position1 - gap, gap*2);
        this.splitRoad(road2, position2 - gap, gap*2);
        this.intersections.push(new Intersection(intersection, [this.roads[index2+1].firstNode(), this.roads[index2].lastNode(), this.roads[this.roads.length-1].firstNode(),  this.roads[this.roads.length-2].lastNode()], XYPosition.x, XYPosition.y, XYPosition.dir));
    }
    convertEndStop(){
        for(let road of this.roads){
            road.convertEndStop();
        }
    }
}