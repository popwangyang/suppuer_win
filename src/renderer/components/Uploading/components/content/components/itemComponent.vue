<template>
	<div>
		{{precent}}
		{{speed}}
	</div>
</template>

<script>
	export default{
		props:{
			item: Object
		},
		data(){
			return{
				precent: 0,
				speed: 0,
			}
		},
		methods:{
			
		},
		mounted() {
			console.log("ppppppp")
			this.item.on('prograss', (e) => {
				console.log(e)
				this.precent = e.precent;
				this.speed = e.speed;
			})
		}
	}
</script>

<style>
</style>
