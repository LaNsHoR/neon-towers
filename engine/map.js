NEON.Map = function( parameters )
{
	// ------------------------------
	var CELL_SIZE = 75;
	var total_cells_x = parameters.total_cells_x;
	var total_cells_z = parameters.total_cells_z;
	// ------------------------------
	this.start_points = parameters.start_points;
	this.cells = [];
	this.mesh = new THREE.Group();
	this.paths = {};
	this.cell_size = CELL_SIZE;
	// ------------------------------
	this.tick = function(delta)
	{
		for(var x=0; x<total_cells_x; x++)
		{
			for(var z=0; z<total_cells_z; z++)
				this.cells[x][z].tick(delta);
		}
	}
	// ------------------------------
	this.loadCellMap = function()
	{
		for(var x=0; x<total_cells_x; x++)
		{
			this.cells[x] = [];
			for(var z=0; z<total_cells_z; z++)
			{
				var coordinates = {x:x, z:z};
				var cell_type = parameters.cell_map ? parameters.cell_map[z][x] : '#';
				var cell = this.cells[x][z] = new NEON.CellTypes[cell_type]( {cell_size:CELL_SIZE, coordinates:coordinates} );
				var position = this.getPositionFromCoordinates(x, z);
				cell.mesh.position.x = position.x;
				cell.mesh.position.z = position.z;
				this.mesh.add( cell.mesh );
			}
		}
	}
	// ------------------------------
	this.getPositionFromCoordinates = function(x, z)
	{
		x = (x*CELL_SIZE) - (total_cells_x*CELL_SIZE/2);
		z = (z*CELL_SIZE) - (total_cells_z*CELL_SIZE/2);
		return {x:x, z:z};
	}
	// ------------------------------
	this.init = function()
	{
		this.loadCellMap();
		for(var i=0; i<parameters.start_points.length; i++)
		{
			var path = NEON.getPathFromMap( {map:this, cell_size:CELL_SIZE, start_point:this.start_points[i]} );
			this.paths[this.start_points[i].x+","+this.start_points[i].z] = path;
		}
	}
	// ------------------------------
	this.init();
}
