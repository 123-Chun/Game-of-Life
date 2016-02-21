function Grid()
{
	this.liveCells = [];
	this.grid = [];
	this.newGrid = [];
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
			this.grid[x] = [x];

			for (var y = 0; y < this.gridSize; y++)
			{
				// console.log(x+","+y)
				// this.grid[x][y] = {CellPosition: "["+x+"]["+y+"]", CellState: 0};
				// var cell = new Cell();
				var rand = Math.floor(Math.random() * 4) + 1;
				if (rand > 2)
				{
					this.grid[x][y] = 0;
				}
				else
				{
					this.grid[x][y] = 1;
					var cellPosition = [x,y];
					this.liveCells.push(cellPosition);
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
		this.grid = gridState;
		this.gridSize = gridState.length;
		this.checkLiveCells();
	}

	/**
	 * Updates the state of the grid
	 * @return {[type]} [description]
	 */
	this.updateState = function()
	{
		
		// Copy grid without references:
		this.newGrid = this.grid.map(function(arr) {
		    return arr.slice();
		});

		if (this.liveCells.length > 2)
		{
			for ( var x = 0; x < this.gridSize; x++)
			{
				for (var y = 0; y < this.gridSize; y++)
				{
					// var cell = this.grid[x][y];
					var liveNeighbours = this.checkNeighbours(x,y);
					var newState = this.newCellState(this.grid[x][y], liveNeighbours);
					this.newGrid[x][y] = newState;
				};
			}
		}
		else
		{
			for (var i = 0; i < this.liveCells.length; i++)
			{
				var x = this.liveCells[i][0];
				var y = this.liveCells[i][1];
				// console.log(x+","+y)
				var liveNeighbours = this.checkNeighbours(x,y);

				var newState = this.newCellState(this.grid[x][y], liveNeighbours);
				this.newGrid[x][y] = newState;
			};
		};
		this.grid = this.newGrid.slice(0);
		console.log("New State:");
	}

	/**
	 * Checks for all the live cells on the grid
	 * @return {int} number of live cells on grid
	 */
	this.checkLiveCells = function()
	{
		for ( var x = 0; x < this.gridSize; x++)
		{
			for (var y = 0; y < this.gridSize; y++)
			{
				var cell = this.grid[x][y];
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
	this.checkNeighbours = function(x,y)
	{
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
	 * Get cell state
	 * @param  {int} x [description]
	 * @param  {int} y [description]
	 * @return {int}   [description]
	 */
	this.getCellState = function(x,y)
	{
		if (x >= 0 && y >= 0)
		{
			if (x < this.gridSize && y < this.gridSize)
			{
				// console.log(x+","+y+" = "+this.grid[x][y])
				return this.grid[x][y];
			};
		};

		return 0;
	}

	/**
	 * Gets cell's new state
	 * @param  {[type]} currentState          [description]
	 * @param  {[type]} currentLiveNeighbours [description]
	 * @return {[type]}                       [description]
	 */
	this.newCellState = function(currentState, currentLiveNeighbours)
	{
		if (currentState == 0)
		{
			if ( currentLiveNeighbours == 3 )
			{
				return 1;
			}

			return 0;
		}

		if (currentState == 1)
		{
			if ( currentLiveNeighbours < 2 || currentLiveNeighbours > 3)
			{
				return 0;
			}

			return 1;
		}

		return 0;
	}

	/**
	 * Prints each line of the grid
	 * @return {[type]} [description]
	 */
	this.printGrid = function()
	{
		this.grid.forEach(function(xElement,xIndex,xArray)
		{
			console.log(xElement);
		});
	}
};

var initialState = [
			[0,0,0],
			[0,1,0],
			[0,0,0]
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

