<template>
	<div>
		<el-alert
			:title="title"
			type="error"
			show-icon>
		  </el-alert>
	</div>
</template>

<script>
	export default{
		props: {
			num: {
				type: Number,
				default: 0
			},
		},
		computed: {
			title() {
				return `系统检测有歌曲信息缺失, 请完善一下${this.num}首标红歌曲的信息` 
			}
		},
	}
</script>

<style>
</style>
