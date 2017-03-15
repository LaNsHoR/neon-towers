NEON.UI.prototype.BuildTower = function( parameters )
{
	var tower_parameters = {coordinates:{x:0,z:0}, game:game, cell_size:75, active:false};
	this.current_state = 'BUILDING';
	this.building_tower = new NEON.TowerTypes[ parameters.tower_type ]( tower_parameters );
	this.scene.add( this.building_tower.mesh );
}

NEON.UI.prototype.toggleMusic = function()
{
	NEON.Sound.toggle( {sound_id:'music_factorized'} );
}

NEON.UI.prototype.toggleRanges = function()
{
	this.show_ranges = ! this.show_ranges;
	if( this.show_ranges )
	{
		for(var i=0; i<this.game.towers.length; i++)
			this.game.towers[i].range.visible = true;
	}
	else
	{
		for(var i=0; i<this.game.towers.length; i++)
			this.game.towers[i].range.visible = false;
	}
}
