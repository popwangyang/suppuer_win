<template>
	<div class="upBodyBox">
	  <div class="title">
		  <TableTitle :titles="titles" @change='handleCheckAllChange' :isIndeterminate="flage" ref="title"/>
	  </div>
	  <div class="body" id="scroll-1">
		  <span v-for="item in arr " :key="item.id">
			  <TableBody :titles="titles" :item="item" @change="getList">
				  <el-checkbox v-model="item.isSelect" @change="handleCheckChange"/>
			  </TableBody>
		  </span>
	  </div>
	</div>
</template>
<script>
	import Bus from '../../../bus.js'
	import Upload from '../../../upload.js'
	import Size from './components/size'
	import TableBody from './components/tableBody'
	import TableTitle from './components/tableTitle'
	import UpState from './components/upState'
	import Event from './components/event'
	import config from '../../../../config'
	import { removeStoreDB } from '../../../util'
	export default{
		components:{
			TableBody,
			TableTitle,
			Size,
			UpState,
			Event,
		},
		watch: {
			arr: {
				handler(newValue, oldValue) {
					if(newValue.length > 0){
						this.$emit('change', true)
					}else{
						this.$emit('change', false)
					}
					this.setUploadNum();
				},
				immediate: true,
			}
		},
		data() {
			return {
				arr: Upload.children,
				titles: config.titles,
				flage: false,
				checkAll: true,
				selectArr: []
			}
		},
		methods:{
			setUploadNum(){
			    let num = this.arr.reduce((cur, next) => {
					if(next.getUploadState() == 1 || next.getUploadState() == 2){
						cur++;
					}
				    return cur;
				}, 0)
				this.$store.commit('setUplaodNum', num);
			},
			getList(){
				this.arr = Upload.children.filter(item => {
					return item.getUploadState() != 5;
				})
				this.handleCheckChange()  // 每次处理完去除被删除的选项执行。
			},
			handleCheckAllChange(e){
				this.arr.map(item => {
					item.isSelect = e;
				})
				this.handleCheckChange()
			},
			handleCheckChange(){
				this.selectArr = this.arr.filter(item => {
					return (item.isSelect);
				})
				if(this.selectArr.length == this.arr.length || this.selectArr.length == 0){
					this.flage = false
				}else{
					this.flage = true
				}
				if(this.selectArr.length == this.arr.length){
					this.$refs.title.checkAll = true;
				}else{
					this.$refs.title.checkAll = false;
				}
				if(this.selectArr.length > 0){
					Bus.$emit('val3', "1")
				}else{
					Bus.$emit('val3', "0")
				}
			},
			stopUpload(arr){
				arr.map(item => {
					if(item.getUploadState() == 1 || item.getUploadState() == 2){
						item.stopUpload()
					}
				})
			},
			startUpload(arr){
				arr.map(item => {
					if(item.getUploadState() == 0){
						item.startUpload()
					}
				})
			},
			deleteUpload(arr){
				arr.map(item => {
					item.deleteUpload()
				})
			}
		},
		mounted() {
			Bus.$on('StopUpload', () => {
				if(this.selectArr.length > 0){
					this.stopUpload(this.selectArr)
				}else{
					this.stopUpload(this.arr)
				}
			})
			Bus.$on("StartUpload",() => {
				if(this.selectArr.length > 0){
					this.startUpload(this.selectArr)
				}else{
					this.startUpload(this.arr)
				}
			})
			Bus.$on("DelectUpload",() => {
				let result = [];
				if(this.selectArr.length > 0){
					result = this.selectArr;
				}else{
					result = this.arr;
				}
				let ids = result.reduce((cur, next) => {
					cur.push(next.id)
					return cur;
				}, []);
				removeStoreDB(this, ids).then(res => {
					this.deleteUpload(result)
				})
			})
			Bus.$on("exitLogin", () => {
				// console.log('exitLogin')
			})
		},
		beforeDestroy(){
			Bus.$off("StopUpload");
			Bus.$off("StartUpload");
			Bus.$off("DelectUpload");
			Bus.$off("exitLogin");
		}
	}
</script>

<style scoped="scoped">
	.upBodyBox{
		width: 100%;
		height: 100%;
	}
	.upBodyBox .title{
		height: 46px;
	}
	.upBodyBox .body{
		height: 705px;
		overflow: auto;
	}
</style>
