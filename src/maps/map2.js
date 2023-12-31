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

const intersection1 = new Intersection("X2-2-2-2-STOP", [road1.lastNode(), road2.lastNode(), road3.lastNode(), road4.lastNode()], 600, 350, 0);

const source1 = new SpecialLaneNode(road1.firstNode().getSourceNodesNormalized()[0], ["source", [1,  road1.firstNode().getSourceNodesNormalized()[0].lanes[0], 0, 100, [], ], 2]);
road1.updateLaneNodeReference(road1.firstNode().getSourceNodesNormalized()[0], source1);

const exit1 = new SpecialLaneNode(road4.firstNode().getExitNodesNormalized()[0], ["exit", road4.firstNode().getExitNodesNormalized()[0].lanes[0], 100, 2]);
road4.updateLaneNodeReference(road4.firstNode().getExitNodesNormalized()[0], exit1);

const source2 = new SpecialLaneNode(road2.firstNode().getSourceNodesNormalized()[0], ["source", [1,  road2.firstNode().getSourceNodesNormalized()[0].lanes[0], 0, 100, ["direction", intersection1.intersectionNodes[3], road3.lanes[0]], ], 2]);
road2.updateLaneNodeReference(road2.firstNode().getSourceNodesNormalized()[0], source2);

const exit2 = new SpecialLaneNode(road3.firstNode().getExitNodesNormalized()[0], ["exit", road3.firstNode().getExitNodesNormalized()[0].lanes[0], 100, 2]);
road3.updateLaneNodeReference(road3.firstNode().getExitNodesNormalized()[0], exit2);

const map1 = new TrafficMap([road1, road2, road3, road4], [], [intersection1], [source1, source2, exit1, exit2]);
source1.ruleset[1][4] = map1.generateBruteforcePathfind(road1.firstNode().getSourceNodesNormalized()[0].lanes[0], road3.lanes[0]);
source2.ruleset[1][4] = map1.generateBruteforcePathfind(road2.firstNode().getSourceNodesNormalized()[0].lanes[0], road4.lanes[0]);

export { map1 };