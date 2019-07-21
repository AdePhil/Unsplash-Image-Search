import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
exports.handler = function(event, context, callback) {
  const { query } = JSON.parse(event.body);
  const { APP_ID } = process.env;
  console.log("APP_ID", APP_ID);

  axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&per_page=8&query=${query}&client_id=${APP_ID}`
    )
    .then(response => {
      const body = response.data.results;
      const formattedBody = JSON.stringify(body);
      callback(null, {
        statusCode: 200,
        body: formattedBody
      });
    })
    .catch(error => {
      console.log(error);
      callback(error);
    });
};
