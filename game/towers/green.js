NEON.TowerTypes['Green'] = function( parameters )
{
	// ------------------------------
	this.price = 50;
	this.game = parameters.game;
	this.coordinates = parameters.coordinates;
	this.level = parameters.level || 1;
	this.range_radius = 300;
	this.shoot_cooldown = 0.15;
	this.last_shoot = -this.shoot_cooldown;
	this.active = typeof( parameters.active ) == "undefined" ? true : parameters.active;
	// ------------------------------
	this.tick = function(delta)
	{
		this.last_shoot += delta;

		if( ! this.active )
			return;

		if(this.last_shoot > this.shoot_cooldown )
		{
			this.last_shoot %= this.shoot_cooldown;
			this.searchEnemies();
		}
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
		var shoot = new NEON.ShootTypes["Basic"]( {game:this.game, target:enemy, position:this.mesh.position} );
		this.game.addShoot( shoot );
	}
	// ------------------------------
	this.init = function()
	{
		// tower
		var height = 50;
		var cell_size = this.game.current_map.cell_size;
		var geometry = new THREE.BoxGeometry( 70, height, 70 );
		var material_default = new THREE.MeshPhongMaterial( {color:0x00FF00 } );
		var material_selected = new THREE.MeshPhongMaterial( {color:0x00FF00, emissive:0x333333} );
		var position = this.game.current_map.getPositionFromCoordinates(this.coordinates.x, this.coordinates.z);
		this.tower = new THREE.Mesh( geometry, material_default );
		this.tower.position.y = height/2;
		this.tower.material_default = material_default;
		this.tower.material_selected = material_selected
		// range
		var geometry = new THREE.CircleGeometry( this.range_radius, 32 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent:true, opacity:0.1 } );
		this.range = new THREE.Mesh( geometry, material );
		this.range.position.y = 0.5;
		this.range.rotateX(-Math.PI/2);
		// final_mesh
		this.mesh = new THREE.Group();
		this.mesh.add(this.tower);
		this.mesh.add(this.range);
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
