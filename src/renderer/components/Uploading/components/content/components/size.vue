<template>
	<div>
		{{size  | FileSize }}/{{item.size | FileSize}}
	</div>
</template>

<script>
	export default{
		props:{
			item: Object,
		},
		data(){
			return{
				size:0,
			}
		},
		filters:{
			FileSize: function(value) {
				return Math.floor(value / 1024 / 1024) > 1024 ? Math.floor(value / 1024 / 1024) / 1024 + "G" : Math.floor(value /
					1024 / 1024) + "M";
			}
		},
		mounted(){
			this.item.on('size', (e) => {
				console.log(e)
				this.size = e.size;
			})
		}
	}
</script>

<style>
</style>
