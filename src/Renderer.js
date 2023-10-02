//const Two = require('two');
import Two from "../node_modules/two.js/src/two.js";
import { Lane } from "./Lane.js";
import { LaneNode } from "./LaneNode.js";
import { TrafficMap } from "./TrafficMap.js";
import { BasicNode } from "./BasicNode.js";
import { Vehicle } from "./Vehicle.js";
import { Road } from "./Road.js";
import { RoadNode } from "./RoadNode.js";
import { Intersection } from "./Intersection.js";
import { IntersectionLaneNode } from "./IntersectionLaneNode.js";
import { SpecialLaneNode } from "./SpecialLaneNode.js";

let two = new Two({ fullscreen: true, autostart: true }).appendTo(document.body);

const road1 = new Road([new RoadNode(100, 100), new RoadNode(250, 250), new RoadNode(400, 250)], 2, 50, "red");
//const road1 = new Road([new RoadNode(400, 250), new RoadNode(250, 250), new RoadNode(100, 100)], 2, 50, "red");

const road2 = new Road([new RoadNode(600, 250), new RoadNode(750, 250), new RoadNode(800, 400)], 2, 50, "red");
//const road2 = new Road([new RoadNode(800, 400), new RoadNode(750, 250), new RoadNode(600, 250)], 2, 50, "red");

// const source1 = new SpecialLaneNode(road2.getEndNode().getExitNodes()[0], []);
// road2.updateLaneNodeReference(road2.getEndNode().getExitNodes()[0], source1);

const road3 = new Road([new RoadNode(300, 800), new RoadNode(500, 700), new RoadNode(500, 350)], 2, 50, "red");

const intersection1 = new Intersection(500, 300, "T", [road1.getEndNode(), road2.getStartNode(), road3.getEndNode()]);

const car1 = new Vehicle(0, 1, road2.lanes[0], 0, 100, [intersection1.interfaceNodes[1].getSourceNodes()[0], intersection1.lanes[3]]);
const car2 = new Vehicle(150, 1, road1.lanes[1], 0, 100, [intersection1.interfaceNodes[0].laneNodes[1], intersection1.lanes[2]]);
const car3 = new Vehicle(40, 1, road2.lanes[0], 0, 100, [intersection1.interfaceNodes[1].getSourceNodes()[0], intersection1.lanes[3]]);

const map1 = new TrafficMap([road1, road2, road3], [car1, car2, car3], [intersection1]);



/////
/////
/////



let nodes = [];
//roads
for (let road of map1.roads) {
    for (let lane of road.lanes) {
        for (let i = 0; i < lane.nodes.length; i++) {
            if (i >= 1) {
                let linePath = two.makeLine(lane.nodes[i - 1].x, lane.nodes[i - 1].y, lane.nodes[i].x, lane.nodes[i].y);
            }
            let laneNode = two.makeCircle(lane.nodes[i].x, lane.nodes[i].y, 3);
            if(lane.nodes[i] instanceof IntersectionLaneNode){
                nodes.push({ object: lane.nodes[i], sprite: laneNode });
            }
        }
    }
    for (let node of road.nodes) {
        let roadNode = two.makeCircle(node.x, node.y, 5);
        roadNode.fill = "lightgray";
    }
}

//intersections
for (let lane of map1.intersections[0].lanes) {
    for (let i = 0; i < lane.nodes.length; i++) {
        if (i >= 1) {
            let linePath = two.makeLine(lane.nodes[i - 1].x, lane.nodes[i - 1].y, lane.nodes[i].x, lane.nodes[i].y);
        }
        let laneNode = two.makeCircle(lane.nodes[i].x, lane.nodes[i].y, 3);
        if (lane.nodes[i] instanceof IntersectionLaneNode) {
            nodes.push({ object: lane.nodes[i], sprite: laneNode });
            if (lane.nodes[i].ruleset == "STOP" || lane.nodes[i].ruleset == "FULLSTOP") {
                laneNode.fill = "RED";
            }
            if (lane.nodes[i].ruleset == "GO") {
                laneNode.fill = "GREEN";
            }
        }
        if (lane.nodes[i] instanceof SpecialLaneNode) {
            console.log("BBB");
            laneNode.fill = "PURPLE";
        }
    }
}

//vehicles
let vehicles = [];
for (let vehicle of map1.vehicles) {
    let newVehicle = two.makeRectangle(vehicle.XYDir().x, vehicle.XYDir().y, 10, 10);
    newVehicle.rotation = vehicle.XYDir().dir;
    vehicles.push({ object: vehicle, sprite: newVehicle });
}

two.bind('update', function () {
    map1.tick((two.timeDelta / 1000));
    for (let vehicle of vehicles) {
        vehicle.sprite.position.set(vehicle.object.XYDir().x, vehicle.object.XYDir().y);
        vehicle.sprite.rotation = vehicle.object.XYDir().dir;
        vehicle.sprite.fill = vehicle.object.color;
    }
    for (let node of nodes) {
        if (node.object.ruleset[0] == "STOP" || node.object.ruleset[0] == "FULLSTOP") {
            node.sprite.fill = "RED";
        }
        if (node.object.ruleset[0] == "GO") {
            node.sprite.fill = "GREEN";
        }
        if (node.object.ruleset[0] == "YIELD") {
            node.sprite.fill = "YELLOW";
        }
    }
});