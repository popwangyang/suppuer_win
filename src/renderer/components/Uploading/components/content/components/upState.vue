<template>
	<div>
		<div v-if="upState=='0'">
			<i>已暂停</i>
		</div>
		<div v-if="upState=='0.5'">
			<i>正在连接</i>
		</div>
		<div v-if="upState=='1'">
			<el-progress :percentage="precent"  :text-inside="true"></el-progress>
			{{speed}}
		</div>
		<div v-if="upState=='2'">>
			<el-progress :percentage="precent"  :text-inside="true"></el-progress>
		</div>
		<div v-if="upState=='3'">
			<i style="color: red;">上传失败,请重新上传!</i>
		</div>
		<div v-if="upState=='4'">
			<i>正在等待上传</i>
		</div>
		<div v-if="upState=='5'">
			<i style="color: red;">网络断开</i>
		</div>
		<div v-if="upState=='6'">
			<i>替换中...</i>
		</div>
		<div v-if="upState=='7'">
			
		</div>
		<div v-if="upState=='8'">
			<i>上传完成</i>
		</div>
		<div v-if="upState=='9'">
			<i style="color: red;">文件读取异常，请重新导入</i>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			item: Object,
		},
		data(){
			return{
				precent:0,
				speed: '',
				upState: 0.5,
			}
		},
		mounted(){
			this.item.on('prograss', (e) => {
				this.precent = e.precent;
				this.speed = e.speed;
				this.upState = e.uploadState;
			})
		}
	}
</script>

<style>
</style>
