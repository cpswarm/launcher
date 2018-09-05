const pt = require('path')

module.exports = function () {
  return [
    {
      id: 'modelling',
      name: 'Swarm Modelling',
      icon: require('@/assets/modelling.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            default: 'C:\\Users\\liang\\Desktop\\test\\my.bat',
            info: 'The path to the executable'
          }
        },
        {
          type: 'explorer-button',
          label: 'Model Directory',
          properties: {
            path: 'Models'
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          selectedFolder: 'selectedInputFolder',
          folders: 'inputFolders',
          watchPath: 'Models',
          properties: {
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (component) {
            return false
          }
        }
      ],
      isDone: function (component) {
        return (component['inputFolders'] && component['inputFolders'].length > 0)
      },
      isEnabled: function (component) {
        return true
      },

      allowLaunch: function (component) {
        return true
      },

      getCommandLine: function (component) {
        var command = ''
        command += component['execPath']
        command += ' --src ' + '"' + pt.join(component.path, 'Models') + '"'
        if (component['inputFolders'] && component['inputFolders'].length === 0) {
          command += ' --create'
        }
        return command
      }
    },
    {
      id: 'simulation',
      name: 'Simulation & Optimization',
      icon: require('@/assets/simulation.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            default: 'C:\\Simulation.exe',
            info: 'The path to the executable'
          }
        },
        {
          type: 'text',
          label: 'Optimization ID',
          varId: 'optId',
          properties: {
            info: 'The optimization ID, which is used to distinguish different optimization processes'
          }
        },
        {
          type: 'dropdown-box',
          label: 'Simulation Dimension',
          varId: 'dimension',
          properties: {
            items: [{ 
              label: '2D', 
              value: '2d' 
            }, { 
              label: '3D', 
              value: '3d' 
            }, { 
              label: 'Any', 
              value: 'any' 
            }],
            default: 'any',
            info: 'Number of dimension required for the simulation'
          }
        },
        {
          type: 'text',
          label: 'Maximum Agent',
          varId: 'maxAgent',
          properties: {
            info: 'Maximum number of agents required for the simulation',
            number: true,
            default: 0
          }
        },
        {
          type: 'single-checkbox',
          label: 'Simulator GUI',
          varId: 'showGUI',
          properties: {
            default: false,
            label: 'Show the graphical interface of simulators'
          }
        },
        {
          type: 'explorer-button',
          label: 'Simulation Configuration',
          properties: {
            path: 'SimulationConf'
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          selectedFolder: 'selectedInputFolder',
          folders: 'inputFiles',
          watchPath: 'Models',
          properties: {
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (component) {
            return false
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          selectedFolder: 'selectedOutputFolder',
          folders: 'outputFiles',
          watchPath: 'Optimized',
          properties: {
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (component) {
            return false
          }
        }

      ],
      isDone: function (component) {
        return (component['outputFiles'] && component['outputFiles'].length > 0)
      },

      isEnabled: function (component) {
        return (component['inputFiles'] && component['inputFiles'].length > 0)
      },

      allowLaunch: function (component) {
        return component['optId'] &&
          component['optId'] !== ''
      },

      getCommandLine: function (component) {
        var command = ''
        command += component['execPath']
        if (component['optId'] && component['optId'] !== '') command += ' --id ' + component['optId']
        if (component['dimension'] && component['dimension'] !== '') command += ' --dim ' + component['dimension']
        if (!isNaN(component['maxAgent'])) command += ' --max ' + component['maxAgent']
        if (component['showGUI']) command += ' --gui'
        command += ' --src ' + '"' + pt.join(component['path'], 'Models') + '"'
        command += ' --target ' + '"' + pt.join(component['path'], 'Optimized') + '"'
        command += ' --conf ' + '"' + pt.join(component['path'], 'SimulationConf') + '"'

        return command
      }

    },

    {
      id: 'code-generation',
      name: 'Code Generation',
      icon: require('@/assets/code.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            default: 'C:\\CodeGeneration.exe',
            info: 'The path to the executable'
          }
        },
        {
          type: 'select-file-button',
          label: 'State Machine XML',
          varId: 'stateMachineXML',
          properties: {
            path: 'Models'
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          selectedFolder: 'selectedInputFiles',
          folders: 'inputFiles',
          watchPath: 'Models',
          properties: {
            watchDir: true,
            watchFile: true
          },
          isVisible: function (component) {
            return false
          }
        },
        {
          type: 'file-list',
          label: '',
          selectedFolder: 'selectedFiles',
          folders: 'genFiles',
          watchPath: 'GeneratedFiles',
          properties: {
            watchDir: true,
            watchFile: true
          },
          isVisible: function (component) {
            return false
          }
        }
      ],
      isDone: function (component) {
        return (component['genFiles'] && component['genFiles'].length > 0)
      },

      isEnabled: function (component) {
        return (component['inputFiles'] && component['inputFiles'].length > 0)
      },

      allowLaunch: function (component) {
        return component['stateMachineXML'] && component['stateMachineXML'] !== ''
      },

      getCommandLine: function (component) {
        var command = ''
        command += component['execPath']
        if (component['stateMachineXML'] && component['stateMachineXML'] !== '') command += ' --src "' + component['stateMachineXML'] + '"'
        command += ' --target ' + '"' + pt.join(component['path'], 'GeneratedCode') + '"'
        return command
      }
    },
    {
      id: 'deployment',
      name: 'Swarm Deployment',
      icon: require('@/assets/deployment.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            default: 'C:\\Deployment.exe',
            info: 'The path to the executable'
          }
        },
        {
          type: 'single-checkbox',
          label: 'Use Generated Code',
          checkboxLabel: 'Use Generated Code',
          varId: 'useGeneratedCode',
          properties: {
            default: true,
            label: 'Use Generated Code'
          }
        },
        {
          type: 'file-list',
          label: 'Previous Versions',
          selectedFolder: 'selectedInputFolder',
          folders: 'inputFolders',
          watchPath: 'generation',
          isEnabled: function (component) {
            return !component.useGeneratedCode
          },
          properties: {
            allowAdd: false
          }
        }
      ],
      isDone: function (component) {
        return false
      },

      isEnabled: function (component) {
        var enabled = false
        if (component['inputFolders'] && component['inputFolders'].length > 0) {
          enabled = true
        }
        return enabled
      },

      allowLaunch: function (component) {
        return (component['selectedInputFolder'] && component['selectedInputFolder'].length > 0) || component['useGeneratedCode']
      },

      getCommandLine: function (component) {
        var command = ''
        command += component['execPath']
        if (component['selectedInputFolder'] && component['selectedInputFolder'].length > 0) {
          command += ' --src ' + '"' + component['selectedInputFolder'][0].path + '"'
        }
        return command
      }
    },
    {
      id: 'monitoring',
      name: 'Monitor & Command',
      icon: require('@/assets/monitoring.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            default: 'C:\\Monitoring.exe',
            info: 'The path to the executable'
          }
        }
      ],
      isDone: function (component) {
        return false
      },

      isEnabled: function (component) {
        return true
      },

      allowLaunch: function (component) {
        return true
      },

      getCommandLine: function (component) {
        var command = ''
        command += '"' + component['execPath'] + '"'
        return command
      }
    }
  ]
}
