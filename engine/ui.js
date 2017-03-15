NEON.UI = function ( parameters )
{
	// ------------------------------
	// Canvas
	this.canvas_width = parameters.canvas_width;
	this.canvas_height = parameters.canvas_height;
	// Scene
	this.scene = new THREE.Scene();
	this.camera = null;
	this.renderer = null;
	this.raycaster = null;
	// Controls
	this.mouse_coords = null;
	this.mouse_controls = null;
	this.controls = {
		money : document.getElementById('money'),
		total_waves : document.getElementById('total_waves')
	};
	// Game State
	this.clock = new THREE.Clock();
	this.current_state = null; // PLAYING, BUILDING, etc...
	this.game = null;
	// Internal objects which don't belong to the game
	this.building_tower = null;
	// ------------------------------
	this.init = function()
	{
		// Scene
		this.initScene();
		// Controls
		this.initControls();
		// Game
		this.initGame();
		// First Control Update
		this.updateControls();
		// Play music
		NEON.Sound.play( {sound_id:'music_factorized', loop:true, volume:0.5} );
	}
	// ------------------------------
	this.initScene = function()
	{
		// Create Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor( 0x000105 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.canvas_width, this.canvas_height );
		document.body.appendChild( this.renderer.domElement );
		// Add Basic light to the scene
		// -- TODO: This should be done in the map
		var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		light.position.x = 0.6;
		this.scene.add( light );
		// Create Camera
		this.camera = new THREE.PerspectiveCamera( 60, this.canvas_width / this.canvas_height, 1, 100000 );
		this.camera.position.x = -1586.6694179767726;
		this.camera.position.y =  594.3845039289417;
		this.camera.position.z =  615.0303060959127;
		this.camera.lookAt( new THREE.Vector3(0,0,0) );
	}
	// ------------------------------
	this.initControls = function()
	{
		// Compute mouse coordinates over canvas
		this.mouse = new THREE.Vector2();
		var canvas_position = this.renderer.domElement.getClientRects()[0];
		this.renderer.domElement.addEventListener( 'mousemove', (event) => {
			this.mouse.x =   ( (event.clientX-canvas_position.left) / this.canvas_width  ) * 2 - 1;
			this.mouse.y = - ( (event.clientY-canvas_position.top) / this.canvas_height ) * 2 + 1;
		}, false );
		this.mouse_controls = new THREE.OrbitControls( this.camera );
		// Compute mouse click
		this.renderer.domElement.addEventListener( 'mouseup', (event) =>
		{
			if( this.current_state == 'BUILDING')
			{
				this.current_state = null;
				if( ! game.addTower({tower:this.building_tower}) )
				{
					// Remove the tower mesh from the scene if the game deny the tower adition
					this.scene.remove( this.building_tower.mesh );
				}
				this.building_tower = null;
			}
		});
		// Init raycaster
		this.raycaster = new THREE.Raycaster();
	}
	// ------------------------------
	this.initGame = function()
	{
		// Create game
		this.game = new NEON.Game( {ui:this} );
	}
	// ------------------------------
	this.tick = function()
	{
		var max_time_between_frames = 1/30;
		var delta = this.clock.getDelta();
		// Force small time between frame and logic updates 
		delta = delta > max_time_between_frames? max_time_between_frames : delta;
		// Process state
		switch( this.current_state )
		{
			case 'BUILDING': this.processStateBuilding(); break;
		}
		// Update game logic
		this.game.tick( delta );
		// Render
		this.renderer.render( this.scene, this.camera );
	}
	// ------------------------------
	this.processStateBuilding = function()
	{
		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera( this.mouse, this.camera );
		// calculate objects intersecting the picking ray (only in the map grid)
		var intersects = this.raycaster.intersectObjects( this.game.current_map.mesh.children );
		// update the temporary tower position if the mouse is in a buildable position
		if( intersects.length && intersects[0].object.neon_object.buildable)
		{
			this.building_tower.setCoordinates(intersects[0].object.neon_object.coordinates);
		}
	}
	// ------------------------------
	this.updateControls = function()
	{
		this.controls.money.innerHTML = this.game.money;
		this.controls.total_waves.innerHTML = this.game.wave;
	}
	// ------------------------------
	this.init();
}
