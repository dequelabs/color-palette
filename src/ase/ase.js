const fs = require('fs')

function getIntsFromFloats(cBuffer, offset, num) {
	let retVal = []
	for (let i = 0; i < num; i++) {
		retVal.push(Math.floor(cBuffer.readFloatBE(offset + i*4)*255))
	}
	return retVal
}

/**
 * A class to use to handle .ase files the file format is described
 * here: http://www.selapa.net/swatches/colors/fileformats.php#adobe_ase
 *
 * @class
 *
 * @property colors - an array of the colors
 * @property groupName - the name of the palette (currently only supports a single group)
 * @property majorVersion - integer representing the format major version
 * @property minorVersion - integer representing the format minor version
 */
class Ase {
	/**
	 * @constructor
	 *
	 * @param String source - the file path to the .ase file
	 */
	constructor(source) {
		this.source = source
		this.group = ''
		this.colorArray = [] // empty color array
		this.major = 1
		this.minor = 0
	}

	/*
	 * Getters and setters for the public properties
	 */
	get colors() {
		return this.colorArray
	}

	set colors(colors) {
		this.colorArray = colors
	}

	get groupName() {
		return this.group
	}

	set groupName(name) {
		this.group = name
	}

	get majorVersion() {
		return this.major
	}

	set majorVersion(major) {
		this.major = major
	}

	get minorVersion() {
		return this.minor
	}
	
	set minorVersion(minor) {
		this.minor = minor
	}

	/**
	 * write the colors out to the source location - this function is currently not implemented
	 *
	 * @returns void
	 * @throws Error
	 */
	write() {
		throw new Error('not yet implemented')
		// todo
	}

	/**
	 * Reads the .ase file from the source into the internal structure of the class.
	 * You can then use the property getters to get the different properties of the
	 * palette.
	 *
	 * @returns void
	 * @throws Error - if the file is the wrong format or version
	 */
	read() {
		const cBuffer = fs.readFileSync(this.source) // get a Buffer with the contents
		const head = cBuffer.toString('utf8',0, 4)
		if (head !== 'ASEF') {
			throw new Error(`The file is in the wrong format, should be ASEF, found ${head}`)
		}
		this.major = cBuffer.readInt16BE(4)
		if (this.major !== 1) {
			throw new Error(`The major version number is incorrect, expected 1, found ${major}`)
		}
		this.minor = cBuffer.readInt16BE(6)
		/*
		 * read the number of blocks from the file
		 * files generally have a group start block, the colors and an end group block
		 */
		let blocks = cBuffer.readInt32BE(8)
		let offset = 12
		this.colorArray = [] // clear any previous colors
		while (blocks > 0) {
			let nlength, name, c1, c2, length

			c1 = cBuffer[offset++]
			c2 = cBuffer[offset++]
			length = cBuffer.readInt32BE(offset)
			offset += 4
			if (c2 !== 2) {
				// not an end group block
				nlength = cBuffer.readInt16BE(offset)
				name = ''
				for (let i = 0; i < nlength - 1; i++) {
					name += String.fromCharCode(cBuffer.readInt16BE(offset + 2 + (i*2)))
				}
			}
			if (c1 === 0xc0) {
				// group end or beginning block
				offset += length
				if (c2 === 1) {
					// group beginning block
					this.groupName = name
				}
			} else {
				// color block
				offset += 2
				offset += nlength*2
				let cMode = Array.from(
					cBuffer.slice(offset, offset + 4)
				).map((c) => {
					return String.fromCharCode(c)
				}).join('')
				offset += 4
				let cValues
				switch(cMode) {
					case 'RGB ':
					case 'LAB ':
						cValues = getIntsFromFloats(cBuffer, offset, 3)
						offset += 12
						break
					case 'CMYK':
						cValues = getIntsFromFloats(cBuffer, offset, 4)
						offset += 16
						break
					case 'Gray':
						cValues = getIntsFromFloats(cBuffer, offset, 1)
						offset += 4
						break
				}
				let cType = cBuffer.readInt16BE(offset)
				offset += 2
				this.colorArray.push({
					name: name,
					mode: cMode,
					values: cValues,
					colorType: cType
				})
			}
			blocks--
		}
	}
}

export default Ase