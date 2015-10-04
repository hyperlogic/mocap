var Joint = require("./Joint").Joint;
var CameraFPS = require("./CameraFPS").CameraFPS;

var scene, cameraFPS, renderer;
var geometry, material, mesh;
var testJoint;

init = function init() {

    scene = new THREE.Scene();

    cameraFPS = new CameraFPS();

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: true});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    testJoint = new Joint();
    scene.add(testJoint);

    animate();
};

function animate() {
    requestAnimationFrame( animate );

    cameraFPS.update(1 / 60); // TODO: get actual dt

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.035;
    mesh.rotation.z += 0.01;

    renderer.render(scene, cameraFPS.camera);
}
