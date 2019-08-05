<template>
	<div class="box">
		<span class="item" v-for="title in titles" :key="title.key" :style="{width: title.width+'%'}">
			<span v-if="title.name == ''">checkbox</span>
			<span v-if="title.key == 'create_date'">{{item.create_date}}</span>
			<span v-if="title.key == 'size'">
				<Size :item="item" />
			</span>
			<span v-if="title.key == 'statue'">
				<UpState :item="item"/>
			</span>
			<span v-if="title.key == 'operation'">
				<Event :item="item" v-on="$listeners" v-bind="$attrs"/>
			</span>
			<span v-else>
				{{item.content[title.key]}}
			</span>
		</span>
	</div>
</template>

<script>
	import UpState from './upState'
	import Event from './event'
	import Size from './size'
	export default{
		components:{
			Size,
			UpState,
			Event,
		},
		props: {
			item: {
				type: Object
			},
			titles: {
				type: Array,
			},
		},
		data(){
			return{
				size:0,  // 文件上传大小
				precent: 0, // 文件上传进度
				speed: '----', // 文件上传速度
				upState: 0.5,  // 文件上传状态
			}
		},
		method:{
			
		},
		mounted(){}
	}
</script>

<style  scoped="scoped">
	.box{
		border-bottom: 1px solid #ebeef5;
		white-space: normal;
		word-break: break-all;
		line-height: 23px;
		font-size: 14px;
        color: #606266;
		padding: 10px 0;
		transition: all 0.2s;
		display: flex;
		align-items: center;
	}
	.box:hover{
		background: #f5f7fa;
	}
	.item{
		display: inline-block;
		text-align: center;
		height: 100%;
		
	}
</style>
