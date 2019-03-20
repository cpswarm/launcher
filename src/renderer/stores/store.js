var tabConfig = require('@/../conf/TabConfig.js')()

// Make the tabConfig into a map for easier query
var tabConfigMap = {}
for (let i in tabConfig) {
  let id = tabConfig[i].id
  let config = (tabConfigMap[id] = tabConfig[i])
  let widgets = config.widgets
  config['widgetMap'] = {}
  for (let j in widgets) {
    let widgetId = widgets[j].varId
    config['widgetMap'][widgetId] = widgets[j]
  }
}

// Initialize state
var state = {
  rootPath: '',
  showHelp: false,
  isLoading: false,
  currentActivity: 'welcome',
  selectedTab: tabConfig[0],
  config: tabConfig
}

for (let id in tabConfigMap) {
  state[id] = {
    enabled: true,
    done: true,
    running: false,
    vars: {}
  }
  let widgets = tabConfigMap[id].widgetMap
  for (let widgetId in widgets) {
    state[id].vars[widgetId] = null
  }
}

var getters = {
  getRootPath (state) {
    return state.rootPath
  },

  getDoneByTabId: state => tabId => {
    return tabConfigMap[tabId].isDone(state[tabId].vars)
  },

  getEnabledByTabId: state => tabId => {
    return tabConfigMap[tabId].isEnabled(state[tabId].vars)
  },

  getRunningByTabId: state => tabId => {
    return state[tabId].running
  },

  getAllowLaunchByTabId: state => tabId => {
    return tabConfigMap[tabId].allowLaunch(state[tabId].vars)
  },

  getCmdLineByTabId: state => (tabId, path) => {
    return tabConfigMap[tabId].getCommandLine(state[tabId].vars, path)
  },

  getWidgetEnabled: state => (tabId, widgetId) => {
    if ('isEnabled' in tabConfigMap[tabId]['widgetMap'][widgetId]) {
      return tabConfigMap[tabId]['widgetMap'][widgetId].isEnabled(
        state[tabId].vars
      )
    }
    return true
  },

  getWidgetVisible: state => (tabId, widgetId) => {
    if ('isVisible' in tabConfigMap[tabId]['widgetMap'][widgetId]) {
      return tabConfigMap[tabId]['widgetMap'][widgetId].isVisible(
        state[tabId].vars
      )
    }
    return true
  }
}

var mutations = {
  changeRootPath (state, path) {
    state.rootPath = path
  },

  setShowHelp (state, visible) {
    state.showHelp = visible
  },

  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },

  setCurrentActivity (state, activity) {
    state.currentActivity = activity
  },

  updateVar (state, payload) {
    state[payload.tabId]['vars'][payload.varId] = payload.value
  },

  selectTab (state, tabId) {
    state.selectedTab = tabConfigMap[tabId]
  },

  setRunning (state, payload) {
    state[payload.tabId].running = payload.value
  }
}

export default { state, getters, mutations }
