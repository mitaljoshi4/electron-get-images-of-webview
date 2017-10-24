const { ipcRenderer } = require('electron');

ipcRenderer.on("find-element", function (event, data) {                                                                                         // Get images from received selector
    var selector = data.text;
    var items = [];
    var images = document.querySelectorAll(selector);
    ipcRenderer.sendToHost(images[0].src);                                                                                          // Send image URL result
});
