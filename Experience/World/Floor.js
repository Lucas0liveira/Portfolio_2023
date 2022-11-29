import * as THREE from "three";
import Experience from "../Experience";

export default function Floor() {
  this.experience = new Experience()
  this.scene = this.experience.scene

  this.setFloor = function () {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0x8dd2,
      side: THREE.BackSide
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
    this.plane.rotation.x = Math.PI / 2
    this.plane.position.z = -15
  }
  this.setWall = function () {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0x8dd2,
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
    this.plane.position.z = -15
  }

  this.setFloor()
  this.setWall()

}
