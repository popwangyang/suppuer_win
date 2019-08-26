var fs = require("fs");
var join = require("path").join
import { post, get } from "./api.js"
import config  from '../config'

export let changeData = function(data){
	var send_data = {};
	    send_data.name = data.name;
		send_data.singer = data.singer;
	switch(data.singer_type){
		case "男歌手":
			send_data.singer_type = 0;
			break;
			case "女歌手":
				send_data.singer_type = 1;
				break;
			case "组合":
				send_data.singer_type = 2;
				break;
			case "合唱":
				send_data.singer_type = 3;
				break;
	};
	switch(data.language){
			case "国语":
				send_data.language = 0;
			break;
			case "粤语":
				send_data.language = 1;
				break;
			case "闽南语":
				send_data.language = 2;
				break;
			case "英语":
				send_data.language = 3;
				break;
			case "日语":
				send_data.language = 4;
				break;
			case "韩语":
				send_data.language = 5;
				break;
	};
	switch(data.picture){
		case "MTV":
			send_data.picture = 4;
			break;
		case "LIVE":
			send_data.picture = 1;
			break;
		case "舞曲":
			send_data.picture = 2;
			break;
		case "配置画面":
			send_data.picture = 3;
			break;
		case "写真":
		    send_data.picture = 5;
		    break;
	};
	switch(data.area){
			case "大陆":
				send_data.area = 0;
			break;
			case "港台":
				send_data.area = 1;
				break;
			case "日韩":
				send_data.area = 2;
				break;
			case "欧美":
				send_data.area = 3;
				break;
			case "其他":
				send_data.area = 4;
				break;
	};
	switch(data.format_type){
			case "高清":
				send_data.format_type = 0;
			break;
			case "DVD":
				send_data.format_type = 1;
			break;
			case "MP4":
				send_data.format_type = 2;
			break;
			case '其他':
				send_data.format_type = 3;
			break;
	};
	switch(data.voice_type){
			case "消音":
				send_data.voice = 0;
			break;
			case "原版伴奏":
				send_data.voice = 1;
			break;
			case "演唱会":
				send_data.voice = 2;
			break;
			case "remix":
				send_data.voice = 3;
			break;
			case "其他":
				send_data.voice = 4;
			break;
	};
	switch(data.vocal_track){
			case "1":
				send_data.vocal_track = 0;
			break;
			case "2":
				send_data.vocal_track = 1;
			break;
			case "左声道":
				send_data.vocal_track = 2;
			break;
			case "右声道":
				send_data.vocal_track = 3;
			break;
			case "左":
				send_data.vocal_track = 2;
			break;
			case "右":
				send_data.vocal_track = 3;
			break;
	};
	switch(data.voice_track){
			case "1":
				send_data.voice_track = 0;
			break;
			case "2":
				send_data.voice_track = 1;
			break;
			case "左声道":
				send_data.voice_track = 2;
			break;
			case "右声道":
				send_data.voice_track = 3;
			break;
			case "左":
				send_data.voice_track = 2;
			break;
			case "右":
				send_data.voice_track = 3;
			break;
	};
	
	return send_data;
}

export let getFormat = function(obj){
	
	function formate(num){
		var str = null
		switch(num){
			case 0:
				 str = 'MPG'
				   break;
			case 1:
				  str = 'MP4'
				  break;
		    case 2:
				 str = 'MKV'
				 break;	    
		}
		return str;
	}
	
	
	if(!obj.multiple || obj.multiple.length == 0){
		return "MPG"
	}else{
		var str ="";
		
		obj.multiple.map((item) => {
			str += formate(item)+", "
		})
		console.log(obj.multiple, str.slice(0, str.length-2))
		
		return str.slice(0, str.length-2);
	}	
}

export let getConfig = function(file){
	var obj = {};	
		obj.auth = "Bearer " + localStorage.getItem('token');
		obj.uid = localStorage.getItem('user_id');
		obj.suffix = file.type;
		if(file.content.album != ''){
		  obj.album = file.content.album_id	
		}
		if(file.content.company != ''){
		  obj.company = file.content.company_id
		}
	var arr = []
	var urlStr = "";
			for(var key in obj){
			var str = "x:"+key+"/" + Base64.encode(obj[key]);
				arr.push(str);	
		}
		urlStr = arr.join("\/");
		console.log(urlStr)
	return urlStr;
}

export const fileArray = function(obj, cb){
	var arr = [];
	var types= ['mpeg', 'mp4', 'mpg', 'mkv'];
	var num = 0;
	function getFile(startPath){
		var fileStat = fs.statSync(startPath);
		if(fileStat.isDirectory()){
			num++;
			fs.readdir(startPath, function(err, results){
				num--;
				for(let i = 0; i < results.length; i++){
				    var path = join(startPath, results[i]);
					getFile(path);	
				}
			})
		}else{
			var type = startPath.split('.')[startPath.split('.').length-1];
			var obj = {};
			if(types.indexOf(type) != -1){
				obj.flage = true;
				obj.paht = startPath;
			}
			arr.push(obj);
			if(num == 0){
				cb(arr);
			}
		}
	};
	
	for(let i = 0; i < obj.length; i++){
		console.log(obj[i].path)
		getFile(obj[i].path)
	};
}

export const getAuth = function(obj, type, cb){
	console.log(obj)
	var str = obj.singer + "￥" + obj.name + "￥" + obj.singer_type + "￥" + obj.language + "￥" + obj.picture + "￥" + obj.area +
		"￥" + obj.voice_type + "￥" + obj.format_type + "￥" + obj.voice_track[0] + "￥" + obj.vocal_track[0] + "." + type;
	var send_data = {
		name: str
	}
	
	post("music/music/store-credential", send_data).then((response) => {
		cb(response.data)
	}).catch(err => {
		cb('err')
	})
}

export const getDingZiNum = function(cb){
	
	let p1 = new Promise((resolve, reject) => {
		  var send_data = {
		  	page:1,
		  	page_size:999999999,
			state:0
		  }
		get("/music/music/custom-manage", send_data).then((res) => {
			// console.log(res.data.count);
			resolve(res.data.count)
		}).catch(() => {
			console.log("pppp")
			reject(0)
		})  
    })
	let p2 = new Promise((resolve, reject) => {
	     var send_data = {
	      	page:1,
	      	page_size:999999999,
	        state:1
	      }
	    get("/music/music/custom-manage", send_data).then((res) => {
	    	// console.log(res.data.count);
	    	resolve(res.data.count)
	    }).catch(() => {
			console.log("pppp")
	    	reject(0)
	    })  
	})
	Promise.all([p1, p2]).then((result) => {
	  // console.log(result)               //['成功了', 'success']
	cb(result.reduce((a, b) => {
       return a + b;
     })) 
	 
	}).catch((error) => {
	  console.log(error)
	})
}

export const validateFormat = function (name){
	var formate = name.split(".")[name.split(".").length - 1];
	var formateArr = [ 'mp4', 'mpg', 'mpeg', 'mkv'];
	var flage = formateArr.indexOf(formate) == -1 ? false:true;
	return flage;   
	
}

export const blackBox = function (key, value, type) {
	if(value == null){
		return "";
	}
	let dataArr = config.songInfoData[key];
	let result = null;
	if(!!!dataArr){
		return value == undefined ? "":value;
	}
	if(type == 'value'){
		result = dataArr.filter(item => {
			return parseInt(item.value) == parseInt(value)
		})[0].label	
	}else{
		result = dataArr.filter(item => {
			return item.label.indexOf(value) > -1 
		})[0].value
	}
	console.log(value, result)
	return result;
}