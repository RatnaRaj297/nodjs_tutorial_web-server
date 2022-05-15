import request from "postman-request";

const gecoding_URL =
	"https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json?access_token=pk.eyJ1IjoicmF0bmFyYWp3b3JhIiwiYSI6ImNsMzdhNzBwdTB1Y2IzZHJ1eG1na2kzaGkifQ.1Ds0DomPLBVE5Me5qNk_-g";

const getLocationFromResponse = (response) => {
	return {
		location: response.features[0].place_name,
		latitude: response.features[0].center[1],
		longitude: response.features[0].center[0],
	};
};

const getGeocodingURL = (place) => {
	return gecoding_URL.replace("{search_text}", encodeURIComponent(place));
};

const getGeocode = (address, callback) => {
	request(
		{ url: getGeocodingURL(address), json: true },
		(error, response, body) => {
			if (error) {
				callback("Unable to get the location!", undefined);
			} else if (body.features.length === 0) {
				callback("Invalid location found!", undefined);
			} else {
				const location = getLocationFromResponse(body);
				callback(undefined, location);
			}
		}
	);
};

export { getGeocode };
