<template>
	<div class="upStateBox">
		<span>
			<Progress  :precent="precent"></Progress>
		</span>
		<span>
			<i v-if="upState=='0'">已暂停</i>
			<i v-if="upState=='1'">{{speed}}</i>
			<i v-if="upState=='0.5'">正在连接</i>
			<i v-if="upState=='2'">正在等待上传</i>
			<i v-if="upState=='3'">上传完成</i>
			<i v-if="upState=='5'"style="color: red;">网络断开</i>
			<i v-if="upState=='7'">替换中...</i>
			<i v-if="upState=='9'" style="color: red;">文件读取异常，请重新导入</i>
		</span>
	</div>
</template>

<script>
	import Progress from './progress'
	export default{
		props:{
			item: Object,
		},
		components: {
			Progress
		},
		data(){
			return{
				precent:20,
				speed: '',
				upState: 0.5,
				deleteFlage: true,
			}
		},
		mounted(){
			this.item.on('prograss', (e) => {
				this.precent = e.precent;
				this.speed = e.speed;
				this.upState = e.uploadState;
				if(this.upState == 5){
					this.$emit('change')
				}
			})
		}
	}
</script>

<style scoped="scoped">
	.upStateBox{
		height: 40px;
		/* background: yellow; */
	}
	.upStateBox> span{
		display: block;
		width: 100%;
		height: 20px;
		line-height: 20px;
	}
	.upStateBox>span:nth-child(1){
		/* background: beige; */
	}
	.upStateBox>span:nth-child(2){
		/* background: honeydew; */
		font-size: 14px;
		text-align: left;
	}
	.upStateBox>span:nth-child(2) i{
		font-style: normal;
	}
</style>
