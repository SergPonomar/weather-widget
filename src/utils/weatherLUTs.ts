//Beaufort wind force scale
const beaufortLUT = {
	'0':	'Calm',
	'1':	'Light air',
	'2':	'Light breeze',
	'3':	'Gentle breeze',
	'4':	'Moderate breeze',
	'5':	'Fresh breeze',
	'6':	'Strong breeze',
	'7':	'Near gale',
	'8':	'Gale',
	'9':	'Strong gale',
	'10': 'Storm',
	'11': 'Violent storm',
	'12': 'Hurricane'
}

type BeaufortLUTKey = keyof typeof beaufortLUT;

function msToBeufortDesc(speed: number): string {
	const beufort = Math.round(1.126841 * speed)
	if (beufort > 12) {
		return 'Hurricane'
	} else {
		const key = beufort.toString() as BeaufortLUTKey
		return beaufortLUT[key]
	}
}

//Convert Wind Directions in Degrees to Compass Directions
const windDirectionsLUT = {
	'0':	'N',
	'1':	'NNE',
	'2':	'NE',
	'3':	'ENE',
	'4':	'E',
	'5':	'ESE',
	'6':	'SE',
	'7':	'SSE',
	'8':	'S',
	'9':	'SSW',
	'10': 'SW',
	'11': 'WSW',
	'12': 'W',
	'13': 'WNW',
	'14': 'NW',
	'15': 'NNW',
	'16': 'N'
}

type WindDirectionsLUTKey = keyof typeof windDirectionsLUT;

function degToDirection(dir: number): string {
	const key = Math.round(dir%360/22.5).toString() as WindDirectionsLUTKey
	return windDirectionsLUT[key]
}

export {msToBeufortDesc, degToDirection}