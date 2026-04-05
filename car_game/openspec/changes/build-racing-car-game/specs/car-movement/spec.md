## ADDED Requirements

### Requirement: Car acceleration
The system SHALL allow the car to accelerate when the forward input is active.

#### Scenario: Forward input increases velocity
- **WHEN** the "W" or "Up Arrow" key is pressed
- **THEN** the car's forward velocity increases over time until a maximum speed is reached

### Requirement: Car braking
The system SHALL allow the car to decelerate when the backward input is active.

#### Scenario: Backward input decreases velocity
- **WHEN** the "S" or "Down Arrow" key is pressed while the car is moving forward
- **THEN** the car's forward velocity decreases until it reaches zero or reverses

### Requirement: Car steering
The system SHALL allow the car to rotate left or right when the steering inputs are active.

#### Scenario: Left input rotates car left
- **WHEN** the "A" or "Left Arrow" key is pressed while the car has forward velocity
- **THEN** the car's orientation rotates to the left

#### Scenario: Right input rotates car right
- **WHEN** the "D" or "Right Arrow" key is pressed while the car has forward velocity
- **THEN** the car's orientation rotates to the right
