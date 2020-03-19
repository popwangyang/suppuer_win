var uploadIndex = 0;

const path = require('path');
import {post} from '@/components/api'
import EventEmitter from './eventEmitter.js' // 监听事件
import {VerifyFileExite} from './otherClass.js'
import SliceFile from './sliceFile.js'  // 切分文件


class UploadFile extends EventEmitter {
	constructor(file, data) {
	    super();
		let sliceFile = new SliceFile(file);
		this.token = this.getToken();
		this.sliceArr = sliceFile.sliceArr;
		this.uploadName = file.name;
		this.config = this.getConfig();
		this.file = file;
		this.data = data;
		this.credential = '';
		this.key = '';
		this.index = 0; // 上传的位置
		this.startTime;
		this.endTime;
	}
	
    
	
	getAuth(){
		return new Promise(resolve => {
			var send_data = {
				name: this.uploadName
			}
			post("/music/music/store-credential", send_data).then((response) => {
				this.credential = response.data.credential;
				this.key = Base64.encode(response.data.key);
				resolve()
			})
		})
	}
	
	getToken(){
		return localStorage.getItem('token');
	}
	
	getConfig(){
		var obj = {};
		if (this.file.id) {
			obj.id = this.file.id;
		}
		obj.auth = this.token
		obj.uid = localStorage.getItem("user_id");
		obj.suffix = this.file.path.split('.').pop();
		var arr = []
		var urlStr = "";
		for (var key in obj) {
			var str = "x:" + key + "/" + Base64.encode(obj[key]);
			arr.push(str);
		}
		urlStr = arr.join("\/");
		return urlStr;
	}
	
	
}
export default UploadFile;