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

const road1 = new Road([new RoadNode(100, 200), new RoadNode(250, 350), new RoadNode(550, 350)], 2, 100, "red");
const road2 = new Road([new RoadNode(800, 500), new RoadNode(750, 350), new RoadNode(650, 350)], 2, 100, "red");
const road3 = new Road([new RoadNode(500, 100), new RoadNode(600, 100), new RoadNode(600, 300)], 2, 100, "red");
const road4 = new Road([new RoadNode(400, 700), new RoadNode(600, 700), new RoadNode(600, 400)], 2, 100, "red");

const map1 = new TrafficMap([road1, road2, road3, road4], [], [], []);

export { map1 };