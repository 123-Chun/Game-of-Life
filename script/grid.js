module.exports = function Grid(){
	
	var Cell = require('./Cell.js')	;

	this.liveCells = [];
	this.grid = [];
	this.gridSize = 0;

	/**
	 * Draws grid
	 * @param  {[type]} gridSize [description]
	 * @return {[type]}          [description]
	 */
	this.drawGrid = function(gridSize)
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
	 * @param {[type]} gridState [description]
	 */
	this.setState = function(gridState)
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

	this.getGrid = function() {
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
	this.updateState = function()
	{
		
		// Copy grid without references:
		// this.newGrid = this.grid.map(function(arr) {
		    // return arr.slice();
		// });

		if (this.liveCells.length > 2) {
			this.updateAllCellStates(true);
		}
		else {
			this.updateLiveCellsOnly();
		}

		//Update the current state of all cells
		this.updateAllCellStates(false);

		// this.grid = this.newGrid.slice(0);
		console.log("New State:");
	}

	/**
	 * Update all cell in this grid
	 */
	this.updateAllCellStates = function(state){

		for ( var x = 0; x < this.gridSize; x++)
		{
			for (var y = 0; y < this.gridSize; y++)
			{
				if (state == true) {
					this.updateCellState(x,y);
				}else{
					this.grid[x][y].updateState();
				};
			};
		}
	}

	/**
	 * Only update the live cells
	 */
	this.updateLiveCellsOnly = function() {

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
	this.updateCellState = function(x,y) {

		var cell = this.grid[x][y];

		var liveNeighbours = this.checkNeighbours(x,y);
		cell.updateNewState(liveNeighbours);
		// console.log(cell.getNewState());
	}
	/**
	 * Checks for all the live cells on the grid
	 * @return {int} number of live cells on grid
	 */
	this.findLiveCells = function() {

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
	 * @param  {int} x position
	 * @param  {int} y position
	 * @return {int}   number of cells alive around this cell
	 */
	this.checkNeighbours = function(x,y) {

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
	 * @param  {int} x [description]
	 * @param  {int} y [description]
	 * @return {int}   [description]
	 */
	this.getCellState = function(x,y) {

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
	this.printGrid = function() {

		for (var x = 0; x < this.grid.length; x++) {
			
			var row = [];

			for (var y = 0; y < this.grid.length; y++) {
			
				row.push(this.grid[x][y].getNewState());
			
			};

			console.log(row);
		};
	}
};