import { API } from './api.js';

const today = new Date();

fetch(API.dailyImage)
	.then((response) => response.json())
	.then((data) => {
		astroImage(data.url);
	})
	.catch((err) => handleError(err));

fetch(API.dailyQuote)
	.then((response) => response.json())
	.then((quoteData) => {
		dailyQuote(quoteData.contents.quotes[0].quote, quoteData.contents.quotes[0].author);
	})
	.catch((err) => handleError(err));

fetch(API.NeoWS)
	.then((response) => response.json())
	.then((data) => {
		let value = '';
		filterNeos(data.near_earth_objects).forEach((object) => {
			console.log(object);
			const diameterMin = Math.round(object.estimated_diameter.kilometers.estimated_diameter_min);
			const diameterMax = Math.round(object.estimated_diameter.kilometers.estimated_diameter_max);
			value += `
			<div class="neo-card">
				<div class="neo-card__header">
					<div id="fullname">${object.name}</div>
					<div id="nickname">${object.name_limited}</div>
				</div>
				<div class="neo-card__body">
					<div class="diameter">Estimated diameter from: ${diameterMin} to ${diameterMax} Km</div>
					<div class="next-approach">
						Next Approach: <br>
					</div>
					<p>See all encounters with ${object.name_limited}:</p>
					<button id="past-approaches">Show me!</button>
				</div>
			</div>`;
		});
		document.getElementById('neo__card-container').innerHTML = value;
	})
	.catch((err) => handleError(err));

function handleError(error) {
	console.error('Error: ' + error);
}

function astroImage(image_url) {
	document.getElementById('astro-daily').src = image_url;
}

function dailyQuote(quote, author) {
	document.getElementById('quote-daily').innerHTML = `"${quote}"`;
	document.getElementById('quote-daily-author').innerHTML = `- ${author}`;
}

function filterNeos(neoData) {
	return neoData.map((neo) => {
		neo.close_approach_data = neo.close_approach_data.filter((data) => {
			if (data.close_approach_date === undefined) {
				return null;
			}
			const nextDate = new Date(data.close_approach_date);

			if (nextDate > today) {
				return nextDate;
			}

			return null;
		});
		return neo;
	});
}

function getClosest(dates) {
	let closest = dates
		.map((x) => ({ ...x, close_approach_date: x.date })) // Convert date to an actual date
		.reduce((a, b) => (a.date - today < b.date - today ? a : b));

	console.log(closest);
}
