// TESTING FEED

var scene = new THREE.Scene();

var width = 1920;
var height = 1920;

if( 0 )
{
	var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -1500, 1500 );
	camera.position.y = 300;
}
else
{
	camera = new THREE.PerspectiveCamera( 60, width / height, 1, 100000 );
	camera.position.x = -1586.6694179767726
	camera.position.y = 594.3845039289417
	camera.position.z = 615.0303060959127
}



var width = 800;
var height = 800;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x000105 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );





// Lights
var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
light.position.x = 0.6
scene.add( light );

var cell_map = [];
var create_map = 0x0;

if( DEMO_MAP_1 = false )
{
	 create_map = function()
	{
		var total_cells = 22;
		cell_map = [];
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("##########DD#####UU###");
		cell_map.push("###DLLLLLLLD#####UU###");
		cell_map.push("###DDLLLLLLL#####UU###");
		cell_map.push("###DD############UU###");
		cell_map.push("###DD############UU###");
		cell_map.push("###DRRRRRRRRRRRRRUU###");
		cell_map.push("###RRRRRRRRRRRRRRRU###");
		cell_map.push("######################");
		var start_points = [ {x:10,z:0}, {x:11,z:0} ];
		var map = new NEON.Map( {total_cells_x: total_cells, total_cells_z:total_cells, cell_map:cell_map, start_points:start_points} );
		return map;
	}
}

if( DEMO_MAP_2 = true )
{
	 create_map = function()
	{
		var total_cells = 22;
		cell_map= [];//0123456789012345678901
		cell_map.push("######################"); //0
		cell_map.push("######################"); //1
		cell_map.push("######################"); //2
		cell_map.push("######################"); //3
		cell_map.push("RRRRRRRRRRRRRRRRRRRRRD"); //4
		cell_map.push("DLLLLLLLLLLLLLLLLLLLLL"); //5
		cell_map.push("D#####################"); //6
		cell_map.push("D#####################"); //7
		cell_map.push("D##################DLL"); //8
		cell_map.push("D##################D##"); //9
		cell_map.push("RRRRRRRRRRRRRRRRRRDD##"); //10
		cell_map.push("##################DD##"); //11
		cell_map.push("##################DD##"); //12
		cell_map.push("#####RRRRRRRRRRRRDDD##"); //13
		cell_map.push("#####U###########DDD##"); //14
		cell_map.push("#####U###########DDD##"); //15
		cell_map.push("#####U###########DDD##"); //16
		cell_map.push("#####U###########DDD##"); //17
		cell_map.push("#####U###########DDD##"); //18
		cell_map.push("#####U###########DDD##"); //19
		cell_map.push("#####U###########DDD##"); //20
		cell_map.push("#####U###########DDD##"); //21
                	 //0123456789012345678901
		var start_points = [ {x:0,z:4}, {x:5,z:21}, {x:21,z:8} ];
		var map = new NEON.Map( {total_cells_x: total_cells, total_cells_z:total_cells, cell_map:cell_map, start_points:start_points} );
		return map;
	}
}










//raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / width ) * 2 - 1;
	mouse.y = - ( event.clientY / height ) * 2 + 1;

}




// exec
var map = create_map();
var game = NEON.current_game = new NEON.Game( {scene:scene} );
game.setCurrentMap(map);


if ( DEMO_TOWERS = false)
{
var tower = new NEON.TowerTypes["B"]( {coordinates:{x:5,z:17}, game:game, cell_size:75} );
game.addTower(tower)
var tower = new NEON.TowerTypes["B"]( {coordinates:{x:16,z:18}, game:game, cell_size:75} );
//tower.range_radius= 700;
game.addTower(tower)
var tower = new NEON.TowerTypes["B"]( {coordinates:{x:9,z:18}, game:game, cell_size:75} );
game.addTower(tower)
}



//grid.rotateX(Math.PI/8)

//grid.rotateY(Math.PI/16)


  controls = new THREE.OrbitControls( camera );
//  controls.addEventListener( 'change', function() {controls.update(); } );

var move = 1;
var INTERSECTED

var BUILDING = false;

function render() {
	requestAnimationFrame( render );
	NEON.current_game.tick();



				var timer = Date.now() * 0.0001;
				if(move)
				{
					//camera.position.x = Math.cos( timer ) * 200;
					//camera.position.z = Math.sin( timer ) * 200;
					camera.lookAt( scene.position );
				}

	if( BUILDING )
	{

					// update the picking ray with the camera and mouse position
					raycaster.setFromCamera( mouse, camera );
					// calculate objects intersecting the picking ray
					var intersects = raycaster.intersectObjects( map.mesh.children );
					if ( intersects.length > 0 && intersects[ 0 ].object.neon_object.buildable) //set highlight
					{
						if ( INTERSECTED != intersects[ 0 ].object )
						{
							if ( INTERSECTED )
								INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
							INTERSECTED = intersects[ 0 ].object;
							INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
							INTERSECTED.material.emissive.setHex( 0x00FF00 );
						}

						if( tmp_tower )
						{
							tmp_tower.setCoordinates(INTERSECTED.neon_object.coordinates);
						}
					}
					else //restore hightligh
					{
						restoreHighLight()
					}
	}


	renderer.render( scene, camera );
}



renderer.domElement.addEventListener( 'mouseup', function ( event )
{
	if( ! BUILDING || ! INTERSECTED )
		return;
	BUILDING = false;
	game.createTower( {tower:tmp_tower} );
	tmp_tower = null;
	restoreHighLight()
});

var tmp_tower = null;
function buildGreenTower()
{
	BUILDING=true;
	var coordinates = INTERSECTED ? INTERSECTED.neon_object.coordinates : {x:0,z:0};
	var tower_parameters = {coordinates:coordinates, game:game, cell_size:75, active:false};
	tmp_tower = new NEON.TowerTypes["Green"]( tower_parameters );
	game.addTower( tmp_tower );
}

function restoreHighLight()
{
	if ( ! INTERSECTED )
		return;
	INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	INTERSECTED = null;
}

window.addEventListener( 'mousemove', onMouseMove, false );



render();