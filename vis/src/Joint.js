
function makeLineMesh(startPos, endPos, color) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(startPos, endPos);
    var material = new THREE.LineBasicMaterial({color: color});
    return new THREE.LineSegments(geometry, material);
}

// constructor
exports.Joint = function Joint(scene) {
    THREE.Object3D.call(this);

    this.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), 0xff0000));
    this.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0x00ff00));
    this.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), 0x0000ff));
};

// Joint is derived from THREE.Object3D.
exports.Joint.prototype = Object.create(THREE.Object3D.prototype);
exports.Joint.prototype.constructor = exports.Joint;



