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
		let value = '';
		data.near_earth_objects.forEach((object) => {
			value += `
			<div class="neo-card">
				<div class="neo-card__header">
					<div id="fullname">${object.name}</div>
					<div id="nickname">${object.name_limited}</div>
				</div>
				<div class="neo-card__body">
					<div class="diameter">Estimated diameter from: ${Math.round(
						object.estimated_diameter.kilometers.estimated_diameter_min
					)} to ${Math.round(
				object.estimated_diameter.kilometers.estimated_diameter_max
			)} Km</div>
					<div class="next-approach">
						Next Approach: <br> 22days:3hours:42Minutes
					</div>
					<p>See all encounters with ${object.name_limited}:</p>
					<button id="past-approaches">Show me!</button>
				</div>
			</div>`;
		});
		document.getElementById('neo__card-container').innerHTML = value;
	})
	.catch((err) => console.error('Error: ' + err));

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}

function dailyQuote(quote, author) {
	document.getElementById('quote-daily').innerHTML = `"${quote}"`;
	document.getElementById('quote-daily-author').innerHTML = `- ${author}`;
}
