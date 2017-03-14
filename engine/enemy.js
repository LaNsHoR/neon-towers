NEON.EnemyTypes = {};

// ===============================================================
// Basic Enemy
NEON.EnemyTypes['*'] = function( parameters )
{
	// ------------------------------
	this.game = parameters.game;
	this.level = parameters.level || 1;
	this.life = ( 100 * this.level ) + ( 100 * (this.level-1));
	this.money = 5 * this.level;
	this.max_life = this.life;
	this.speed = 75;
	this.coordinates = parameters.coordinates;
	this.path = parameters.path;
	this.distance = 0;
	this.size = 25; //radius
	// ------------------------------
	this.tick = function( delta )
	{
		if( this.path )
		{
			var position_data = this.path.getPositionData( this.distance, this.speed, delta);
			this.distance = position_data.distance;
			this.mesh.position.x = position_data.position.x;
			this.mesh.position.z = position_data.position.z;
		}
		this.mesh.material.color.g = this.mesh.material.color.b = this.life / this.max_life;
	}
	// ------------------------------
	this.init = function()
	{
		var segments = 32;
		var geometry = new THREE.SphereGeometry( this.size, segments, segments );
		var material = new THREE.MeshPhongMaterial( {color:0xffffff, overdraw:0.5 } );
		this.mesh = new THREE.Mesh( geometry, material );
		var position = this.game.current_map.getPositionFromCoordinates( this.coordinates.x, this.coordinates.z );
		this.mesh.position.y = this.size;
		this.mesh.position.x = position.x;
		this.mesh.position.z = position.z;
	}
	// ------------------------------
	this.impact = function( shoot )
	{
		this.life -= shoot.damage;
		if( this.life <= 0)
			this.selfDestruction();
	}
	// ------------------------------
	this.selfDestruction = function()
	{
		this.game.removeEnemy( this );
	}
	// ------------------------------
	this.init();
}