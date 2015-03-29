;(function () {
    var isNode = false;
    if (typeof module !== 'undefined' && module.exports) {
        isNode = true;
        module.exports = ekisu;
    } else {
        this.ekisu = ekisu;
    }
    function ekisu() { // ekisu([pluginName], filePath)
        var filePath;
        var pluginName;
        var plugin;
        if (arguments.length === 1) {
            filePath = arguments[0];
            pluginName = filePath.split('.').pop().trim();
        } else {
            filePath = arguments[1];
            pluginName = arguments[0] + '';
        }
        plugin = ekisu.plugin[pluginName.toLowerCase()];
        return new Promise(function (resolve, reject) {
            if ((plugin === void 0) || (!ekisu.plugin.hasOwnProperty(pluginName))) {
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
            // TODO
        }
    };
})();
