<template>
	<div class="upBodyBox">
	  <div class="title">
		  <TableTitle :titles="titles" @change='handleCheckAllChange' :isIndeterminate="flage" ref="title"/>
	  </div>
	  <div class="body">
		  <span v-for="item in arr " :key="item.id">
			  <TableBody :titles="titles" :item="item" @change="getList">
				  <el-checkbox v-model="item.isSelect" @change="handleCheckChange"/>
			  </TableBody>
		  </span>
	  </div>
	</div>
</template>
<script>
	import Upload from '../../../upload.js'
	import Size from './components/size'
	import TableBody from './components/tableBody'
	import TableTitle from './components/tableTitle'
	import UpState from './components/upState'
	import Event from './components/event'
	import config from '../../../../config'
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
			getList(){
				this.arr = Upload.children.filter(item => {
					return item.getUploadState() != 5;
				})
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
			}
		},
		mounted() {
			
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
