function View(){
  this.canvas = document.getElementById('box');
  this.context = this.canvas.getContext('2d');
}

View.prototype = {

  initialize: function(){
    this.bindEvents();
  },

  resetCanvas: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawSnake: function( snake ) {
    for ( var i = 0; i < snake.segments.length; i++ ) {
      var segment = snake.segments[i];
      this.drawSection(segment);
    }

    this.context.fillStyle = "green";

    if ( snake.currentDirection >= 2) {
      this.context.fillRect(snake.headX, snake.headY-1, 22, 22)
    } else {
      this.context.fillRect(snake.headX-1, snake.headY-1, 22, 22)
    }
  },

  drawSection: function( segment ){
    var x = segment[0];
    var y = segment[1];

    this.context.fillStyle = "steelblue";
    this.context.fillRect(x, y, 20, 20);
  },

  endGame: function() {
    this.context.font = "bold 60px Courier New"
    this.context.fillStyle = "Black"
    this.context.fillText("Game Over", 105, 250)

  },

  showScore: function( score ) {
    this.context.strokeStyle = "";
    this.context.lineWidth = 40;
    this.context.strokeRect(0,0,520,520)
    this.context.font = "bold 18px Courier New"
    this.context.fillStyle = "White"
    this.context.fillText("Your Score: " + score, 20, 515)
  },

  drawFruit: function( fruit ) {
    this.context.fillStyle = "Red";
    this.context.fillRect(fruit[0], fruit[1], 20, 20)
  },

  showStartScreen: function() {
    this.context.font = "20px Courier New"
    this.context.fillStyle = "Black"
    this.context.fillText("Press Space to Start", 150, 300)
  }
}