var dirScan = require('./dirScan.js');
dirScan.config({
	extension:['.html', '.js', '.xhtml', '.css'], 
	noScanDir:['image', 'images','video', 'flash', 'pics']	
})
console.log(dirScan.files('d:\\test'));
