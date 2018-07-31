import { Menu } from 'electron'

export default function (win) {
  var startMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          click () {
            win.webContents.send('create-project')
          }
        },
        {
          label: 'Open Project...',
          click () {
            win.webContents.send('open-project')
          }
        },
        {type: 'separator'},
        { label: 'Exit' }
      ]
    },
    {
      label: 'Help',
      submenu: [{ label: 'About CPSwarm Launcher' }]
    }
  ]

  var operationMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          click () {
            win.webContents.send('create-project')
          }
        },
        {
          label: 'Open Project...',
          click () {
            win.webContents.send('open-project')
          }
        },
        {type: 'separator'},
        {
          label: 'Close Project',
          click () {
            win.webContents.send('close-project')
          }
        },
        {type: 'separator'},
        { label: 'Exit' }
      ]
    },
    {
      label: 'Help',
      submenu: [{label: 'About CPSwarm Launcher'}]
    }
  ]

  var getStartMenu = function () {
    return Menu.buildFromTemplate(startMenuTemplate)
  }

  var getOperationMenu = function () {
    return Menu.buildFromTemplate(operationMenuTemplate)
  }

  return {
    getStartMenu: getStartMenu,
    getOperationMenu: getOperationMenu
  }
}
