import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import assets from './utils/assets'

export default () => {
  // const FOV = 60;
  // const ASPECT = window.innerWidth / window.innerHeight
  // const NEAR = 1
  // const FAR = 5000;


  // const scene = new THREE.Scene();

  // const renderer = new THREE.WebGLRenderer({
  //   canvas: document.querySelector('.app-canvas'),
  //   antialias: true,
  //   powerPreference: 'high-performance',

  // });
  // renderer.set
  // renderer.setPixelRatio( window.devicePixelRatio )
  // renderer.setSize(window.innerWidth, window.innerHeight)

  // const camera = new THREE.PerspectiveCamera(
  //   FOV,
  //   ASPECT,
  //   NEAR,
  //   FAR,
  // );
  // camera.position.set(9, 9, 9)
  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.update();

  // const loaders = {}
  // loaders.gltfLoader = new GLTFLoader()
  // loaders.dracoLoader = new DRACOLoader()
  // loaders.dracoLoader.setDecoderPath("/draco/")
  // loaders.gltfLoader.setDRACOLoader(loaders.dracoLoader)

  // assets.map(asset => {
  //   loaders.gltfLoader.load(asset.path, (file) => {
  //     const mesh = file.scene;
  //     scene.add(mesh)
  //     mesh.castShadow = true;  
  //   })
  // })

  // // Lights
  // renderer.outputEnconding = THREE.sRGBEncoding;
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;


  // function animate() {
  //   requestAnimationFrame( animate );
  //   controls.update()
  //   renderer.render(scene, camera);
  // }

  const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
}