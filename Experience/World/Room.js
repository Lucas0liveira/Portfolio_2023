import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default function Room() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;
  this.time = this.experience.time

  this.lerp = {
    current: 0,
    target: 0,
    ease: 0.1,
  };

  this.room = this.resources.loaded_items.about_me.scene;

  this.setModel = function (model) {
    model.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

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
    model.rotation.y = Math.PI/2
    this.scene.add(model);
  };

  this.onMouseMove = function () {
    window.addEventListener("mousemove", (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1
    });
  };

  // window.addEventListener("scroll", (e) => {
  //   console.log(window.scrollY)
  // });

  this.resize = function () {};

  this.update = function () {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.room.rotation.y = this.lerp.current
  };

  this.setModel(this.room);
  this.onMouseMove();
}
