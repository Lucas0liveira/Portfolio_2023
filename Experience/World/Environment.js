import * as THREE from "three";
import Experience from "../Experience";

export default function Room() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;

  this.resize = function () {};

  this.update = function () {};
}
