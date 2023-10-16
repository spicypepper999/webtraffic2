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

const road1 = new Road([new RoadNode(100, 100), new RoadNode(250, 250), new RoadNode(500, 250)], 6, 50, "red");
const road2 = new Road([new RoadNode(800, 400), new RoadNode(750, 250), new RoadNode(700, 250)], 6, 50, "red");

const mark1 = new SpecialLaneNode(road2.lastNode().getExitNodesNormalized()[1], []);
road2.updateLaneNodeReference(road2.lastNode().getExitNodesNormalized()[1], mark1);

const car1 = new Vehicle(5, 1, road2.lanes[0], 0, 100, [], );

const map1 = new TrafficMap([road1, road2], [car1], [], [mark1]);

export { map1 };