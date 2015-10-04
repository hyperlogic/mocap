
function makeLineMesh(startPos, endPos, color) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(startPos, endPos);
    var material = new THREE.LineBasicMaterial({color: color});
    return new THREE.LineSegments(geometry, material);
}

exports.Joint = function Joint(scene) {
    this._group = new THREE.Object3D();
    this._group.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), 0xff0000));
    this._group.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0x00ff00));
    this._group.add(makeLineMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 0x0000ff));
    scene.add(this._group);
};

