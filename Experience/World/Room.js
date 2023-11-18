import * as THREE from "three";
import Experience from "../Experience";
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { LABELLED_ITEMS } from "../Utils/Constants.js"

export default function Room() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;
  this.time = this.experience.time;

  this.lerp = {
    current: 0,
    target: 0,
    ease: 0.1,
  };

  this.room = this.resources.loaded_items.room.scene;

  this.createLabel = function (label, {x, y, z}) {
    const header = document.createElement('div')
    header.class = 'label';
    header.textContent = label;
    header.style.marginTop = '-1em';
    header.style.color = "red";
    header.style.fontSize = "30px";

    const Label = new CSS2DObject(header)
    Label.position.set(x, y, z-3)
    this.scene.add(Label)
  }

  this.setModel = function (model) {
    model.children.forEach((child, index) => {
      const item = LABELLED_ITEMS[child.name]

      if (item) {
        const position = child.children?.length > 0
          ? child.children[child.children.length-1].position
          : child.position

          this.createLabel(item?.ptbr, position)
      }

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });

    const box = new THREE.Box3();
    box.setFromObject(model);
    box.getCenter(model.position);
    model.position.multiplyScalar(-1);
    model.position.y = 0;
    model.rotation.y = Math.PI / 2;
    this.scene.add(model);
  };

  this.setAnimation = function () {
    this.mixer = new THREE.AnimationMixer(this.room);
    this.animation = this.mixer.clipAction(this.resources.loaded_items.room.animations[0]);

    this.animation.play();
  };

  this.resize = function () {};

  this.update = function () {
    this.room.rotation.y = 1 - Math.PI/3;

    this.mixer.update(this.time.delta * 0.0009)
  };

  this.setModel(this.room);
  this.setAnimation();
}
