NEON.TowerTypes['Void Ray'] = function( parameters )
{
	// ------------------------------
	this.price = 100;
	this.game = parameters.game;
	this.coordinates = parameters.coordinates;
	this.level = parameters.level || 1;
	this.range_radius = 300;
	this.active = typeof( parameters.active ) == "undefined" ? true : parameters.active;
	this.ray = null;
	// ------------------------------
	this.tick = function(delta)
	{
		this.ray.mesh.visible = false;
		if( ! this.active )
			return;
		this.searchEnemies();
		this.ray.tick( delta );
	}
	// ------------------------------
	this.searchEnemies = function()
	{
		for(var i=0; i<this.game.enemies.length;i++)
		{
			var enemy = this.game.enemies[i];
			var tower_center = new THREE.Vector2( this.mesh.position.x, this.mesh.position.z );
			var enemy_center = new THREE.Vector2( enemy.mesh.position.x, enemy.mesh.position.z );
			var distance = tower_center.distanceTo(enemy_center);
			if( distance < this.range_radius+enemy.size )
				return this.shoot( enemy );
		}
	}
	// ------------------------------
	this.shoot = function ( enemy )
	{
		// update ray
		this.ray.mesh.visible = true;
		this.ray.mesh.geometry.vertices[1] = this.ray.mesh.worldToLocal(enemy.mesh.position.clone());
		this.ray.mesh.geometry.verticesNeedUpdate = true;
		this.ray.damage 
		// impact enemy
		enemy.impact( this.ray );
	}
	// ------------------------------
	this.init = function()
	{
		// tower
		var height = 100;
		var cell_size = this.game.current_map.cell_size;
		var geometry = new THREE.ConeBufferGeometry( 30, height, 8 );
		var material = new THREE.MeshPhongMaterial( {color:0x1c6670, overdraw:0.5 } );
		var position = this.game.current_map.getPositionFromCoordinates(this.coordinates.x, this.coordinates.z);
		this.tower = new THREE.Mesh( geometry, material );
		this.tower.position.y = height/2;
		// range
		var geometry = new THREE.CircleGeometry( this.range_radius, 32 );
		var material = new THREE.MeshBasicMaterial( { color: 0x1c6670, transparent:true, opacity:0.1 } );
		this.range = new THREE.Mesh( geometry, material );
		this.range.position.y = 0.5;
		this.range.rotateX(-Math.PI/2);
		// ray
		this.ray = new NEON.ShootTypes['Ray']( {tower:this} );
		this.ray.mesh.position.y = height;
		// final_mesh
		this.mesh = new THREE.Group();
		this.mesh.add(this.tower);
		this.mesh.add(this.range);
		this.mesh.add(this.ray.mesh);
		this.mesh.position.y = 36;
		this.mesh.position.x = position.x;
		this.mesh.position.z = position.z;
	}
	this.setCoordinates = function( coordinates )
	{
		this.coordinates = coordinates;
		var position = this.game.current_map.getPositionFromCoordinates(this.coordinates.x, this.coordinates.z);
		this.mesh.position.x = position.x;
		this.mesh.position.z = position.z;
	}
	// ------------------------------
	this.init();
}
