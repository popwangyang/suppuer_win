<template>
	<div class="page">
		<Content v-if="flage" @change="change"/>
		<Empty v-else/>
	</div>
</template>

<script>
	import Content from './components/content/index.vue'
	import Empty from './components/empty'
	export default{
		components: {
			Empty,
			Content
		},
		data(){
			return{
				flage: true
			}
		},
		methods:{
			change(flage){
				this.flage = flage;
			}
		}
	}
</script>

<style scoped="scoped">
	.page{
		width: 100%;
		height: 100%;
	}
</style>
