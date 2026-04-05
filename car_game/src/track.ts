import * as THREE from 'three';

export function createTrack(scene: THREE.Scene) {
    // 3.1 Create a simple track representation (a circular path)
    
    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Forest Green
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Track path (using a RingGeometry for simplicity or just a custom shape)
    const trackWidth = 8;
    const trackRadius = 30;
    
    const trackGeometry = new THREE.RingGeometry(trackRadius - trackWidth / 2, trackRadius + trackWidth / 2, 64);
    const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark Gray
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.position.y = 0.01; // Slightly above ground to avoid z-fighting
    scene.add(track);

    // Add some markers or walls
    const wallHeight = 0.5;
    
    // Outer wall
    const outerWallGeo = new THREE.TorusGeometry(trackRadius + trackWidth / 2, 0.1, 8, 100);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const outerWall = new THREE.Mesh(outerWallGeo, wallMat);
    outerWall.rotation.x = Math.PI / 2;
    outerWall.position.y = 0.1;
    scene.add(outerWall);

    // Inner wall
    const innerWallGeo = new THREE.TorusGeometry(trackRadius - trackWidth / 2, 0.1, 8, 100);
    const innerWall = new THREE.Mesh(innerWallGeo, wallMat);
    innerWall.rotation.x = Math.PI / 2;
    innerWall.position.y = 0.1;
    scene.add(innerWall);

    return { trackRadius, trackWidth };
}
