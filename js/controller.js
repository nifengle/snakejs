$(document).ready(function(){
  var game = new Game();
  game.initialize();
});

function Game(){
  this.view = new View();
  this.snake = new Snake();
  this.score = 0;
  this.state = "starting"
  this.fps = 8;
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
  initialize: function(){
    this.bindEvents();
    this.snake.initialize();
    this.play();
  },

  play: function(){

    if ( this.state == "playing" ) {
      this.generateFruit();
      this.moveSnake();
      this.gameOverCheck();
      this.renderGame();
    } else if ( this.state == "starting" ) {
      this.view.showStartScreen();
    } else if ( this.state == "over" ) {
      this.view.endGame();
      this.view.showStartScreen();
    }

    setTimeout(this.play.bind(this), 1000/this.fps)
  },

  renderGame: function(){
    this.view.resetCanvas();
    this.view.showScore( this.score );
    this.view.drawSnake( this.snake );
    this.view.drawFruit( this.fruit );
  },

  bindEvents: function(){
    $(document).on('keydown', this.setDirection.bind( this ));
    $(document).on('keydown', this.spaceEvent.bind(this));
  },

  spaceEvent: function( event ){
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
          // debugger
      }
    }
  },

  reset: function(){
    this.score = 0;
    this.snake = new Snake();
    this.snake.initialize();
    this.view = new View();
    this.lastKey = "Right"
    this.state = "playing";
  },

  setDirection: function( event ){
    var direction = this.keys[event.keyCode];

    if ( this.state == "playing" && this.lastKey!= direction && direction ) {
      this.lastKey = direction;
      this.moveSnake( direction )
    }
  },

  moveSnake: function( direction ){
    this.snake.move( direction )
    this.eatFruit();
  },

  gameOverCheck: function() {
    if ( this.collisionCheck() ) {
      this.state = "over";
    }
  },

  collisionCheck: function(){
    return this.snake.headX <= 0 ||
    this.snake.headX + 40 > this.view.canvas.width ||
    this.snake.headY <= 0 ||
    this.snake.headY + 40 > this.view.canvas.height ||
    this.snake.collisionCheck();
  },

  generateFruit: function(){
    if ( this.fruit.length == 0 ) {
      var x = Math.floor( ((Math.random() * 480) + 1) / 20 ) * 20
      var y = Math.floor( ((Math.random() * 480) + 1) / 20 ) * 20
      var fruit;

      x = x < 20 ? 20 : x
      y = y < 20 ? 20 : y

      fruit = [x,y]

      if ( !this.snake.collisionCheck( fruit )){
        this.fruit = fruit;
      } else {
        this.generateFruit();
      }
    }
  },

  eatFruit: function(){
    var snakeHead = [this.snake.headX, this.snake.headY]

    if (snakeHead[0] == this.fruit[0] && snakeHead[1] == this.fruit[1]){
      this.fruit = []
      this.score ++
      this.snake.grow();
    }
  }
}