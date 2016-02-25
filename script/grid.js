var Cell = require('./Cell.js')	;

module.exports = function Grid(){	

	this.liveCells = [];
	this.grid = [];
	this.gridSize = 0;

	/**
	 * Draws grid
	 */
	draw = function(gridSize)
	{
		this.gridSize = gridSize;

		for ( var x = 0; x < this.gridSize; x++)
		{
			this.grid[x] = [];

			for (var y = 0; y < this.gridSize; y++)
			{
				var rand = Math.floor(Math.random() * 4) + 1;
				if (rand > 2)
				{
					this.grid[x][y] = new Cell();
					this.grid[x][y].setState(0);
				}
				else
				{
					this.grid[x][y] = new Cell();
					this.grid[x][y].setState(1);
					this.liveCells.push([x,y]);
				};
			};
		}
	}

	/**
	 * Sets grid state
	 */
	setState = function(gridState)
	{
		for (var x = 0; x < gridState.length; x++) {
			for (var y = 0; y < gridState.length; y++) {
				var state = gridState[x][y];
				gridState[x][y] = new Cell();
				gridState[x][y].setState(state);
			};
		};

		this.grid = gridState;
		this.gridSize = gridState.length;
		this.findLiveCells();
	}

	/**
	 * Returns grid in integer format
	 */
	getGrid = function() {
		var plainGrid = [];

		for (var x = 0; x < this.grid.length; x++) {
			
			plainGrid[x] = [];

			for (var y = 0; y < this.grid.length; y++) {
			
				plainGrid[x].push(this.grid[x][y].getNewState());
			
			};

		};

		return plainGrid;
	}

	/**
	 * Updates the state of the grid
	 */
	update = function() {
		if (this.liveCells.length > 2) {
			this.updateAllCellStates(true);
		}
		else {
			this.updateLiveCellsOnly();
		}

		//Update the current state of all cells
		this.updateAllCellStates(false);

		console.log("New State:");
	}

	/**
	 * Update all cells in this grid
	 */
	updateAllCellStates = function(state) {

		for ( var x = 0; x < this.gridSize; x++)
		{
			for (var y = 0; y < this.gridSize; y++)
			{
				if (state == true) {
					this.updateCellState(x,y);
				}else{
					this.grid[x][y].updateCurrentState();
				};
			};
		}
	}

	/**
	 * Only update the live cells
	 */
	updateLiveCellsOnly = function() {

		for (var i = 0; i < this.liveCells.length; i++) {
			var x = this.liveCells[i][0];
			var y = this.liveCells[i][1];
			// console.log(x+","+y)
			this.updateCellState(x,y);
		};
	}

	/**
	 * Updates cell state
	 */
	updateCellState = function(x,y) {

		var cell = this.grid[x][y];

		var liveNeighbours = this.checkNeighbours(x,y);
		cell.updateNewState(liveNeighbours);
		// console.log(cell.getNewState());
	}

	/**
	 * Finds for all the live cells on the grid
	 * @return {int} number of live cells on grid
	 */
	findLiveCells = function() {

		for ( var x = 0; x < this.gridSize; x++)
		{
			for (var y = 0; y < this.gridSize; y++)
			{
				var cell = this.grid[x][y].getState();
				if (cell == 1)
				{
					this.liveCells.push([x,y]);
				};
			};
		}
	}

	/**
	 * Checks if surrounding cells are alive
	 * @return {int}   number of cells alive around this cell
	 */
	checkNeighbours = function(x,y) {

		var liveNeighbours = 0;

		liveNeighbours = liveNeighbours + this.getCellState(x-1,y-1);
		liveNeighbours = liveNeighbours + this.getCellState(x-1,y);
		liveNeighbours = liveNeighbours + this.getCellState(x-1,y+1);

		liveNeighbours = liveNeighbours + this.getCellState(x,y-1);
		liveNeighbours = liveNeighbours + this.getCellState(x,y+1);

		liveNeighbours = liveNeighbours + this.getCellState(x+1,y-1);
		liveNeighbours = liveNeighbours + this.getCellState(x+1,y);
		liveNeighbours = liveNeighbours + this.getCellState(x+1,y+1);
		// console.log("Cell: "+x+","+y+" Neigh: "+liveNeighbours+"\n" );
		return liveNeighbours;
	}

	/**
	 * Gets state of specified cell
	 * @return {int}   [State of specified cell]
	 */
	getCellState = function(x,y) {

		if (x >= 0 && y >= 0) {

			if (x < this.gridSize && y < this.gridSize) {

				// console.log(x+","+y+" = "+this.grid[x][y].currentState)
				return this.grid[x][y].getState();
			};
		};

		return 0;
	}

	/**
	 * Prints each line of the grid
	 */
	print = function() {

		for (var x = 0; x < this.grid.length; x++) {
			
			var row = [];

			for (var y = 0; y < this.grid.length; y++) {
			
				row.push(this.grid[x][y].getNewState());
			
			};

			console.log(row);
		};
	}
};