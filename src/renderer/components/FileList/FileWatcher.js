const chokidar = require("chokidar");
const fs = require("fs");
const _ = require("underscore");
const async = require("async");
const pt = require("path");

module.exports = function (eventEmitter) {

    var emitter = eventEmitter;
    var watcher = null;
    var _watchPath = null;

    var delayedScanDir = _.debounce(
        function (event, path) {
            fs.readdir(_watchPath, function (err, folders) {
                if (err) {
                    console.log("Error while reading file system: " + err);
                    return;
                }

                // Scan the content of each folder to see if it is empty
                async.concat(folders, function (folder, callback) {
                    var folderPath = pt.join(_watchPath, folder);
                    fs.readdir(folderPath, function (err, files) {
                        if (err) callback(err);
                        // Check whether the folder is empty
                        var empty = !(files.length > 0);
                        callback(null, [{ name: folder, empty: empty }]);
                    })
                }, function (err, folders) {
                    if (err) {
                        console.log("Error while reading file system: " + err);
                        return;
                    }
                    // Emit event
                    // Event data include a list of folders with its meta data
                    // Each element in the list has the following schema:
                    // {name: <folder name>, empty: true/false}
                    emitter.emit("file", folders);
                });
            });
        }, 500, true);


    var watch = function (watchPath) {
        console.log("watching: " + watchPath);
        if (watcher) watcher.close();
        _watchPath = watchPath;
        watcher = chokidar
            .watch(_watchPath, {
                ignored: /(^|[\/\\])\../,
                depth: 1
            })
            .on("all", delayedScanDir);
    };

    var unwatch = function () {
        if (watcher) {
            watcher.close();
            watcher = null;
            _watchPath = null;
        }
    };

    return {
        watch: watch,
        unwatch: unwatch
    }

}