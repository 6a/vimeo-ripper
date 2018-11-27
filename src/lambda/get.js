const axios = require('axios');
exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const url = `https://player.vimeo.com/video/${id}/config`;

  axios.get(url)
    .then((res) => {
      var bestRes = 0;
      var videoUrl = "";
      for (var index = 0; index < res.data.request.files.progressive.length; index++) {
        if (res.data.request.files.progressive[index].height > bestRes) {
          videoUrl = res.data.request.files.progressive[index].url;
          bestRes = res.data.request.files.progressive[index].height;
        }
      }

      console.log(videoUrl);

      callback(null, {
        statusCode: 200,
        body: "HELLO DARKNESS MY OLD FRIEND"
      });
    })
    .catch((err) => {
      callback(err);
    });
};
