<template>
	<div>
		<el-progress :stroke-width="2" :percentage="replacePercentage"></el-progress>
		<!--	<el-button @click="start">按钮</el-button>-->
	</div>
</template>
<script>
	import {
		post,
		baseUrl,
		get
	} from '../api'


	
	export default {
		props: ["file"],
		data() {
			return {
				replacePercentage: 0,
				
				
			}
		},
		methods: {
			start() {
				
				var _this = this;
				this.file.on('prograss', function(event) {
                
					_this.replacePercentage = event.precent;
					if (event.displayFlage) {
						_this.$emit("onSuccess")
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
		mounted() {




		}
	}
</script>
<style>

</style>
