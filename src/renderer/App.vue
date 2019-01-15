<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import { post } from './components/api.js'
  export default {
    name: 'supplier_winin',
		methods: {
			tokenUpdate() {
				var token  = localStorage.getItem('token');
				if(token){
					var send_data = {
						   "token":token
					}
					post("music/api-token-refresh/",send_data).then(function(res){
						console.log(res.data.token)
								localStorage.setItem("token",res.data.token)						
					})
				}			
			}
		},
		mounted(){
			var _this = this;
			setInterval(function(){
				  _this.tokenUpdate()
			},10*60*1000)		
		}
  }
</script>

<style>
  /* CSS */

</style>
