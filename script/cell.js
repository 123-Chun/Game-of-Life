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

	this.getState = function () {
		return this.currentState;
	}

	/**
	 * Updates and returns new cell state
	 * @param  {int} cellState               0 = dead, 1= alive;
	 * @param  {int} numberOfLiveNeighbours
	 * @return {int} updated state of object
	 */
	this.getNewState = function(cellState, numberOfLiveNeighbours){
		
		this.currentState = cellState;
		this.currentLiveNeighbours = numberOfLiveNeighbours;

		newState = this.newCellState();

		return newState;
	}

	this.updateNewState = function(numberOfLiveNeighbours){
		
		this.currentLiveNeighbours = numberOfLiveNeighbours;

		newState = this.newCellState();

		// console.log("Cell New State");
		this.newState = newState;
	}

	this.updateState = function(){
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