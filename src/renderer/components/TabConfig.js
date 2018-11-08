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
            default: 'C:/Users/liang/Desktop/launcher-project/test.bat',
            info: 'The path to the Modelling Tool executable'
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
          varId: 'modelDir',
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
        // return (component['inputFolders'] && component['inputFolders'].length > 0)
        if (component.modelDir && component.modelDir.files) {
          return component.modelDir.files.length > 0
        }
        return false
      },
      isEnabled: function (component) {
        return true
      },

      allowLaunch: function (component) {
        return true
      },

      getCommandLine: function (component, path) {
        var command = ''
        command += component['execPath']
        command += ' --src ' + '"' + pt.join(path, 'Models') + '"'
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
            default: '/home/liang/workspace/soo/start.sh',
            info: 'The path to the Simulation & Optimization Orchestrator executable'
          }
        },
        {
          type: 'text',
          label: 'Task ID',
          varId: 'taskId',
          properties: {
            info: 'The task ID, which is used to distinguish different processes'
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
          type: 'single-checkbox',
          label: 'Optimization Enabled',
          varId: 'optEnabled',
          properties: {
            default: false,
            label: 'Require the use of the Optimization Tool'
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
          type: 'explorer-button',
          label: 'Monitor Interface',
          properties: {
            path: 'http://130.192.86.237:8080/dashboards/',
            openUrl: true
          },
          isEnabled: function(component) {
            return component.status.running
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          selectedFolder: 'selectedInputFolder',
          folders: 'inputFiles',
          varId: 'modelDir',
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
          varId: 'optimizedDir',
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
        //return (component['outputFiles'] && component['outputFiles'].length > 0)
        return false
      },

      isEnabled: function (component) {
        // return (component['inputFiles'] && component['inputFiles'].length > 0)
        return true
      },

      allowLaunch: function (component) {
        return component['taskId'] &&
          component['taskId'] !== ''
      },

      getCommandLine: function (component, path) {
        var command = ''
        command += component['execPath']
        if (component['taskId'] && component['taskId'] !== '') command += ' --id ' + component['taskId']
        if (component['dimension'] && component['dimension'] !== '') command += ' --dim ' + component['dimension']
        if (!isNaN(component['maxAgent'])) command += ' --max ' + component['maxAgent']
        if (component['showGUI']) command += ' --gui'
        if (component['optEnabled']) command += ' --opt'
        command += ' --src ' + '"' + pt.join(path, 'Models') + '"'
        command += ' --target ' + '"' + pt.join(path, 'Optimized') + '"'
        command += ' --conf ' + '"' + pt.join(path, 'SimulationConf') + '"'

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
            default: '/home/liang/workspace/code-generator/start.sh',
            info: 'The path to the Code Generator executable'
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
          varId: 'modelDir',
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
          varId: 'genDir',
          watchPath: 'GeneratedCode',
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
        // return (component['genFiles'] && component['genFiles'].length > 0)
        return false
      },

      isEnabled: function (component) {
        // return (component['inputFiles'] && component['inputFiles'].length > 0)
        return true
      },

      allowLaunch: function (component) {
        return component['stateMachineXML'] && component['stateMachineXML'] !== ''
      },

      getCommandLine: function (component, path) {
        var command = ''
        command += component['execPath']
        if (component['stateMachineXML'] && component['stateMachineXML'] !== '') command += ' --src "' + component['stateMachineXML'] + '"'
        command += ' --target ' + '"' + pt.join(path, 'GeneratedCode') + '"'
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
            default: '~/workspace/deployment-tool/manager',
            info: 'The path to the Deployment Tool executable'
          }
        },
        {
          type: 'file-list',
          label: 'Previous Versions',
          selectedFolder: 'selectedGenFile',
          folders: 'genFiles',
          varId: 'genDir',
          watchPath: 'GeneratedCode',
          isEnabled: function (component) {
            return !component.useGeneratedCode
          },
          properties: {
            allowAdd: false
          },
          isVisible: function (component) {
            return false
          }
        },
        {
          type: 'explorer-button',
          label: 'Deployment Manager Interface',
          properties: {
            path: 'http://localhost:8080/ui/',
            openUrl: true
          }
        },
        {
          type: 'file-list',
          label: 'Task File',
          selectedFolder: 'selectedGenFile',
          folders: 'genFiles',
          varId: 'genDir',
          watchPath: 'Deployment/Tasks',
          isEnabled: function (component) {
            return !component.useGeneratedCode
          },
          properties: {
            allowAdd: false,
            watchDir: false,
            watchFile: true,
            execCommand: function (filePath) {
              return 'curl -s -X POST -T "' + filePath + '" localhost:8080/tasks'
            }
          }
        },
        // {
        //   type: 'file-list',
        //   label: 'Previous Versions',
        //   selectedFolder: 'selectedArchFile',
        //   folders: 'archFiles',
        //   watchPath: pt.join('Deployment', 'Workspaces'),
        //   isEnabled: function (component) {
        //     return !component.useGeneratedCode
        //   },
        //   properties: {
        //     allowAdd: false
        //   }
        // }
      ],
      isDone: function (component) {
        return false
      },

      isEnabled: function (component) {
        return (component['genFiles'] && component['genFiles'].length > 0)
      },

      allowLaunch: function (component) {
        return (component['genFiles'] && component['genFiles'].length > 0)
      },

      getCommandLine: function (component, path) {
        var command = ''
        command += component['execPath']
        command += ' --src ' + '"' + pt.join(path, 'GeneratedCode') + '"'
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
            default: '/home/liang/workspace/monitoring-tool/start.sh',
            info: 'The path to the Monitoring Tool executable'
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
