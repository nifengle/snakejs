function Snake(){
  this.height = 10;
  this.headX = 30;
  this.headY = 10;
  this.segments = [];
  this.directions = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
    Opposite: [1,0,3,2]
  };
  this.currentDirection = 3;
  this.length = 3;
}

Snake.prototype = {
  initialize: function(){
    for ( var i = 0; i < this.length; i++ ) {
      var x = (i * 10) + 10;
      this.segments.push( [x, 10] );
    }
  },

  move: function( newDirection ){
    var newDirection = this.directions[newDirection] || this.currentDirection;

    if ( this.validMove( newDirection ) ) {
      this.currentDirection = newDirection;
      this.setHead();
    } else {
      debugger
    }
  },

  validMove: function( newDirection ) {
    var newDirCode = this.directions[newDirection];

    return this.currentDirection != this.directions.Opposite[newDirCode]
  },

  setHead: function(){
    switch ( this.currentDirection ) {
      case 3:
        this.headX += 10;
        break;
      case 2:
        this.headX -= 10;
        break;
      case 0:
        this.headY -= 10;
        break;
      case 1:
        this.headY += 10;
        break;
    }
    this.segments.push( [this.headX, this.headY]);
    this.segments.shift();

  }
}