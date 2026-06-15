import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

/* Camera position + look-at target + zoom per section index.
   These preserve the feel of the original curve-based animation
   while making each section's framing explicit and data-driven. */
const CAMERA_KEYFRAMES = [
  // 00 · Hello — wide establishing shot, room offset right to reveal left-side card
  { position: { x: 0,  y: 10, z: 10 }, lookAt: { x: 0, y: 3, z: 0  }, zoom: 1,   roomX: 5 },
  // 01 · About — same wide angle as Hello, room centred (cards are on the left)
  { position: { x: 0,  y: 10, z: 10 }, lookAt: { x: 0, y: 3, z: 0  }, zoom: 1,   roomX: 0 },
  // 02 · Projects — zoomed into the desk / dual monitors
  { position: { x: -3, y: 7,  z: 3  }, lookAt: { x: 1, y: 2, z: -3 }, zoom: 2.8, roomX: 0 },
  // 03 · Experience — desk surface / keyboard, looking deeper into the room
  { position: { x: -3, y: 7,  z: 3  }, lookAt: { x: -5, y: 1, z: -6 }, zoom: 1.5, roomX: 0 },
  // 04 · Contact — green door / mail slot, pull back and angle toward the door
  { position: { x: 3,  y: 9,  z: 9  }, lookAt: { x: -2, y: 1, z: -4 }, zoom: 1.2, roomX: 0 },
];

const TWEEN_DURATION = 1.4;
const TWEEN_EASE = 'power2.inOut';

export default function Controls() {
  this.experience = new Experience();
  this.camera = this.experience.camera;
  this.world = this.experience.world;
  this.room = this.world.room;

  /* Tweening target for lookAt — updated in update() each frame */
  this.lookAtTarget = new THREE.Vector3(0, 3, 0);

  /* Jump camera to a section's keyframe with a smooth tween */
  this.gotoSection = function (index) {
    const kf = CAMERA_KEYFRAMES[Math.max(0, Math.min(index, CAMERA_KEYFRAMES.length - 1))];

    GSAP.to(this.camera.orthographicCamera.position, {
      x: kf.position.x, y: kf.position.y, z: kf.position.z,
      duration: TWEEN_DURATION,
      ease: TWEEN_EASE,
    });

    GSAP.to(this.lookAtTarget, {
      x: kf.lookAt.x, y: kf.lookAt.y, z: kf.lookAt.z,
      duration: TWEEN_DURATION,
      ease: TWEEN_EASE,
    });

    GSAP.to(this.camera.orthographicCamera, {
      zoom: kf.zoom,
      duration: TWEEN_DURATION,
      ease: TWEEN_EASE,
      onUpdate: () => this.camera.orthographicCamera.updateProjectionMatrix(),
    });

    /* slide the room model — section 0 offsets it right to uncover left-side card */
    if (this.room?.room) {
      GSAP.to(this.room.room.position, {
        x: kf.roomX,
        duration: TWEEN_DURATION,
        ease: TWEEN_EASE,
      });
    }
  };

  /* Initialize camera to section 0 position immediately */
  const kf0 = CAMERA_KEYFRAMES[0];
  this.camera.orthographicCamera.position.set(kf0.position.x, kf0.position.y, kf0.position.z);
  this.camera.orthographicCamera.zoom = kf0.zoom;
  this.camera.orthographicCamera.updateProjectionMatrix();
  if (this.room?.room) {
    this.room.room.position.x = kf0.roomX;
  }

  /* Expose a global so the React layer can drive section transitions */
  window.portfolioGoto = (i) => this.gotoSection(i);

  this.resize = function () {};

  this.update = function () {
    this.camera.orthographicCamera.lookAt(this.lookAtTarget);
    this.camera.orthographicCamera.updateProjectionMatrix();
  };
}
