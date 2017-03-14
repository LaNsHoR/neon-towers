NEON.ShootTypes['Basic'] = function( parameters )
{
	// ------------------------------
	this.game = parameters.game;
	this.target = parameters.target;
	this.speed = 850;
	this.damage = 10;
	this.direction = new THREE.Vector3();
	// ------------------------------
	this.tick = function( delta )
	{
		if( this.target.life <= 0)
			return this.selfDestruction();
		this.direction.subVectors( this.target.mesh.position, this.mesh.position ).normalize();
		this.direction.multiplyScalar( delta*this.speed );
		this.mesh.position.x += this.direction.x;
		this.mesh.position.y += this.direction.y;
		this.mesh.position.z += this.direction.z;
		var distance = this.target.mesh.position.distanceTo(this.mesh.position);
		if( distance < this.target.size )
			this.impact();
	}
	// ------------------------------
	this.selfDestruction = function()
	{
		this.game.removeShoot( this );
	}
	// ------------------------------
	this.impact = function()
	{
		this.target.impact( this );
		this.selfDestruction();
	}
	// ------------------------------
	this.init = function()
	{
		var size = 5;
		var geometry = new THREE.BoxGeometry( size, size, size );
		var material = new THREE.MeshPhongMaterial( {color:0xffffff} );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.y = 70;
		this.mesh.position.x = parameters.position.x;
		this.mesh.position.z = parameters.position.z;
	}
	// ------------------------------
	this.init();
}
