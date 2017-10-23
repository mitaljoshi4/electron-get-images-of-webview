var request = require('request');
var Papa = require('./papaParse.js');
var imagURL;
var selector = "";
var webview = document.getElementById("webview");
var fileInput = document.getElementById("chooseFileInput");
webview.addEventListener("dom-ready", function () {
    webview.send("find-element", {
        text: selector
    });
});


webview.addEventListener('ipc-message', function (event) {
    console.log(event);
    console.info(event.channel);
    var downloadBtn = document.getElementById('downloadBtn');
    // var imageArray = JSON.parse(event.channel);
    // if (imageArray.length > 0) {
    downloadBtn.href = event.channel;
    downloadBtn.download = "image.png";
    var image = document.createElement("img");
    image.src = event.channel;
    document.getElementsByTagName("body")[0].appendChild(image);
    // }
});
fileInput.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    if (file != undefined) {
        var ext = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        console.log(ext);
        if (ext == 'csv') {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: function (results) {
                    data = results;
                    var outputObj = {};
                    outputObj.products = data.data;
                    console.log(data.meta.fields);
                    var arr = data.meta.fields;
                    if (arr.length == 2 && arr.indexOf("link") >= 0 && arr.indexOf("selector") >= 0) {
                        console.log(JSON.stringify(outputObj, null, 2));
                        var i = 0;
                        var objLength = outputObj.products.length;
                        for (i = 0; i < objLength; i++) {
                            webview.loadURL(outputObj.products[i].link);
                            selector = outputObj.products[i].selector;
                            var isLoaded = webview.isLoading();
                        }
                    }
                    else {
                        console.log("No data found.");
                    }
                }
            });
        }
        else {
            alert("Please choose CSV file.");
        }
    }
});