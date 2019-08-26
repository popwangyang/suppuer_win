<template>
	<div>
		<el-progress :stroke-width="2" :percentage="replacePercentage"></el-progress>
	</div>
</template>
<script>
	export default {
		props: ["file"],
		data() {
			return {
				replacePercentage: 0,
				flag: true
			}
		},
		methods: {
			start() {
				var _this = this;
				this.file.on('prograss', (event) => {
					this.replacePercentage = event.precent;
					if (event.precent == 100 && this.flag) {
						this.flag = false;
						this.$emit("onSuccess")
					}
				})
				this.file.on('error', function(error) {
					_this.$emit("onError")
				})				
				this.file.startUpload();
			},
			cancleUpload() {
				this.file.stopUpload();
			}
		},
		mounted() {}
	}
</script>
<style>

</style>
