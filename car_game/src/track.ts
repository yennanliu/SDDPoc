import * as THREE from 'three';

export function createTrack(scene: THREE.Scene) {
    // 1.2 Implement procedural textures
    const grassTexture = createNoiseTexture(512, '#228b22', '#1a6b1a');
    const asphaltTexture = createNoiseTexture(512, '#333333', '#222222');

    // 1.1 Update to MeshStandardMaterial
    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
        map: grassTexture,
        roughness: 0.8
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Track path
    const trackWidth = 8;
    const trackRadius = 30;
    
    const trackGeometry = new THREE.RingGeometry(trackRadius - trackWidth / 2, trackRadius + trackWidth / 2, 64);
    const trackMaterial = new THREE.MeshStandardMaterial({ 
        map: asphaltTexture,
        roughness: 0.6
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.position.y = 0.01;
    track.receiveShadow = true;
    scene.add(track);

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    
    // Outer wall
    const outerWallGeo = new THREE.TorusGeometry(trackRadius + trackWidth / 2, 0.1, 8, 100);
    const outerWall = new THREE.Mesh(outerWallGeo, wallMat);
    outerWall.rotation.x = Math.PI / 2;
    outerWall.position.y = 0.1;
    outerWall.castShadow = true;
    scene.add(outerWall);

    // Inner wall
    const innerWallGeo = new THREE.TorusGeometry(trackRadius - trackWidth / 2, 0.1, 8, 100);
    const innerWall = new THREE.Mesh(innerWallGeo, wallMat);
    innerWall.rotation.x = Math.PI / 2;
    innerWall.position.y = 0.1;
    innerWall.castShadow = true;
    scene.add(innerWall);

    // 2.2 Place decorative assets
    createEnvironment(scene, trackRadius, trackWidth);

    return { trackRadius, trackWidth };
}

// 1.2 Procedural Texture Helper
function createNoiseTexture(size: number, color1: string, color2: string) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = color2;
    for (let i = 0; i < size * size * 0.1; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.fillRect(x, y, 2, 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
}

// 2.1 Decorative assets helper
function createEnvironment(scene: THREE.Scene, trackRadius: number, trackWidth: number) {
    const treeCount = 20;
    const treeGeo = new THREE.ConeGeometry(2, 5, 8);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x0b5345 });
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });

    for (let i = 0; i < treeCount; i++) {
        const angle = (i / treeCount) * Math.PI * 2;
        const dist = trackRadius + trackWidth + 5 + Math.random() * 10;
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;

        const tree = new THREE.Group();
        
        const leaves = new THREE.Mesh(treeGeo, treeMat);
        leaves.position.y = 3;
        leaves.castShadow = true;
        tree.add(leaves);

        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 0.5;
        trunk.castShadow = true;
        tree.add(trunk);

        tree.position.set(x, 0, z);
        scene.add(tree);
    }
}
