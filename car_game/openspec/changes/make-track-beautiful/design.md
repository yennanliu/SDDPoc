## Context

The current track is a basic `RingGeometry` with a solid gray color, which lacks visual depth. To improve this, we will move towards textured materials and add procedural or static environment assets.

## Goals / Non-Goals

**Goals:**
- Replace solid colors with textures for the track and ground.
- Add decorative 3D assets (e.g., simple trees, lampposts) at fixed positions around the track.
- Enable high-quality lighting and shadow mapping.

**Non-Goals:**
- Full photorealism (aiming for a polished, stylized look).
- Dynamic weather systems.
- Destruction or interactive environment elements.

## Decisions

- **Texturing**: Use procedural textures or standard image textures for asphalt and grass. Procedural textures via `THREE.CanvasTexture` can be used to generate noise-based patterns if image assets are not readily available.
- **Environment Assets**: Implement a simple factory or helper function in `track.ts` to place repeated decorative meshes (e.g., stylized trees made of simple cones and cylinders) around the track.
- **Shadow Mapping**: Enable `renderer.shadowMap.enabled = true` and configure the directional light and meshes to cast and receive shadows. This significantly improves the sense of depth and scale.
- **Materials**: Use `MeshStandardMaterial` for its physically-based rendering (PBR) properties, allowing for better light interaction compared to `MeshBasicMaterial`.

## Risks / Trade-offs

- **[Performance]**: Shadow maps can be computationally expensive. -> Mitigation: Limit the shadow map resolution and only enable shadows for key objects (car and primary environment assets).
- **[Asset Loading]**: External textures might increase load times. -> Mitigation: Use small, optimized texture files or procedurally generated textures for the prototype.
