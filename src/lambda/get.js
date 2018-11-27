const axios = require('axios');
exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const url = `https://player.vimeo.com/video/${id}/config`;
  console.log(url);
  axios.get(url)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: {
          "video-url": "",
          "poster-url": ""
      }});
    })
    .catch((err) => {
      callback(err);
    });
};
