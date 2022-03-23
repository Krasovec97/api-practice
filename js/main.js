const dailyImageUrl =
	'https://api.nasa.gov/planetary/apod?api_key=whyzw93A2cmHzchDRiHf514XoTp0yRe0RhqZ2qwg';

const dQuote = 'https://quotes.rest/qod';

fetch(dailyImageUrl)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		astroImage(data.url);
	});

fetch(dQuote)
	.then((response) => {
		return response.json();
	})
	.then((quoteData) => {
		dailyQuote(quoteData.contents.quotes[0].quote);
	});

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}

function dailyQuote(quote) {
	document.getElementById('quote-daily').innerHTML = quote;
}
