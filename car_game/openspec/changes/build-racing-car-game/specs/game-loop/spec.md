## ADDED Requirements

### Requirement: Continuous update cycle
The system SHALL execute a continuous update cycle to process input and physics.

#### Scenario: Smooth game play
- **WHEN** the game starts
- **THEN** the game state (car position, orientation) is updated each frame

### Requirement: Continuous render cycle
The system SHALL execute a continuous render cycle to display the game world.

#### Scenario: Visual feedback
- **WHEN** the game is running
- **THEN** the updated game state is rendered at a regular interval (e.g., 60 FPS)
