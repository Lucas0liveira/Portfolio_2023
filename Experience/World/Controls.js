import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default function Controls() {
  this.experience = new Experience();
  this.scene = this.experience.scene;
  this.resources = this.experience.resources;
  this.time = this.experience.time;
  this.camera = this.experience.camera;
  this.world = this.experience.world;
  this.room = this.world.room;

  this.progressPath = 0;
  this.progressFocus = 0;
  this.positionAtPathCurve = new THREE.Vector3(0, 0, 0);
  this.positionAtCameraCurve = new THREE.Vector3(0, 0, 0);

  this.position = new THREE.Vector3(0, 0, 0);

  GSAP.registerPlugin(ScrollTrigger);

  this.setPath = function () {
    this.pathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 10, 10),
      new THREE.Vector3(-3, 7, 3),
    ]);

    const path_points = this.pathCurve.getPoints(50);
    const path_geometry = new THREE.BufferGeometry().setFromPoints(path_points);

    const path_material = new THREE.LineBasicMaterial({ color: 0xff00AA });

    const path_curveObject = new THREE.Line(path_geometry, path_material);
    // this.scene.add(path_curveObject);


    this.cameraCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(5, 3, -3),
      new THREE.Vector3(-5, 1, -6),
    ]);

    const cam_points = this.cameraCurve.getPoints(50);
    const cam_geometry = new THREE.BufferGeometry().setFromPoints(cam_points);

    const cam_material = new THREE.LineBasicMaterial({ color: 0x2200FF });

    const cam_curveObject = new THREE.Line(cam_geometry, cam_material);
    // this.scene.add(cam_curveObject);
  }

  this.setScrollTrigger = function() {
    const firstSection = document.querySelector(".hello");
    const secondSection = document.querySelector(".about-me");
    const thirdSection = document.querySelector(".projects");
    const fourthSection = document.querySelector(".work-experience");
    const fifthSection = document.querySelector(".contact");

    this.firstTimeline = new GSAP.timeline({
      scrollTrigger: {
        scroller: ".app-wrapper",
        trigger: firstSection,
        start: "top top",
        start: "top" + firstSection.offsetY,
        end: `+=${window.innerHeight}`,
        scrub: 5,
        preventOverlaps: true
      },
        ease: 'back'
    })
    .to(this.room.room.position, {
      x: 5
    })
    .to(this.camera.orthographicCamera, {
      zoom: 1
    })
    
    this.secondTimeline = new GSAP.timeline({
      scrollTrigger: {
        scroller: ".app-wrapper",
        trigger: secondSection,
        start: "top top",
        start: "top" + secondSection.offsetY,
        end: `+=${window.innerHeight}`,
        scrub: 5,
        preventOverlaps: true
      },
        ease: 'back'
    })
    .to(this.room.room.position, {
      x: 0
    })
    .to(this, {
      progressFocus: 0.35
    })
    .to(this, {
      progressPath: 1
    })
    .to(this.camera.orthographicCamera, {
      zoom: 3
    })

    this.thirdTimeline = new GSAP.timeline({
      scrollTrigger: {
        scroller: ".app-wrapper",
        trigger: thirdSection,
        start: "top top",
        start: "top" + thirdSection.offsetY,
        end: `+=${window.innerHeight}`,
        scrub: 5,
        preventOverlaps: true
      },
        ease: 'back'
    })
    .to(this.camera.orthographicCamera, {
      zoom: 2.8
    })
    
    this.fourthTimeline = new GSAP.timeline({
      scrollTrigger: {
        scroller: ".app-wrapper",
        trigger: fourthSection,
        start: "top top",
        start: "top" + fourthSection.offsetY,
        end: `+=${window.innerHeight}`,
        scrub: 5,
        preventOverlaps: true
      },
        ease: 'back'
    })
    .to(this, {
      progressFocus: 1
    })
    .to(this.camera.orthographicCamera, {
      zoom: 1.5
    })
      
    this.fifthTimeline = new GSAP.timeline({
      scrollTrigger: {
        scroller: ".app-wrapper",
        trigger: fifthSection,
        start: "top top",
        start: "top" + fifthSection.offsetY,
        end: `+=${window.innerHeight}`,
        scrub: 5,
        preventOverlaps: true
      },
        ease: 'back'
    })
  }

  this.setPath();
  this.setScrollTrigger()

  this.resize = function () {};

  this.update = function () {
    this.pathCurve.getPointAt(this.progressPath, this.positionAtPathCurve);
    this.camera.orthographicCamera.position.copy(this.positionAtPathCurve);
    this.cameraCurve.getPointAt(this.progressFocus, this.positionAtCameraCurve);
    this.camera.orthographicCamera.lookAt(this.positionAtCameraCurve);
    
    this.camera.orthographicCamera.updateProjectionMatrix()
  };
}
