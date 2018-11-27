const axios = require('axios');
exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const url = `https://player.vimeo.com/video/${id}/config`;

  axios.get(url)
    .then((res) => {
      console.log(res.request.files[0]);
      callback(null, {
        statusCode: 200,
        body: "HELLO DARKNESS MY OLD FRIEND"
      });
    })
    .catch((err) => {
      callback(err);
    });
};
