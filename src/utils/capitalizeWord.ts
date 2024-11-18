export function capitalizeWord(value: string) {
	const capitalized = value
		.trim()
		.split(' ')
		.map((word) => {
			return word[0].toUpperCase() + word.substring(1);
		})
		.join(' ');

	return capitalized;
}
