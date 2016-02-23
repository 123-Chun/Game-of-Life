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