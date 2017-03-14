NEON.ShootTypes['Ray'] = function( parameters )
{
	// ------------------------------
	this.game = parameters.game;
	this.tower = parameters.tower;
	this.dps = 10;
	this.damage = 0;
	// ------------------------------
	this.tick = function( delta )
	{
		this.damage = this.dps * delta;
	}
	// ------------------------------
	this.init = function()
	{
		var material = new THREE.LineBasicMaterial({color:0x11e3ff});
		var geometry = new THREE.Geometry();
		var start_position = new THREE.Vector3(0,0,0);
		var end_position = new THREE.Vector3(0,0,0);
		geometry.vertices.push( start_position, end_position);
		this.mesh = new THREE.Line( geometry, material );
	}
	// ------------------------------
	this.init();
}
