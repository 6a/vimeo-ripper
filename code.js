[].slice.call(document.getElementsByTagName("video"), 0).forEach(element => {
    if (element.dataset.src && element.dataset.src != "") {
        var vimeoResult = ""
        var url = "https://player.vimeo.com/video/" + element.dataset.src + "/config"

        fetch(url)
        .then(function(data) {
            console.log(data);
        })
        
        console.log(vimeoResult);
    }
});