const { ipcRenderer } = require('electron');

ipcRenderer.on("find-element", function (event, data) {
    ipcRenderer.sendToHost(getImages(data.text));
});

function getImages(selector) {
    var items = [];
    var images = document.querySelectorAll(selector);
    for (var i = 0; i < images.length; i++) {
        items.push(images[i].src);
    }
    return JSON.stringify(items);
}
ipcRenderer.on('dowloadFiles', function(evt, files) {
    var wc = mainWindow.webContents;
    for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i];
        wc.downloadURL(file.url);
    }
    
  });