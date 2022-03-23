const dailyImageUrl =
	'https://api.nasa.gov/planetary/apod?api_key=whyzw93A2cmHzchDRiHf514XoTp0yRe0RhqZ2qwg';

let fetchImage = fetch(dailyImageUrl)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		astroImage(data.url);
	});

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}
