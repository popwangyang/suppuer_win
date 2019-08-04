<template>
	<div>
		<!--  0 暂停； 1 上传中； 2 等待中；3 上传完成；4 上传出错；5删除； -->
		<i class="el-icon-caret-right" v-if="upState=='0'" @click="uploadBtn"></i>
		<i class="el-icon-loading" v-if="upState == '0.5'"></i> 
		<i class="iconfont icon-xiazaizanting"  v-if="upState=='1'" @click="uploadBtn"></i>
		<i class="el-icon-caret-right"  v-if="upState=='2'" @click="uploadBtn"></i>
		<i class="el-icon-refresh"  v-if="upState=='3'" @click="uploadBtn"></i>
		<i class="el-icon-sort"  v-if="upState=='4'"></i>
		<i class="el-icon-refresh"  v-if="upState=='5'"></i>
		<i class="el-icon-caret-right" v-if="upState=='6'"></i>
		<i class="el-icon-delete" style="margin-left: 10px;" v-if="upState != '0.5'"  @click="uploadDelect"></i>
		{{upState}}
	</div>
</template>

<script>
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
			uploadDelect(){
				
			},
			uploadBtn(){
				switch(this.upState){
					case 1:
					  this.item.stopUpload();
					break;
					case 0:
					  this.item.startUpload();
					break;
				}
			}
		},
		mounted() {
			this.item.on('operation', (e) => {
				console.log(e, 'operation')
				this.upState = e.uploadState;
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
