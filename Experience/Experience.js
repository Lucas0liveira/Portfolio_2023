import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time";
import Assets from "./Utils/Assets";
import Resources from "./Utils/Resources.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";

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

  this.setSceneBackground = function () {
    // this.scene.background = new THREE.Color( "#E5E1E4" );
    // this.scene.background = new THREE.Color( "#D2CDDE"  );
    this.scene.background = new THREE.Color( "#150e2f" );
  }

  this.setSceneBackground()

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
}
