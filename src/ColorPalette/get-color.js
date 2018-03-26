const axe = require('axe-core');

export default function getColor(hex) {
	let i = 0
	let chars = hex.toUpperCase().split('');

  chars = chars.map((c) => {
		if (c >= '0' && c <= '9') {
			return c - '0';
		} else if (c === 'A') {
			return 10;
		} else if (c === 'B') {
			return 11;
		} else if (c === 'C') {
			return 12;
		} else if (c === 'D') {
			return 13;
		} else if (c === 'E') {
			return 14;
		}

		return 15;
	});

	const red = chars[i++] * 16 + chars[i++];
	const green = chars[i++] * 16 + chars[i++];
	const blue = chars[i++] * 16 + chars[i++];

	return new axe.commons.color.Color(red, green, blue, 1);
}
