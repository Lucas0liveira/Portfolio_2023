import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AxesHelper } from "three";

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
  };

  this.createOrthographicCamera = function () {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 5.65;
    this.orthographicCamera.position.z = 7;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.setColors("green", "blue", "red")
    this.scene.add(axesHelper);
  };

  this.setOrbitControls = function () {
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  };

  this.resize = function () {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
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
  };

  this.createPerspectiveCamera();
  this.createOrthographicCamera();
  this.setOrbitControls();
}
