<template>
	<div class="upBodyBox">
	  <div class="title">
		  <TableTitle :titles="titles"/>
	  </div>
	  <div class="body">
		  <span v-for="item in arr " :key="item.id">
			  <TableBody :titles="titles" :item="item" @change="getList"/>
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
			}
		},
		methods:{
			getList(){
				let srr = []
				this.arr = Upload.children.filter(item => {
					return item.getUploadState() != 5;
				})
				this.arr.map(item => {
					console.log(item.getUploadState(), item.id)
				})
				console.log(this.arr)
			}
		},
		mounted() {
			console.log(this.arr)
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
