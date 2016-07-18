import { app, BrowserWindow, powerSaveBlocker } from 'electron'

// Prevent the monitor from going to sleep.
powerSaveBlocker.start('prevent-display-sleep')

const environment = process.env.NODE_ENV

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  let appUrl = 'file://' + __dirname + '/dist/index.html'
  let kioskMode = true;

  if (environment === 'development') {
    appUrl = 'http://localhost:9000/index.html'
    kioskMode = false;
  }

  // Create the browser window.
  const browserWindowOptions = {
    title: 'ZenBoard',
    width: 1920,
    height: 1080,
    kiosk: kioskMode,
    autoHideMenuBar: true
  };
  mainWindow = new BrowserWindow(browserWindowOptions)

  // load the index.html of the app.
  mainWindow.loadURL(appUrl)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})
