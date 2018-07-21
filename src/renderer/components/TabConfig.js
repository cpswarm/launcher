import modelingIcon from "@/assets/modelling.png";
import simulationIcon from "@/assets/simulation.png";
import codeIcon from "@/assets/code.png";
import deploymentIcon from "@/assets/deployment.png";
import monitoringIcon from "@/assets/monitoring.png";

module.exports = [
    {
        id: "modelling",
        name: "Modelling",
        icon: modelingIcon,
        widgets: [
            {
                type: "text",
                label: "Executable Path",
                varId: "execPath"
            },
            {
                type: "file-list-add",
                label: "Available Input",
                selectedFolder: "selectedInputFolder",
                folders: "inputFolders",
                watchPath: "modelling"
            }
        ]
    },
    {
        id: "simulation",
        name: "Simulation & Optimization",
        icon: simulationIcon,
        widgets: [
            {
                type: "text",
                label: "Executable Path",
                varId: "execPath"
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
        ]
    },
    
    {
        id: "code-generation",
        name: "Code Generation",
        icon: codeIcon,
        widgets: [
            {
                type: "text",
                label: "Executable Path",
                varId: "execPath"
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
        ]
    },
    {
        id: "deployment",
        name: "Deployment",
        icon: deploymentIcon,
        widgets: [
            {
                type: "text",
                label: "Executable Path",
                varId: "execPath"
            },
            {
                type: "file-list-add",
                label: "Available Input",
                selectedFolder: "selectedInputFolder",
                folders: "inputFolders",
                watchPath: "generation"
            }
        ]
    },
    {
        id: "monitoring",
        name: "Monitor & Command",
        icon: monitoringIcon,
        widgets: [
            {
                type: "text",
                label: "Executable Path",
                varId: "execPath"
            }
        ]
    }
];