var gridDiv = document.getElementById('grid');

var liveCells = [];
var grid = [];
var newGrid = [];
var gridSize = 3;

var gridPlay = 0;
var iteration = 0;

function createTable(tableData,create) {

	var table = document.createElement('table');
	table.className = "table table-bordered";
	var tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {

		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {

			var cell = document.createElement('td');
			var cellDiv = document.createElement('div');

			if (cellData == 0) {
				cellDiv.className = "empty";
			}else{
				cellDiv.className = "filled";
			};

			cellDiv.appendChild(document.createTextNode(cellData));
			cell.appendChild(cellDiv);
			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);

	if (create == true) {

		gridDiv.appendChild(table);
	}else {

		$("table.table").replaceWith(table);
	}
}


function drawGrid(size)
{
	gridSize = size;

	for ( var x = 0; x < gridSize; x++)
	{
		grid[x] = [];

		for (var y = 0; y < gridSize; y++)
		{
			var rand = Math.floor(Math.random() * 4) + 1;
			if (rand > 2)
			{
				grid[x][y] = 0;
			}
			else
			{
				grid[x][y] = 1
				liveCells.push([x,y]);
			};
		};
	}
}

function updateGrid() {

	// Copy grid without references:
	for (var i = 0; i < grid.length; i++)
			newGrid[i] = grid[i].slice();

	//Update the current state of all cells
	updateAllCellStates();

	// Copy grid without references:
	for (var k = 0; k < newGrid.length; k++)
			grid[k] = newGrid[k].slice();

	console.log("New State:");
}

function updateAllCellStates() {

	for ( var x = 0; x < gridSize; x++)
	{
		for (var y = 0; y < gridSize; y++)
		{
			updateCellState(x,y);
		};
	}
}

function updateCellState(x,y) {

	var cell = newGrid[x][y];

	var liveNeighbours = checkNeighbours(x,y);
	
	if (newGrid[x][y] == 0)
	{
		if ( liveNeighbours == 3 )
		{
				newGrid[x][y] = 1;
		}
		else
		{
				newGrid[x][y] = 0;
		}
	}
	else
	{
		if ( liveNeighbours < 2 || liveNeighbours > 3)
		{
			newGrid[x][y] = 0;
		}
		else
		{
			newGrid[x][y] = 1;
		}
	}
	// console.log("Cell: "+x+","+y+" OState "+grid[x][y]+" Neighbours: "+liveNeighbours+" State "+newGrid[x][y]+"\n" );
}

function findLiveCells() {

	for ( var x = 0; x < gridSize; x++)
	{
		for (var y = 0; y < gridSize; y++)
		{
			var cell = grid[x][y];
			if (cell == 1)
			{
					liveCells.push([x,y]);
			};
		};
	}
}

 function checkNeighbours(x,y) {

	var liveNeighbours = 0;

	liveNeighbours = liveNeighbours + getCellState(x-1,y-1);
	liveNeighbours = liveNeighbours + getCellState(x-1,y);
	liveNeighbours = liveNeighbours + getCellState(x-1,y+1);

	liveNeighbours = liveNeighbours + getCellState(x,y-1);
	liveNeighbours = liveNeighbours + getCellState(x,y+1);

	liveNeighbours = liveNeighbours + getCellState(x+1,y-1);
	liveNeighbours = liveNeighbours + getCellState(x+1,y);
	liveNeighbours = liveNeighbours + getCellState(x+1,y+1);

	return liveNeighbours;
}

function getCellState(x,y) {

	if (x >= 0 && y >= 0) {

		if (x < gridSize && y < gridSize) {

			return grid[x][y];
		};
	};

	return 0;
}

function updateLiveCellsOnly() {

	for (var i = 0; i < liveCells.length; i++) {
		var x = liveCells[i][0];
		var y = liveCells[i][1];
		
		updateCellState(x,y);
	};
}

function printGrid(grid) {

	for (var x = 0; x < grid.length; x++) {
			
		var row = [];

		for (var y = 0; y < grid.length; y++) {
		
			row.push(grid[x][y]);
		
		};

		console.log(row);
	};
}
