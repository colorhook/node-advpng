'use strict';
var fs = require('fs');
var path = require('path');
var execFile = require('child_process').execFile;
var assert = require('assert');

describe('advpng', function () {

	after(function () {
        try{
		 fs.unlinkSync('test/example.adv.png');
        }catch(err){}
	});


  it('get the advpng version', function (cb) {
		var binPath = require('../lib/advpng.js').path;
		execFile(binPath, ['-h'], function (err, stdout, stderr) {
            console.log(stdout.toString());
			assert(stdout.toString().toLowerCase().indexOf('advancecomp') !== -1);
			cb();
		});
	});


	it('should minify a .png', function (cb) {
		var binPath = require('../lib/advpng.js').path;
        var minFile = path.join(__dirname, 'example.min.png');
        var advFile = path.join(__dirname, 'example.adv.png');
        var data = fs.readFileSync(minFile);
        fs.writeFileSync(advFile, data);
		var args = [advFile, '-z', '-4'];
		execFile(binPath, args, function () {
			var actual = fs.statSync(advFile).size;
			var original = fs.statSync(minFile).size;
            console.log("actual:", actual, " original:", original);
			assert(actual <= original);
			cb();
		});
	});
});