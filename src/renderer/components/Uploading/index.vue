<template>
	<div>
		<Content v-if="flage"/>
		<Empty v-else/>
	</div>
</template>

<script>
	import Content from './components/content'
	import Empty from './components/empty'
	export default{
		components: {
			Empty,
			Content
		},
		data(){
			return{
				
			}
		},
		computed: {
			flage() {
				console.log(this.$store.state.SongUpload.Upload.children)
				return this.$store.state.SongUpload.Upload.children.length > 0 ? true:false;
			}
		},
	}
</script>

<style scoped="scoped">
</style>
