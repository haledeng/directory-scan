/*
** by haledeng
** 功能：扫描目录下的脚本，根据规则过滤，输出脚本列表
** 接口：
** config 配置扫描时需要过滤的文件后缀名和目录，支持两种形式的参数传递
*/

;(function(definition){
	var hasExports = typeof module !== 'undefined' && module.exports,
		hasDefine = typeof define === 'function';
	if(hasExports){
		module.exports = definition();
	}else if(hasDefine){
		define(definition);
	}
	else{
		this['dirScan'] = definition();
	}
}).call(this, function(){

	var fsys = require('fs'),
		path = require('path'),
		dirScan = {};


// 文件的后缀名
dirScan.extension = ['.js','.html', '.css'] ;

// 需要过滤的目录
dirScan.noScanDir = ['d:\\test'];

var indexOf = function(array, item){
	if(Array.prototype.indexOf){
		return Array.prototype.indexOf.call(array, item);
	}
	
	for(var i=0,l=array.length;i<l;i++){
		if(array[i] ===  item){
			return i;
		}
	}
	return -1;
};

/*
** 配置后缀名和要过滤的文件夹
*/
dirScan.config = function(){
	var that = this,
		args = arguments,
		len = args.length;
	// 对象形式
	// ｛extensioni:[], noScanDir:[]｝
	if(len === 1){
		var conf = args[0];
		var toString = Object.prototype.toString;		
		if(toString.call(conf) === "[object Object]"){
			
			that.extension = conf.extension;
			that.noScanDir = conf.noScanDir;
		}
	}
	// 数组形式 
	else if(len === 2){
		that.extension = args[0];
		that.noScanDir = args[1];
	}
};


/*
** 记录目录遍历后的结果
*/
var result = {};

var getDate = function(){
	var d = new Date();
	return d.getFullYear() +'/'+(d.getMonth()+1)+'/'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'\r\n';
};

// 日志
var addLog = function(log, logPath){
	if(fs === undefined){
		var fs = require('fs');
	}
	log = log + '\r\n';
	fs.appendFile(logPath, log, 'utf8',function(err){

	});
};

/* 
** 读取目录下面所有文件
** @param string p 目录
** 递归函数
** { abc: [ 'a.js', 'b.js' ],'abc\\ccc': [ 'c.js' ],'abc\\ccc\\ddd': [ 'd.txt' ] }
*/
var read = function(p){	
	var logPath = path.join(__dirname, 'log.txt');
	var fileList = fsys.readdirSync(p);
	result[p] = [];
	for(var i=0,l=fileList.length;i<l;i++){
		var item = fileList[i],
			ph = path.join(p, item);	
		if(fsys.lstatSync(ph).isDirectory()){
			if(indexOf(dirScan.noScanDir, item) === -1 && indexOf(dirScan.noScanDir, ph) === -1){
				arguments.callee(ph);
			}			
		}else{	
			// 过滤
			if(indexOf(dirScan.extension, path.extname(ph)) !== -1){
				addLog('Success. file: '+ph+' has been scanned.', logPath);
				result[p].push(item);
			}			
		}
	}	
};



/*
** 读取目录下面所有文件
** @param p  目录路径字符串
** return { abc: [ 'a.js', 'b.js' ],'abc\\ccc': [ 'c.js' ],'abc\\ccc\\ddd': [ 'd.txt' ] }
*/
dirScan.files = function(p){
	var logPath = path.join(__dirname, 'log.txt');
	try{
		var stat = fsys.lstatSync(p);
		if(stat.isFile()){
			if(indexOf(dirScan.extension, path.extname(p)) !== -1){
				result[p] = [];
				result[p].push(path.basename(p));
			}	
			addLog(getDate() + 'Success. file: '+p+' has been scanned.', logPath);
			return result;
		}
		addLog(getDate() + 'Success. dir: '+p+' has been scanned.', logPath);
		read(p);	
		return result;
	}catch(err){
		addLog(getDate() + 'error: '+err.message, logPath);
	}finally{
		addLog('\r\n', logPath);
	}
	
}
/*
** 计算脚本文件数量
** @param object result { abc: [ 'a.js', 'b.js' ],'abc\\ccc': [ 'c.js' ],'abc\\ccc\\ddd': [ 'd.txt' ] }
** @return int 
*/
dirScan.countFiles = function(result){
	var count = 0;
	for(var i in result){
		files = result[i];	
		count += files.length;
	}
	return count;
};

return dirScan;
});

