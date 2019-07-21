import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
exports.handler = function(event, context, callback) {
  // const { query } = JSON.parse(event.body);
  const query = "dogs";
  const { APP_ID } = process.env;

  axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&per_page=8&query=${query}&client_id=${APP_ID}`
    )
    .then(response => {
      const body = response.data.results;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
      });
    })
    .catch(error => {
      console.log(error);
      callback(new Error("Could not fetch data"));
    });
};
