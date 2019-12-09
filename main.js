const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.on('ready', () => {
  window1 = createWindow1();
  window2 = createWindow2();

  ipcMain.on('nameMsg', (event, arg) => {
    event.sender.send('nameReply', {
      not_right: false
    }) // sends back/replies to window 1 - "event" is a reference to this chanel.
    if(window2 == null){
      window2 = createWindow2();
      window2.webContents.send('forWin2', arg);
    }
    else{
      window2.webContents.send('forWin2', arg);
    }
 // sends the stuff from Window1 to Window2.
  });
})

function createWindow1() {
  window1 = new BrowserWindow({
    width: 400,
    height: 700
  })
  window1.loadURL(url.format({
    pathname: path.join(__dirname, './window1.html'),
    protocol: 'file:',
    slashes: true
  }))
  window1.on('closed', function () {
    window1 = null
  })
  return window1
}

function createWindow2() {
  window2 = new BrowserWindow({
    width: 1600,
    height: 900
  })
  window2.loadURL(url.format({
    pathname: path.join(__dirname, './window2.html'),
    protocol: 'file:',
    slashes: true
  }))
  window2.on('closed', function () {
    window2 = null
  })
  return window2
}