describe('Scenario 1: Underpopulation', function(){
	var Cell = require('../script/Cell.js');
	var cell = new Cell();

	it('Underpopulation: Any live cell with fewer than two live neighbours dies, as if caused by cell.', function (){

		cell.setState(0);
		cell.setLiveNeighbours(0);
		expect(cell.newCellState()).toBe(0);

		cell.setState(0);
		cell.setLiveNeighbours(1);
		expect(cell.newCellState()).toBe(0);

		cell.setState(0);
		cell.setLiveNeighbours(2);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(0);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(1);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(2);
		expect(cell.newCellState()).toBe(1);
	});

	
});

describe('Scenario 2: Overcrowding', function(){
	var Cell = require('../script/Cell.js');
	var cell = new Cell();

	it('Overcrowding: Given a game of life, when a live cell has more than three neighbours; then this cell dies.', function (){

		cell.setState(1);
		cell.setLiveNeighbours(3);
		expect(cell.newCellState()).toBe(1);

		cell.setState(1);
		cell.setLiveNeighbours(4);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(5);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(10);
		expect(cell.newCellState()).toBe(0);

		cell.setState(1);
		cell.setLiveNeighbours(100);
		expect(cell.newCellState()).toBe(0);
	});
});

describe('Scenario 3: Survival', function(){
	var Cell = require('../script/Cell.js');
	var cell = new Cell();
	
	it('Survival: Given a game of life, When a live cell has two or three neighbours; then this cell stays alive.', function (){

		cell.setState(1);
		cell.setLiveNeighbours(2);
		expect(cell.newCellState()).toBe(1);

		cell.setState(1);
		cell.setLiveNeighbours(3);
		expect(cell.newCellState()).toBe(1);
	});
});

describe('Scenario 4: Creation of Life', function(){
	var Cell = require('../script/Cell.js');
	var cell = new Cell();
	
	it('Creation of Life: When an empty position has exactly three neighbouring cells; then a cell is created in this position.', function (){
		cell.setState(0);
		cell.setLiveNeighbours(3);
		expect(cell.newCellState()).toBe(1);
	});
});

describe('Scenario 5: Grid with no live cells', function(){
	var Cell = require('../script/Cell.js');
	var cell = new Cell();
	
	it('Grid with no live cells: Given a game of life with the initial state containing no live cells; when the game evolves one turn; then the next state also contains no live cells', function (){
		cell.setState(0);
		cell.setLiveNeighbours(0);
		expect(cell.newCellState()).toBe(0);
	});
});

describe('Scenario 6: Expected game outcome for seeded grid', function (){
	var Grid = require('../Script/Grid.js');
	var grid = new Grid();

	it('Given a game of life with the initial state…', function(){
		var initialState = [
			[0,0,0],
			[0,1,0],
			[0,0,0]
		];

		var resultState = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];

		grid.setState(initialState);
		grid.update()
		expect(grid.getGrid()).toEqual(resultState);
	});
});

describe('Game', function (){
	var Grid = require('../Script/Grid.js');
	var grid = new Grid();

	it('can perform a simple evolution', function(){
		var initialState = [
			[0,1,0],
			[0,1,0],
			[0,1,0]
		];

		var resultState = [
			[0,0,0],
			[1,1,1],
			[0,0,0]
		];

		grid.setState(initialState);
		grid.update()
		expect(grid.getGrid()).toEqual(resultState);
	});
});