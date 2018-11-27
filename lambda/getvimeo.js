const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const id = event.queryStringParameters.id || "";
    const url = "https://player.vimeo.com/video/" + id + "/config";

    
    return fetch(url)
        .then(response => response.json())
        .then(function(data) {
            var bestRes = 0;
            var videoUrl = "";
            for (var index = 0; index < data.request.files.progressive.length; index++) {
                if (data.request.files.progressive[index].height > bestRes) {
                    videoUrl = data.request.files.progressive[index].url;
                }
            }
            var data = {
                statusCode: 200,
                url: videoUrl
            }
            return data
        })
        .catch(error => ({ statusCode: 422, body: String(error) }));
};