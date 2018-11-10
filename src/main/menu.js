import { Menu, dialog } from 'electron'

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
        { type: 'separator' },
        { label: 'Exit' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'How To Use',
          click () {
            win.webContents.send('open-help')
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click () {
            dialog.showMessageBox(win, { type: 'info', buttons: ['OK'], title: 'CPSwarm Launcher', message: 'CPSwarm Launcher', detail: 'Version: 1.0.0' + require('os').EOL + 'Credits: Icons used in this application are made by Flaticon' })
          }
        }
      ]
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
        { type: 'separator' },
        {
          label: 'Close Project',
          click () {
            win.webContents.send('close-project')
          }
        },
        { type: 'separator' },
        { label: 'Exit' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'How To Use',
          click () {
            win.webContents.send('open-help')
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click () {
            dialog.showMessageBox(win, { type: 'info', buttons: ['OK'], title: 'CPSwarm Launcher', message: 'CPSwarm Launcher', detail: 'Version: 1.0.0' + require('os').EOL + 'Credits: Icons used in this application are made by Flaticon' })
          }
        }
      ]
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
