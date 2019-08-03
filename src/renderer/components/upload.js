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

function Upload(data, url) {
	var UploadIndex = uploadIndex;
	var uploadState = 1; // 0 暂停； 1 上传中； 2 等待中；3 上传完成；4 上传出错；5删除；
	uploadIndex++;
	this.uploadingStateNum = 3;  // 可以同时上传的总个数；
	this.id = data.id;  // 上传实例的id
	this.loading = false;
	this.content = data.content;  // 上传歌曲信息；
	this.create_date = data.upload_data;  // 歌曲上传时间；
	this.size = data.file.size;  // 上传文件的总大小；
	this.precent = 0;  // 上传文件的进度；
	this.file = data.file;
	this.key = null;
	this.token = this.getToken();
	this.urlText = url;
	this.url;
	this.credential;
	this.index = 0;
	this.BlockLength = 4 * 1024 * 1024;
	this.ChunkLength = 1024 * 1024 / 2;
	this.event = {
		_prograssEvent: 1,
		_errorEvent: 1
	};
	this.repeatnumber = 3;  // 发生错误时，自动重新上传的次数；
	this.ctx;
	this.offset;
	this.arr = [];
	this.config;
	this.slice();
	this.getConfig();
	this.getAuth(this.startUpload);
	this.stopFlage = true;
	this.startTime;
	this.endTime;
	this.getUploadState = function() {
		return uploadState;
	};
	this.setUploadState = function(state) {
		uploadState = state;
	};
	this.getUploadIndex = function() {
		return UploadIndex;
	}
	Upload.children.push(this);
	
}

Upload.prototype.slice = function() {
	var allChunkNum = Math.ceil(this.file.size / this.ChunkLength);
	var n = 0;
	for (let i = 0; i < allChunkNum; i++) {
		if (n < 8) {
			n++;
		} else {
			n = 1;
		};
		var obj = {};
		obj.type = n;
		obj.start = this.ChunkLength * i;
		obj.end = this.ChunkLength * (i + 1);
		obj.BlockIndex = Math.ceil((i + 1) / 8);
		obj.ChunkIndex = n;
		if (n == 1) {
			obj.typeText = "firstChunkBinary"
			if (i < (allChunkNum - 8)) {
				obj.BlockSize = this.BlockLength
			} else {
				obj.BlockSize = this.file.size - this.ChunkLength * i;
			}
		} else {
			obj.typeText = "nextChunkOffset"
		}
		this.arr.push(obj);
	};
};

Upload.prototype.startUpload = function() {
	console.log(this.getUplaodingFlage())
	if (this.getUplaodingFlage()) {
		var obj = this.arr[this.index];
		this.stopFlage = false;
		this.loading = true;
		this.changeURL(obj);
		this.Uploading();
		this.setUploadState(1);
	} else {
		this.setUploadState(2);
	}
	this.event.prograssEvent = 0;
};

Upload.prototype.waite = function() {
	this.setUploadState(0);
	this.stopFlage = true;
}

Upload.prototype.changeURL = function(obj) {
	if (obj.type == 1) {
		this.url = this.urlText + "/mkblk/" + obj.BlockSize;
	} else {
		this.url = this.urlText + "/bput/" + this.ctx + "/" + this.offset;
	};
};

Upload.prototype.stopUpload = function() {
	if (this.getUploadState() == 1) {
		this.stopFlage = true;
		this.loading = true;
	} else {
		this.stopFlage = false;
		this.loading = false;
	}
	this.setUploadState(0);
	this.event.prograssEvent = 0;
};

Upload.prototype.deleteUpload = function() {
	if (this.getUploadState() == 1) {
		this.stopFlage = true;
		this.loading = true;
	} else {
		this.stopFlage = false;
		this.loading = false;
	}
	this.setUploadState(5);
	this.event.prograssEvent = 0;
};

Upload.prototype.getToken = function() {
  return localStorage.getItem('token');
};

Upload.prototype.getUplaodingFlage = function() {
	var childrens = Upload.children;
	var num = 0;
	for (var i = 0; i < childrens.length; i++) {
		console.log(childrens[i].getUploadState())
		if (childrens[i].getUploadState() == 1) {
			num++;
		}
	};
	if (num < this.uploadingStateNum) {
		return true;
	} else {
		return false;
	}
}

Upload.prototype.getAuth = function(cb) {
	var send_data = {
		name: this.file.name
	}
	post("/music/music/store-credential", send_data).then((response) => {
		this.credential = response.data.credential;
		this.key = Base64.encode(response.data.key);
		cb.bind(this)()
	})
}

Upload.prototype.getConfig = function() {
	var send_data = {
		name: [this.file.name]
	}
	post("/music/music/store-verification", send_data).then((res) => {
		var obj = {};
		if (this.file.id) {
			obj.id = this.file.id;
		}
		obj.auth = this.token
		obj.uid = localStorage.getItem("user_id");
		var arr = []
		var urlStr = "";
		for (var key in obj) {
			var str = "x:" + key + "/" + Base64.encode(obj[key]);
			arr.push(str);
		}
		urlStr = arr.join("\/");
		console.log(urlStr);
		this.config = urlStr;
	})
}

