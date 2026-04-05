import * as THREE from 'three';

export class MiniMap {
    camera: THREE.OrthographicCamera;
    viewport = {
        x: 0,
        y: 0,
        width: 200,
        height: 200
    };
    playerMarker: THREE.Mesh;

    constructor(scene: THREE.Scene, trackRadius: number) {
        // 1.1 Create and configure an orthographic camera
        const aspect = 1;
        const size = trackRadius * 2.5;
        this.camera = new THREE.OrthographicCamera(
            -size / 2, size / 2,
            size / 2, -size / 2,
            0.1, 1000
        );
        this.camera.position.set(0, 100, 0);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, -1); // Top-down view orientation

        // 2.2 Create a visual marker for the player
        const markerGeo = new THREE.ConeGeometry(2, 5, 3);
        const markerMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.playerMarker = new THREE.Mesh(markerGeo, markerMat);
        this.playerMarker.rotation.x = Math.PI / 2; // Lay flat
        scene.add(this.playerMarker);

        this.updateViewport();
    }

    private updateViewport() {
        this.viewport.width = window.innerHeight * 0.25;
        this.viewport.height = window.innerHeight * 0.25;
        this.viewport.x = window.innerWidth - this.viewport.width - 20;
        this.viewport.y = window.innerHeight - this.viewport.height - 20;
    }

    // 3.1 Implement real-time position and orientation updates
    update(playerMesh: THREE.Group) {
        this.playerMarker.position.copy(playerMesh.position);
        this.playerMarker.position.y = 1; // Slightly above track
        this.playerMarker.rotation.y = playerMesh.rotation.y;
    }

    // 1.2 & 3.2 Define rendering logic
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
        this.updateViewport();
        
        renderer.setViewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
        renderer.setScissor(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
        renderer.setScissorTest(true);
        
        // Clear viewport area with a slightly transparent dark background
        renderer.setClearColor(0x000000, 0.5);
        renderer.clearDepth();
        
        renderer.render(scene, this.camera);
        
        renderer.setScissorTest(false);
    }
}
