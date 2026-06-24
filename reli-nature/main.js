// Adapted from: https://github.com/simondevyoutube/ThreeJS_Tutorial_BasicWorld/blob/main/LICENSE
// simondevyoutube/ThreeJS_Tutorial_BasicWorld is licensed under the MIT License [Copyright (c) 2020 simondevyoutube]

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js"; //three.js - wrapper library around WebGL

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

/* supposed to help render the model but doesn't work...
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/OBJLoader.js";
*/

class ExhibitWorld {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      // displays everything on the screen
      antialias: true,
      alpha: true,
    });
    // parameters:
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        // tells three.js abt screen size
        this._OnWindowResize();
      },
      false
    );

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene(); // container for all all objects in our 3D world

    /* SRC: "https://redstapler.co/three-js-tutorial-hello-world/"
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    $('body').append(renderer.domElement);
    */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    function render() {
      requestAnimationFrame(render);
      renderer.render(this.scene, this.camera);
    }

    /*
    const light = new THREE.PointLight(0xffffff, 2, 200); // (true white light, intensity of light, distance that light will travel)
    light.position.set(4.5, 10, 4.5); // (middle of board, height from board, ... )
    */
    
    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader(); // Cube Mapping
    const texture = loader.load([ 
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/posx.jpeg?v=1682474117107",
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/negx.jpeg?v=1682474143299",
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/posy.jpeg?v=1682474114061",
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/negy.jpeg?v=1682474123732",
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/posz.jpeg?v=1682474110603",
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/negz.jpeg?v=1682474120517",
    ]);
    this._scene.background = texture;

    /***************************************************************************************
Author
======
This is the work of Emil Persson, aka Humus.
http://www.humus.name

License
=======
This work is licensed under a Creative Commons Attribution 3.0 Unported License.
http://creativecommons.org/licenses/by/3.0/
***************************************************************************************/

    // Adding 3D elements to the world:
    const plane = new THREE.Mesh( // making a ground
      //instantiate
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x385606,
        transparent: true,
        opacity: 0.5,
      })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2; // spin it to face up
    this._scene.add(plane); // adds it to the scene

    /*
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    );
    box.position.set(0, 1, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this._scene.add(box);
    */

    this._LoadModel();
    this._RAF();
  }

  // The 3D models used were built in and imported from Blender by me.
  // Adapted from: "Glass room" (https://skfb.ly/ooOIV) by luisguilhermefoliveira is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
  // Adapted from: "Grass patches" (https://skfb.ly/onMCA) by DJMaesen is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
  _LoadModel() {
    /* this doesn't work for some reason...
    var museum = undefined;
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/mus.mtl?v=1685402337314",
      function (materials) {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/mus.obj?v=1685402349836",
          function (object) {
            museum = object;
            this._scene.add(museum);
          }
        );
      }
    );
    */
    
    const loader = new GLTFLoader();
    loader.load(
      "https://cdn.glitch.global/4083b337-6bc6-420b-bca7-5a0f8bbd2c57/museum.glb?v=1682504260522",
      (gltf) => {
        gltf.scene.traverse((c) => {
          c.castShadow = true;
        });
        undefined,
          function (error) {
            console.error(error);
          };
        this._scene.add(gltf.scene);
      }
    );

  }
  // The model uploaded here is only showing in object-solid view. Need to figure out how to render on webpage. Also how to increase light inside the room.

  // FPS camera so the user can walk around the room and look around easily.
  // Add paper/description beside each art piece. Make all artwork clickable to redirect for better view.

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    // render function called with this callback using requestAnimationFrame, in which we render and call requestAnimationFrame again to start the process over for the next frame
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new ExhibitWorld();
});

/*
document.querySelector(".btn").
addEventListener("click", () => {
  document.querySelector(".wall").
  classList.toggle("change");
});
*/
