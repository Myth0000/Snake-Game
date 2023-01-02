class SnakeBodyPart extends Object {
  constructor(isHead = false) {
    super();
    this.isHead = isHead;
    this.Width = 20;
    this.Height = 20;
    this.X = randomNumDivisibleBy(this.Width);
    this.Y = randomNumDivisibleBy(this.Width);
    this.rotateDegrees = 0;
    this.previousRotateDegrees;
    this.previousX;
    this.previousY;

    this.Image = this.isHead ? snakeHeadImage : snakeBodyPartImage;
    this.Image.resize(this.Width, this.Height);
  }

  display() {
    push();
    // rotates the bodyPart image
    translate(this.X, this.Y);
    rotate(this.rotateDegrees);
    image(this.Image, 0, 0);
    pop();
  }
}
