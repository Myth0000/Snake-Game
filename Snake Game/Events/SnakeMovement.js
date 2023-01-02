// Changes snake's movementDirection on keyPress
function keyPressed() {
  // movementKeyPressed conditional helps fix a bug which would allow people to press two keys at once to change direction
  if (!movementKeyPressed && snake != null) {
    movementKeyPressed = true;

    if (keyCode === UP_ARROW) {
      // prevents snake from going in the opposite direction of it's movement direction
      if (snake.movementDirection === snake.movementDirections.Down) {
        return;
      }

      // change movement direction
      snake.movementDirection = snake.movementDirections.Up;
    }
    if (keyCode === DOWN_ARROW) {
      // prevents snake from going in the opposite direction of it's movement direction
      if (snake.movementDirection === snake.movementDirections.Up) {
        return;
      }

      // change movement direction
      snake.movementDirection = snake.movementDirections.Down;
    }
    if (keyCode === LEFT_ARROW) {
      // prevents snake from going in the opposite direction of it's movement direction
      if (snake.movementDirection === snake.movementDirections.Right) {
        return;
      }

      // change movement direction
      snake.movementDirection = snake.movementDirections.Left;
    }
    if (keyCode === RIGHT_ARROW) {
      // prevents snake from going in the opposite direction of it's movement direction
      if (snake.movementDirection === snake.movementDirections.Left) {
        return;
      }

      // change movement direction
      snake.movementDirection = snake.movementDirections.Right;
    }
  }
}
