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
                    if (!component['inputFolders'][i].empty) {
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
                    command += " --src " + component["selectedInputFolder"].name;
                    if (component["selectedInputFolder"].empty) {
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
                }
            ],
            defaultExec: "C:\\Modelio.exe",
            isDone: function (component) {
                var done = false;
                for (var i in component['outputFolders']) {
                    if (!component['outputFolders'][i].empty) {
                        done = true;
                        break;
                    }
                }
                return done;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    if (!component['inputFolders'][i].empty) {
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
                if (component["selectedInputFolder"]) command += " --src " + component["selectedInputFolder"].name;
                if (component["selectedOutputFolder"]) command += " --target " + component["selectedOutputFolder"].name;
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
                    type: "file-list-add",
                    label: "Existing Output",
                    selectedFolder: "selectedOutputFolder",
                    folders: "outputFolders",
                    watchPath: "generation"
                }
            ],
            isDone: function (component) {
                var done = false;
                for (var i in component['outputFolders']) {
                    if (!component['outputFolders'][i].empty) {
                        done = true;
                        break;
                    }
                }
                return done;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    if (!component['inputFolders'][i].empty) {
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
                if (component["selectedInputFolder"]) command += " --src " + component["selectedInputFolder"].name;
                if (component["selectedOutputFolder"]) command += " --target " + component["selectedOutputFolder"].name;
                return command;
            }
        },
        {
            id: "deployment",
            name: "Deployment",
            icon: require("@/assets/deployment.png"),
            widgets: [
                {
                    type: "text",
                    label: "Executable Path",
                    varId: "execPath",
                    default: "C:\\Deployment.exe"
                },
                {
                    type: "file-list-add",
                    label: "Available Input",
                    selectedFolder: "selectedInputFolder",
                    folders: "inputFolders",
                    watchPath: "generation"
                }
            ],
            defaultExec: "C:\\Deployment.exe",
            isDone: function (component) {
                return false;
            },

            isEnabled: function (component) {
                var enabled = false;
                for (var i in component['inputFolders']) {
                    if (!component['inputFolders'][i].empty) {
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
                if (component["selectedInputFolder"]) {
                    command += " --src " + component["selectedInputFolder"].name;
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