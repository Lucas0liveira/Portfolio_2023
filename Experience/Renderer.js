import * as THREE from "three";
import Experience from "./Experience.js";
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default function Renderer() {
  this.experience = new Experience();
  this.sizes = this.experience.sizes;
  this.scene = this.experience.scene;
  this.canvas = this.experience.canvas;
  this.camera = this.experience.camera;
  
  this.setRenderer = function () {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  this.setLabelRenderer = function () {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(this.labelRenderer.domElement);
  }
  
  this.resize = function () {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }
  
  this.update = function () {
    this.renderer.render(this.scene, this.camera.orthographicCamera);
    this.labelRenderer.render( this.scene, this.camera.orthographicCamera );
  }

  this.setLabelRenderer();
  this.setRenderer();
}
