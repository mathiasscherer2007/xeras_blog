export function convertToSlug(text: string) {
	return text
		.toLowerCase()
		.normalize('NFD')                 // separate accents
		.replace(/[\u0300-\u036f]/g, '')  // remove accents
		.replace(/[^a-z0-9\s-]/g, '')     // remove special chars
		.trim()
		.replace(/\s+/g, '-')             // spaces → hyphens
		.replace(/-+/g, '-');             // collapse multiple hyphens
}