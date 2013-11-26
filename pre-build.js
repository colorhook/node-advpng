'use strict';
var fs = require('fs');
var request = require('request');
var chalk = require('chalk');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var advpng = require('./lib/advpng');
var binPath = advpng.path;
var binUrl = advpng.url;

function runTest() {
	mocha.addFile('test/test-path.js');
	mocha.run(function (failures) {
		if (failures > 0) {
			console.log(chalk.red('pre-build test failed, compiling from source...'));
			throw new Error("node-advpng cannot be installed, please contact colorhook@gmail.com");
		} else {
			console.log(chalk.green('pre-build test passed successfully, skipping build...'));
		}
	});
}
if (fs.existsSync(binPath)) {
	runTest();
} else {

    var downloadByURL = function(url, callback){
      console.log("download from "+url);
      var stream = request.get(binUrl).pipe(fs.createWriteStream(binPath));
      stream.on('close', function () {
        callback();
      });
      stream.on('error', callback);
    }
    var onComplete = function(err){
      if(err){
        return console.log("error: advpng cannot be installed, please check the binary path is available");
      }
      try{
       fs.chmod(binPath, '0755');
      }catch(err){}
      runTest();
    }
	downloadByURL(binUrl, function(err){
      if(err){
        binUrl = binUrl.replace("https://", "http://");
        return dowuloadByURL(backUrl, onComplete);
      }else{
        onComplete();
      }
    });

}