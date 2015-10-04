
exports.Joint = function Joint(scene) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    this._mesh = new THREE.Mesh(geometry, material);
    scene.add(this._mesh);
};
