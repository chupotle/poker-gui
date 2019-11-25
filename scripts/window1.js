const ipcRenderer = require('electron').ipcRenderer

$(document).ready(function(){
  $("button").click(function(){
      var x = $("form").serializeArray();
      console.log(JSON.stringify(x));
      ipcRenderer.send('nameMsg', x);
  });
});