describe('The rules', function(){
	var Cell = require('../script/cell.js');

	it('Underpopulation: Any live cell with fewer than two live neighbours dies, as if caused by cell.', function (){
		var cell = new Cell();

		expect(cell.getState(0,0)).toBe(0);
		expect(cell.getState(0,1)).toBe(0);
		expect(cell.getState(0,2)).toBe(0);
		expect(cell.getState(1,0)).toBe(0);
		expect(cell.getState(1,1)).toBe(0);
		expect(cell.getState(1,2)).toBe(1);
	});

	
});

describe('Scenario 1: Underpopulation', function(){
	var Cell = require('../script/cell.js');
	var cell = new Cell();

	it('Underpopulation: Given a game of life, when a live cell has fewer than two neighbours; then this cell dies', function (){
		expect(cell.getState(0,0)).toBe(0);
		expect(cell.getState(0,1)).toBe(0);
		expect(cell.getState(0,2)).toBe(0);
		expect(cell.getState(1,0)).toBe(0);
		expect(cell.getState(1,1)).toBe(0);
		expect(cell.getState(1,2)).toBe(1);
	});
});

describe('Scenario 2: Overcrowding', function(){
	var Cell = require('../script/cell.js');
	var cell = new Cell();

	it('Overcrowding: Given a game of life, when a live cell has more than three neighbours; then this cell dies.', function (){
		expect(cell.getState(1,3)).toBe(1);
		expect(cell.getState(1,4)).toBe(0);
		expect(cell.getState(1,5)).toBe(0);
		expect(cell.getState(1,10)).toBe(0);
		expect(cell.getState(1,100)).toBe(0);
	});
});

describe('Scenario 3: Survival', function(){
	var Cell = require('../script/cell.js');
	var cell = new Cell();
	
	it('Survival: Given a game of life, When a live cell has two or three neighbours; then this cell stays alive.', function (){
		expect(cell.getState(1,1)).toBe(0);
		expect(cell.getState(1,2)).toBe(1);
		expect(cell.getState(1,3)).toBe(1);
		expect(cell.getState(1,4)).toBe(0);
	});
});

describe('Scenario 4: Creation of Life', function(){
	var Cell = require('../script/cell.js');
	var cell = new Cell();
	
	it('Creation of Life: When an empty position has exactly three neighbouring cells; then a cell is created in this position.', function (){
		expect(cell.getState(0,3)).toBe(1);
	});
});

describe('Scenario 5: Grid with no live cells', function(){
	var Cell = require('../script/cell.js');
	var cell = new Cell();
	
	it('Grid with no live cells: Given a game of life with the initial state containing no live cells; when the game evolves one turn; then the next state also contains no live cells', function (){
		expect(cell.getState(0,0)).toBe(0);
	});
});

describe('Scenario 6: Expected game outcome for seeded grid', function (){
	var evolve = require('../script/gol')().evolve;

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

		expect(evolve(initialState)).toEqual(resultState);
	});
});

describe('Game', function (){
	var evolve = require('../script/gol')().evolve;

	it('can perform a simple evolution', function(){
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

		expect(evolve(initialState)).toEqual(resultState);
	});
});
