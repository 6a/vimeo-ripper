const axios = require('axios');
exports.handler = (event, context, callback) => {
  //const id = event.queryStringParameters.id;
  // console.log(event.queryStringParameters);
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
// exports.handler = async (event, context, callback) => {
//     const id = event.queryStringParameters.id || "";
//     const url = "https://player.vimeo.com/video/" + id + "/config";
//     console.log(url);
//     axios.get(url)
//     .then((res) => {
//       callback(null, {
//         statusCode: 200,
//         body: res.data,
//       });
//     })
//     .catch((err) => {
//       callback(err);
//     });

//     // return fetch(url)
//     //     .then(response => response.json())
//     //     .then(function(data) {
//     //         var bestRes = 0;
//     //         var videoUrl = "";
//     //         for (var index = 0; index < data.request.files.progressive.length; index++) {
//     //             if (data.request.files.progressive[index].height > bestRes) {
//     //                 videoUrl = data.request.files.progressive[index].url;
//     //             }
//     //         }
//     //         var data = {
//     //             statusCode: 200,
//     //             url: videoUrl
//     //         }
//     //         return data
//     //     })
//     //     .catch(error => ({ statusCode: 422, body: String(error) }));
// };