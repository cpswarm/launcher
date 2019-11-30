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
            defaultValue: 'modelio',
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
            defaultValue: '~/cpswarm/soo/run.sh',
            info: 'The path to the Simulation & Optimization Orchestrator executable'
          }
        },
        /* GENERATION MODE */
        {
          type: 'single-checkbox',
          label: 'Generation Mode',
          varId: 'generationMode',
          properties: {
            defaultValue: false,
            label: 'Generate the simulation'
          },
          isEnabled: function (tab) {
            return !tab['deploymentMode'] && !tab['simulationMode']
          },
        },
        {
          type: 'select-file-button',
          label: 'State Machine File*',
          varId: 'scxml',
          properties: {
            path: 'Models',
            info: 'SCXML file with XML extension (mandatory)'
          },
          isVisible: function (tab) {
            return tab['generationMode']
          },
        },
        {
          type: 'select-file-button',
          label: 'Abstraction Description File (ADF)',
          varId: 'adf',
          properties: {
            path: 'Models',
            info: 'ADF file with JSON extension'
          },
          isVisible: function (tab) {
            return tab['generationMode']
          },
        },
        {
          type: 'dropdown-box',
          label: 'Environment',
          varId: 'env',
          properties: {
            items: [{
              label: 'ROS',
              value: 'ROS'
            }],
            defaultValue: 'ROS',
            info: 'Target simulation environment'
          },
          isVisible: function (tab) {
            return tab['generationMode']
          },
        },
        /* DEPLOYMENT MODE */
        {
          type: 'single-checkbox',
          label: 'Deployment Mode',
          varId: 'deploymentMode',
          properties: {
            defaultValue: false,
            label: 'Deploy images to the simulation environment'
          },
          isEnabled: function (tab) {
            return !tab['generationMode']
          },
        },
        {
          type: 'browse-button',
          label: 'Deployment Dashboard',
          varId: 'deploymentInterface',
          properties: {
            defaultPath: 'https://130.192.86.237:32641/#!/login'
          },
          isVisible: function (tab) {
            return tab['deploymentMode']
          }
        },
        /* SIMULATION MODE */
        {
          type: 'single-checkbox',
          label: 'Simulation Mode',
          varId: 'simulationMode',
          properties: {
            defaultValue: false,
            label: 'Run the simulation'
          },
          isEnabled: function (tab) {
            return !tab['generationMode']
          },
        },
        {
          type: 'text',
          label: 'Task ID',
          varId: 'taskId',
          properties: {
            info: 'The task ID, which is used to distinguish different processes'
          },
          isVisible: function (tab) {
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
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
            return tab['simulationMode']
          }
        },
        {
          type: 'browse-button',
          label: 'Monitoring Dashboard',
          varId: 'monitorInterface',
          properties: {
            defaultPath: 'http://130.192.86.237:8080/dashboards/'
          },
          isVisible: function (tab) {
            return tab['simulationMode']
          }
        },
        {
          type: 'explorer-button',
          label: 'Simulation Configuration',
          varId: 'simulationConf',
          properties: {
            path: 'SimulationConf'
          },
          isVisible: function (tab) {
            return tab['deploymentMode'] || tab['simulationMode']
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
        return tab['deploymentMode'] ||  tab['simulationMode'] || tab['generationMode']
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
        var mode = ''

        if (tab['generationMode']) {
          mode += 'g'
          if (tab['env'] && tab['env'] !== '') command += ' --env ' + tab['env']
          if (tab['scxml'] && tab['scxml'] !== '') command += ' --scxml "' + tab['scxml'] + '"'
          if (tab['adf'] && tab['adf'] !== '') command += ' --adf "' + tab['adf'] + '"'
        }

        if (tab['deploymentMode'] && !tab['generationMode']) {
          mode += 'd'
        }

        if (tab['simulationMode'] && !tab['generationMode']) {
          mode += 's'
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

        if (tab['deploymentMode'] || tab['simulationMode']) {
          command += ' --conf ' + '"' + pt.join(path, 'SimulationConf') + '"'
        }

        if (mode) command += ' --mode ' + mode

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
            defaultValue: '~/cpswarm/code-generator/run.sh',
            info: 'The path to the Code Generator executable'
          }
        },
        {
          type: 'select-file-button',
          label: 'State Machine File*',
          varId: 'scxml',
          properties: {
            path: 'Models',
            info: 'SCXML file with XML extension (mandatory)'
          }
        },
        {
          type: 'select-file-button',
          label: 'Abstraction Description File (ADF)',
          varId: 'adf',
          properties: {
            path: 'Models',
            info: 'ADF file with JSON extension'
          }
        },
        {
          type: 'dropdown-box',
          label: 'Environment',
          varId: 'env',
          properties: {
            items: [{
              label: 'ROS',
              value: 'ROS'
            }],
            defaultValue: 'ROS',
            info: 'Target environment for the generated code'
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
        return tab['scxml'] && tab['scxml'] !== ''
      },

      getCommandLine: function (tab, path) {
        var command = ''
        command += tab['execPath']
        if (tab['env'] && tab['env'] !== '') command += ' --env ' + tab['env']
        if (tab['scxml'] && tab['scxml'] !== '') command += ' --scxml "' + tab['scxml'] + '"'
        if (tab['adf'] && tab['adf'] !== '') command += ' --adf "' + tab['adf'] + '"'
        command += ' --output ' + '"' + pt.join(path, 'GeneratedCode') + '"'
        return command
      }
    },
    {
      id: 'deployment',
      name: 'OTA Deployment',
      icon: require('@/assets/deployment.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            defaultValue: '~/cpswarm/deployment-tool/run.sh',
            info: 'The path to the Deployment Tool executable'
          }
        },
        {
          type: 'browse-button',
          label: 'Deployment Manager Interface',
          varId: 'deploymentManagerInterface',
          properties: {
            defaultPath: 'http://localhost:8090'
          }
        }
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
        return command
      }
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Command',
      icon: require('@/assets/monitoring.png'),
      widgets: [
        {
          type: 'text',
          label: 'Executable Path',
          varId: 'execPath',
          properties: {
            defaultValue: '~/cpswarm/monitoring-tool/run.sh',
            info: 'The path to the Monitoring Tool executable'
          }
        },
        {
          type: 'browse-button',
          label: 'Monitoring Tool Interface',
          properties: {
            defaultPath: 'http://localhost:9090'
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
