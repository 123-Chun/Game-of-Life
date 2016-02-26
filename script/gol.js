var Grid = require('./Grid.js');

var initialState = [
			[0,1,0],
			[0,1,0],
			[0,1,0]
		];

var grid = new Grid();

// grid.setState(initialState);
grid.draw(5);

for (var i = 0; i < 5; i++) {
	grid.print();
	// console.log(grid.getGrid());
	// createTable(grid.getGrid());
	grid.update();	
}

