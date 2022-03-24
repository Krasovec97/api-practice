const API = {
	dailyImage:
		'https://api.nasa.gov/planetary/apod?api_key=whyzw93A2cmHzchDRiHf514XoTp0yRe0RhqZ2qwg',
	dailyQuote: 'https://quotes.rest/qod',
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

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}

function dailyQuote(quote, author) {
	document.getElementById('quote-daily').innerHTML = '"' + quote + '"';
	document.getElementById('quote-daily-author').innerHTML = '- ' + author;
}
