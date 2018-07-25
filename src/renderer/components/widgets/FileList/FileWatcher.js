const chokidar = require("chokidar");
const fs = require("fs");
const _ = require("underscore");
const async = require("async");
const pt = require("path");


// Arguments:
// 1. EventEmitter
// 2. Type of files to watch (file/dir), default is to watch dir but not files
// 3. Validation callback to check if a dir is valid (default is just to check whether it is empty)
export default function (eventEmitter, types, validateCb) {

    var _emitter = eventEmitter;
    var _watcher = null;
    var _watchPath = null;
    var _pendingForScan = {};
    var _map = {};

    // Some default values
    var _watchDir = true;
    var _watchFile = false;
    var _validateCb = function (path, done) {
        fs.readdir(path, function (err, files) {
            if (err) done(err);
            // Check whether the folder is empty
            var valid = files.length > 0;
            done(null, valid);
        })
    };

    if(types) {
        _watchDir = types.includes("dir");
        _watchFile = types.includes("file");
    }

    if(validateCb) {
        _validateCb = validateCb;
    }

    // TODO: Improve this function; handle errors
    var scanList = _.debounce(
        function () {

            // Execute function to every item in the pending list
            async.eachOf(_pendingForScan, function (item, key, singleItemScanDone) {

                if (item.type === "file") {
                    if (_watchFile) {
                        item.valid = true; // File is always valid
                        updateMap(item);
                    }
                    singleItemScanDone();
                    return;
                }

                if (item.type === "dir") {
                    if (_watchDir) {
                        async.waterfall([
                            function (done) {
                                done(null, item.path);
                            },
                            function (path, done) {
                                _validateCb(path, done);
                            }
                        ], function (err, isValid) {
                            item.valid = isValid;
                            updateMap(item);
                            singleItemScanDone();
                        });
                        return;
                    }
                    singleItemScanDone();
                }

            }, function (err) {
                // TODO: handle error
                _pendingForScan = {};
                emitEvent();
            });
        }, 500);

    var change = function (path, stats) {
        // Path is the complete path

        // If the path is equal to _watchPath, we do nothing
        if (path === _watchPath) return;

        // Check if the file/folder is added in root watch path or in a sub dir
        if (pt.relative(_watchPath, pt.dirname(path)) !== "") { // inside a sub dir
            // This only works if we have watch depth 1
            // TODO: improve this!
            let subdirPath = pt.dirname(path);
            _pendingForScan[subdirPath] = { path: subdirPath, type: "dir" };
        } else {
            if (stats.isDirectory()) {
                _pendingForScan[path] = { path: path, type: "dir" };
            } else {
                _pendingForScan[path] = { path: path, type: "file" };
            }
        }

        scanList();
    }


    var unlink = function (path) {
        if (pt.basename(path) in _map) delete _map[pt.basename(path)];
        scanList();
    }

    var updateMap = function (obj) {
        var key = pt.basename(obj.path);
        _map[key] = obj;
    }

    var emitEvent = function () {
        _emitter.emit("file", Object.assign({}, _map));
    }

    var watch = function (watchPath) {
        if (_watcher) _watcher.close();
        _watchPath = watchPath;
        _watcher = chokidar
            .watch(_watchPath, {
                ignored: /(^|[\/\\])\../,
                depth: 1
            })
            .on("add", change)
            .on("addDir", change)
            .on("change", change)
            .on("unlink", unlink)
            .on("unlinkDir", unlink);
    }
            

    var unwatch = function () {
        if (_watcher) {
            _watcher.close();
            _watcher = null;
            _watchPath = null;
        }
    };

    return {
        watch: watch,
        unwatch: unwatch
    }

}