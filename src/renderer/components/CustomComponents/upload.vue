<template>
	<div id="uploadTemplate">
		<div>
			<el-progress :percentage="percentage"></el-progress>
			<div style="height: 20px;display: flex;justify-content: space-between;margin: 0 20px;font-size: 12px;line-height: 12px;">
				<i style="margin-right:10px;display: inline-block;width: 110px;">{{speed}}</i>
				<i style="display: inline-block;width:80px;">{{restTime}}</i>
			</div>
		</div>

		<!--<el-button type="primary" @click="stop" size="mini">暂停</el-button>
		<el-button type="primary" @click="start" size="mini">开始</el-button>-->
	</div>
</template>
<script>
	const fs = require("fs");
	var filename = `${__dirname}/../../assets/data.json`;
	import {
		post,
		baseUrl,
		get
	} from '../api'
	var url = baseUrl + "/music/music/video-upload"
	import { getConfig, getAuth } from "../util.js";
	export default {
		props: ["file"],
		data() {
			return {
				percentage: 0,
				speed: "-----",
				restTime: "正在连接",
				flage: false,
				stopStatus: false,
				cancleStaus: false,
				number: 0,
				step: 1024 * 1024,
				cancleUploadFlage: false,
				startFlage: true,
				sendNum: 0,
				arr: [],
				index: 0,
				BlockLength: 4 * 1024 * 1024,
				ChunkLength: 1024 * 1024 / 2,
				url: '',
				urlText: "http://up-z1.qiniup.com",
				ctx: "",
				offset: "",
                credential:"",
				key:""
			}
		},
		methods: {
			start() {
				
				if (this.file.upState == "1") {
					this.stopStatus = false
					var path = this.file.path
					var _this = this
					var obj = {
						"id": this.file.id,
						"key": "startFlage",
						"value": true
					}
					this.$store.commit("goo", obj)
					console.log(this.file)
                    getAuth(this.file.content, this.file.type, (result) => {
						console.log(result, "result")
						if(result == 1){
							
						}else{
							
							this.credential = result.credential;
							this.key = Base64.encode(result.key);
							console.log(this.credential)
							this.Upload(this.file.currentNum, this.file)
						}
					})
					
					if (this.file.size != 0) {
						var percentage = this.file.currentNum / this.file.size > 1 ? 1 : (this.file.currentNum / this.file.size)
						this.percentage = parseInt(percentage * 100)
					}
				} else if (this.file.upState == "2") {
					this.stopStatus = true
					var percentage = this.file.currentNum / this.file.size > 1 ? 1 : (this.file.currentNum / this.file.size)
					this.percentage = parseInt(percentage * 100)
				}

			},
			stop() {
				this.stopStatus = true

				console.log(this.file.id, "stop")
			},
			cancleUpload() {
				var index = Math.ceil(this.file.currentNum / this.step);
				var name = this.file.name.split('.')[0]
				var send_data = {
					name: name,
					index: index
				}
				get("music/music/video-upload", send_data).then(function(res) {
					console.log(res)
				})
			},
			creatUrl(obj, currentNum) {
				if (obj.type == 1) {
					this.url = this.urlText + "/mkblk/" + obj.BlockSize;
				} else {
					console.log(this.file.arr,currentNum-1)
					var ctx = this.file.arr[currentNum-1].ctx;
					var offset = this.file.arr[currentNum -1].offset;
					
					this.url = this.urlText + "/bput/" + ctx + "/" + offset;
				};
			},
			makFile(file) {
				
				var str = '';
				var _this = this;
				console.log(file)
				var config = getConfig(file);
				
				var stateCode = 201;
				for (var i = 0; i < file.arr.length; i++) {
					if (i == file.arr.length - 1) {
						str += file.arr[i].ctx
						break;
					}
					if (file.arr[i].type == 8) {
						str += file.arr[i].ctx + ","
					}
				}
				if(file.content.status == 3){
					config += "/x:id/"+Base64.encode(file.THid);
					stateCode = 204;
				}
				this.url = this.urlText + "/mkfile/" + this.file.size + "/key/" + this.key + "/" + config;
				var xhr = new XMLHttpRequest();
				xhr.open('post', this.url, true);

				xhr.setRequestHeader("Authorization", "UpToken " + this.credential);

				xhr.onreadystatechange = function(response) {
					if (xhr.readyState == 4 && xhr.status == stateCode) {
							console.log("上传完成")
							_this.stopStatus = false
							_this.speed = ""
							_this.restTime = ""
							var obj = {
								"id": file.id,
								"key": "upState",
								"value": "8"
							}
							_this.$store.commit("goo", obj)

							if (_this.$store.getters.number < 3) {
								_this.$store.commit("NEXT")
							}
					}else if(xhr.readyState == 4 && xhr.status == 701){
						var obj = {									
							"id":file.id,
							"key":"currentNum",
							"value":0
						}
						_this.$store.commit("goo",obj)
						_this.Upload(0,file)
					}else if(xhr.readyState == 4 && xhr.status == 579){
						var obj = {
							"id": file.id,
							"key": "upState",
							"value": "3"
						}
						_this.$store.commit("goo", obj)
					}

				};

				xhr.send(str);
			},
			Upload(start, file) {

				var bufferObj = file.arr[start];
				var _this = this
				var fileData = file.file
				var step = this.step;
				this.creatUrl(bufferObj, start);
				var reader = new FileReader()
				reader.readAsArrayBuffer(fileData.slice(bufferObj.start, bufferObj.end)); //发起异步请求
				reader.onload = function() {

					console.log(reader.result.byteLength)
					if (!_this.stopStatus) {
						if (reader.result.byteLength != 0) {
							_this.send_data(reader.result, file, start + 1)
						} else {
							var obj = {
								"id": file.id,
								"key": "upState",
								"value": "9"
							}
							_this.$store.commit("goo", obj)
						}

					} else {
						console.log(file, "stop", _this.$store.getters.number)
						var obj = {
							"id": file.id,
							"key": "startFlage",
							"value": false
						}
						_this.$store.commit("goo", obj)
					}
				}
			},
			send_data(result, file, currentNum) {

				var _this = this;

				var timestampStart = new Date().getTime();

				var blob = new Blob([result]);
				var obj = file.content;



				var xhr = new XMLHttpRequest();
				var str = "Bearer " + localStorage.getItem('token')
				var credential = "UpToken " + this.credential
				xhr.open('post', this.url, true);
				xhr.setRequestHeader("Authorization", credential);

				xhr.onreadystatechange = function(res) {
					
					if (xhr.readyState == 4 && xhr.status == 200) {

						var resDate = JSON.parse(xhr.response);
						console.log(currentNum, resDate)


						_this.ctx = resDate.ctx;
						_this.offset = resDate.offset;
						file.arr[currentNum - 1].ctx = _this.ctx;
						file.arr[currentNum - 1].offset = _this.offset;
						var timestampEnd = new Date().getTime();
						var time = (timestampEnd - timestampStart) / 1000
						var speed = (_this.step / (1024 * 1024)) / time

						var obj = {
							"id": file.id,
							"key": "currentNum",
							"value": currentNum
						}
						var obj1 = {
							"id": file.id,
							"key": "UploadSize",
							"value": file.arr[currentNum-1].start
						}
						_this.$store.commit('goo', obj1);
						_this.$store.commit("goo", obj);

						if (speed < 1) {
							_this.speed = Math.floor(speed * 1024) + "kB\/s"
						} else {
							_this.speed = speed.toFixed(2) + "MB\/s"
						}
						if (currentNum < file.arr.length) {
							var restNumber = Math.floor((file.size - file.arr[currentNum].start) / (1024 * 1024 * speed) < 0 ? 0 : ((file.size -
								file.arr[currentNum].start) / (1024 * 1024 * speed)))
							var p1 = Math.floor(restNumber / 3600) > 9 ? Math.floor(restNumber / 3600) : "0" + Math.floor(restNumber / 3600);
							var p2 = Math.floor(restNumber / 60 % 60) > 9 ? Math.floor(restNumber / 60 % 60) : "0" + Math.floor(restNumber /
								60 % 60);
							var p3 = Math.floor(restNumber % 60) > 9 ? Math.floor(restNumber % 60) : "0" + Math.floor(restNumber % 60);
							_this.restTime = p1 + ":" + p2 + ":" + p3;
							var percentage = file.arr[currentNum].start / file.size > 1 ? 1 : (file.arr[currentNum].start / file.size)
							_this.percentage = parseInt(percentage * 100)

							_this.Upload(currentNum, file)

						} else {
                             _this.makFile(file)
						}

					} else if (xhr.readyState == 4 && xhr.status == 401) {
						
						if (!_this.stopStatus) {
							
					    getAuth(_this.file.content, _this.file.type, (result) => {
								console.log(result, "result")
								if(result == 1){
									
								}else{								
									_this.credential = result.credential;
									_this.key = Base64.encode(result.key);
									console.log(_this.credential)
									_this.Upload(_this.file.currentNum, _this.file)
								}
							})
						} else {
							var obj = {
								"id": file.id,
								"key": "startFlage",
								"value": false
							}
							_this.$store.commit("goo", obj)
						}
					} 
				}
				xhr.send(blob);
			},
			cancleUplaod() {
				var index = Math.ceil(this.file.currentNum / this.step);
				var send_data = {
					name: this.file.name,
					index: index
				}
				get("music/music/video-upload", send_data).then(function(res) {
					console.log(res)
				})
			}

		},
		mounted() {
			console.log("mounted", this.file.startFlage)
			if (this.file.startFlage) {
				this.start()
			}
      this.arr = this.file.arr;		
		},
		beforeDestroy() {

			console.log("beforeDestroy", this.file.id)
		}

	}
</script>
<style>
	#uploadTemplate .el-progress__text {
		display: none;

	}
</style>
