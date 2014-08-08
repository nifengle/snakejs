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

  drawSnake: function( snake ){
    this.context.fillStyle = "red";

    for ( var i = 0; i < snake.segments.length; i++ ) {
      var segment = snake.segments[i];
      this.drawSection(segment);
    }

  },

  drawSection: function(segment){
    var x = segment[0];
    var y = segment[1];

    this.context.fillRect(x, y, 10, 10)
  }

}