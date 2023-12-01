import { Lane } from "../Lane.js";
import { LaneNode } from "../LaneNode.js";
import { TrafficMap } from "../TrafficMap.js";
import { BasicNode } from "../BasicNode.js";
import { Vehicle } from "../Vehicle.js";
import { Road } from "../Road.js";
import { RoadNode } from "../RoadNode.js";
import { Intersection } from "../Intersection.js";
import { IntersectionLaneNode } from "../IntersectionLaneNode.js";
import { SpecialLaneNode } from "../SpecialLaneNode.js";

const map1 = new TrafficMap();

//map1.roads.push(new Road([new RoadNode(200, 100), new RoadNode(250, 550), new RoadNode(550, 900)], 2, 100), new Road([new RoadNode(700, 100), new RoadNode(750, 350), new RoadNode(150, 900)], 2, 100));

//map1.roads.push(new Road([new RoadNode(550, 900), new RoadNode(250, 550), new RoadNode(200, 100)], 2, 100), new Road([new RoadNode(700, 100), new RoadNode(750, 350), new RoadNode(150, 900)], 2, 100));
map1.roads.push(new Road([new RoadNode(550, 900), new RoadNode(250, 550)], 2, 100), new Road([new RoadNode(150, 900), new RoadNode(750, 350)], 2, 100));

map1.generateSplitIntersection(map1.roads[0], map1.roads[1], "X2-2-2-2-ROUND");
map1.vehicles.push(new Vehicle(50, map1.roads[3].lanes[0], 0, 100));

//map1.splitRoad(map1.roads[1], 100, 50);

export { map1 };