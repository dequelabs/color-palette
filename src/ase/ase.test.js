import Ase from './ase'

test('That it is a class', () => {
	let a = new Ase('source')
})

test('That it can read a file', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
})

test('That get colors works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	let colors = a.colors
	expect(colors.length).toBe(5)
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [18, 103, 178],
		colorType: 2
	}))
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [77, 171, 255],
		colorType: 2
	}))
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [51, 159, 255],
		colorType: 2
	}))
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [178, 110, 0],
		colorType: 2
	}))
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [255, 177, 51],
		colorType: 2
	}))
})

test('That get groupName works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	expect(a.groupName).toBe('Africa')
})

test('That get majorVersion works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	expect(a.majorVersion).toBe(1)
})

test('That get minorVersion works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	expect(a.minorVersion).toBe(0)
})

test('That setting groupName works', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	a.groupName = 'America'
	expect(a.groupName).toBe('America')
})

test('That setting majorVersion works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	a.majorVersion = 2
	expect(a.majorVersion).toBe(2)
})

test('That setting minorVersion works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	a.minorVersion = 12
	expect(a.minorVersion).toBe(12)
})

test('That setting colors works after the read', () => {
	let a = new Ase('./src/ase/africa.ase')
	a.read()
	a.colors = [{
		name: '',
		mode: 'RGB ',
		values: [19, 103, 178],
		colorType: 2
	}]
	let colors = a.colors
	expect(colors.length).toBe(1)
	expect(colors.includes({
		name: '',
		mode: 'RGB ',
		values: [19, 103, 178],
		colorType: 2
	}))
	expect(!colors.includes({
		name: '',
		mode: 'RGB ',
		values: [77, 171, 255],
		colorType: 2
	}))
})
