var Grid = require('./Grid.js');

var initialState = [
			[0,1,0],
			[1,1,1],
			[0,1,0]
		];

var grid = new Grid();

// grid.drawGrid(3);
grid.setState(initialState);
// console.log(grid);
grid.printGrid();
grid.updateState();
grid.printGrid();
grid.updateState();
grid.printGrid();
grid.updateState();
grid.printGrid();

