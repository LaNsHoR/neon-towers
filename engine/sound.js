NEON.Sound = {}

NEON.Sound.play = function( parameters )
{
	var sound_resource = document.getElementById( parameters.sound_id );
	sound_resource.volume = parameters.volume || 1;
	sound_resource.loop = parameters.loop || false;
	sound_resource.play();
}
