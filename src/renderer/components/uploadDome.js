var uploadIndex = 0;
import {
	Base64
} from 'js-base64';
import {
	changeData
} from './util.js';
import {
	post
} from './api'
const fs = require("fs");
const path = require('path');
const CHUNKLENGTH = 1024 * 1024 / 2;  // 每一片的长度
const BLOCKLENGTH = 4 * 1024 * 1024;  // 每一块的长度
const NAMEARRS = ['singer', 'name', 'singer_type', 'language', 
                 'picture', 'area', 'voice_type', 'format_type', 
				 'voice_track', 'vocal_track']



class EventEmitter {
	constructor() {
		this.event = {};
		this.keys = [];
	}
	
	addListener(key, callback){
		if(this.hasKey(key)) return;
		this.keys.push(key);
		Object.defineProperty(this.event, key, {
			set: (newValue) => {
				callback(newValue)
			},
			enumerable: true,
			configurable: true
		})
	}
	
	hasKey(key){
		return this.keys.indexOf(key) === -1 ? false:true;
	}
	
	emit(key, params){
	   if(!this.hasKey(key)) return;
	   this.event[key] = params || null;
	}
	
	removeListener(key, callback){
	   if(!this.hasKey(key)) return;
	   this.keys.splice(this.keys.indexOf(key), 1);
	   delete this.event[key];
	   callback();
	}

}

class VerifyFileExite {
	constructor(path) {
	   this.path = path;
	   this.isFileExite = this.verify();
	}
	
	verify() {
		return fs.existsSync(this.path);
	}
}

class sliceFile {
	constructor(file, chunkLength, blockLength) {
	    this.file = file;
	    this.chunkLength = chunkLength || CHUNKLENGTH;
	    this.blockLength = blockLength || BLOCKLENGTH;
	    this.sliceArr = this.slice();
	}
	
	slice(){
		let arr = [];
		var allChunkNum = Math.ceil(this.file.size / this.chunkLength);
		var n = 0;
		for (let i = 0; i < allChunkNum; i++) {
			if (n < 8) {
				n++;
			} else {
				n = 1;
			};
			var obj = {};
			obj.type = n;
			obj.start = this.chunkLength * i;
			obj.end = this.chunkLength * (i + 1) - 1;
			obj.BlockIndex = Math.ceil((i + 1) / 8);
			obj.ChunkIndex = n;
			if (n == 1) {
				obj.typeText = "firstChunkBinary"
				if (i < (allChunkNum - 8)) {
					obj.BlockSize = this.blockLength
				} else {
					obj.BlockSize = this.file.size - this.chunkLength * i;
				}
			} else {
				obj.typeText = "nextChunkOffset"
			}
			arr.push(obj);
		};
		return arr;
	}
}

class GetToken {
	constructor() {
	    this.token = localStorage.getItem('token');
	}
}

class GetFileName {
	constructor(obj, type) {
	    this.obj = obj;
		this.type = type
		this.filename = this.getName();
	}
	
	getName(){
		let name = '';
		NAMEARRS.forEach(item => {
			let result = '无';
			if(this.obj[item]){
				result = this.obj[item];
			}
			name += result + "￥";
		})
		name = name.substr(0, name.length-1);
		name += name + '.'+ type;
		return name;
	}
}

class UploadFile extends EventEmitter {
	constructor(name, p) {
	    super()
		console.log(name, p)
	}
	

}
export default UploadFile;