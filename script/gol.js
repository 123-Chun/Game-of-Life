var Grid = require('./Grid.js');

var initialState = [
			[0,1,0],
			[1,1,0],
			[0,0,0]
		];

var grid = new Grid();

grid.drawGrid(6);
// grid.setState(initialState);
// console.log(grid.getGrid());

grid.printGrid();
grid.updateState();
grid.printGrid();

grid.updateState();
grid.printGrid();
grid.updateState();
grid.printGrid();

