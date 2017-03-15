NEON.Sound = {}

NEON.Sound.play = function( parameters )
{
	var sound_resource = parameters.sound || document.getElementById( parameters.sound_id );
	sound_resource.volume = parameters.volume || 1;
	sound_resource.loop = parameters.loop || false;
	sound_resource.play();
}

NEON.Sound.toggle = function( parameters )
{
	var sound_resource = parameters.sound || document.getElementById( parameters.sound_id );
	if( sound_resource.paused )
		sound_resource.play();
	else
		sound_resource.pause();
}
