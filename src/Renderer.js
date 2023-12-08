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

//this is how i choose the map. i uncomment only one of the lines. there has to be a better way than this insane autismo 

//import { map1 } from "./maps/map1.js";
//import { map1 } from "./maps/map2.js";
//import { map1 } from "./maps/map3.js";
import { map1 } from "./maps/map4.js";
//import { map1 } from "./maps/map5.js";
//import { map1 } from "./maps/map6.js";

//

let two = new Two({ fullscreen: true, autostart: true }).appendTo(document.body);

const roadTexture = new Two.Texture('../textures/roadsmall2.png');
const vehicleTexture = new Two.Texture('../textures/carImage.png');

initializeAllSprites(map1, roadTexture, vehicleTexture);
const nodes = map1.getIntersectionNodes();

function initializeIntersectionSprites(map, roadTexture) {
    for (let intersection of map.intersections) {
        for (let lane of intersection.lanes) {
            lane.updateAllSprites(two, roadTexture);
        }
    }
}

function initializeVehicleSprites(map, vehicleTexture) {
    for (let vehicle of map.vehicles) {
        vehicle.updateVehicleSprite(two, vehicleTexture);
    }
}

function initializeRoadSprites(map, roadTexture) {
    for (let road of map.roads) {
        road.updateRoadSprites(two, roadTexture);
    }
}

function initializeAllSprites(map, roadTexture, vehicleTexture) {
    initializeRoadSprites(map, roadTexture);
    initializeIntersectionSprites(map, roadTexture);
    initializeVehicleSprites(map, vehicleTexture);
}


two.bind('update', function (frame) {
    const events = map1.tick((two.timeDelta / 1000));

    //EVENT SYSTEM TO HANDLE SPRITE CREATION/DELETION WHEN SPAWNING/REMOVING VEHICLES
    if (events.length > 0) {
        for (let event of events) {
            if (event[0] == "source") {
                for (let i = 0; i < event[1].length; i++) {
                    const vehicle = map1.vehicles[map1.vehicles.indexOf(event[1][i])];
                    vehicle.updateVehicleSprite(two, vehicleTexture);
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
    for (let node of nodes) {
        node.updateNodeSprite(two);
    }
    for (let vehicle of map1.vehicles) {
        vehicle.updateVehicleSprite(two, vehicleTexture);
    }
    //
    //


    document.querySelector("#mousecoords").innerHTML = mousePosition[0] + " " + mousePosition[1];
    // document.querySelector("#counter").innerHTML = map1.specialNodes[2].counter + " " + map1.specialNodes[3].counter;
    // document.querySelector("#frames").innerHTML = frame;

    //
    //

});

const mousePosition = [];
addEventListener("mousemove", (ev) => {
    mousePosition[0] = ev.x;
    mousePosition[1] = ev.y;
});

const nodeList = [];
addEventListener("mouseup", (ev) => {
    //const newNode = new RoadNode(mousePosition[0], mousePosition[1]);
    nodeList.push(new RoadNode(mousePosition[0], mousePosition[1]));
    const newRoad = new Road(nodeList, 2, 100);
    newRoad.updateRoadSprites(two, roadTexture);
    map1.roads.push(newRoad);
    for (let i = 0; i < map1.roads.length - 1; i++) {
        if (map1.roads[map1.roads.length - 1].findIntersectPosition(map1.roads[i]) != null) {
            map1.generateSplitIntersection(map1.roads[map1.roads.length - 1], map1.roads[i], "X2-2-2-2-ROUND");
            map1.roads[map1.roads.length - 2].updateRoadSprites(two, roadTexture);
            map1.roads[map1.roads.length - 1].updateRoadSprites(two, roadTexture);
            map1.intersections[map1.intersections.length - 1].updateAllSprites(two, roadTexture);
            //initializeIntersectionSprites(map1, roadTexture);
        }
    }
    while(nodeList.length > 0){
        nodeList.pop();
    }
    console.log(nodeList);
});

addEventListener("mousedown", (ev) => {
    nodeList.push(new RoadNode(mousePosition[0], mousePosition[1]));
});

addEventListener("keypress", (ev) => {
    if (ev.key === "a") {
        
    }
});