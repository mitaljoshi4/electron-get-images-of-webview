var request = require('request');
var fs = require('fs');

var imagURL;
var webview = document.getElementById("webview");
webview.addEventListener("dom-ready", function () {

    var downloadBtn = document.getElementById('downloadBtn');
    var inputText = document.getElementById('selectorInput');

    downloadBtn.addEventListener('click', function (e, data) {
        var selector = inputText.value;
        console.log(selector);
        webview.send("find-element", {
            text: selector
        });
    });
});

webview.addEventListener('ipc-message', function (event) {
    console.log(event);
    console.info(event.channel);

    var downloadBtn = document.getElementById('downloadBtn');

    var imageArray = JSON.parse(event.channel);
    if (imageArray.length > 0) {
        // downloadBtn.href = imageArray[0];
        // downloadBtn.download = "image.png";
       webview.send('dowloadFiles', imageArray[0]);
        // downloadBtn(imageArray[0]);
    }
});
