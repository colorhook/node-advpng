'use strict';
var path = require('path');
var url = require('url');
var which = require('which');

var target = {
	name: 'advpng',
	url: 'https://raw.github.com/colorhook/node-advpng/master/',
	pathPrefix: '../bin',
	urlPrefix: 'vendor',
	platforms: {
		darwin: {
			path: 'osx'
		},
		linux: {
			path: 'linux',
			arch: true
		},
		win32: {
			path: 'win',
			arch: true,
			suffix: 'exe'
		}
	}
};

function getPathToPackagedBinary(target, options) {
	var platform = target.platforms[process.platform];
	if (platform === undefined) {
		return;
	} else {
		options = options || {};
		options.dll = options.dll || false;
		var targetPath = [];
		var exec = target.name;

		if (options.dll) {
			exec = platform.dll;
		}
		targetPath.push(target.pathPrefix);
		targetPath.unshift(__dirname);

		if (!options.dll && platform.suffix !== undefined) {
			exec += '.' + platform.suffix;
		}
		targetPath.push(exec);
		return path.join.apply(__dirname, targetPath);
	}
}

function getUrlToPackagedBinary(target, options) {
	var platform = target.platforms[process.platform];
	if (platform === undefined) {
		return;
	} else {
		options = options || {};
		options.dll = options.dll || false;
		var targetPath = [];
		var arch = process.arch === 'x64' ? 'x64' : 'x86';
		var exec = target.name;

		if (options.dll) {
			exec = platform.dll;
		}
		targetPath.push(target.urlPrefix);
		targetPath.push(platform.path);

		if (platform.arch === true) {
			targetPath.push(arch);
		}
		if (!options.dll && platform.suffix !== undefined) {
			exec += '.' + platform.suffix;
		}
		targetPath.push(exec);
		return url.resolve(target.url, targetPath.join('/'));
	}
}


exports.path = getPathToPackagedBinary(target);
exports.url = getUrlToPackagedBinary(target);
