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

map1.roads.push(new Road([new RoadNode(200, 100), new RoadNode(250, 350), new RoadNode(750, 850)], 4, 100, "red"), new Road([new RoadNode(700, 100), new RoadNode(750, 350), new RoadNode(150, 900)], 4, 100, "red"));
console.log(map1.roads[0].findIntersectPosition(map1.roads[1]));
console.log(map1.roads[0].lanes[0].length());
console.log(map1.roads[0].lanes[0].getIndexFromPosition(700));

map1.vehicles.push(new Vehicle(0, map1.roads[1].lanes[0], 0, 100));

export { map1 };