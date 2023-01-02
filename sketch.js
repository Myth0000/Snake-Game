let snake, apple;
let appleImage,
  snakeBodyPartImage,
  snakeHeadImage,
  greenCheckersBackgroundImage,
  snakeGamePlayBackground;
let gameSpeed;
let movementKeyPressed, helpScreenActivated;
let timer, score;
let playButton, helpButton, closeHelpMenuButton;

function preload() {
  appleImage = loadImage("Images/Apple.png");
  snakeBodyPartImage = loadImage("Images/SnakeBodyPart.png");
  snakeHeadImage = loadImage("Images/SnakeHead.png");
  greenCheckersBackgroundImage = loadImage("Images/snakeGameBackground.png");
  snakeGamePlayBackground = loadImage("Images/snakeGamePlayBackground.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  // BUTTONS
  playButton = createButton("PLAY");
  playButton.mousePressed(playButtonClicked);

  helpButton = createButton("HELP");
  helpButton.mousePressed(helpButtonClicked);

  closeHelpMenuButton = createButton("CLOSE");
  closeHelpMenuButton.mousePressed(closeHelpMenuButtonClicked);
  closeHelpMenuButton.style("display", "none");

  image(snakeGamePlayBackground, width / 2, height / 2);

  movementKeyPressed = false;

  gameSpeed = 20;
  timer = 0;

  snake = null;
  apple = null;
}

function draw() {
  // shows help screen if it's activated
  if (helpScreenActivated) {
    image(snakeGamePlayBackground, width / 2, height / 2);

    // texts
    push();
    textAlign(CENTER);
    textSize(30);
    text("Help Menu", width / 2, height / 3.5);
    textSize(15);
    text(
      "Move around the green platform, eat apple, and make your snake as big as possible. Don't touch yourself or the brown border, they are dangerous.",
      width / 4,
      height / 3.2,
      200,
      200
    );
    textStyle(BOLD);
    text("Use arrow keys for movement.", width / 2, height / 1.55);

    // closeHelpMenuButton
    closeHelpMenuButton.size(100, 30);
    closeHelpMenuButton.position(document.documentElement.clientWidth / 2 - 50, height / 2 + 160);
    closeHelpMenuButton.style("background-color", "#4b0808");

    pop();
    return;
  }

  if (snake === null) {
    showPlayScreen();
    return;
  }

  // display snake, apple, & background for game or endscreen
  image(greenCheckersBackgroundImage, width / 2, height / 2);
  snake.display();
  apple.display();

  score = snake.bodyParts.length - 1; // updates score

  // game stats display
  text(`Score: ${score}`, 50, 20);
  text(`Timer: ${timer}s`, 300, 20);

  if (snake.alive) {
    runGame();
    return;
  }

  if (!snake.alive) {
    // sets new highscore
    if (score > getHighscore()) {
      storeItem("snakeGameHighscore", score);
    }

    // endscreen
    showEndScreen();
    return;
  }
}

function runGame() {
  if (snake.alive) {
    // updates snake every x seconds? ( idk how long that is, but it works)
    if (frameCount % gameSpeed === 0) {
      snake.update();
      movementKeyPressed = false;
    }

    // updates timer every second
    if (frameCount % 60 === 0) {
      timer++;
    }
  }
}

function showPlayScreen() {
  image(snakeGamePlayBackground, width / 2, height / 2);

  push();
  // playButton
  playButton.position(document.documentElement.clientWidth/2 - 80, height/2 + 75);
  playButton.size(160, 70);
  playButton.style("background-color", "#084b16");
  playButton.style("font-size", "40px");

  // helpButton
  helpButton.size(100, 30);
  helpButton.position(document.documentElement.clientWidth / 2 - 50, height / 2 + 155);
  helpButton.style("background-color", "#084b16");

  // game title
  textAlign(CENTER);
  textSize(30);
  text("SNAKE GAME", width / 2, height / 2.7);
  pop();
}

function createNewGame() {
  snake = new Snake();
  apple = new Apple();
  timer = 0;
  gameSpeed = 20;
}

function showEndScreen() {
  push();
  // playButton
  playButton.style("display", "inline-block"); // makes the button visible
  playButton.position(document.documentElement.clientWidth/2 - 80, height/2 + 75);
  playButton.style("opacity", 0.5);

  helpButton.style("display", "inline-block");
  helpButton.position(document.documentElement.clientWidth / 2 - 50, height / 2 + 155);
  helpButton.style("opacity", 0.5);

  // texts
  textAlign(CENTER);
  textSize(20);
  text(`highscore: ${getHighscore()}`, width / 2, height / 2.3);
  textSize(30);
  text("SNAKE GAME", width / 2, height / 2.7);
  pop();
}
