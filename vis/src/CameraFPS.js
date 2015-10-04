var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;
var KEY_A = 65;
var KEY_S = 83;
var KEY_W = 87;
var KEY_D = 68;
var KEY_E = 69;
var KEY_C = 67;

var MAX_LINEAR_SPEED = 5.0;
var MAX_ANGULAR_SPEED = 1.0;

// constructor
exports.CameraFPS = function CameraFPS() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.camera.position.z = 10;

    var self = this;
    document.addEventListener('keydown', function (e) { self.onKeyDown(e); });
    document.addEventListener('keyup', function (e) { self.onKeyUp(e); });

    this._desiredLinearVelocity = new THREE.Vector3(0, 0, 0);
    this._desiredAngularVelocity = new THREE.Vector3(0, 0, 0);
    this._keysDown = {};
};

exports.CameraFPS.prototype.update = function (dt) {

    var q = this.camera.quaternion.clone();

    // transform desiredLinearVelocity into world frame.
    var dp = new THREE.Vector3(0, 0, 0);
    dp.addScaledVector(this._desiredLinearVelocity, dt);
    dp.applyQuaternion(q);
    this.camera.position.add(dp);

    var dq = new THREE.Quaternion();
    var angularSpeed = this._desiredAngularVelocity.length();
    var axis = this._desiredAngularVelocity.clone().normalize();
    dq.setFromAxisAngle(axis, angularSpeed * dt);

    console.log("dq = (" + dq.x + ", " + dq.y + ", " + dq.z + ", " + dq.w + ")");

    this.camera.rotation.setFromQuaternion(q.multiply(dq));
};

exports.CameraFPS.prototype.onKeyDown = function (e) {

    // filter out repeat keypress events
    if (this._keysDown[e.keyCode]) {
        return;
    } else {
        this._keysDown[e.keyCode] = true;
    }

    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
        this._desiredAngularVelocity.add(new THREE.Vector3(0, MAX_ANGULAR_SPEED, 0));
        break;
    case KEY_RIGHT_ARROW:
        this._desiredAngularVelocity.add(new THREE.Vector3(0, -MAX_ANGULAR_SPEED, 0));
        break;
    case KEY_E:
        this._desiredLinearVelocity.add(new THREE.Vector3(0, MAX_LINEAR_SPEED, 0));
        break;
    case KEY_C:
        this._desiredLinearVelocity.add(new THREE.Vector3(0, -MAX_LINEAR_SPEED, 0));
        break;
    case KEY_W:
    case KEY_UP_ARROW:
        this._desiredLinearVelocity.add(new THREE.Vector3(0, 0, -MAX_LINEAR_SPEED));
        break;
    case KEY_S:
    case KEY_DOWN_ARROW:
        this._desiredLinearVelocity.add(new THREE.Vector3(0, 0, MAX_LINEAR_SPEED));
        break;
    case KEY_A:
        this._desiredLinearVelocity.add(new THREE.Vector3(-MAX_LINEAR_SPEED, 0, 0));
        break;
    case KEY_D:
        this._desiredLinearVelocity.add(new THREE.Vector3(MAX_LINEAR_SPEED, 0, 0));
        break;
    }
};

exports.CameraFPS.prototype.onKeyUp = function (e) {
    this._keysDown[e.keyCode] = false;

    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
        this._desiredAngularVelocity.sub(new THREE.Vector3(0, MAX_ANGULAR_SPEED, 0));
        break;
    case KEY_RIGHT_ARROW:
        this._desiredAngularVelocity.sub(new THREE.Vector3(0, -MAX_ANGULAR_SPEED, 0));
        break;
    case KEY_E:
        this._desiredLinearVelocity.sub(new THREE.Vector3(0, MAX_LINEAR_SPEED, 0));
        break;
    case KEY_C:
        this._desiredLinearVelocity.sub(new THREE.Vector3(0, -MAX_LINEAR_SPEED, 0));
        break;
    case KEY_W:
    case KEY_UP_ARROW:
        this._desiredLinearVelocity.sub(new THREE.Vector3(0, 0, -MAX_LINEAR_SPEED));
        break;
    case KEY_S:
    case KEY_DOWN_ARROW:
        this._desiredLinearVelocity.sub(new THREE.Vector3(0, 0, MAX_LINEAR_SPEED));
        break;
    case KEY_A:
        // TODO: move left from facing direction
        this._desiredLinearVelocity.sub(new THREE.Vector3(-MAX_LINEAR_SPEED, 0, 0));
        break;
    case KEY_D:
        // TODO: move right from facing direction
        this._desiredLinearVelocity.sub(new THREE.Vector3(MAX_LINEAR_SPEED, 0, 0));
        break;
    }
};




