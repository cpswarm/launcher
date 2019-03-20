#  CPSwarm Launcher
The CPSwarm Launcher is an GUI application to help user of CPSwarm system to navigate through the swarm design workflow and manage asset files within a project. The application is based on [ElectronJS](https://electronjs.org/). [Vue.js](https://vuejs.org/) is used for the development of the front-end interface. The project is built upon [electron-vue](https://github.com/SimulatedGREG/electron-vue), a scaffolding boilerplate for ElectronJS application with Vue.js.
  
 

##  Setup

#### Install Dependencies
To build the CPSwarm Launcher from source, you must have [Node.js](https://nodejs.org) installed.

After you have finished installing Node.js, go into the root directory of this project and install dependencies:  

``` bash
npm install
```
Notice: user of Ubuntu may experience errors while running the above command, saying that node-sass installation failed. In this case, please refer to [this post](https://github.com/sass/node-sass/issues/1601#issuecomment-229083157) for solution.

#### Development
Run development mode (A [Webpack](https://webpack.js.org/) development server is run and content is served with hot reload at localhost:9080). This will enable automatic change/reload during development.
``` bash  
npm run dev
```

#### Build for production

Build electron application for production. Note that the following command will build package according to your current OS. All built files could be found in the directory ``build``.
``` bash
npm run build
```  
Sometimes it is good to just generate a unpacked directory instead of a whole installer just for quick testing. In this case, use the following command:
```bash
npm run build:dir
```


To cross compile package for other platform (e.g. build Linux package from Windows), use the following command instead:
```bash
npm run build:linux
```  
P. S.: currently, only ``deb`` and ``AppImage`` could be built from Windows. Building ``Snap`` causes error for some unknown reasons. 

#### Documentation 

Please see the [docs]("docs/") directory for more documentations.

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
