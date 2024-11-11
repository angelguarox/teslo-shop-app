export function capitalizeWord(value: string) {
	const capitalized = value
		.split(' ')
		.map((word) => {
			return word[0].toUpperCase() + word.substring(1);
		})
		.join(' ');

	return capitalized;
}
