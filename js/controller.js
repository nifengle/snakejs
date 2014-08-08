$(document).ready(function(){
  var game = new Game();
  game.initialize();
});

function Game(){
  this.view = new View();
  this.snake = new Snake();
  this.score = 0;
  this.playing = true;
  this.speed = 500;
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
      this.view.resetCanvas();
      this.view.drawSnake( this.snake );
      this.snake.move();
    }
    setTimeout(this.play.bind(this), this.speed)
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

  collisionCheck: function(){
    return this.snake.x + this.snake.width < this.view.canvas.width
  }
}