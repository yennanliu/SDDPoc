import * as THREE from 'three';

export class Car {
    mesh: THREE.Group;
    velocity: number = 0;
    maxSpeed: number = 0.5;
    acceleration: number = 0.01;
    deceleration: number = 0.005;
    friction: number = 0.002;
    rotationSpeed: number = 0.04;
    
    keys = {
        w: false,
        s: false,
        a: false,
        d: false
    };

    constructor(scene: THREE.Scene) {
        // 4.1 Create a simple representation of the car
        this.mesh = new THREE.Group();

        const carBodyGeo = new THREE.BoxGeometry(2, 1, 4);
        const carBodyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const carBody = new THREE.Mesh(carBodyGeo, carBodyMat);
        carBody.position.y = 0.5;
        this.mesh.add(carBody);

        // Add some wheels
        const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.4, 16);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const wheelPositions = [
            [-1, 0.4, 1.5], [1, 0.4, 1.5],
            [-1, 0.4, -1.5], [1, 0.4, -1.5]
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(pos[0], pos[1], pos[2]);
            this.mesh.add(wheel);
        });

        scene.add(this.mesh);
        
        // 4.2 Implement input handling
        this.initInput();
    }

    private initInput() {
        window.addEventListener('keydown', (e) => this.handleKey(e.key, true));
        window.addEventListener('keyup', (e) => this.handleKey(e.key, false));
    }

    private handleKey(key: string, isDown: boolean) {
        switch(key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.keys.w = isDown; break;
            case 's':
            case 'arrowdown':
                this.keys.s = isDown; break;
            case 'a':
            case 'arrowleft':
                this.keys.a = isDown; break;
            case 'd':
            case 'arrowright':
                this.keys.d = isDown; break;
        }
    }

    // 4.3 Implement car physics logic
    update() {
        // Acceleration
        if (this.keys.w) {
            this.velocity += this.acceleration;
        } else if (this.keys.s) {
            this.velocity -= this.acceleration;
        } else {
            // Apply friction when no input
            if (this.velocity > 0) {
                this.velocity = Math.max(0, this.velocity - this.friction);
            } else if (this.velocity < 0) {
                this.velocity = Math.min(0, this.velocity + this.friction);
            }
        }

        // Speed limits
        this.velocity = THREE.MathUtils.clamp(this.velocity, -this.maxSpeed / 2, this.maxSpeed);

        // Steering (only when moving)
        if (Math.abs(this.velocity) > 0.01) {
            const steerDir = this.velocity > 0 ? 1 : -1;
            if (this.keys.a) {
                this.mesh.rotation.y += this.rotationSpeed * steerDir;
            }
            if (this.keys.d) {
                this.mesh.rotation.y -= this.rotationSpeed * steerDir;
            }
        }

        // Apply velocity to position
        const direction = new THREE.Vector3(0, 0, 1);
        direction.applyQuaternion(this.mesh.quaternion);
        const moveStep = direction.multiplyScalar(this.velocity);
        
        // 5.1 Basic collision detection (keep on track)
        const nextPos = this.mesh.position.clone().add(moveStep);
        const distFromCenter = Math.sqrt(nextPos.x * nextPos.x + nextPos.z * nextPos.z);
        
        if (distFromCenter < this.trackRadius - this.trackWidth / 2 || 
            distFromCenter > this.trackRadius + this.trackWidth / 2) {
            // Collision occurred - stop or bounce back
            this.velocity *= -0.5;
        } else {
            this.mesh.position.copy(nextPos);
        }
    }
}
