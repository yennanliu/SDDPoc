import * as THREE from 'three';

import { createTrack } from './track';
import { Car } from './car';
import { MiniMap } from './minimap';

// 2.1 Set up the basic Three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

// 3.2 Implement track rendering
const trackInfo = createTrack(scene);

// 4.1 Create a car representation
const car = new Car(scene, trackInfo.trackRadius, trackInfo.trackWidth);

// New Capability: Track Map
const miniMap = new MiniMap(scene, trackInfo.trackRadius);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50); // Adjusted for track overview
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.autoClear = false; // Required for multiple viewport rendering
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Light source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2.2 Implement the core game loop
function animate() {
    requestAnimationFrame(animate);

    // 4.3 Update car physics
    car.update();

    // 5.2 Follow camera logic
    const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
    const cameraOffset = relativeCameraOffset.applyQuaternion(car.mesh.quaternion);
    camera.position.x = car.mesh.position.x + cameraOffset.x;
    camera.position.y = car.mesh.position.y + cameraOffset.y;
    camera.position.z = car.mesh.position.z + cameraOffset.z;
    camera.lookAt(car.mesh.position);

    // Track Map Update
    miniMap.update(car.mesh);

    // Main scene rendering
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();
    renderer.render(scene, camera);

    // Mini-map rendering
    miniMap.render(renderer, scene);
}

animate();

console.log('Game Loop Started');

// Export for use in other tasks
export { scene, camera, renderer };
