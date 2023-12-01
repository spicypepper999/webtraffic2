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
    //temp function this is might be all broken maybe fix this idk
    //returning new roads with nodes that face intersection with direction argh so much stuff
    splitRoad(road, position, gap = 0) {
        const road1nodes = [];
        const road2nodes = [];
        const index = road.lanes[0].getIndexFromPosition(position);
        const newPosition = road.lanes[0].XYDirFromPosition(position);
        const newPosition2 = road.lanes[0].XYDirFromPosition(position + gap);
        for (let i = 0; i < road.lanes[0].nodes.length - index ; i++) {
            // road1nodes.push(road.nodes[i]);
            road1nodes.push(new RoadNode(road.nodes[i].x, road.nodes[i].y));
        }
        road1nodes.push(new RoadNode(newPosition2.x, newPosition2.y));
        road2nodes.push(new RoadNode(newPosition.x, newPosition.y));
        for (let i = road.lanes[0].nodes.length - index; i < road.lanes[0].nodes.length; i++) {
            // road2nodes.push(road.nodes[i]);
            road2nodes.push(new RoadNode(road.nodes[i].x, road.nodes[i].y));
        }
        const road1 = new Road(road1nodes, road.lanes.length, road.speedLimit, "red");
        const road2 = new Road(road2nodes, road.lanes.length, road.speedLimit, "red");

        //making sure it keeps the proper IntersectionLaneNodes
        for(let i = 0; i < road1nodes[0].laneNodes.length; i++){
            road1nodes[0].updateLaneNodeReference(road1nodes[0].laneNodes[i], road.nodes[0].laneNodes[i]);
        }

        for(let i = 0; i < road2nodes[road2nodes.length-1].laneNodes.length; i++){
            road2nodes[road2nodes.length-1].updateLaneNodeReference(road2nodes[road2nodes.length-1].laneNodes[i], road.nodes[road.nodes.length-1].laneNodes[i]);
        }

        this.roads.splice(this.roads.indexOf(road), 1);
        this.roads.push(road1, road2);
        return [road1nodes[road1nodes.length-1], road2nodes[0], newPosition.dir];
    }
    generateSplitIntersection(road1, road2, intersection){
        const gap = 50;
        const position1 = road1.findIntersectPosition(road2);
        const position2 = road2.findIntersectPosition(road1);
        const XYPosition = road1.lanes[0].XYDirFromPosition(position1);
        const index1 = this.roads.indexOf(road1);
        const index2 = this.roads.indexOf(road2);
        const roads1 = this.splitRoad(road1, position1 - gap, gap*2);
        const roads2 = this.splitRoad(road2, position2 - gap, gap*2);
        const interfaceNodes = this.determineIntersectionNodeOrder(roads1, roads2);
        this.intersections.push(new Intersection(intersection, interfaceNodes, XYPosition.x, XYPosition.y, XYPosition.dir));
    }
    determineIntersectionNodeOrder(nodes1, nodes2){
        const order = [];
        if(nodes1[2] < 0 && nodes2[2] > 0){
            order[0] = nodes1[0];
            order[1] = nodes1[1];
        }else{
            order[0] = nodes1[1];
            order[1] = nodes1[0];
        }
        if(nodes2[2] < 0 && nodes1[2] > 0){
            order[2] = nodes2[0];
            order[3] = nodes2[1];
        }else{
            order[2] = nodes2[1];
            order[3] = nodes2[0];
        }
        return order;
    }
    convertEndStop(){
        for(let road of this.roads){
            road.convertEndStop();
        }
    }
}