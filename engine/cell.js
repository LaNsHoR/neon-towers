NEON.CellTypes = {};

// ===============================================================
// Basic Empty Cell
NEON.CellTypes['#'] = function( parameters )
{
	// ------------------------------
	this.mesh = 0x0;
	this.buildable = true;
	this.direction = 0x0;
	this.coordinates = parameters.coordinates;
	// ------------------------------
	this.tick = function(delta)
	{
	}
	// ------------------------------
	this.init = function()
	{
		var height = 36;
		var geometry = new THREE.BoxGeometry( parameters.cell_size, height, parameters.cell_size );
		var material = new THREE.MeshPhongMaterial( {color:0x252525, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = height/2;
		this.mesh.neon_object = this;
	}
	// ------------------------------
	this.init();
}
// ===============================================================
// Basic Down Cell
NEON.CellTypes['D'] = function( parameters )
{
	// ------------------------------
	this.mesh = 0x0;
	this.buildable = false;
	this.direction = "down";
	this.coordinates = parameters.coordinates;
	// ------------------------------
	this.tick = function(delta)
	{
	}
	// ------------------------------
	this.init = function()
	{
		var height = 10;
		var geometry = new THREE.BoxGeometry( parameters.cell_size, height, parameters.cell_size );
		var material = new THREE.MeshPhongMaterial( {color:0x555555, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = height/2;
		this.mesh.neon_object = this;
	}
	// ------------------------------
	this.init();
}
// ===============================================================
// Basic Up Cell
NEON.CellTypes['U'] = function( parameters )
{
	// ------------------------------
	this.mesh = 0x0;
	this.buildable = false;
	this.direction = "up";
	this.coordinates = parameters.coordinates;
	// ------------------------------
	this.tick = function(delta)
	{
	}
	// ------------------------------
	this.init = function()
	{
		var height = 10;
		var geometry = new THREE.BoxGeometry( parameters.cell_size, height, parameters.cell_size );
		var material = new THREE.MeshPhongMaterial( {color:0x555555, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = height/2;
		this.mesh.neon_object = this;
	}
	// ------------------------------
	this.init();
}
// ===============================================================
// Basic Left Cell
NEON.CellTypes['L'] = function( parameters )
{
	// ------------------------------
	this.mesh = 0x0;
	this.buildable = false;
	this.direction = "left";
	this.coordinates = parameters.coordinates;
	// ------------------------------
	this.tick = function(delta)
	{
	}
	// ------------------------------
	this.init = function()
	{
		var height = 10;
		var geometry = new THREE.BoxGeometry( parameters.cell_size, height, parameters.cell_size );
		var material = new THREE.MeshPhongMaterial( {color:0x555555, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = height/2;
		this.mesh.neon_object = this;
	}
	// ------------------------------
	this.init();
}
// ===============================================================
// Basic Right Cell
NEON.CellTypes['R'] = function( parameters )
{
	// ------------------------------
	this.mesh = 0x0;
	this.buildable = false;
	this.direction = "right";
	this.coordinates = parameters.coordinates;
	// ------------------------------
	this.tick = function(delta)
	{
	}
	// ------------------------------
	this.init = function()
	{
		var height = 10;
		var geometry = new THREE.BoxGeometry( parameters.cell_size, height, parameters.cell_size );
		var material = new THREE.MeshPhongMaterial( {color:0x555555, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = height/2;
		this.mesh.neon_object = this;
	}
	// ------------------------------
	this.init();
}