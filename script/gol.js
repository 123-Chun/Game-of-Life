var Grid = require('./Grid.js');

var initialState = [
			[0,1,0],
			[1,1,0],
			[0,0,1]
		];

var grid = new Grid();

// grid.draw(6);
grid.setState(initialState);
// console.log(grid.getGrid());

grid.print();
grid.update();
grid.print();

grid.update();
grid.print();
grid.update();
grid.print();

