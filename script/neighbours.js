module.exports = function Neighbours()
{
	var currentGridState = [[0,0,0],[0,0,0],[0,0,0]];

	function getGridState(gridState)
	{
		currentGridState = gridState;

		newState = this.newGridState();

		return newGridState;
	}

	function newGridState(gridState)
	{
		var newState = [[0,0,0],[0,0,0],[0,0,0]];

		return newState;
	}
};