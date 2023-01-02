class Snake extends Object
{
  constructor()
  {
    super();
    
    this.alive = true;
    this.movementSpeed = 20;
    
    // stores movementDirections
    this.movementDirections = {
      Up: 0,
      Down: 1,
      Left: 2,
      Right: 3
    }
    
    // a random moveDirection is picked
    this.movementDirection = random([
      this.movementDirections.Up,
      this.movementDirections.Down,
      this.movementDirections.Left,
      this.movementDirections.Right
    ]);
    
    this.bodyParts = [new SnakeBodyPart(true)]    
  }
  
  display()
  {
    // display all body parts
    this.bodyParts.forEach(bodyPart => {
      bodyPart.display();
    })
    
    // displays snake's head on top of it's other body parts
    if(!this.alive)
    {
      this.bodyParts[0].display();
    }  
  }
  
  update()
  {
    if(this.alive)
    {
       // if snake touches the edges of the canvas, kill it
        const snakeHead = this.bodyParts[0];
        if(this.headTouchedEdge())
        {
          this.alive = false;
          return;
        }
       
      
      // updates body parts
      let count = 0;
      this.bodyParts.forEach(bodyPart => {
          let previousBodyPart = this.bodyParts[count-1];
        
          // updates bodyPart's preivous position
          bodyPart.previousX = bodyPart.X;
          bodyPart.previousY = bodyPart.Y;
          bodyPart.previousRotateDegrees = bodyPart.rotateDegrees;

          // updates bodyPart's X, Y, & rotateDegrees if it's not head
          if(!bodyPart.isHead)
          {
            bodyPart.X = previousBodyPart.previousX;
            bodyPart.Y = previousBodyPart.previousY;
            bodyPart.rotateDegrees = previousBodyPart.previousRotateDegrees;
          }

          count++;
          // moves based on movementDirection
          if(bodyPart.isHead)
          {
            switch(this.movementDirection)
            {
              case this.movementDirections.Up: {
                bodyPart.Y -= this.movementSpeed;
                this.rotateHead(bodyPart, 0);
                break;
              }
              case this.movementDirections.Down: {
                bodyPart.Y += this.movementSpeed;
                this.rotateHead(bodyPart, 180);
                break;
              }
              case this.movementDirections.Left: {
                bodyPart.X -= this.movementSpeed;
                this.rotateHead(bodyPart, 270);
                break;
              }
              case this.movementDirections.Right: {
                bodyPart.X += this.movementSpeed;
                this.rotateHead(bodyPart, 90);
                break;
              }
          }

        }
          
          // snake head hit body part collision check
          if(this.collisionCheck(bodyPart))
          {
            this.alive = false;
          }
      })

      // A bunch of collison checks
      if(this.collisionCheck(apple))
      {
        // snake increases in size
        let newBodyPart = new SnakeBodyPart();
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        newBodyPart.X = lastBodyPart.previousX;
        newBodyPart.Y = lastBodyPart.previousY;
        this.bodyParts.push(newBodyPart);

        // gameSpeed increase
        if(score%3===0) { gameSpeed -= 1; }

        apple.move(this);
      }
      
    }
  }
  
  
  collisionCheck(object)
  {
    let snakeHead = this.bodyParts[0];
    let objectDistance = dist(snakeHead.X, snakeHead.Y, object.X, object.Y);
    
    if(snakeHead === object) { return false; }
    
    // snake hits object
    if(objectDistance < (snakeHead.Width/2 + object.Width/2))
    {
      return true;
    } return false;
  }
  
  rotateHead(bodyPart, degrees)
  {
    // updates SnakeBodyPart's rotateDegrees property to rotate the image properly
    if(bodyPart.isHead)
    {
      bodyPart.rotateDegrees = degrees;
    }
  }
  
  headTouchedEdge()
  {
    let snakehead = this.bodyParts[0];
    
    // returns true if snakeHead is touching the edge of the direction it's face
    switch(this.movementDirection)
      {
        case this.movementDirections.Up: {
          if(snakehead.Y - 10 <= 30) { return true; } return false;
        }
        case this.movementDirections.Down: {
          if(snakehead.Y + 10 >= height - 30) { return true; } return false;
        }
        case this.movementDirections.Left: {
          if(snakehead.X - 10 <= 30) { return true; } return false;
        }
        case this.movementDirections.Right: {
          if(snakehead.X + 10 >= width - 30) { return true; } return false;
        }
        default: return false;
      }
    
  }
  
  

}