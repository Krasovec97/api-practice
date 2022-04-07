// Change route to your config file
import { API } from './myconfig.js';

const today = new Date();

fetch(API.DAILY_IMAGE)
	.then((response) => response.json())
	.then((data) => {
		astroImage(data.url);
	})
	.catch((err) => handleError(err));

fetch(API.DAILY_QUOTE)
	.then((response) => response.json())
	.then((quoteData) => {
		dailyQuote(quoteData.contents.quotes[0].quote, quoteData.contents.quotes[0].author);
	})
	.catch((err) => handleError(err));

fetch(API.NEOWS)
	.then((response) => response.json())
	.then((data) => {
		let value = '';
		filterNeos(data.near_earth_objects).forEach((object, index) => {
			const closestDate = closestToToday(object.close_approach_data);
			let formatOptions = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};
			let formattedDate = new Date(closestDate).toLocaleDateString('en-US', formatOptions);
			const diameterMin = Math.round(object.estimated_diameter.kilometers.estimated_diameter_min);
			const diameterMax = Math.round(object.estimated_diameter.kilometers.estimated_diameter_max);
			value += `
			<div class="neo-card">
				<div class="neo-card__header">
					<div class="fullname">${object.name}</div>
					<div class="nickname">${object.name_limited}</div>
				</div>
				<div class="neo-card__body">
					<div class="diameter">Estimated diameter from: ${diameterMin} to ${diameterMax} Km</div>
					<div class="next-approach">
						<div class="next-approach__title">Next Approach in</div>
						<div class="next-approach__date">${closestDate}</div>

						<div class="next-approach__title">On</div>
						<div class="next-approach__date--full">${formattedDate}</div>
					</div>
					<p>See all encounters with ${object.name_limited}:</p>
					<button class="past-approaches">Show me!</button>
				</div>
			</div>
			`;

			document.querySelector('.neo__card-container').innerHTML = value;

			setInterval(() => updateClock(closestDate, index), 1000);
		});
	})
	.catch((err) => handleError(err));

function handleError(error) {
	console.error('Error: ' + error);
}

function astroImage(image_url) {
	document.querySelector('#astro-daily').src = image_url;
}

function dailyQuote(quote, author) {
	document.querySelector('#quote-daily').innerHTML = `"${quote}"`;
	document.querySelector('#quote-daily-author').innerHTML = `- ${author}`;
}

function filterNeos(neoData) {
	return neoData.map((neo) => {
		neo.close_approach_data = neo.close_approach_data.filter((data) => {
			const nextDate = new Date(data.close_approach_date);

			if (data.close_approach_date === undefined) {
				return null;
			}

			if (nextDate > today) {
				return nextDate;
			}

			return null;
		});
		return neo;
	});
}

function closestToToday(neoDate) {
	const closest = neoDate.reduce((a, b) => {
		const newA = new Date(a.close_approach_date).getTime();
		const newB = new Date(b.close_approach_date).getTime();

		return newA - today.getTime() < newB - today.getTime() ? a : b;
	});

	return closest.close_approach_date;
}

function getTimeRemaining(date) {
	const now = new Date();
	const total = Date.parse(date) - Date.parse(now);
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));

	return {
		days,
		hours,
		minutes,
		seconds,
	};
}

function updateClock(date, index) {
	const calculatedTime = getTimeRemaining(date);

	const element = document.querySelectorAll('.next-approach__date')[index];

	if (element) {
		element.innerHTML = `${calculatedTime.days} days, ${calculatedTime.hours} hours,<br>
		${calculatedTime.minutes} minutes, ${calculatedTime.seconds} seconds.`;
	}
}
