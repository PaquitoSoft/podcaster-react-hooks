const xmlSerializer = new XMLSerializer();
const xmlParser = new DOMParser();
const SEPARATOR = '@@@';

function serializeValue(value) {
	let type = 'string';
	let raw = value;

	if (typeof value.createElement === 'function') {
		type = 'xml';
		raw = xmlSerializer.serializeToString(value);
	} else if (typeof value === 'object') {
		type = 'json';
		raw = JSON.stringify(value);
	}

	return { type, raw };
}

export function storeValue(key, value, ttl = 0) { // ttl in minutes
	const { type, raw } = serializeValue(value);
	const _ttl = Date.now() + (ttl * 60 * 1000);
	window.localStorage.setItem(key, `${_ttl}${SEPARATOR}${type}${SEPARATOR}${raw}`);
}

function parseStoredValue(value, type) {
	switch (type) {
		case 'json':
			return JSON.parse(value);
		case 'xml':
			return xmlParser.parseFromString(value, 'application/xml');
		default:
			return value;
	}
}

export function getValue(key) {
	const value = window.localStorage.getItem(key);

	if (value) {
		const [ttl, type, raw] = value.split(SEPARATOR);
		if (Date.now() < ttl) {
			return parseStoredValue(raw, type);
		} else {
			return null;
		}
	} else {
		return null;
	}
}
