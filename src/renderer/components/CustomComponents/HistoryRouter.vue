<template>
	
	<el-breadcrumb separator-class="el-icon-arrow-right">
		 <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
		   <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>
		  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
		  <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
		  <el-breadcrumb-item :to='{path:item.route}' v-for='(item, index) in arr' :key="index">{{item.name}}</el-breadcrumb-item>
   </el-breadcrumb>
</template>
<script>
	export default{
		data(){
			return{
				arr:[]
			}
		},
		props:{
			
		},
		methods:{
			foo(str){
				var arr = str.split('/')
				  arr.shift()
				// console.log(arr)
				var arr1 = []	
				// console.log(arr[0])
				if(arr[0]!="Refresh"){
					this.$emit('add-parent-total',arr[0])
				}
				
				arr.map(function(item){
					var obj = {}
					switch(item){
						case 'LibraryManagement':
						  obj.name ="曲库管理"
						  obj.route = '/LibraryManagement'
						  break;
						case 'CustomManagement':
						  obj.name ="定制管理"
						  obj.route = '/CustomManagement'
						  break;
						case 'SongsUploaded':
						  obj.name ="歌曲上传"
						  obj.route = '/SongsUploaded'
						  break;
						case 'Uploading':
						  obj.name ="正在上传"
						  obj.route = '/Uploading'
						  break;
						case 'VideoPlayback':
						  obj.name ="视频播放"
						  obj.route = '/LibraryManagement/VideoPlayback'
						break;
					}
					arr1.push(obj)
				})
				
				this.arr = arr1
			},
			goo(href){
				// console.log(this.$store.state.Router.flage,this.$store.state.Router.currentIndex,this.$store.state.Router.historyRoute)
				if(this.$store.state.Router.flage){
					// console.log(this.$store.state.Router.currentIndex,this.$store.state.Router.historyRoute.length)
					if(this.$store.state.Router.currentIndex == this.$store.state.Router.historyRoute.length-1){
						
					   this.$store.commit("RouteFoo",href)				
					
					}else{
						this.$store.commit("RouteGoo",href)
					}
				}
				this.$store.commit("RouterFlageDK")
				// console.log(this.$store.state.Router.historyRoute,this.$store.state.Router.currentIndex)
			}
		},
		watch: {
	        $route (newVal,oldVal) {
	           var lists = this.$route.path.split('/')
	           var href = this.$route.path
	            // console.log(newVal,oldVal)
	            this.foo(href)
							if(newVal.name !== "Refresh"  && oldVal.name !== "Refresh" && newVal.name !== "404"&& oldVal.name !== "404"){
								
								this.goo(href)							
							}
	          }
        },
        created: function () {
		        var lists = this.$route.path.split('/')
		        var href = this.$route.path
		        
		        this.foo(href)
        }
		
	}
</script>

<style>
</style>