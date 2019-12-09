const { ipcRenderer, remote } = require('electron')
const fs = require('fs-jetpack');

var browserWindow = remote.getCurrentWindow();
var directory = 'screenshots/';
var index = 0;
function takeScreenshot() {
  $("#hide-me").hide();
  setTimeout(screenshot, 500);
  setTimeout(() => {$("#hide-me").show()}, 1000);
}

function screenshot() {
  browserWindow.capturePage((img) => {
    var n = Date.now();
    fs.writeAsync(this.directory + n + '.jpg', img.toPNG());
  })
}

ipcRenderer.on('forWin2', function (event, arg){
  $.each(arg, function(i, field){
    textvalue = field.value;
    if(textvalue){
      if(field.name.includes('card')){
        textvalue = textvalue.toLowerCase();
        $(`#${field.name}`).attr("src", `./cards/${textvalue}.svg`);
      }
      else{
        $(`#${field.name}`).text(`${textvalue}`);
      }
    }
    else{
      if(field.name.includes('card')){
        if(field.name.includes('self') || field.name.includes('opp')){
          $(`#${field.name}`).attr("src", `./cards/R-high.svg`);
        }
        else{
          $(`#${field.name}`).attr("src", `./cards/R.svg`);
        }
      }
      else{
        $(`#${field.name}`).text(` `);
      }
    }
  });
});