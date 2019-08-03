<template>
	<div>
		<!-- <span v-for="item  in arr" :key="item.id">
			<ItemComponent :item="item"/>
		</span> -->
		 <el-table
			:data="arr"
			maxHeight="704"
			style="width: 100%">
			<el-table-column prop="content.name" label="歌曲名称" min-width="80">
				
			</el-table-column>
			<el-table-column prop="content.singer" label="歌手名称" min-width="80">
				
			</el-table-column>
			
			<el-table-column prop="content.format_type" label="格式" min-width="80">
			</el-table-column>
			
			<el-table-column label="上传日期" min-width="60">
				<template slot-scope="scope">
					<span v-if="scope.row.create_date">
						<div> {{scope.row.create_date.split("　")[0]}}</div>
						<div>{{scope.row.create_date.split("　")[1]}}</div>
					</span>
					<span v-else>
						<div> {{scope.row.upload_data.split("　")[0]}}</div>
						<div>{{scope.row.upload_data.split("　")[1]}}</div>
					</span>
				</template>
			</el-table-column>
			
			<el-table-column label="大小" min-width="40">
				<template slot-scope="scope">
					<span>{{(scope.row.precent*scope.row.size) | FileSize }}</span>
					<span>/</span>
					<span>{{ scope.row.size | FileSize }}</span>
				</template>
			</el-table-column>
			
		  </el-table>
	</div>
</template>

<script>
	import Upload from '../../../upload.js'
	import ItemComponent from './components/itemComponent.vue'
	export default{
		components:{
		  	ItemComponent
		},
		filters: {
			FileSize: function(value) {
				return Math.floor(value / 1024 / 1024) > 1024 ? Math.floor(value / 1024 / 1024) / 1024 + "G" : Math.floor(value /
					1024 / 1024) + "M";
			}
		},
		watch: {
			arr: {
				handler(newValue, oldValue) {
					if(newValue.length > 0){
						this.$emit('change', true)
					}else{
						this.$emit('change', false)
					}
				},
				immediate: true,
			}
		},
		data() {
			return {
				arr: Upload.children
			}
		},
		mounted() {
			console.log(this.arr)
		}
	}
</script>

<style>
</style>
