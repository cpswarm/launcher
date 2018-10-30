var Application = require('spectron').Application
var assert = require('assert')
const path = require('path')

describe('application launch', function () {
  this.timeout(10000)

  var electronPath = path.resolve(__dirname, "../../node_modules/.bin/electron");
  const appPath = path.resolve(__dirname, "../../dist/electron/main.js");
  if (process.platform === "win32") {
      electronPath += ".cmd";
  }

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [appPath]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  })
})