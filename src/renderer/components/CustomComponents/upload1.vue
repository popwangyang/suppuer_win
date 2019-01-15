<template>
	<div id="uploadTemplate">				
		<div>
		<el-progress :percentage="percentage"></el-progress>
		<div style="height: 20px;display: flex;justify-content: space-between;margin: 0 20px;font-size: 12px;line-height: 12px;" >
			<i  style="margin-right:10px;display: inline-block;width: 110px;">{{speed}}</i>
			<i  style="display: inline-block;width:80px;">{{restTime}}</i>
		</div>
		</div>
		
		<!--<el-button type="primary" @click="stop" size="mini">暂停</el-button>
		<el-button type="primary" @click="start" size="mini">开始</el-button>-->
	</div>
</template>
<script>
	const fs = require("fs");
	var filename=`${__dirname}/../../assets/data.json`;
  import { post , baseUrl , get } from '../api'
	var url = baseUrl +"/music/music/video-upload"
	export default{
		props:["file"],
		data(){
			return{
				percentage:0,
				speed:"-----",
				restTime:"正在连接",
				flage:false,
				stopStatus:false,
				cancleStaus:false,
				number:0,
				step:1024*1024,
				cancleUploadFlage:false,
				startFlage:true,
				sendNum:0
				
			}
		},
		methods:{
      start(){
				console.log(this.file,"[[]]")
				if(this.file.upState == "1"){
					this.stopStatus = false				
					var path = this.file.path
					var _this = this
         	var obj ={
         			"id":this.file.id,
         			"key":"startFlage",
         			"value":true
         	}
          this.$store.commit("goo",obj)
					
					this.Upload(this.file.currentNum,this.file)
          if(this.file.size!=0){
						var percentage = this.file.currentNum/this.file.size >1 ? 1: (this.file.currentNum/this.file.size)
						this.percentage = parseInt(percentage*100)
					}           					 
				}else if(this.file.upState == "2"){
					this.stopStatus = true
					var percentage = this.file.currentNum/this.file.size >1 ? 1: (this.file.currentNum/this.file.size)
					this.percentage = parseInt(percentage*100)
				}
					
			},
      stop(){
        	this.stopStatus = true
	
			    console.log(this.file.id,"stop")
      },
     cancleUpload(){
     	  var index = Math.ceil(this.file.currentNum/this.step);
				var name = this.file.name.split('.')[0]
				var send_data = {
					    name :name,
							index:index
				}
				get("music/music/video-upload",send_data).then(function(res){
					console.log(res)
				})
     },
      Upload(start,file){

      var _this = this
      var fileData = file.file
			var step = this.step;
      var reader = new FileReader()
			reader.readAsArrayBuffer(fileData.slice(start,(start+step)));//发起异步请求
      reader.onload = function(){
  
				console.log( reader.result.byteLength)
				if(!_this.stopStatus){
					 if(reader.result.byteLength != 0){
						 _this.send_data(reader.result,file,(start+step))
					 }else{
						 var obj = {									
						 	"id":file.id,
						 	"key":"upState",
						 	"value":"9"
						 }
						 _this.$store.commit("goo",obj)
					 }
					
				}else{
					console.log(file,"stop",_this.$store.getters.number)
					var obj ={
						  "id":file.id,
						  "key":"startFlage",
						  "value":false
					}
				_this.$store.commit("goo",obj)
				}	
       }
      },
        send_data(result,file,currentNum){			    	
        			var fd = new FormData();
        			var _this = this;
        			var timestampStart = new Date().getTime();
							var count = Math.ceil(file.size/this.step);
							var index = Math.ceil(currentNum/this.step);
							var blob = new Blob([result]);
							var obj = file.content;
							

							    fd.append('file', blob);
        	        fd.append('count', count); 
        	        fd.append("index",index);
					        fd.append("type", file.type);
									if(file.content.status == 3){
										
									console.log("替换")
									var name = obj.singer+"￥"+obj.name+"￥"+obj.singer_type+"￥"+obj.language+"￥"+obj.picture+"￥"+obj.area+"￥"+obj.voice_type+"￥"+obj.format_type+"￥"+obj.voice_track+"￥"+obj.vocal_track+"."+file.type;
									fd.append("opera", 1);
									fd.append("id", file.THid); 
									fd.append('name', name);
									console.log(file)
                  }else{
									var name = obj.singer+"￥"+obj.name+"￥"+obj.singer_type+"￥"+obj.language+"￥"+obj.picture+"￥"+obj.area+"￥"+obj.voice_type+"￥"+obj.format_type+"￥"+obj.voice_track+"￥"+obj.vocal_track+"."+file.type;
									fd.append('name', name);
										console.log("新增",_this.sendNum) 
									fd.append("opera", 0);
									}
									
        	        var xhr = new XMLHttpRequest();
					        var str = "Bearer "+localStorage.getItem('token')
					        xhr.open('post', url, true);
        	        xhr.setRequestHeader("Authorization",str);
									
        	        xhr.onreadystatechange = function () {
        	            if (xhr.readyState == 4 && xhr.status == 200) {
						             //  _this.sendNum = 0;
												  console.log(currentNum)            
        									var timestampEnd = new Date().getTime();
        									var time = (timestampEnd-timestampStart)/1000
        									var speed = (_this.step/(1024*1024))/time	
        								
													var obj = {									
														"id":file.id,
														"key":"currentNum",
														"value":currentNum
													}
													_this.$store.commit("goo",obj)

        									if(speed<1){
        										_this.speed = Math.floor(speed*1024)+"kB\/s"
        									}else{
        										_this.speed = speed.toFixed(2)+"MB\/s"
        									}       						
        								var restNumber = Math.floor((file.size-currentNum)/(1024*1024*speed)<0 ? 0:((file.size-currentNum)/(1024*1024*speed)))												
												    var p1 = Math.floor(restNumber/3600) > 9 ? Math.floor(restNumber/3600) : "0"+Math.floor(restNumber/3600);
														var p2 = Math.floor(restNumber/60%60) >9 ? Math.floor(restNumber/60%60) : "0"+Math.floor(restNumber/60%60);
														var p3 = Math.floor(restNumber%60)>9 ? Math.floor(restNumber%60) : "0"+Math.floor(restNumber%60);
												_this.restTime = p1+":"+p2+":"+p3;                    
												var percentage = currentNum/file.size >1 ? 1: (currentNum/file.size)   
        									_this.percentage = parseInt(percentage*100)
													
													
																			if(currentNum<file.size){
													
																						_this.Upload(currentNum,file)
																						
																				}else{
																						console.log("上传完成")
																						_this.stopStatus = false
																						_this.speed = ""
																						_this.restTime = ""
																						var obj = {									
																							"id":file.id,
																							"key":"upState",
																							"value":"8"
																						}
																						_this.$store.commit("goo",obj)
																						// _this.$store.commit("delect",file.id)
																						
// 																						_this.$emit("onRefresh")
                                              
																					 if(_this.$store.getters.number<3){
																						 _this.$store.commit("NEXT")
																						 // _this.percentage = 0;
																						// _this.$emit("Refresh")
																						
																						 // _this.start()
// 																						_this.$store.commit("Loading")
// 																						setTimeout(function(){
// 																							
// 																						_this.$store.commit("NEXT")
// 																						_this.start()
// 																					 },1000)
																					 
																						}
																						
																				}		
																				
        	            }else if(xhr.readyState == 4 && xhr.status == 502){
					                 	console.log("50搜索2")
												if(!_this.stopStatus){
													console.log("502")
													_this.Upload(currentNum,file)
												}else{
														var obj ={
																"id":file.id,
																"key":"startFlage",
																"value":false
														}
													_this.$store.commit("goo",obj)
												}												  
											}else if(xhr.readyState == 4 && xhr.status == 500 && _this.sendNum <=10){
												if(!_this.stopStatus){
													 _this.sendNum++;
													var obj = {									
														"id":file.id,
														"key":"currentNum",
														"value":0
													}
													_this.$store.commit("goo",obj)
													_this.Upload(0,file)
												}else{
														var obj ={
																"id":file.id,
																"key":"startFlage",
																"value":false
														}
													_this.$store.commit("goo",obj)
												}												
											}else if(xhr.readyState == 4 && xhr.status != 502 && xhr.status != 500 && xhr.status != 200){
												var obj = {									
													"id":file.id,
													"key":"upState",
													"value":"3"
												}
												_this.$store.commit("goo",obj)
												if(_this.$store.getters.number<3){
													_this.$store.commit("NEXT")												
													}		
											}else if(xhr.readyState == 4 && xhr.status == 500 && _this.sendNum >10){
												var obj = {									
													"id":file.id,
													"key":"upState",
													"value":"3"
												}
												_this.$store.commit("goo",obj)
												if(_this.$store.getters.number<3){
													_this.$store.commit("NEXT")												
													}		
											}
        	        }       	       
        	        xhr.send(fd);
        		},
			cancleUplaod(){
				var index = Math.ceil(this.file.currentNum/this.step);
				var send_data = {
					   name:this.file.name,
						 index:index
				}
				   get("music/music/video-upload",send_data).then(function(res){
						     console.log(res)
					 })
			}
		},
		mounted(){
			console.log("mounted",this.file.startFlage)
			if(this.file.startFlage){
				this.start()
			}
						
		},
		beforeDestroy(){
		
			console.log("beforeDestroy",this.file.id)
		}
		
	}
</script>
<style>
	#uploadTemplate .el-progress__text{
		display: none;
	
	}
</style>
