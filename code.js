// ^((https?):\/)?\/?(vimeo.com)((\/\\w+)*\/)([0-9]+[^#?\s]+)(.*)?(#[\\w\\-]+)?$
// https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

const regex = new RegExp(`^((https?):\/)?\/?(vimeo.com)((\/\\w+)*\/)([0-9]+[^#?\s]+)(.*)?(#[\\w\\-]+)?$`);
const inputWrapper = document.getElementById("input-wrapper");
const inputField = document.getElementById("input-field");
const button = document.getElementById("button");
const qualitySelect = document.getElementById("selector");
const tipText = document.getElementById("tip");

var videoUrlText = document.getElementById("result-url-txt");
var posterUrlText = document.getElementById("result-poster-txt");
var videoUrlAnchor = document.getElementById("result-url-anchor");
var posterUrlAnchor = document.getElementById("result-poster-anchor");
var currentID = -1;

function hideLinks() {
    tipText.classList.add("inactive");
    videoUrlAnchor.classList.add("inactive");
    posterUrlAnchor.classList.add("inactive");
}

inputField.addEventListener("input", function (e) {
    var rr = regex.exec(inputField.value);

    if (rr && rr.length >= 7 && !isNaN(rr[6])) {
        inputWrapper.classList.add("regex-good");
        inputWrapper.classList.remove("regex-bad");

        button.disabled  = false;
        button.classList.add("fill-good");
        button.classList.remove("fill-bad");
        currentID = rr[6];
    } else {
        inputWrapper.classList.add("regex-bad");
        inputWrapper.classList.remove("regex-good");

        button.disabled  = true;
        button.classList.add("fill-bad");
        button.classList.remove("fill-good");
        currentID = -1;
    }
});

button.addEventListener("click", function(e) {
    if (currentID != -1) {
        hideLinks();
        const url = `https://vget.netlify.com/.netlify/functions/get?id=${currentID}&q=${qualitySelect.value}`;
        fetch(url)
        .then(data=>{
            return data.json()
        })
        .then(res=>{
            if (!res.video) {
                console.log("ruh roh");
            }
            videoUrlAnchor.href = (res.video);
            videoUrlText.innerText = "(video link)";
            posterUrlAnchor.href = (res.poster);
            posterUrlText.innerText = "(poster link)";

            tipText.classList.remove("inactive");
            videoUrlAnchor.classList.remove("inactive");
            posterUrlAnchor.classList.remove("inactive");
        })
        .catch(error=>{
            console.log(error);
            hideLinks();
        });
    }
});

