<template>
	<div class="progressBox" :style="{height: height + 'px'}">
		<span class="inner" :style="{width: precent+ '%', height: height + 'px'}"></span>
	</div>
</template>

<script>
	export default{
		props: {
			precent: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 16,
			}
		},
	}
</script>

<style scoped="scoped">
	.progressBox{
		width: 100%;
		background: #ebeef5;
		position: relative;
	}
	.inner{
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: #409EFF;
	}
</style>
