NEON.Game = function( parameters )
{
	// ------------------------------
	this.last_enemies_spawn = 0;
	this.total_spawned_enemies = 0;
	this.max_spawned_enemies = 0;
	this.spawn_cooldown = 1;
	this.wave = 0;
	this.enemies = [];
	this.current_map = 0x0;
	this.ui = parameters.ui;
	this.towers = [];
	this.shoots = [];
	this.money = 100;
	var scene = this.ui.scene;
	// ------------------------------
	this.indexUpdate = function( array, from )
	{
		for(var i=from; i<array.length; i++)
			array[i].index=i;
	}
	// ------------------------------
	this.addMoney = function( quantity )
	{
		this.money += quantity;
		this.ui.updateControls();
	}
	// ------------------------------
	this.tick = function( delta )
	{
		this.spawnEnemies( delta );
		for(var i=0; i<this.enemies.length; i++)
			this.enemies[i].tick( delta );
		if( this.current_map )
			this.current_map.tick( delta );
		for(var i=0; i<this.towers.length; i++)
			this.towers[i].tick( delta );
		for(var i=0; i<this.shoots.length; i++)
			this.shoots[i].tick( delta );
	}
	// ------------------------------
	this.setCurrentMap = function( map )
	{
		// TODO: remove current map from scene if it exists
		this.current_map = map;
		scene.add( map.mesh );
	}
	// ------------------------------
	this.addEnemy = function( enemy )
	{
		enemy.index = this.enemies.length;
		this.enemies.push( enemy );
		scene.add( enemy.mesh );
	}
	this.removeEnemy = function( enemy )
	{
		this.enemies.splice( enemy.index, 1);
		this.indexUpdate( this.enemies, enemy.index );
		scene.remove( enemy.mesh );
		this.addMoney( enemy.money );
	}
	// ------------------------------
	this.spawnEnemies = function( delta )
	{
		this.last_enemies_spawn += delta;
		if( this.last_enemies_spawn < this.spawn_cooldown )
			return;
		if( this.total_spawned_enemies >= this.max_spawned_enemies)
			return;
		this.last_enemies_spawn %= this.spawn_cooldown;
		for(var i=0; i<this.current_map.start_points.length; i++)
		{
			var coordinates = this.current_map.start_points[i];
			var path_key = coordinates.x+","+coordinates.z;
			var path = this.current_map.paths[path_key];
			var enemy = new NEON.EnemyTypes["*"]( {coordinates:coordinates, path:path, game:this, level:this.wave} );
			enemy.tick( this.last_enemies_spawn ); //execute lost time
			this.total_spawned_enemies++;
			this.addEnemy(enemy);
		}
	}
	this.nextWave = function()
	{
		this.wave++;
		this.max_spawned_enemies += 40;
		this.ui.updateControls();
	}
	// ------------------------------
	this.addTower = function( parameters )
	{
		// tower extraction
		var tower = parameters.tower;
		// rules for adding towers
		if( tower.price > this.money )
			return false;
		// indexing and adding
		tower.index = this.towers.length;
		this.towers.push( tower );
		// activate tower
		tower.range.visible = false;
		tower.active = true;
		// substract money
		this.addMoney( - tower.price );
		// success! :)
		return true;
	}
	// ------------------------------
	this.addShoot = function( shoot )
	{
		shoot.index = this.shoots.length;
		this.shoots.push( shoot );
		scene.add( shoot.mesh );
	}
	this.removeShoot = function( shoot )
	{
		this.shoots.splice( shoot.index, 1);
		this.indexUpdate( this.shoots, shoot.index );
		scene.remove( shoot.mesh );
	}
}
