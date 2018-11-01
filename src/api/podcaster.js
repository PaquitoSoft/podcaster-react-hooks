import { getJson, getXml } from '../plugins/ajax.js';

// const BASE_CORS_URL = 'https://cors-anywhere.herokuapp.com/';
// const BASE_CORS_URL = 'https://galvanize-cors-proxy.herokuapp.com/';
// const BASE_CORS_URL = 'https://crossorigin.me/';
const BASE_CORS_URL = 'https://protected-reef-31216.herokuapp.com/p?u=';
var PODCASTS_DATASOURCE_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
var PODCAST_ID_DATASOURCE_URL = 'https://itunes.apple.com/lookup?id=';
// const mockData = [{"id":"657476401","name":"Tiny Desk Concerts - Audio","author":"NPR","description":"Tiny Desk Concerts from NPR Music feature your favorite musicians performing at All Songs Considered host Bob Boilen's desk in the NPR office. Hear Wilco, Adele, Passion Pit, Tinariwen, Miguel, The xx and many more. This is the audio version of the podcast. A video version is also available.","releaseDate":"September 21, 2017","lastEpisodeDate":1506028920000,"cover":"http://is2.mzstatic.com/image/thumb/Podcasts62/v4/99/99/6f/99996fc9-b149-70c0-421d-d21a4325776a/mza_4791149985339305774.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"362115318","name":"Tiny Desk Concerts - Video","author":"NPR","description":"Tiny Desk Concerts from NPR's All Songs Considered features your favorite musicians performing at Bob Boilen's desk in the NPR Music office. Watch videos from Passion Pit, The xx, Wilco, Adele, Phoenix, Tinariwen, tUnE-yArDs and many more.","releaseDate":"September 21, 2017","lastEpisodeDate":1506026700000,"cover":"http://is1.mzstatic.com/image/thumb/Podcasts71/v4/19/ae/93/19ae9330-10d2-f755-25bd-445721e92ff9/mza_3202149667705386526.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"649744869","name":"Spinnin' Sessions","author":"Spinnin' Records","description":"Spinnin' Records proudly presents its weekly radio show: Spinnin' Sessions. Besides providing you with the most upfront dance floor tracks of the moment, Spinnin Sessions will also welcome a weekly guest DJ for a special 30 minute mix. Enjoy!","releaseDate":"September 21, 2017","lastEpisodeDate":1506025800000,"cover":"http://is3.mzstatic.com/image/thumb/Features/v4/cc/67/82/cc678269-c69b-33cf-f9e3-56cfb8355952/mza_2059060134152054157.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false},{"id":"617028866","name":"www.los40.com.mx - La Corneta","author":"www.los40.com.mx","description":"Programa de infoteinment: Información con entretenimiento, conducido por Eduardo Videgaray y Jose Ramón San Cristobal (El Estaca). Lunes a viernes de 1 a 3 PM por Los 40","releaseDate":"September 21, 2017","lastEpisodeDate":1506024480000,"cover":"http://is5.mzstatic.com/image/thumb/Podcasts62/v4/11/08/c5/1108c5c5-6966-74d0-f937-4532082b2e22/mza_7867131696435904428.jpg/170x170bb-85.jpg","episodes":[],"isFavorite":false}];

function createPodcastSummary(data) {
	const podcast = {
		id: data.id.attributes['im:id'],
		name: data['im:name'].label,
		author: data['im:artist'].label,
		description: data.summary ? data.summary.label : '',
		cover: data['im:image'].filter((imageData) => imageData.attributes.height === '170')[0].label
	}

	if (data['im:releaseDate']) {
		podcast.releaseDate = data['im:releaseDate'].attributes.label; // data['im:releaseDate'].label => zulu date
		podcast.lastEpisodeDate = (new Date(data['im:releaseDate'].label)).getTime();
	}

	return podcast;
}

function createPodcastEpisodes(podcastFeed, podcastId) {
	// We need to get iTunes XML namespace for accessing episodes duration
	const itunesNS = podcastFeed.querySelector('rss').getAttribute('xmlns:itunes');
	let episodeIds = 0;

	return [...podcastFeed.querySelectorAll('rss channel item')].map(function(p) {
		const desc = p.querySelector('description'),
			pubDate = p.querySelector('pubDate'),
			duration = p.getElementsByTagNameNS(itunesNS, 'duration')[0],
			enclosure = p.querySelector('enclosure');

		return {
			id: podcastId + '_' + (episodeIds++),
			title: p.querySelector('title').textContent,
			description: desc ? desc.textContent : '',
			date: pubDate ? new Date(pubDate.textContent).toLocaleDateString() : '',
			timestamp: pubDate ? (new Date(pubDate.textContent)).getTime() : 0,
			// http://stackoverflow.com/questions/4288232/javascript-xml-parser-how-to-get-nodes-that-have-in-the-name
			duration: duration ? duration.textContent : '--',
			mediaUrl: enclosure ? enclosure.getAttribute('url') : ''
		};
	});
}

function getPodcastFeedUrl(podcastId) {
	return getJson(`${BASE_CORS_URL}${PODCAST_ID_DATASOURCE_URL}${podcastId}`, { ttl: 60 * 24 * 7}) // ttl in minutes
		.then(data => {
			return data.results[0].feedUrl;
		})
}

export function getAllPodcasts() {
	return getJson(PODCASTS_DATASOURCE_URL, { ttl: 60 * 24 }) // ttl in minutes
		.then(data => {
			return data.feed.entry.map(createPodcastSummary);
		});
}

export function getPodcastDetail(podcastId) {
	return new Promise((resolve, reject) => {
		Promise.all([
				getAllPodcasts(),
				getPodcastFeedUrl(podcastId)
			])
			.then(values => {
				const [podcasts, feedUrl] = values;

				getXml(`${BASE_CORS_URL}${feedUrl}`, { ttl: 60 * 24 }) // ttl in minutes
					.then(doc => {
						const podcast = podcasts.find(podcast => podcast.id == podcastId); // eslint-disable-line eqeqeq
						podcast.episodes = createPodcastEpisodes(doc, podcast.id);
						resolve(podcast);
					})
					.catch(reject);
			})
			.catch(reject);
	});
}

export function getPodcastEpisodes(podcastDetailUrl) {
	return Promise.resolve([]);
}
