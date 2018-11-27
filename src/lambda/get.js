const axios = require('axios');
exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const url = `https://player.vimeo.com/video/${id}/config`;
  const quality = parseInt(event.queryStringParameters.q);
  console.log(quality);
  console.log([360, 540, 720, 1080].includes(quality));
  axios.get(url)
    .then((res) => {
      var bestRes = 0;
      var bestWidth = 0;
      var videoUrl = "";

      if (quality && [360, 540, 720, 1080].includes(quality)) {
        for (var index = 0; index < res.data.request.files.progressive.length; index++) {
          if (res.data.request.files.progressive[index].height == quality) {
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
     
      var posterURL = res.data.video.thumbs[bestWidth];

      callback(null, {
        statusCode: 200,
        body: `{"video": "${videoUrl}", "poster": "${posterURL}"}`
      });
    })
    .catch((err) => {
      callback(err);
    });
};
