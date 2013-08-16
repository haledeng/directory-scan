目录扫描，获取目录下文件，支持文件后缀名过滤和目录名称过滤。
---------------------------------


引入：

    var dirScan = require('./dirScan.js');

配置：

    dirScan.config({ 
    
        // 得到哪些后缀名文件

        extension:['.html', '.js', '.xhtml', '.css'], 

        //需要过滤的目录名称， 支持绝对路径 
        
        noScanDir:['image', 'images','video', 'flash', 'pics'] 

    });

API：

目录扫描

    // 传递需要扫描的目录

     dirScan.files('d:\test');
     
    // return 扫描的结果，结果形式如下：
     
    { 'd:\test: [ 'a.js', 'b.js' ],'d:\test\abc\ccc': [ 'c.js' ],'d:\test\abc\ccc\ddd': [ 'd.txt' ] }
    
    console.log(dirScan.files('d:\test');
    
计算最终得到的文件数目 
    
    // 参数就是上面得到的结果 
    
    dirScan.countFiles(result);
    
支持简单日志功能，会在当前目录下面生成log.txt，记录扫描文件的记录
     
