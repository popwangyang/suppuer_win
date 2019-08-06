<template>
	<div class="upStateBox">
		<span>
			<Progress  :precent="precent"></Progress>
		</span>
		<span>
			<span>
				<!--  0 暂停； 1 上传中； 2 等待中；3 上传完成；4 上传出错；5删除；6文件读取异常，请重新导入 -->
				<i v-if="upState=='0'">暂停中...</i>
				<i v-if="upState=='1'">{{speed}}</i>
				<i v-if="upState=='0.5'">{{loadText}}</i>
				<i v-if="upState=='2'">等待上传...</i>
				<i v-if="upState=='3'">上传完成</i>
				<i v-if="upState=='4'">上传出错</i>
				<i v-if="upState=='6'" style="color: red;">文件读取异常，请重新导入</i>
			</span>
			<span>
				{{restTime}}
			</span>
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
				restTime: '-- --',
				loadText: "正在连接...",
			}
		},
		mounted(){
			this.item.on('prograss', (e) => {
				this.precent = e.precent;
				this.speed = e.speed;
				this.upState = e.uploadState;
				if(this.upState == 1){
					this.restTime = e.restTime;
				}else{
					this.restTime = "-- --";
				}
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
		display: flex;
		justify-content: space-between;
	}
	.upStateBox>span:nth-child(2) i{
		font-style: normal;
	}
</style>
