(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.grid = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function Cell(){
	
	this.currentState = 0;
	this.newState = 0;
	this.currentLiveNeighbours = 0;

	/**
	 * Sets the state of the cell
	 * @param {int} initialState 0 = dead, 1= alive
	 */
	this.setState = function(initialState){
		
		this.currentState = initialState;
		this.newState = initialState;
	}

	/**
	 * Set number of live neighbours
	 */
	this.setLiveNeighbours = function(neighbours){
		
		this.currentLiveNeighbours = neighbours;
	}

	/**
	 * Returns current state of cell
	 */
	this.getState = function () {
		return this.currentState;
	}

	/**
	 * Returns new state of cell
	 */
	this.getNewState = function(){

		return this.newState;
	}

	/**
	 * Updates new state
	 */
	this.updateNewState = function(numberOfLiveNeighbours){
		
		this.currentLiveNeighbours = numberOfLiveNeighbours;

		newState = this.newCellState();

		// console.log(numberOfLiveNeighbours);
		this.newState = newState;
	}

	/**
	 * Updates current state 
	 */
	this.updateCurrentState = function(){
		// console.log("Cell Updated");
		this.currentState = this.newState;
	}

	/**
	 * Calculates the new state of the cell depending number of live neighbouring cells
	 * @return {int} 0 = dead, 1 = alive
	 */
	this.newCellState = function()
	{
		if (this.currentState == 0)
		{
			if ( this.currentLiveNeighbours == 3 )
			{
				return 1;
			}

			return 0;
		}

		if (this.currentState == 1)
		{
			if ( this.currentLiveNeighbours < 2 || this.currentLiveNeighbours > 3)
			{
				return 0;
			}

			return 1;
		}

		return 0;
	}
};
},{}],2:[function(require,module,exports){
var Cell = require('./Cell.js')	;

module.exports = function Grid(){	

	this.liveCells = [];
	this.grid = [];
	this.gridSize = 0;

	/**
	 * Draws grid
	 */
	this.draw = function(gridSize)
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

	/**
	 * Returns grid in integer format
	 */
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
	this.update = function() {
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
	this.updateAllCellStates = function(state){

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
	 * Finds for all the live cells on the grid
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
	 * @return {int}   [State of specified cell]
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
	this.print = function() {

		for (var x = 0; x < this.grid.length; x++) {
			
			var row = [];

			for (var y = 0; y < this.grid.length; y++) {
			
				row.push(this.grid[x][y].getNewState());
			
			};

			console.log(row);
		};
	}
};
},{"./Cell.js":1}]},{},[2])(2)
});