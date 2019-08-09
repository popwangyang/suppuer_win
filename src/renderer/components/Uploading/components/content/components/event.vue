<template>
	<div>
		<!--  0 暂停； 1 上传中； 2 等待中；3 上传完成；4 上传出错；5删除； -->
		<i class="el-icon-caret-right" v-if="upState=='0'" title="开始上传" @click="uploadBtn"></i>
		<i class="el-icon-loading" v-if="upState == '0.5'"></i> 
		<i class="iconfont icon-zanting" title="暂停上传"  v-if="upState=='1'" @click="uploadBtn"></i>
		<i class="el-icon-sort"  v-if="upState=='2'"  @click="uploadBtn"></i>
		<!-- <i class="el-icon-refresh"  v-if="upState=='3'" title="重新上传" @click="uploadBtn"></i> -->
		<i class="el-icon-refresh"  v-if="upState=='4'" title="重新上传" @click="uploadBtn"></i>
		<i class="el-icon-close" title="删除"  v-if="upState != '0.5'"  @click="uploadDelect"></i>
		<i class="iconfont icon-icon--" title="打开文件" v-if="upState != '0.5' && upState != '6'"  @click="openFileHandler"></i>
	</div>
</template>

<script>
	import { removeStoreDB } from '../../../../util'
	const ipcRenderer = require("electron").ipcRenderer;
	export default{
		props:{
			item: Object,
		},
		data(){
			return{
				upState:0.5,
			}
		},
		methods:{
			openFileHandler(url) {
			  const { shell } = require("electron").remote;
			  shell.showItemInFolder(this.item.file.path);
			},
			uploadDelect(){
				removeStoreDB(this, [this.item.id]).then(res => {
					this.item.deleteUpload()
				})
			},
			uploadBtn(){
				console.log(this.upState)
				switch(this.upState){
					case 0:
					  this.item.startUpload();
					break;
					case 1:
					  this.item.stopUpload();
					break;
					case 2:
					   this.item.stopUpload();
					break;
					case 3:
					  this.item.refreshUpload();
					break;
					case 4:
					  this.item.refreshUpload();
					break;
				}
			}
		},
		mounted() {
			this.item.on('operation', (e) => {
				this.upState = e.uploadState;
				if(this.upState == 5 || this.upState == 3){
					this.$emit('change')
				}
			})
		}
	}
</script>

<style scoped="scoped">
	i{
		cursor: pointer;
		font-size: 24px;
	}
</style>
