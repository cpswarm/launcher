const chokidar = require("chokidar");
const fs = require("fs");

module.exports = function (eventEmitter) {

    var emitter = eventEmitter;
    var watchers = {};

    var watch = function (id, watchPath) {
        console.log("watching: " + id + " " + watchPath);
        var fileWatcher = watchers[id];
        if (fileWatcher) fileWatcher.close();
        fileWatcher = chokidar
            .watch(watchPath, {
                ignored: /(^|[\/\\])\../,
                depth: 0
            })
            .on("all", function (event, path) {
                // On file changes, list all files within that directory
                fs.readdir(watchPath, function(err, files) {
                    if(err) {
                        console.log("Error while reading file system: " + err);
                        return;
                    } 
                    console.log(id);
                    console.log(files);
                    // Emit event
                    // Event data include: id, new list of files
                    emitter.emit("file", id, files);
                });
            });

        watchers[id] = fileWatcher;
    };

    var unwatch = function(id) {
        if(watchers[id]) {
            watchers[id].close();
            watchers[id] = null;
        }
    };

    var unwatchAll = function() {
        for(var id in watchers) {
            unwatch(id);
        }
    };

    return {
        watch: watch,
        unwatch: unwatch,
        unwatchAll: unwatchAll
    }

}