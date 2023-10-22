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
//import { map1 } from "./maps/map1.js";
import { map1 } from "./maps/map2.js";

let two = new Two({ fullscreen: true, autostart: true }).appendTo(document.body);

initializeRoadSprites(map1);
initializeIntersectionSprites(map1);
initializeVehicleSprites(map1);
const nodes = initializeNodeSprites(map1);

function initializeNodeSprites(map){
    const laneNodes = map.getLaneNodes();
    const roadNodes = map.getRoadNodes();
    const intersectionNodes = map.getIntersectionNodes();
    const nodes = [];
    for (let node of laneNodes){
        const laneNode = two.makeCircle(node.x, node.y, 3);
        if(node instanceof SpecialLaneNode){
            laneNode.fill = "purple";
        }
    }
    for (let node of roadNodes){
        // let roadNode = two.makeCircle(node.x, node.y, 5);
        // roadNode.fill = "lightgray";
    }
    for (let node of intersectionNodes){
        const laneNode = two.makeCircle(node.x, node.y, 3);
        nodes.push({ object: node, sprite: laneNode });
    }
    return nodes;
}

// function initializeIntersectionSprites(map) {
//     for (let intersection of map.intersections) {
//         for (let lane of intersection.lanes) {
//             for (let i = 0; i < lane.nodes.length; i++) {
//                 if (i >= 1) {
//                     let linePath = two.makeLine(lane.nodes[i - 1].x, lane.nodes[i - 1].y, lane.nodes[i].x, lane.nodes[i].y);
//                 }
//             }
//         }
//     }
// }

function initializeIntersectionSprites(map) {
    for (let intersection of map.intersections) {
        for (let lane of intersection.lanes) {
            for (let i = 0; i < lane.nodes.length; i++) {
                if (i >= 1) {
                    let startX = lane.nodes[i - 1].x;
                    let startY = lane.nodes[i - 1].y;
                    let endX = lane.nodes[i].x;
                    let endY = lane.nodes[i].y;

                    let dx = endX - startX;
                    let dy = endY - startY;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let angle = Math.atan2(dy, dx);

                    let roadSegment = two.makeRectangle((startX + endX) / 2, (startY + endY) / 2, 16, distance); 
                    roadSegment.rotation = angle + Math.PI/2;
                    roadSegment.fill = new Two.Texture('../textures/roadsmall2.png');
                }
            }
        }
    }
}

function initializeVehicleSprites(map) {
    for (let vehicle of map.vehicles) {
        vehicle.sprite = two.makeRectangle(0, 0, 10, 10);
    }
}

// function initializeRoadSprites(map) {
//     for (let road of map.roads) {
//         for (let lane of road.lanes) {
//             for (let i = 0; i < lane.nodes.length; i++) {
//                 if (i >= 1) {
//                     let linePath = two.makeLine(lane.nodes[i - 1].x, lane.nodes[i - 1].y, lane.nodes[i].x, lane.nodes[i].y);
//                 }
//             }
//         }
//     }
// }

function initializeRoadSprites(map, roadTexture) {
    for (let road of map.roads) {
        for (let lane of road.lanes) {
            for (let i = 0; i < lane.nodes.length; i++) {
                if (i >= 1) {
                    let startX = lane.nodes[i - 1].x;
                    let startY = lane.nodes[i - 1].y;
                    let endX = lane.nodes[i].x;
                    let endY = lane.nodes[i].y;

                    let dx = endX - startX;
                    let dy = endY - startY;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let angle = Math.atan2(dy, dx);

                    let roadSegment = two.makeRectangle((startX + endX) / 2, (startY + endY) / 2, 16, distance); 
                    roadSegment.rotation = angle + Math.PI/2;
                    roadSegment.fill = new Two.Texture('../textures/roadsmall2.png');
                }
            }
        }
    }
}



two.bind('update', function () {
    const events = map1.tick((two.timeDelta / 1000));

    //EVENT SYSTEM TO HANDLE SPRITE CREATION/DELETION WHEN SPAWNING/REMOVING VEHICLES
    if (events.length > 0) {
        for (let event of events) {
            if (event[0] == "source") {
                for (let i = 0; i < event[1].length; i++) {
                    const vehicle = map1.vehicles[map1.vehicles.indexOf(event[1][i])];
                    two.remove(vehicle.sprite);
                    vehicle.sprite = two.makeRectangle(0, 0, 10, 10);
                }
            }
            if (event[0] == "exit") {
                for (let i = 0; i < event[1].length; i++) {
                    const vehicle = map1.vehicles[map1.vehicles.indexOf(event[1][i])];
                    two.remove(vehicle.sprite);
                    map1.deleteVehicle(vehicle);
                }
            }
        }
    }

    for (let vehicle of map1.vehicles) {
        vehicle.updateSprite();
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
    //
    //
    document.querySelector("#mousecoords").innerHTML = mousePosition[0] + " " + mousePosition[1];
    //document.querySelector("#counter").innerHTML = map1.specialNodes[1].counter;
    //
    //

});

let mousePosition = [];
addEventListener("mousemove", (ev) => {
    mousePosition = [ev.x, ev.y];
});