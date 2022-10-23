import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Environment from "./Environment"

export default function World() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources

  this.resources.event.on("ready", () =>{
    this.environment = new Environment()
    this.romm = new Room()
  })

  
  
  this.resize = function () {
  }
  
  this.update = function () {
  }

}
