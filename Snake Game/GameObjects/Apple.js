class Apple extends Object {
  constructor() {
    super();
    this.Width = 20;
    this.Height = 20;
    this.X = randomNumDivisibleBy(this.Width);
    this.Y = randomNumDivisibleBy(this.Width);
    this.Image = appleImage;

    this.Image.resize(this.Width, this.Height);
  }

  display() {
    image(this.Image, this.X, this.Y);
  }

  move(snake) {
    let newX = randomNumDivisibleBy(this.Width);
    let newY = randomNumDivisibleBy(this.Width);

    // keep doing move() until a newX & newY that isn't the x/y of a bodypart is found
    for (let bodyPart of snake.bodyParts) {
      if (bodyPart.X === newX && bodyPart.Y === newY) {
        this.move(snake);
        return;
      }
    }

    this.X = newX;
    this.Y = newY;
  }
}
