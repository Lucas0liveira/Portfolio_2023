import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Camera() {
  this.experience = new Experience();
  this.sizes = this.experience.sizes;
  this.scene = this.experience.scene;
  this.canvas = this.experience.canvas;

  this.createPerspectiveCamera = function () {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 14;
    this.perspectiveCamera.position.y = 27;
    this.perspectiveCamera.position.z = 42;
  };

  this.createOrthographicCamera = function () {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -20,
      30
    );

    this.orthographicCamera.position.x = 0;
    this.orthographicCamera.position.y = 10;
    this.orthographicCamera.position.z = 15;
    this.orthographicCamera.zoom = 0.8;
    this.orthographicCamera.lookAt(new THREE.Vector3(0, 3, 0));

    this.scene.add(this.orthographicCamera);
  };

  this.setOrbitControls = function () {
    console.log(this.canvas)
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
    this.controls.target = new THREE.Vector3(0, 3, 0)
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.enableRotate = true;
    this.controls.zoomSpeed = 2;
    this.controls.panSpeed = 2;
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI/2.5
    this.controls.minPolarAngle = Math.PI/4
    this.controls.maxAzimuthAngle = Math.PI/6
    this.controls.minAzimuthAngle = -Math.PI/6
    this.controls.maxZoom = 2
    this.controls.minZoom = 0.5
    this.controls.zoomToCursor = true
  };

  this.setHelpers = function () {
    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    this.scene.add(this.helper);

    const size = 40;
    const divisions = 40;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.setColors("green", "blue", "red");
    this.scene.add(axesHelper);
  }

  this.createPerspectiveCamera();
  this.createOrthographicCamera();
  this.setOrbitControls();

  this.resize = function () {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  };

  this.update = function () {
    this.controls.update();

    if (this.helper) {
      this.helper.matrixWorldNeedsUpdate = true;
      this.helper.update();
      this.helper.position.copy(this.orthographicCamera.position);
      this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
  };
}
