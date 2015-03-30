;(function () {
    function ekisu() { // ekisu([pluginName], filePath)
        var filePath;
        var pluginName;
        var plugin;
        if (arguments.length === 1) {
            filePath = arguments[0];
            pluginName = filePath.split('.').pop().trim().toLowerCase();
            plugin = ekisu.plugin[pluginName];
        } else {
            filePath = arguments[1];
            pluginName = arguments[0];
            if ((typeof pluginName === 'object') && !(pluginName instanceof String)) {
                plugin = pluginName;
            } else {
                pluginName = (pluginName + '').toLowerCase();
                plugin = ekisu.plugin[pluginName];
            }
        }
        return new Promise(function (resolve, reject) {
            if (plugin === void 0) {
                reject(new Error(pluginName + ': cannot find plugin'));
            }
            plugin.load(filePath).then(function (content) {
                plugin.extract(content).then(function (ekisu) {
                    resolve(ekisu);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    ekisu.plugin = function (nameArray, plugin) {
        var _nameArray = Array.isArray(nameArray) ? nameArray : [nameArray];
        _nameArray.forEach(function (name) {
            ekisu.plugin[name] = plugin;
        });
    };
    ekisu.browser = {
        loadImage: function (filePath) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    image.onload = null;
                    image.onerror = null;
                    resolve(image);
                };
                image.onerror = function (err) {
                    reject(err);
                };
                image.src = filePath;
            });
        },
        loadArrayBuffer: function (filePath) {
            // TODO
        },
        loadString: function (filePath) {
            // TODO
        }
    };
    ekisu.node = {
        loadBuffer: function (filePath) {
            return new Promise(function (resolve, reject) {
                var fs = require('fs');
                fs.readFile(filePath, {encoding: null}, function (err, buffer) {
                    if (err) {
                        require('request')({
                            encoding: null,
                            uri: filePath
                        }, function (err, res, buffer) {
                            if (err) reject(err);
                            else resolve(buffer);
                        });
                    } else {
                        resolve(buffer);
                    }
                });
            });
        },
        loadUtf8String: function (filePath) {
            return new Promise(function (resolve, reject) {
                var fs = require('fs');
                fs.readFile(filePath, {encoding: 'utf8'}, function (err, buffer) {
                    if (err) {
                        require('request')({
                            encoding: 'utf8',
                            uri: filePath
                        }, function (err, res, buffer) {
                            if (err) reject(err);
                            else resolve(buffer);
                        });
                    } else {
                        resolve(buffer);
                    }
                });
            });
        }
    };
    var isCommonJS = typeof module !== 'undefined' && module.exports;
    if (isCommonJS) {
        module.exports = ekisu;
    } else {
        this.ekisu = ekisu;
    }
})();
