import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Controls from "./Controls";
import Environment from "./Environment";

export default function World() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;

  this.resources.event.on("ready", () => {
    this.environment = new Environment();
    this.room = new Room();
    this.controls = new Controls();
  });

  this.setLight = function () {
    this.sunLight = new THREE.SpotLight("#fff", 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 550;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 15, 6);
    this.sunLight.scale.set(5);
    this.scene.add(this.sunLight);

    this.spotLight = new THREE.SpotLight("#ffaa66", 15);
    this.spotLight.position.set(0, 10, 0);

    this.spotLight.castShadow = true;

    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;

    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;
    // this.scene.add(this.spotLight)

    // this.ambientLight = new THREE.AmbientLight("#8462F0", 1);
    this.ambientLight = new THREE.AmbientLight("#ffaadd", 0.8);
    this.scene.add(this.ambientLight);
  };

  this.setLight();

  this.resize = function () {};

  this.update = function () {
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  };
}
