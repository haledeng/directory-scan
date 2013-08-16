var dirScan = require('./dirScan.js');
dirScan.config({
	extension:['.html', '.js', '.xhtml', '.css'], 
	noScanDir:['image', 'images','video', 'flash', 'pics']	
})
var result = dirScan.files('d:\\test');
console.log(result);
var fileCount = dirScan.countFiles(result);
console.log(fileCount);
