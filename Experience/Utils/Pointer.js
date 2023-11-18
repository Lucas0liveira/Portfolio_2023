import * as THREE from "three";
import Experience from "../Experience";
import { EventEmitter } from "events";
import {LABELLED_ITEMS} from "./Constants"

export default function Pointer() {
    const experience = new Experience()
    const scene = experience.scene
    const camera = experience.camera
    const pointer = new THREE.Vector2()
    const rayCaster = new THREE.Raycaster()

    this.event = new EventEmitter()

    this. detectActiveObject = function(object) {
        if (object === null) {
            return object
        }

        if (LABELLED_ITEMS[object.name]) {
            document.body.style.cursor = "pointer"
            return LABELLED_ITEMS[object.name].searchable
        }

        if (LABELLED_ITEMS[object?.parent.name]) {
            document.body.style.cursor = "pointer"
            return LABELLED_ITEMS[object.parent.name].searchable
        }

        if (LABELLED_ITEMS[object?.parent?.parent.name]) {
            document.body.style.cursor = "pointer"
            return LABELLED_ITEMS[object.parent.parent.name].searchable
        }

        return null
    }

    this. detectIntersects = function () {
        if (pointer) {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        rayCaster.setFromCamera(pointer, camera.orthographicCamera)
        const intersects = rayCaster.intersectObjects(scene.children)
        return intersects.length ? intersects[0]?.object : null
    }

    this. onMouseMove = function (event, self) {
        document.body.style.cursor = "unset"
        const object = self.detectIntersects()
        self.detectActiveObject(object)
    }

    this. onClick = function (event, self) {
        document.body.style.cursor = "unset"

        const object = self.detectIntersects()
        const active = self.detectActiveObject(object)

        if (active) {
            self.event.emit("view-clicked", active)
        }
    }

    window.addEventListener('mousemove',(event) => this.onMouseMove(event, this))
    window.addEventListener('click',(event) => this.onClick(event, this))
}

