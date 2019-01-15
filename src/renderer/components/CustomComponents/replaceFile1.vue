<template>
	<div>
		<el-progress  :stroke-width="2"  :percentage="replacePercentage" :status="replacePercentageStatus"></el-progress>
	<!--	<el-button @click="start">按钮</el-button>-->
	</div>
</template>
<script>
	import { post , baseUrl , get } from '../api'
	var url = baseUrl +"/music/music/video-upload"
	const fs = require("fs");
	export default {
		props:["file"],
        data(){
			return{
				replacePercentage:0,
				replacePercentageStatus:"",
				step:1024*1024*5,
				flage:false,
				cancleUploadFlage:false
			}
		},
		methods:{
			start(){
				this.Upload(0,this.file)
				console.log("kol",this.file)
				console.log('ppp')
			},
			Upload(start,file){
				var _this = this				
			  var fileData = file
			  var step = this.step;
			  var reader = new FileReader()
				

				reader.readAsArrayBuffer(fileData.slice(start,(start+step)))
				    reader.onload = function(){
						_this.send_data(reader.result,file,(start+step))
					}
				
			},
			cancleUpload(){
				this.cancleUploadFlage = true;
			},
			cancleUploadFUN(name,index){
				var send_data = {
					name:name,
					index:index
				}
				get("music/music/video-upload",send_data).then(function(res){
					console.log(res)
				})
			},
			send_data(result,file,currentNum){
				console.log(file);
				var fd = new FormData();
				var _this = this;
				var count = Math.ceil(file.size/this.step);
				var index = Math.ceil(currentNum/this.step);
				var blob = new Blob([result]);
				console.log(blob,file);
				var obj = file.content;
				var name = obj.singer+"￥"+obj.name+"￥"+obj.singer_type+"￥"+obj.language+"￥"+obj.picture+"￥"+obj.area+"￥"+obj.voice_type+"￥"+obj.format_type+"￥"+obj.voice_track+"￥"+obj.vocal_track+'.'+file.type.split('/')[1];
				// console.log(name)
		        fd.append('file', blob);
		        fd.append('name', name);
						fd.append('count', count); 
						fd.append("index",index);
						fd.append("type", file.type.split('/')[1]);						
						fd.append("opera", 1);
						fd.append("id", file.id);  
				var xhr = new XMLHttpRequest();
				var str = "Bearer "+localStorage.getItem('token')
					xhr.open('post', url, true);
					xhr.setRequestHeader("Authorization",str);
					xhr.onreadystatechange = function () {
					    if (xhr.readyState == 4 && xhr.status == 200) {
						console.log(currentNum/file.size)
						        _this.replacePercentage = Math.ceil((currentNum/file.size)*100) >100 ? 100:Math.ceil((currentNum/file.size)*100);
								
								if(currentNum<file.size){
									  if(_this.cancleUploadFlage){
										  _this.cancleUploadFUN(file.name.split('.')[0],index)
									  }else{
										  _this.Upload(currentNum,file)											
									  
								        }
									}else{
										console.log("上传完成")
										_this.$emit("onSuccess")
									}
					     };
						if(xhr.readyState == 4 && xhr.status != 200){
							    console.log("上传失败")
								_this.$emit("onError")
						}
					};
			        xhr.send(fd);
			},
			
		},
		mounted(){
			// console.log(this.file)
		}
	}
</script>
<style>
	
</style>
