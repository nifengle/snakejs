$(document).ready(function(){
  var game = new Game();
  game.initialize();
});

function Game(){
  this.view = new View();
  this.snake = new Snake();
  this.score = 0;
  this.playing = true;
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
    if ( this.playing ) {
      this.generateFruit();
      this.renderGame();
      this.snake.move();
      this.eatFruit();
      this.gameOverCheck();
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
    $(document).on('keydown', this.moveSnake.bind( this ));
  },

  moveSnake: function( event ){
    var direction = this.keys[event.keyCode];

    if ( this.playing && direction && this.lastKey != direction ){
      this.lastKey = direction;
      this.snake.move( direction );
    }
  },

  gameOverCheck: function() {
    if ( this.collisionCheck() ) {
      this.playing = false;
      this.view.endGame(this.score);
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
      var x = Math.floor((Math.random() * 480) + 1);
      var y = Math.floor((Math.random() * 480) + 1);

      x = x - x%20 >= 40 ?  x - x%20 : 20;
      y = y - y%20 > 40 ?  y - y%20 : 20;
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