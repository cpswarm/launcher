import modelingIcon from "@/assets/modelling.png";
import simulationIcon from "@/assets/simulation.png";
import codeIcon from "@/assets/code.png";
import deploymentIcon from "@/assets/deployment.png";
import monitoringIcon from "@/assets/monitoring.png";

export function getTabs(){
    var tabs = [
        {
          id: "modelling-tab",
          name: "Modelling",
          icon: modelingIcon,
          enabled: true,
          isDone: false,
          execPath: "C:\\Modelio\\modelio.exe",
          inputPath: "modelling",
          input: [{name: "gid"}, {name: "gud"}],
          args: []
        },
        {
          id: "simulation-tab",
          name: "Sim & Opt",
          icon: simulationIcon,
          enabled: true,
          isDone: false,
          execPath: "C:\\Simulation_orchestrator.exe",
          args: []
        },
        {
          id: "code-generation-tab",
          name: "Code Generation",
          icon: codeIcon,
          enabled: true,
          isDone: false,
          execPath: "C:\\Code_Generator.exe",
          args: []
        },
        {
          id: "deployment-tab",
          name: "Deployment",
          icon: deploymentIcon,
          enabled: true,
          isDone: false,
          execPath: "C:\\Deployment_tool.exe",
          args: []
        },
        {
          id: "monitoring-tab",
          name: "Monitoring & Control",
          icon: monitoringIcon,
          enabled: true,
          isDone: false,
          execPath: "C:\\Monitoring_tool.exe",
          args: []
        }
      ];
    return tabs;
}