const path = require('path')
const fs = require('fs-extra')
const async = require('async')

export default
{
  // Create a project skeleton according to the structure defined in conf/FileStructure.json
  createProjectFolder: function (rootPath, o, callback) {
    // The list of each files and folder to be created
    var list = []

    var create = function (basePath, o) {
      if (typeof o !== 'object') {
        return
      }

      for (var key in o) {
        // If key value is a string, treat it as a file suffix, and the key as the file name
        if (typeof o[key] === 'string') {
          list.push({type: 'file', path: path.join(basePath, key + '.' + o[key])})
          continue
        }

        if (typeof o[key] === 'object') {
          // If key value is null, do nothing
          if (o[key] === null) continue

          // If key value is array, treat each array member as a file name
          if (Array.isArray(o[key])) {
            for (var i in o[key]) {
              var newDirPath = path.join(basePath, key)
              list.push({type: 'file', path: path.join(newDirPath, o[key][i].toString())})
            }
            continue
          }

          // If the key value is an object and has no keys, create an empty folder for it
          if (Object.keys(o[key]).length === 0) {
            list.push({type: 'dir', path: path.join(basePath, key)})
            continue
          }

          // If key value is an object and has member variables, call this function recursively
          create(path.join(basePath, key), o[key])
        }
      }
    }

    create(rootPath, o)

    // Create folders/files according to the list
    async.eachSeries(list, (item, next) => {
      if (item.type === 'file') {
        fs.ensureFile(item.path, next)
      } else if (item.type === 'dir') {
        fs.ensureDir(item.path, next)
      }
    }, callback)

    return list
  }

}
