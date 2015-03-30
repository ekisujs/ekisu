```js
var imagePlugin = {
    load: filePath => new Promise(function (resolve) {
        var image;
        blabla
        resolve(image);
    }),
    extract: image => new Promise(function (resolve) {
        resolve({ blabla });
    })
};
ekisu(imagePlugin, 'http://foo/bar?baz').then(img =>
    console.log(img.canvas.toDataURL())
);
ekisu.plugin(['png', 'jpg', 'webp'], imagePlugin);
ekisu('a.png').then(img =>
    console.log(img.canvas.toDataURL())
);
```
