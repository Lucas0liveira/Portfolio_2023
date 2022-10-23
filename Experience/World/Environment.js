import * as THREE from "three";
import Experience from "../Experience";

export default function Room() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;

  this.setSunLight = function () {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 7, 3);
    this.scene.add(this.sunLight);

    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  };

  this.resize = function () {};

  this.update = function () {};

  this.setSunLight();
}