Upload.prototype.next = function() {
	var childrens = Upload.children;
	for (var i = 0; i < childrens.length; i++) {
		console.log(childrens[i].getUploadState())
		if (childrens[i].getUploadState() == 2) {
			childrens[i].startUpload();
			break;
		}
	}
}


Upload.prototype.getSpeed = function() {
	var time = (this.endTime - this.startTime) / 1000;
	var space = (this.arr[this.index].end - this.arr[this.index].start) / 1024;
	var speed = (space / time) > 1024 ? ((space / time) / 1024).toFixed(2) + "MB/S" : ((space / time).toFixed(0) + "KB/S");
	return speed;
}

Upload.prototype.progressEvent = function(callback) {
	var _this = this;
	Object.defineProperty(this.event, "prograssEvent", {
		set: function(newValue) {
			this._prograssEvent = newValue;
			var obj = {};
			obj.total = _this.file.size;
			obj.uploadState = _this.getUploadState();
			if (_this.loading) {
				obj.uploadState = 0.5;
			}
			if (_this.index <= _this.arr.length - 1) {
				obj.start = _this.arr[_this.index].start;
				obj.precent = Math.ceil((obj.start / obj.total) * 100);
				obj.speed = _this.getSpeed();
			} else {
				obj.precent = 100;
			}
			if (newValue == 0 && obj.uploadState != 5) {
				obj.displayFlage = false;
			} else {
				obj.displayFlage = true;
			}
			this.precent = obj.precent;
			callback(obj);
		}
	})
};

Upload.prototype.errorEvent = function(callback) {
	var _this = this;
	Object.defineProperty(this.event, "errorEvent", {
		set: function(newValue) {
			this.setUploadState(4);
			callback(newValue);
		}
	})
};

Upload.prototype.on = function(key, callback) {
	switch (key) {
		case "prograss":
			this.progressEvent(callback)
			break;
		case "error":
			this.errorEvent(callback)
			break;
	}
};

Upload.prototype.complateUplod = function() {
	var str = '';
	var _this = this;
	for (var i = 0; i < this.arr.length; i++) {
		if (i == this.arr.length - 1) {
			str += this.arr[i].ctx
			break;
		}
		if (this.arr[i].type == 8) {
			str += this.arr[i].ctx + ","
		}
	}
	this.url = this.urlText + "/mkfile/" + this.file.size + "/key/" + this.key + "/" + this.config;
	var xhr = new XMLHttpRequest();
	xhr.open('post', this.url, true);
	xhr.setRequestHeader("Authorization", "UpToken " + this.credential);
	xhr.onreadystatechange = function(response) {
		if (xhr.readyState == 4 && xhr.status == 204 || xhr.readyState == 4 && xhr.status == 201) {
			Upload.children.map((item, index) => {
				if(item.id == _this.id){
					Upload.children.splice(index, 1);
				}
			})
			console.log(Upload.children, "ssssssssssssssss")
			_this.event.prograssEvent = 1;
			_this.setUploadState(3);
			_this.next();
		}else if (xhr.readyState == 4 && xhr.status == 401) {
			_this.getAuth(_this.complateUplod())
		}else if(xhr.readyState == 4) {
			_this.event.errorEvent = 1;
		} 
	};
	xhr.send(str);

};

Upload.prototype.Uploading = function() {
	this.startTime = new Date().getTime();
	var _this = this;
	var obj = this.arr[this.index];
	var fileContent = this.file.slice(obj.start, obj.end);
	var xhr = new XMLHttpRequest();
	xhr.open('post', this.url, true);
	xhr.setRequestHeader("Content-Type", "text/plain");
	xhr.setRequestHeader("Authorization", "UpToken " + this.credential);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			_this.loading = false;
			_this.endTime = new Date().getTime();
			var resDate = JSON.parse(xhr.response)
			_this.ctx = resDate.ctx;
			_this.offset = resDate.offset;
			_this.arr[_this.index].ctx = _this.ctx;
			_this.event.prograssEvent = 0;
			_this.index++;
			if (_this.index <= _this.arr.length - 1) {
				_this.changeURL(_this.arr[_this.index]);
				if (!_this.stopFlage) {
					_this.Uploading();
				} else {
					_this.event.prograssEvent = 0;
					_this.next();
				}
			} else {
				_this.complateUplod();
			}
		} else if (xhr.readyState == 4 && xhr.status != 200) {
			if (_this.repeatnumber > 0) {
				_this.Uploading();
				_this.repeatnumber--;
			} else {
				_this.event.errorEvent = 1;
			}
		} else if (xhr.readyState == 4 && xhr.status == 401) {
			_this.getAuth(_this.Uploading())
		}
	};
	xhr.send(fileContent);
};

var Upload = Upload;
Upload.children = [];
Upload.AllStartUpload = function() {
	var arr = Upload.children;
	arr.map((item) => {
		if (item.getUploadState() == 0) {
			item.startUpload();
		}
	})
}
Upload.AllStoptUpload = function() {
	var arr = Upload.children;
	arr.map((item) => {
		if (item.getUploadState() == 1 || item.getUploadState() == 2) {
			item.stopUpload();
		}
	})
}
Upload.AllDeleteUpload = function() {
	var arr = Upload.children;
	arr.map((item) => {
		setTimeout(() => {
			item.deleteUpload();
		}, 100)
	})
}
export default Upload;
