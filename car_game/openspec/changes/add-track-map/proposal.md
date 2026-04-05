## Why

To improve the player's situational awareness and navigation, a track map (mini-map) will be added to the game. This allows players to see their current position relative to the entire track.

## What Changes

- Implementation of a 2D or 3D mini-map overlay in the UI.
- Visualization of the track layout on the mini-map.
- Real-time display of the car's position and orientation on the mini-map.

## Capabilities

### New Capabilities
- `track-map`: Handles the rendering and logic of the mini-map, including track visualization and player position tracking.

### Modified Capabilities
- None

## Impact

- New UI component in the game.
- Addition of a second rendering pass or a separate overlay system in Three.js.
- Potential performance impact due to additional rendering.
