function Snake(){
  this.headX = 160;
  this.headY = 40;
  this.segments = [];
  this.directions = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
    Opposite: [1,0,3,2]
  };
  this.previousDirection = 2;
  this.currentDirection = 3;
  this.length = 8;
}

Snake.prototype = {
  initialize: function(){
    for ( var i = 0; i < this.length; i++ ) {
      var x = (i * 20) + 20;
      this.segments.push( [x, this.headY] );
    }
  },

  move: function( newDirection ){

    var newDirection = newDirection ? this.directions[newDirection] : this.currentDirection;

    if ( this.validMove( newDirection ) ) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = newDirection;
    }

    this.setHead();

  },

  validMove: function( newDirection ) {
    return newDirection != this.directions.Opposite[this.currentDirection] && newDirection != this.currentDirection;
  },

  setHead: function(){
    switch ( this.currentDirection ) {
      case 3:
        this.headX += 20;
        break;
      case 2:
        this.headX -= 20;
        break;
      case 0:
        this.headY -= 20;
        break;
      case 1:
        this.headY += 20;
        break;
    }

    this.segments.shift();
    this.segments.push( [this.headX, this.headY]);
  },

  collisionCheck: function(){
    for (var i = 0; i < this.length - 1; i++) {
      var segX = this.segments[i][0]
      var segY = this.segments[i][1]

      if ( segY == this.headY && segX == this.headX ) {
        return true
      }
    }
    return false
  },

  grow: function(){
    this.segments.unshift([]);
    this.length ++
  }
}