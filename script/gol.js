function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}


var Grid = require('./Grid.js');

var initialState = [
			[0,1,0],
			[0,1,0],
			[0,1,0]
		];

var grid = new Grid();

// grid.setState(initialState);
grid.draw(6);

for (var i = 0; i < 5; i++) {
	grid.print();
	// console.log(grid.getGrid());
	// createTable(grid.getGrid());
	grid.update();	
}

