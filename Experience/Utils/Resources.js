import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default function Resources(assets) {
  this.experience = new Experience();
  this.renderer = this.experience.renderer;
  this.event = new EventEmitter()
  
  this.assets = assets;
  this.loaded_items = {};
  this.queue = this.assets.length;
  this.loaded = 0;

  this.setLoaders = function () {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  };

  this.startLoading = function () {
    for(const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }
    };
  };

  this.singleAssetLoaded = function (asset, file) {
    this.loaded_items[asset.name] = file;
    this.loaded++

    if(this.loaded === this.queue) {
      this.event.emit("ready")
    }
  };

  this.setLoaders();
  this.startLoading();
}
