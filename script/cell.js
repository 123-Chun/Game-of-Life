module.exports = function Cell()
{
	this.currentState = 0;
	this.currentLiveNeighbours = 0;

	/**
	 * Sets the state of the cell
	 * @param {int} initialState 0 = dead, 1= alive
	 */
	this.setState = function(initialState){
		
		this.currentState = initialState;
	}

	/**
	 * Updates and returns new cell state
	 * @param  {int} cellState               0 = dead, 1= alive;
	 * @param  {int} numberOfLiveNeighbours
	 * @return {int} updated state of object
	 */
	this.getState = function(cellState, numberOfLiveNeighbours){
		
		this.currentState = cellState;
		this.currentLiveNeighbours = numberOfLiveNeighbours;

		newState = this.newCellState();

		return newState;
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