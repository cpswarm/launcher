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
            defaultValue: 'C:/Users/liang/Desktop/launcher-project/test.bat',
            info: 'The path to the Modelling Tool executable'
          }
        },
        {
          type: 'explorer-button',
          label: 'Model Directory',
          varId: 'modelDir',
          properties: {
            path: 'Models'
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          varId: 'modelDir',
          properties: {
            watchPath: 'Models',
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (tab) {
            return true
          }
        }
      ],
      isDone: function (tab) {
        if (tab.modelDir && tab.modelDir.files) {
          return tab.modelDir.files.length > 0
        }
        return false
      },
      isEnabled: function (tab) {
        return true
      },

      allowLaunch: function (tab) {
        return true
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
        command += ' --src ' + '"' + pt.join(path, 'Models') + '"'
        if ('selectedFile' in tab.modelDir && tab.modelDir.selectedFile.length === 0) {
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
            defaultValue: '/home/liang/workspace/soo/start.sh',
            info: 'The path to the Simulation & Optimization Orchestrator executable'
          }
        },
        {
          type: 'single-checkbox',
          label: 'Running Mode',
          varId: 'runningMode',
          properties: {
            defaultValue: false,
            label: 'Run in Running mode'
          }
        },
        {
          type: 'single-checkbox',
          label: 'Deployment Mode',
          varId: 'deploymentMode',
          properties: {
            defaultValue: false,
            label: 'Run in deployment mode'
          }
        },
        {
          type: 'text',
          label: 'Task ID',
          varId: 'taskId',
          properties: {
            info: 'The task ID, which is used to distinguish different processes'
          },
          isVisible: function (tab) {
            return tab['runningMode']
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
            defaultValue: 'any',
            info: 'Number of dimension required for the simulation'
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'text',
          label: 'Maximum Agent',
          varId: 'maxAgent',
          properties: {
            info: 'Maximum number of agents required for the simulation',
            number: true,
            defaultValue: 0
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'single-checkbox',
          label: 'Simulator GUI',
          varId: 'showGUI',
          properties: {
            defaultValue: false,
            label: 'Show the graphical interface of simulators'
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'text',
          label: 'Candidate Count',
          varId: 'candidateCount',
          properties: {
            info: 'The number of candidates',
            number: true,
            defaultValue: 0
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'text',
          label: 'Generation Count',
          varId: 'generationCount',
          properties: {
            info: 'The number of generations',
            number: true,
            defaultValue: 0
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'single-checkbox',
          label: 'Optimization Enabled',
          varId: 'optEnabled',
          properties: {
            defaultValue: false,
            label: 'Require the use of the Optimization Tool'
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'text',
          label: 'Optimization Seed',
          varId: 'optimizationSeed',
          properties: {
            info: 'The seed to be used in optimization',
            number: true,
            defaultValue: 0
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'text',
          label: 'Simulation Timeout (in seconds)',
          varId: 'simulationTimeout',
          properties: {
            info: 'The simulation timeout in seconds',
            number: true,
            defaultValue: 0
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'explorer-button',
          label: 'Simulation Configuration',
          varId: 'simulationConf',
          properties: {
            path: 'SimulationConf'
          }
        },
        {
          type: 'explorer-button',
          label: 'Monitor Interface',
          varId: 'monitorInterface',
          properties: {
            path: 'http://130.192.86.237:8080/dashboards/',
            openUrl: true
          },
          isEnabled: function (tab) {
            return true
          },
          isVisible: function (tab) {
            return tab['runningMode']
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          varId: 'modelDir',
          properties: {
            watchPath: 'Models',
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (tab) {
            return false
          }
        },
        {
          type: 'file-list',
          label: 'Available Input',
          varId: 'optimizedDir',
          properties: {
            watchPath: 'Optimized',
            allowAdd: true,
            watchDir: true,
            watchFile: true
          },
          isVisible: function (tab) {
            return false
          }
        }

      ],
      isDone: function (tab) {
        // return (tab['outputFiles'] && tab['outputFiles'].length > 0)
        return false
      },

      isEnabled: function (tab) {
        // return (tab['inputFiles'] && tab['inputFiles'].length > 0)
        return true
      },

      allowLaunch: function (tab) {
        return (!tab['deploymentMode'] && tab['taskId'] &&
          tab['taskId'] !== '') || tab['deploymentMode']
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
        if (tab['runningMode']) {
          if (tab['taskId'] && tab['taskId'] !== '') command += ' --id ' + tab['taskId']
          if (tab['dimension'] && tab['dimension'] !== '') command += ' --dim ' + tab['dimension']
          if (!isNaN(tab['maxAgent'])) command += ' --max ' + tab['maxAgent']
          if (!isNaN(tab['candidateCount'])) command += ' --can ' + tab['candidateCount']
          if (!isNaN(tab['generationCount'])) command += ' --gen ' + tab['generationCount']
          if (!isNaN(tab['optimizationSeed'])) command += ' --seed ' + tab['optimizationSeed']
          if (!isNaN(tab['simulationTimeout'])) command += ' --sim ' + tab['simulationTimeout']
          if (tab['showGUI']) command += ' --gui'
          if (tab['optEnabled']) command += ' --opt'
          command += ' --src ' + '"' + pt.join(path, 'Models') + '"'
          command += ' --target ' + '"' + pt.join(path, 'Optimized') + '"'
        }

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
            defaultValue: '/home/liang/workspace/code-generator/start.sh',
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
          varId: 'modelDir',
          properties: {
            watchPath: 'Models',
            watchDir: true,
            watchFile: true
          },
          isVisible: function (tab) {
            return false
          }
        },
        {
          type: 'file-list',
          label: '',
          varId: 'genDir',
          properties: {
            watchPath: 'GeneratedCode',
            watchDir: true,
            watchFile: true
          },
          isVisible: function (tab) {
            return false
          }
        }
      ],
      isDone: function (tab) {
        // return (tab['genFiles'] && tab['genFiles'].length > 0)
        return false
      },

      isEnabled: function (tab) {
        // return (tab['inputFiles'] && tab['inputFiles'].length > 0)
        return true
      },

      allowLaunch: function (tab) {
        return tab['stateMachineXML'] && tab['stateMachineXML'] !== ''
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
        if (tab['stateMachineXML'] && tab['stateMachineXML'] !== '') command += ' --src "' + tab['stateMachineXML'] + '"'
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
            defaultValue: '~/workspace/deployment-tool/manager',
            info: 'The path to the Deployment Tool executable'
          }
        },
        {
          type: 'file-list',
          label: 'Previous Versions',
          varId: 'genDir',
          isEnabled: function (tab) {
            return !tab.useGeneratedCode
          },
          properties: {
            watchPath: 'GeneratedCode',
            allowAdd: false
          },
          isVisible: function (tab) {
            return false
          }
        },
        {
          type: 'explorer-button',
          label: 'Deployment Manager Interface',
          varId: 'deploymentManagerInterface',
          properties: {
            path: 'http://localhost:8080/ui/',
            openUrl: true
          }
        },
        {
          type: 'file-list',
          label: 'Task File',
          varId: 'genDir',
          isEnabled: function (tab) {
            return !tab.useGeneratedCode
          },
          properties: {
            watchPath: 'Deployment/Tasks',
            allowAdd: false,
            watchDir: false,
            watchFile: true,
            execCommand: function (filePath) {
              return 'curl -s -X POST -T "' + filePath + '" localhost:8080/tasks'
            }
          }
        }
        // {
        //   type: 'file-list',
        //   label: 'Previous Versions',
        //   isEnabled: function (tab) {
        //     return !tab.useGeneratedCode
        //   },
        //   properties: {
        //   watchPath: pt.join('Deployment', 'Workspaces'),
        //     allowAdd: false
        //   }
        // }
      ],
      isDone: function (tab) {
        return false
      },

      isEnabled: function (tab) {
        // return (tab['genFiles'] && tab['genFiles'].length > 0)
        return true
      },

      allowLaunch: function (tab) {
        // return (tab['genFiles'] && tab['genFiles'].length > 0)
        return true
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
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
            defaultValue: '/home/liang/workspace/monitoring-tool/start.sh',
            info: 'The path to the Monitoring Tool executable'
          }
        }
      ],
      isDone: function (tab) {
        return false
      },

      isEnabled: function (tab) {
        return true
      },

      allowLaunch: function (tab) {
        return true
      },

      getCommandLine: function (tab) {
        var command = ''
        command += '"' + tab['execPath'] + '"'
        return command
      }
    }
  ]
}
