var cell_map = [
'######################',
'######################',
'######################',
'######################',
'RRRRRRRRRRRRRRRRRRRRRD',
'DLLLLLLLLLLLLLLLLLLLLL',
'D#####################',
'D#####################',
'D##################DLL',
'D##################D##',
'RRRRRRRRRRRRRRRRRRDD##',
'##################DD##',
'##################DD##',
'#####RRRRRRRRRRRRDDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
'#####U###########DDD##',
];

var start_points = [ {x:0,z:4}, {x:5,z:21}, {x:21,z:8} ];
var size_x = cell_map[0].length;
var size_z = cell_map.length;

NEON.AvailableMaps["Test Map 2"] = new NEON.Map( {total_cells_x:size_x, total_cells_z:size_z, cell_map:cell_map, start_points:start_points} );
