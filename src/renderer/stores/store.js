var tabConfig = require('@/components/TabConfig.js')()

// Make the tabConfig into a map for easier query
// TODO: simplify this
var tabConfigMap = {}
for (let i in tabConfig) {
    let id = tabConfig[i].id
    tabConfigMap[id] = tabConfig[i]
    tabConfigMap[id]['widgetMap'] = {}
    for (let j in tabConfigMap[id]['widgets']) {
        let widgetId = tabConfigMap[id]['widgets'][j]['varId']
        tabConfigMap[id]['widgetMap'][widgetId] = tabConfigMap[id]['widgets'][j]
    }
}

var state = {}
// TODO: make 'path' a state
// Initialize state
state.selectedTab = tabConfig[0]
for (let i in tabConfig) {
    let id = tabConfig[i].id
    state[id] = {
        enabled: true,
        done: true,
        running: false,
        vars: {}
    }
    let widgets = tabConfig[i].widgets
    for (let j in widgets) {
        let widgetId = widgets[j]['varId']
        if (widgetId !== undefined) {
            state[id].vars[widgetId] = null
        }
    }
}

var getters = {
    getDoneByTabId: (state) => (tabId) => {
        return tabConfigMap[tabId].isDone(state[tabId].vars)
    },

    getEnabledByTabId: (state) => (tabId) => {
        return tabConfigMap[tabId].isEnabled(state[tabId].vars)
    },

    getRunningByTabId: (state) => (tabId) => {
        return state[tabId].running
    },

    getAllowLaunchByTabId: (state) => (tabId) => {
        return tabConfigMap[tabId].allowLaunch(state[tabId].vars)
    },

    getCmdLineByTabId: (state) => (tabId, path) => {
        return tabConfigMap[tabId].getCommandLine(state[tabId].vars, path)
    },

    getWidgetEnabled: (state) => (tabId, widgetId) => {
        if ('isEnabled' in tabConfigMap[tabId]['widgetMap'][widgetId]) {
            return tabConfigMap[tabId]['widgetMap'][widgetId].isEnabled(state[tabId].vars)
        }
        return true
    },

    getWidgetVisible: (state) => (tabId, widgetId) => {
        if ('isVisible' in tabConfigMap[tabId]['widgetMap'][widgetId]) {
            return tabConfigMap[tabId]['widgetMap'][widgetId].isVisible(state[tabId].vars)
        }
        return true
    }
}

var mutations = {
    updateVar(state, payload) {
        state[payload.tabId]['vars'][payload.varId] = payload.value
    },

    selectTab(state, tabId) {
        state.selectedTab = tabConfigMap[tabId]
    },

    setRunning(state, payload) {
        state[payload.tabId].running = payload.value
    }
}

export default { state, getters, mutations }