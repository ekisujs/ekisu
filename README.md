```js
ekisu.plugin(['png', 'jpg', 'webp'], {
    load: filePath => new Promise(function (resolve) {
        var image;
        blabla
        resolve(image);
    }),
    extract: image => new Promise(function (resolve) {
        resolve({ blabla });
    })
});
ekisu('a.png').then(img =>
    console.log(img.canvas.toDataURL())
);
ekisu('png', 'http://foo/bar?baz').then(img =>
    console.log(img.canvas.toDataURL())
);
```
