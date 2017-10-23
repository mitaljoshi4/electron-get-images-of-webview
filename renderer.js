const { ipcRenderer } = require('electron');

ipcRenderer.on("find-element", function (event, data) {
    var selector = data.text;
    var items = [];
    var images = document.querySelectorAll(selector);
    // console.log(images);
    // for (var i = 0; i < images.length; i++) {
    //     items.push(images[i].src);
    // }
    // var sendData = JSON.stringify(images);
    ipcRenderer.sendToHost(images[0].src);
});

// ipcRenderer.on('dowloadFiles', function (evt, files) {
//     var wc = mainWindow.webContents;
//     for (var i = files.length - 1; i >= 0; i--) {
//         var file = files[i];
//         wc.downloadURL(file.url);
//     }
// });