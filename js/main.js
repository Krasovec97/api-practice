const API = {
	dailyImage:
		'https://api.nasa.gov/planetary/apod?api_key=whyzw93A2cmHzchDRiHf514XoTp0yRe0RhqZ2qwg',
	dailyQuote: 'https://quotes.rest/qod',
	NeoWS:
		'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=whyzw93A2cmHzchDRiHf514XoTp0yRe0RhqZ2qwg',
};

fetch(API.dailyImage)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		astroImage(data.url);
	})
	.catch((error) => {
		console.error('Error: ' + error);
	});

fetch(API.dailyQuote)
	.then((response) => {
		return response.json();
	})
	.then((quoteData) => {
		dailyQuote(
			quoteData.contents.quotes[0].quote,
			quoteData.contents.quotes[0].author
		);
	})
	.catch((error) => {
		console.error('Error: ' + error);
	});

fetch(API.NeoWS)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		data.near_earth_objects.forEach((object) => {
			document.createElement('div');
		});
	})
	.catch((err) => console.err('Error: ' + err));

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}

function dailyQuote(quote, author) {
	document.getElementById('quote-daily').innerHTML = '"' + quote + '"';
	document.getElementById('quote-daily-author').innerHTML = '- ' + author;
}
