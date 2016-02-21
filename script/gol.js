module.exports = function()
{
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
		evolve: evolve
	};
};