#  CPSwarm Launcher
The CPSwarm Launcher is a GUI application to help users of CPSwarm system to navigate through the swarm design workflow and manage asset files within a project. The application is based on [ElectronJS](https://electronjs.org/). [Vue.js](https://vuejs.org/) is used for the development of the front-end interface. The project is built upon [electron-vue](https://github.com/SimulatedGREG/electron-vue), a scaffolding boilerplate for ElectronJS application with Vue.js.

## Getting Started
Usage guidelines are available on the [Wiki](https://github.com/cpswarm/launcher/wiki).

## Deployment
Pre-built distributions of the launcher are available for Windows and Linux [here](https://pipelines.linksmart.eu/browse/CPSW-LB/latest/artifact).

For Linux, download the latest AppImage, make it executable, and execute it. 

##  Development

### Install Dependencies
To build the CPSwarm Launcher from source, you must have [Node.js](https://nodejs.org) installed.

After you have finished installing Node.js, go into the root directory of this project and install the dependencies:  

``` bash
npm install
```
Notice: users of Ubuntu may experience errors while running the above command, saying that node-sass installation failed. In this case, please refer to [this post](https://github.com/sass/node-sass/issues/1601#issuecomment-229083157) for solution.

### Dev Mode
In the development mode, a [Webpack](https://webpack.js.org/) development server is run and content is served with hot reload at localhost:9080. This will enable automatic change/reload during development.
``` bash  
npm run dev
```

### Build for production
Build electron application for production. Note that the following command will build the package for the host OS. All built files could be found in the `build` directory.
``` bash
npm run build
```  
To generate an unpacked directory instead of a whole installer just for quick testing:
```bash
npm run build:dir
```

To cross compile package for other platforms, use the following command (e.g. linux):
```bash
npm run build:linux
```  
P.S.: Currently, only ``deb`` and ``AppImage`` could be built for Linux from Windows. Building ``Snap`` causes error for some unknown reasons. 

## Contributing
Contributions are welcome. 

Please fork, make your changes, and submit a pull request. For major changes, please open an issue first and discuss it with the other authors.

## Affiliation
![CPSwarm](https://github.com/cpswarm/template/raw/master/cpswarm.png)  
This work is supported by the European Commission through the [CPSwarm H2020 project](https://cpswarm.eu) under grant no. 731946.
