var cell_map = [
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'##########DD#####UU###',
'###DLLLLLLLD#####UU###',
'###DDLLLLLLL#####UU###',
'###DD############UU###',
'###DD############UU###',
'###DRRRRRRRRRRRRRUU###',
'###RRRRRRRRRRRRRRRU###',
'######################'
];

var start_points = [ {x:10,z:0}, {x:11,z:0} ];
var size_x = cell_map[0].length;
var size_z = cell_map.length;

NEON.AvailableMaps["Test Map 1"] = new NEON.Map( {total_cells_x:size_x, total_cells_z:size_z, cell_map:cell_map, start_points:start_points} );
