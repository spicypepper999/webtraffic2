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

const road1 = new Road([new RoadNode(100, 100), new RoadNode(250, 250), new RoadNode(500, 250)], 2, 50, "red");
const road2 = new Road([new RoadNode(800, 400), new RoadNode(750, 250), new RoadNode(700, 250)], 2, 50, "red");
const road3 = new Road([new RoadNode(500, 500), new RoadNode(600, 500), new RoadNode(600, 350)], 2, 50, "red");
const road4 = new Road([new RoadNode(100, 500), new RoadNode(300, 500)], 2, 50, "red");
const road5 = new Road([new RoadNode(400, 800), new RoadNode(400, 600)], 2, 50, "red");

const intersection1 = new Intersection("T2-2-2-STOP", [road1.lastNode(), road2.lastNode(), road3.lastNode()]);
const intersection2 = new Intersection("T2-2-2-YIELD", [road3.firstNode(), road4.lastNode(), road5.lastNode()]);

const source1 = new SpecialLaneNode(road2.firstNode().getSourceNodesNormalized()[0], ["source", [1, 1, road2.firstNode().getSourceNodesNormalized()[0].lanes[0], 0, 100, [], ], 1]);
road2.updateLaneNodeReference(road2.firstNode().getSourceNodesNormalized()[0], source1);

const exit1 = new SpecialLaneNode(road1.firstNode().getExitNodesNormalized()[0], ["exit", road1.firstNode().getExitNodesNormalized()[0].lanes[0], 100, 2]);
road1.updateLaneNodeReference(road1.firstNode().getExitNodesNormalized()[0], exit1);

//const car1 = new Vehicle(0, 1, road2.lanes[0], 0, 100, ["direction", intersection1.interfaceNodes[1].getSourceNodesNormalized()[0], intersection1.lanes[3]], );

const car2 = new Vehicle(120, 1, road1.lanes[1], 0, 100, []);
const car3 = new Vehicle(100, 1, road3.lanes[1], 0, 100, []);
const car4 = new Vehicle(5, 1, road2.lanes[1], 0, 100, []);

// const car3 = new Vehicle(40, 1, road2.lanes[0], 0, 100, ["direction", intersection1.interfaceNodes[1].getSourceNodesNormalized()[0], intersection1.lanes[3]], );
// const car4 = new Vehicle(10, 1, road5.lanes[1], 0, 100, [], );

const map1 = new TrafficMap([road1, road2, road3, road4, road5], [car2, car3, car4], [intersection1, intersection2], [source1, exit1]);
//const map1 = new TrafficMap([road1, road2, road3, road4, road5], [], [intersection1, intersection2], [source1, exit1]);

//car2.ruleset = map1.generateBruteforcePathfind(road1.lanes[1], road5.lanes[0]);
// car4.ruleset = map1.generateBruteforcePathfind(road5.lanes[1], road2.lanes[0]);
source1.ruleset[1][5] = map1.generateBruteforcePathfind(road2.firstNode().getSourceNodesNormalized()[0].lanes[0], road5.lanes[0]);

export { map1 };