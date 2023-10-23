export class BasicNode {
    constructor(x, y, rotation = 0) {
        this._x = x;
        this._y = y;
        this._rotation = rotation;
    }
    set x(value) {
        this._x = value;
    }
    get x() {
        return this._x;
    }
    set y(value) {
        this._y = value;
    }
    get y() {
        return this._y;
    }
    set rotation(value) {
        this._rotation = value;
    }
    get rotation() {
        return this._rotation;
    }
    xy() {
        return { x: this._x, y: this._y };
    }
    setXY(x, y) {
        this._x = x;
        this._y = y;
    }
    setToNode(node) {
        this._x = node.x;
        this._y = node.y;
    }
    distanceXTo(node) {
        return (this._x - node.x);
    }
    distanceYTo(node) {
        return (this._y - node.y);
    }
    distanceTo(node) {
        return Math.sqrt((this.distanceXTo(node) ** 2) + (this.distanceYTo(node) ** 2));
    }
    directionTo(node) {
        return Math.atan2(this.distanceYTo(node), this.distanceXTo(node));
    }
}