$(document).ready(function() {
  var game = new Game();
  game.initialize();
});

function Game() {
  this.view = new View();
  this.snake = new Snake();
  this.score = 0;
  this.level = 1;
  this.state = "starting"
  this.fps = 6;
  this.fruit = [];
  this.keys = {
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down'
  }
  this.lastKey = 'Right';
}

Game.prototype = {
  initialize: function() {
    this.bindEvents();
    this.snake.initialize();
    this.play();
  },

  play: function() {
    switch ( this.state ) {
      case "playing":
        this.increaseSpeed();
        this.generateFruit();
        this.moveSnake();
        this.gameOverCheck();
        this.renderGame();
        break;
      case "starting":
        this.view.showStartScreen();
        break;
      case "over":
        this.view.endGame();
        this.view.showStartScreen();
        break;
    }

    setTimeout( this.play.bind(this), 1000/this.fps )
  },

  increaseSpeed: function() {
    if ( this.score/10 >= this.level ) {
      this.fps ++;
      this.level ++;
    }
  },

  renderGame: function() {
    this.view.resetCanvas();
    this.view.showStats( this.score, this.level );
    this.view.drawSnake( this.snake );
    this.view.drawFruit( this.fruit );
  },

  bindEvents: function() {
    $(document).on('keydown', this.setDirection.bind( this ));
    $(document).on('keydown', this.spaceEvent.bind(this));
  },

  spaceEvent: function( event ) {
    if ( event.keyCode == 32 ) {
      event.preventDefault();
      switch ( this.state ){
        case "starting":
          this.state = "playing";
          break;
        case "playing":
          this.state = "paused";
          break;
        case "paused":
          this.state = "playing";
          break;
        case "over":
          this.reset();
      }
    }
  },

  reset: function() {
    this.score = 0;
    this.level = 1;
    this.snake = new Snake();
    this.snake.initialize();
    this.view = new View();
    this.lastKey = "Right"
    this.state = "playing";
  },

  setDirection: function( event ) {
    var direction = this.keys[event.keyCode];

    if ( this.state == "playing" && this.lastKey!= direction && direction ) {
      this.lastKey = direction;
      this.moveSnake( direction )
    }
  },

  moveSnake: function( direction ) {
    this.snake.move( direction )
    this.eatFruit();
  },

  gameOverCheck: function() {
    if ( this.collisionCheck() ) {
      this.state = "over";
    }
  },

  collisionCheck: function() {
    return this.snake.headX <= 0 ||
    this.snake.headX + 40 > this.view.canvas.width ||
    this.snake.headY <= 0 ||
    this.snake.headY + 40 > this.view.canvas.height ||
    this.snake.collisionCheck();
  },

  generateFruit: function() {
    if ( this.fruit.length == 0 ) {
      var x = Math.floor( ((Math.random() * 480) + 1) / 20 ) * 20
      var y = Math.floor( ((Math.random() * 480) + 1) / 20 ) * 20
      var fruit;

      x = x < 20 ? 20 : x
      y = y < 20 ? 20 : y

      fruit = [x,y]

      if ( this.onSnake( fruit )) {
        this.generateFruit();
      } else {
        this.fruit = fruit;
      }
    }
  },

  onSnake: function( fruit ) {
    for ( var i = 0; i < this.snake.length; i++ ) {
      var segment = this.snake.segments[i];

      if ( segment[0] == fruit[0] && segment[1] == fruit[1] ) {
        return true
      }
    }
   return false
  },

  eatFruit: function() {
    var snakeHead = [this.snake.headX, this.snake.headY]

    if ( snakeHead[0] == this.fruit[0] && snakeHead[1] == this.fruit[1] ) {
      this.fruit = []
      this.score ++
      this.snake.grow();
    }
  }
}