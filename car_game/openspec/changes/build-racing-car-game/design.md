## Context

The project aims to create a 3D racing car game from scratch. There is currently no existing codebase for this game. The focus is on a functional and interactive prototype.

## Goals / Non-Goals

**Goals:**
- A 3D car that the player can control using keyboard inputs.
- A basic 3D track environment for the car to drive on.
- A functional game loop with update and render steps.
- Basic collision detection between the car and the track.

**Non-Goals:**
- Multiplayer functionality.
- AI-controlled opponents.
- Realistic car damage or deformation.
- Complex physics (e.g., suspension, aerodynamics).

## Decisions

- **Rendering Engine**: Three.js will be used for 3D rendering. It provides a robust and easy-to-use API for web-based 3D graphics.
- **Car Physics**: Simple velocity-based physics with acceleration, friction, and steering. This is sufficient for a prototype.
- **Track Representation**: A static 3D model or a set of geometric primitives will represent the track. Collision will be checked against these geometries.
- **Input Handling**: Standard browser keyboard events will be used for controlling the car (WASD or arrow keys).

## Risks / Trade-offs

- **[Performance]**: High-fidelity rendering might impact performance on some devices. -> Mitigation: Start with simple geometries and optimize as needed.
- **[Collision Detection]**: Simple collision detection may have edge cases (e.g., "tunneling"). -> Mitigation: Use a reasonable time step and simple bounding volumes.
