## ADDED Requirements

### Requirement: Mini-map visualization
The system SHALL display a 2D mini-map on the screen during gameplay.

#### Scenario: Mini-map is visible on start
- **WHEN** the game is initialized and running
- **THEN** a mini-map overlay is visible in one of the corners of the screen

### Requirement: Track layout display
The mini-map SHALL show the layout of the racing track.

#### Scenario: Track layout is displayed on mini-map
- **WHEN** the game starts
- **THEN** the mini-map displays a scaled-down representation of the track's path

### Requirement: Player position tracking
The mini-map SHALL indicate the current position and orientation of the player's car.

#### Scenario: Player marker updates on mini-map
- **WHEN** the player's car moves or rotates in the 3D scene
- **THEN** the player's marker on the mini-map updates its position and rotation accordingly
