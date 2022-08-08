function firstToUpperCase (str: string) {
	return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function clamp (num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}

export {clamp, firstToUpperCase}