import * as THREE from "three";
import Experience from "../Experience";

export default function Room() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;

  this.room = this.resources.loaded_items.about_me.scene
  console.log(this.room)

  this.setModel = function () {
    this.room.children.forEach(child => {
      child.castShadow = true;
      child.receiveShadow = true
      
      if(child instanceof THREE.Group) {
        child.children.forEach(groupChild => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true
        })
      }
    })
    this.scene.add(this.room)
  }

  this.resize = function () {};

  this.update = function () {};

  this.setModel()
}
