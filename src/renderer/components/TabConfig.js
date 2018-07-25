module.exports = function () {
    return [
        {
            id: "modelling",
            name: "Swarm Modelling",
            icon: require("@/assets/modelling.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    info: "The path to the executable",
                    varId: "execPath",
                    default: "C:\\Modelio.exe"
                },
                {
                    type: "file-list-add",
                    label: "Available Input",
                    selectedFolder: "selectedInputFolder",
                    folders: "inputFolders",
                    watchPath: "modelling"
                }
            ],
            isDone: function (component) {
                var done = false;
                for (var i in component['inputFolders']) {
                    if (component['inputFolders'][i].valid) {
                        done = true;
                        break;
                    }
                }
                return done;
            },
            defaultExec: "C:\\Modelio.exe",
            isEnabled: function (component) {
                return true;
            },

            allowLaunch: function (component) {
                return component["selectedInputFolder"];
            },

            getCommandLine: function (component) {
                var command = "";
                command += component["execPath"];
                if (component["selectedInputFolder"]) {
                    command += " --src " + component["selectedInputFolder"].path;
                    if (!component["selectedInputFolder"].valid) {
                        command += " --create-project";
                    }
                }
                return command;
            }
        },
        {
            id: "simulation",
            name: "Simulation & Optimization",
            icon: require("@/assets/simulation.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    varId: "execPath",
                    default: "C:\\Simulation.exe"
                },
                {
                    type: "file-list",
                    label: "Available Input",
                    selectedFolder: "selectedInputFolder",
                    folders: "inputFolders",
                    watchPath: "modelling"
                },
                {
                    type: "file-list-add",
                    label: "Existing Output",
                    selectedFolder: "selectedOutputFolder",
                    folders: "outputFolders",
                    watchPath: "simulation"
                },
                {
                    type: "file-list",
                    label: "Simulation Configuration",
                    selectedFolder: "selectedSimulationConf",
                    folders: "simConfFiles",
                    watchPath: "simulation",
                    watchDir: false,
                    watchFile: true
                }
            ],
            defaultExec: "C:\\Modelio.exe",
            isDone: function (component) {
                var done = false;
                for (var i in component['outputFolders']) {
                    if (component['outputFolders'][i].valid) {
                        done = true;
                        break;
                    }
                }
                return done;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    if (component['inputFolders'][i].valid) {
                        enabled = true;
                        break;
                    }
                }
                return enabled;
            },

            allowLaunch: function (component) {
                return component["selectedInputFolder"] 
                    && component["selectedOutputFolder"];
            },

            getCommandLine: function (component) {
                var command = "";
                command += component["execPath"];
                if (component["selectedInputFolder"]) command += " --src " + component["selectedInputFolder"].path;
                if (component["selectedOutputFolder"]) command += " --target " + component["selectedOutputFolder"].path;
                return command;
            }

        },

        {
            id: "code-generation",
            name: "Code Generation",
            icon: require("@/assets/code.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    varId: "execPath",
                    default: "C:\\Code Generation.exe"
                },
                {
                    type: "file-list",
                    label: "Available Input",
                    selectedFolder: "selectedInputFolder",
                    folders: "inputFolders",
                    watchPath: "modelling"
                },
                {
                    type: "file-list",
                    label: "",
                    selectedFolder: "selectedFiles",
                    folders: "genFiles",
                    watchPath: "generation",
                    watchDir: true,
                    watchFile: true,
                    isVisible: function(component) {
                        return false;
                    }
                }
            ],
            isDone: function (component) {
                var done = false;
                for (var i in component['genFiles']) {
                    done = true;
                }
                return done;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    if (component['inputFolders'][i].valid) {
                        enabled = true;
                        break;
                    }
                }
                return enabled;
            },

            allowLaunch: function (component) {
                return component["selectedInputFolder"];
            },

            getCommandLine: function (component) {
                var command = "";
                command += component["execPath"];
                if (component["selectedInputFolder"]) command += " --src " + component["selectedInputFolder"].path;
                return command;
            }
        },
        {
            id: "deployment",
            name: "Swarm Deployment",
            icon: require("@/assets/deployment.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    varId: "execPath",
                    default: "C:\\Deployment.exe"
                },
                {
                    type: "single-checkbox",
                    label: "Use Generated Code",
                    checkboxLabel: "Use Generated Code",
                    varId: "useGeneratedCode",
                    default: true
                },
                {
                    type: "file-list-add",
                    label: "Available Input",
                    selectedFolder: "selectedInputFolder",
                    folders: "inputFolders",
                    watchPath: "generation",
                    isEnabled: function(component) {
                        return !component.useGeneratedCode;
                    }
                }
            ],
            defaultExec: "C:\\Deployment.exe",
            isDone: function (component) {
                return false;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    enabled = true;
                }
                return enabled;
            },

            allowLaunch: function (component) {
                return component["selectedInputFolder"] || component["useGeneratedCode"];
            },

            getCommandLine: function (component) {
                var command = "";
                command += component["execPath"];
                if (component["selectedInputFolder"]) {
                    command += " --src " + component["selectedInputFolder"].path;
                }
                return command;
            }
        },
        {
            id: "monitoring",
            name: "Monitor & Command",
            icon: require("@/assets/monitoring.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    varId: "execPath",
                    default: "C:\\Monitoring.exe"
                }
            ],
            defaultExec: "C:\\Monitoring.exe",
            isDone: function (component) {
                return false;
            },

            isEnabled: function (component) {
                return true;
            },

            allowLaunch: function (component) {
                return true;
            },

            getCommandLine: function (component) {
                var command = "";
                command += component["execPath"];
                return command;
            }
        }
    ]
}