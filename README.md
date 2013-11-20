node-advpng
=============

`advpng`的node包装

Build
-------------
[![travis build status](https://api.travis-ci.org/colorhook/node-advpng.png)](https://www.travis-ci.org/colorhook/node-advpng)

Install
-------------
`npm install node-advpng`

Example usage
-------------

```js
var execFile = require('child_process').execFile;
var advpng = require('node-advpng').path;

execFile(advpng, ['--version'], function(err, stdout, stderr) {
    console.log('advpng version:', stdout.match(/\d\.\d*/)[0]);
});
```