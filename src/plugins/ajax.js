import { getValue, storeValue } from './local-cache.js';

const _xmlParser = new DOMParser();

function checkResponseStatus(res) {
	if (res.status < 400) {
		return res;
	} else {
		let error = new Error(res.statusText);
		error.statusCode = res.status;
		error.response = res;
		throw error;
	}
}

function xmlParser(res) {
	return new Promise((resolve) => {
		res.text().then(text => {
			resolve({
				result: _xmlParser.parseFromString(text, 'application/xml'),
				url: res.url
			});
		});
	});
}

function parseJson(res) {
	return new Promise((resolve) => {
		res.json().then(data => {
			resolve({
				result: data,
				url: res.url
			});
		});
	});
}

function cacheResponse(ttl, key) {
	return (data) => {
		if (ttl) {
			console.log('Ajax::cacheResponse# Caching response with key:', key, 'for', ttl, 'minutes.');
			storeValue(data.url, data.result, ttl); // Last parameter is TTL in minutes
		}
		return data.result;
	}
}

function getData(url, responseParser, options = {ttl: 0}) {
	let data = getValue(url);

	if (data) {
		return Promise.resolve(data);
	} else {
		return fetch(url)
			.then(checkResponseStatus)
			.then(responseParser)
			.then(cacheResponse(options.ttl, url));
	}
}

export function getJson(url, options) {
	return getData(url, parseJson, options);
}

export function getXml(url, options) {
	return getData(url, xmlParser, options);
}
