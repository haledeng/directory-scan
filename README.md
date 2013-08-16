directory-scan
==============

scan directory to get files
扫描目录，获取目录下的文件，支持目录过滤和文件后缀名过滤。

引入：
var dirScan = require('./dirScan.js');

配置：
  // 得到哪些后缀名文件
  //需要过滤的目录名称， 支持绝对路径
dirScan.config({
	extension:['.html', '.js', '.xhtml', '.css'], 
	noScanDir:['image', 'images','video', 'flash', 'pics']	
});

API：
// 传递需要扫描的目录
dirScan.files('d:\\test')；
return 扫描的结果，结果形式如下：
{ 'd:\\test: [ 'a.js', 'b.js' ],'d:\\test\\abc\\ccc': [ 'c.js' ],'d:\\test\\abc\\ccc\\ddd': [ 'd.txt' ] }

// 计算最终得到的文件数目
// 参数就是上面得到的结果
dirScan.countFiles(result)

支持简单日志功能，会在当前目录下面生成log.txt，记录扫描文件的记录






