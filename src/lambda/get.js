const axios = require('axios');

exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const url = `https://player.vimeo.com/video/${id}/config`;
  console.log(event.queryStringParameters);
  const quality = parseInt(event.queryStringParameters.q);
  axios.get(url)
    .then((res) => {
      var bestRes = 0;
      var bestWidth = 0;
      var videoUrl = "";
      if (quality && [640, 960, 1280, 1920].includes(quality)) {
        for (var index = 0; index < res.data.request.files.progressive.length; index++) {
          if (res.data.request.files.progressive[index].width == quality) {
            videoUrl = res.data.request.files.progressive[index].url;
            bestRes = res.data.request.files.progressive[index].height;
            bestWidth = res.data.request.files.progressive[index].width;
            break;
          }
        } 
      }

      if (!quality || videoUrl == "") {
        for (var index = 0; index < res.data.request.files.progressive.length; index++) {
          if (res.data.request.files.progressive[index].height > bestRes) {
            videoUrl = res.data.request.files.progressive[index].url;
            bestRes = res.data.request.files.progressive[index].height;
            bestWidth = res.data.request.files.progressive[index].width;
          }
        }
      }

      var posterURL = res.data.video.thumbs[quality] || res.data.video.thumbs[bestWidth] || res.data.video.thumbs[1920]
      || res.data.video.thumbs[1280] || res.data.video.thumbs[960] || res.data.video.thumbs[640];

      callback(null, {
        statusCode: 200,
        body: `{"video": "${videoUrl}", "poster": "${posterURL}"}`,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    })
    .catch((err) => {
      callback(err);
    });
};
