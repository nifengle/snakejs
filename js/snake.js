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
  this.previousDirection = this.directions.Left;
  this.currentDirection = this.directions.Right;
  this.length = 3;
}

Snake.prototype = {
  initialize: function(){
    for ( var i = 0; i < this.length; i++ ) {
      var x = (i * 10) + 10;
      this.segments.push([x, 10]);
    }
  },

  move: function( newDirection ){
    var newDirection = newDirection || this.currentDirection;

    if ( this.validMove( newDirection ) ) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = newDirection;
      this.headX += 10
      this.segments.push([this.headX, this.headY])
      this.segments.shift();
    }
  },

  validMove: function( newDirection ) {
    var newDirCode = this.directions[newDirection];

    return newDirCode != this.currentDirection &&
      this.currentDirection != this.directions.Opposite[newDirCode]
  },

  moveSegments: function(){
    var direction = this.currentDirection;


    // console.log(this.segments)
    // for ( var i = 0; i < this.segments.length; i++ ) {
    //   var segment = this.segments[i];
    // debugger
    //   switch ( direction ) {
    //     case 3:
    //       segment[0] += 10;
    //     case 2:
    //       segment[0] -= 10;
    //     case 0:
    //       segment[1] -= 10;
    //     case 1:
    //       segment[1] += 10;
    //   }
    // }
  }
}