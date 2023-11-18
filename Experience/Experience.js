import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time";
import Pointer from "./Utils/Pointer";
import Resources from "./Utils/Resources.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Assets from "./Utils/Assets";

export default function Experience(canvas) {
  // singleton setup
  if (Experience._instance) {
    return Experience._instance;
  }
  Experience._instance = this;

  Experience.getInstance = function () {
    return this._instance;
  };

  // properties
  this.canvas = canvas;
  this.scene = new THREE.Scene();
  this.sizes = new Sizes();
  this.time = new Time();
  this.assets = Assets;
  this.resources = new Resources(this.assets)
  this.camera = new Camera();
  this.renderer = new Renderer();
  this.world = new World();
  this.pointer = new Pointer()

  this.update = function () {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  };

  this.resize = function () {
    this.camera.resize();
    this.renderer.resize();
  };

  this.time.event.on("update", () => this.update());
  this.sizes.event.on("resize", () => this.resize());
  this.resources.event.on("ready", () => console.log("Carregou!!"));
  this.pointer.event.on("view-clicked", (e) => console.log("Abrir modal => ", e))
}
