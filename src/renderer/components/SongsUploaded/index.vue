<template>
	<div id="SongsUploaded">
		<Empty v-if="flage" @change='getName'/>
		<Content v-else/>
	</div>
</template>

<script>
	import Bus from '../bus.js'
	import config from '../../config'
	import { validateFormat, getDate, blackBox, chaxun, saveStoreDB } from '../util.js'
	import { post, get } from '../api.js'
	import Empty from './components/emptyComponent.vue'
	import Content from './components/conentComponent.vue'
	const fs = require('fs');
	export default{
		name: 'songUpload',
		components: {
			Empty,
			Content,
		},
		data(){
			return{
				
			}
		},
		computed: {
			songNumbers(){
			    return this.$store.state.SongUpload.songNumbers;
			},
			flage() {
				return this.$store.state.SongUpload.songNumbers.length > 0 ? false:true; 
			}
		},
		methods: {
			getName(data) {
				if(this.testFile(data)) return;
				let name = data.name;
				let send_data = {
					  name: [name]
				};
				post("/music/music/store-verification", send_data).then( res => {
					if(res.data[0].status == 3){
						chaxun(res.data[0], (results) => {
							if(results.length > 0){
								this.$notify({
									title: '提示',
									message: '系统已存在该版本的歌曲',
									type: 'error',
									offset: 120,
									duration: 2000,
								});
							}else{
								this.saveFile(data, res);
							}
						})
					}else{
						
						this.saveFile(data, res);
					}
				})
			},
			saveFile(data, res){
				let file = {};
				let flage = true;
				for(let key in data){
					file[key] = data[key]
				};
				for(let key in res.data[0]){
					if(res.data[0][key] == null){
						flage = false;
					}
				}
				res.data[0].status = flage ? 0:1;
				// console.log(res.data[0])
				let obj = {
					"currentNum": 0,
					"id": new Date().getTime(),
					"name": data.name,
					"path": data.path,
					"type": data.name.split(".")[data.name.split(".").length - 1],
					"isUpload": false,
					"size": data.size,
					"upState": "0",
					"UploadSize" : 0,
					"startFlage": true,
					"content": res.data[0],
					"file": file,
					"upload_data": getDate(),
				}
				saveStoreDB(this, obj)
				this.$store.commit("saveSong", obj)
				this.$notify({
					title: '提示',
					message: '导入成功！',
					type: 'success',
					offset: 60,
					duration: 1000
				});
			},
			testFile(data){
				let result = false;
				this.songNumbers.forEach(item => {
					if(item.name === data.name){
						this.$notify({
							 title: '提示',
							message: '已经导入成功，请勿重复操作！',
							type: 'error',
							offset: 60,
							duration: 2000
						});
						result = true;
					}
				})
				if(result) return true;
				if(!validateFormat(data.name)){
					this.$notify({
						 title: '提示',
						message: '请导入正确格式的文件！',
						type: 'error',
						offset: 60,
						duration: 2000,
					});
					result = true;
				}
				if(result) return true;
				if (data.type.split('/')[0] != 'video') {
					this.$notify.error({
					  type: 'error',
					  title: '提示',
					  message: '请导入视频文件！',
					  offset: 60,
					  duration: 2000
					});
					result = true;
				} 
				return result;
			}
		},
	    mounted(){
			let box = document.getElementById('SongsUploaded');
			    box.ondragover = (e) => e.preventDefault();
				box.ondrop = (e) => {
					e.preventDefault();
			        let files = e.dataTransfer.files;
					for (var i = 0; i < files.length; i++) {
						let item = files[i];
						if(fs.statSync(item.path).isDirectory()){
							this.$notify({
								title: '提示',
								message: '暂不支持文件夹拖拽！',
								type: 'error',
								offset: 60,
								duration: 2000,
							});
						}else{
							this.getName(item)
						}
					}
				}
			Bus.$on("DRfoo", (data) => { //Main导入函数；
				this.getName(data)
			})
		}
	}
</script>

<style scoped="scoped">
	#SongsUploaded{
		height: 100%;
		overflow: auto;
	}
</style>
