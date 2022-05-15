import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { getGeocode } from "./weather/geocode.js";
import { printWeatherReport } from "./weather/weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address not found! Please add an address",
		});
	}

	getGeocode(req.query.address, (error, response) => {
		if (error) return res.send({ error });
		printWeatherReport(
			response,
			(errorWeatherReport, responseWeatherReport) => {
				if (errorWeatherReport) return res.send({ error });
				res.send({
					address: req.query.address,
					...responseWeatherReport,
				});
			}
		);
	});
});

app.listen(3000, () => {
	console.log("server is up on port 3000!");
});
