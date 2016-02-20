module.exports = function()
{
	function population(cellState, numberOfLiveNeighbours)
	{
		if (cellState == 0 && numberOfLiveNeighbours <= 2)
		{
			return 0;
		}

		if (cellState == 1 && numberOfLiveNeighbours < 2)
		{
			return 0;
		}

		if (cellState == 1 && numberOfLiveNeighbours > 3)
		{
			return 0;
		}

		if (cellState == 0 && numberOfLiveNeighbours == 3)
		{
			return 1;
		}

		return 1;
	}

	function evolve(gridState)
	{
		var newState = [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			];

		if ( gridState == [
			[0,0,0],
			[0,1,0],
			[0,0,0]
		])
		{
			newState = [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			];
		};

		return newState;
	}

	return {
		population: population,
		evolve: evolve
	};
};