## Context

The racing car game currently lacks a high-level view of the track and player position. This makes it difficult for players to anticipate upcoming turns or track their overall progress.

## Goals / Non-Goals

**Goals:**
- Implement a 2D top-down mini-map overlay.
- Display the entire track layout on the mini-map.
- Track the player's car position and rotation in real-time.
- Ensure the mini-map is clear and non-obtrusive.

**Non-Goals:**
- 3D mini-map (keep it 2D for simplicity).
- Displaying other objects or AI on the mini-map (prototype focuses on player car only).
- Interactive mini-map (e.g., clickable to teleport).

## Decisions

- **Rendering Method**: Use a separate orthographic camera and a secondary viewport. This is efficient as it reuses the existing scene geometry while providing a dedicated top-down view.
- **Viewport Placement**: Position the mini-map in the top-right corner of the screen. This is a common and intuitive location for game HUDs.
- **Track Visualization**: Use a top-down view of the existing 3D track. This ensures consistency and avoids the need for creating separate 2D assets.
- **Player Marker**: Use a simple geometric shape (e.g., a colored triangle or arrow) to represent the player's car on the mini-map, ensuring it's clearly visible against the track background.

## Risks / Trade-offs

- **[Performance]**: A second camera and viewport require an additional rendering pass. -> Mitigation: Only render necessary layers and ensure the track geometry is relatively simple.
- **[Clarity]**: The mini-map might be too small to see details. -> Mitigation: Use a sensible scale and clear markers for the player car.
