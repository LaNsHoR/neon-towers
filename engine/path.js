NEON.Path = function( parameters )
{
	// ------------------------------
	this.segments = parameters.segments;
	this.total_distance = parameters.total_distance;
	// ------------------------------
	this.getPositionData = function( last_distance, speed, delta )
	{
		var distance = (last_distance + (speed * delta));
		distance = this.total_distance ? distance % this.total_distance : distance;
		for(var i=1; i<this.segments.length; i++)
		{
			if(distance > this.segments[i].distance)
				continue;
			var previous_segment = this.segments[i-1];
			var next_segment = this.segments[i];
			var segment_distance = next_segment.distance - previous_segment.distance;
			var distance_normalized = (distance - previous_segment.distance) / ( next_segment.distance - previous_segment.distance );
			var diff_x = next_segment.position.x - previous_segment.position.x;
			var diff_z = next_segment.position.z - previous_segment.position.z;
			var x = previous_segment.position.x + (diff_x*distance_normalized);
			var z = previous_segment.position.z + (diff_z*distance_normalized);
			return { position:{x:x, z:z}, distance:distance};
		}
		// This line never will be reach
		return { position:{x:0, z:0}, distance:0};
	}
}

NEON.getPathFromMap = function( parameters )
{
	var map                    = parameters.map;
	var cell_size              = parameters.cell_size;
	var cells                  = map.cells;
	var current_coordinates    = {x:parameters.start_point.x, z:parameters.start_point.z};
	var current_cell           = cells[current_coordinates.x][current_coordinates.z];
	var segments               = [];
	var last_direction         = "";
	var total_distance         = -cell_size; // Review logic to start with 0
	var last_valid_coordinates = null;

	function nextCell()
	{
		if(current_cell.direction == 'down')
		{
			current_coordinates.z++;
			return current_cell = current_coordinates.z >= cells.length ? null : cells[current_coordinates.x][current_coordinates.z];
		}
		if(current_cell.direction == 'up')
		{
			current_coordinates.z--;
			return current_cell = current_coordinates.z < 0 ? null : cells[current_coordinates.x][current_coordinates.z];
		}
		if(current_cell.direction == 'right')
		{
			current_coordinates.x++;
			return current_cell = current_coordinates.x >= cells[current_coordinates.x].length ? null : cells[current_coordinates.x][current_coordinates.z];
		}
		if(current_cell.direction == 'left')
		{
			current_coordinates.x--;
			return current_cell = current_coordinates.x < 0 ? null : cells[current_coordinates.x][current_coordinates.z];
		}
		return current_cell = null;
	}

	// Todo: refactor, create nextCell process op
	while( current_cell )
	{
		total_distance += cell_size;
		if( current_cell.direction == last_direction)
		{
			var next_cell = nextCell();
			last_valid_coordinates = next_cell ? current_coordinates : last_valid_coordinates;
			continue;
		}
		last_direction = current_cell.direction;
		var position = map.getPositionFromCoordinates( current_coordinates.x, current_coordinates.z );
		segments.push( {position:position, distance:total_distance} );
		var next_cell = nextCell();
		last_valid_coordinates = next_cell ? current_coordinates : last_valid_coordinates;
	}
	// Add last segment
	var position = map.getPositionFromCoordinates( last_valid_coordinates.x, last_valid_coordinates.z );
	segments.push( {position:position, distance:total_distance} );
	// Return PAth object
	return new NEON.Path( {segments:segments, total_distance:total_distance} );
}
