import request from "postman-request";

const access_key_weatherStack = "f5f40254e73a7426b9bb68f83c38bf00";
const baseURL__weatherStack = "http://api.weatherstack.com/";

const formatLatLong = (location) => {
	return `${location.latitude},${location.longitude}`;
};

const getWeatherStackURL = (location) => {
	return `http://api.weatherstack.com/current?access_key=f5f40254e73a7426b9bb68f83c38bf00&query=${formatLatLong(
		location
	)}&units=m`;
};

const printWeatherReport = (location, callback) => {
	request(
		{ url: getWeatherStackURL(location), json: true },
		(error, response, body) => {
			if (error) {
				callback("could not connect ot weather stack", undefined);
			} else if (response.error) {
				callback("Trouble accessing the weather", undefined);
			} else {
				callback(undefined, {
					location: location.location,
					temprature: body.current.feelslike,
				});
			}
		}
	);
};

export { printWeatherReport };
