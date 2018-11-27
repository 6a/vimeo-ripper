const axios = require('axios');
exports.handler = (event, context, callback) => {

  const url = "https://player.vimeo.com/video/291712532/config";
  console.log(url);
  axios.get(url)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: res.data,
      });
    })
    .catch((err) => {
      callback(err);
    });
};
