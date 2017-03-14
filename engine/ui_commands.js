NEON.UI.prototype.BuildTower = function( parameters )
{
	var tower_parameters = {coordinates:{x:0,z:0}, game:game, cell_size:75, active:false};
	this.current_state = 'BUILDING';
	this.building_tower = new NEON.TowerTypes[ parameters.tower_type ]( tower_parameters );
	this.scene.add( this.building_tower.mesh );
}
