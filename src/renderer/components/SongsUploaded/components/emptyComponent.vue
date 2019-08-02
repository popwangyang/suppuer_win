<template>
	<div class="box">
		<div class="content">
			<i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			<i style="margin: 10px 0;">暂无导入的歌曲</i>
			<span class="fileinput-button">
				<el-button type="primary" style="width: 150px;" size="mini"><i style="padding: 0 20px;">导入</i></el-button>
				<input type="file" ref="file" @change="change" />
			</span>
			<i style="margin: 10px 0;">或将文件直接拖入框中</i>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			change(e) {
				this.$emit('change', this.$refs.file.files[0])
				this.$refs.file.value = ""
			}
		},
	}
</script>

<style scoped="scoped">
	.box{
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.box i{
		font-style: normal;
	}
	.box .content{
		display: flex;
		flex-direction: column;
	}
	.content .fileinput-button {
		position: relative;
		display: inline-block;
		overflow: hidden;
	}
	
	.content .fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		height: 28px;
		cursor: pointer;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
	}
</style>