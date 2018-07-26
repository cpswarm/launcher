import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import MenuBuilder from "./menu.js"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 580,
    useContentSize: true,
    width: 1000,
    resizable: true,
    title: "CPSwarm Launcher",
    'minHeight': 535,
    'minWidth': 1000
  })
  //mainWindow.setMenu(null);

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  var menuBuilder = MenuBuilder(mainWindow);
  Menu.setApplicationMenu(menuBuilder.getStartMenu());
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('set-title', (event, path) => {
  mainWindow.setTitle("CPSwarm Launcher - " + path);
})

ipcMain.on('reset-title', (event, arg) => {
  mainWindow.setTitle("CPSwarm Launcher");
  console.log("reset!");
})

ipcMain.on('set-opt-menu', () => {
  var menuBuilder = MenuBuilder(mainWindow);
  Menu.setApplicationMenu(menuBuilder.getOperationMenu());
})

ipcMain.on('set-start-menu', () => {
  var menuBuilder = MenuBuilder(mainWindow);
  Menu.setApplicationMenu(menuBuilder.getStartMenu());
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
