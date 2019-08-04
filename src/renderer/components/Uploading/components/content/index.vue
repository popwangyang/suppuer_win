<template>
	<div>
	<el-table
    :data="arr"
	@selection-change="handleSelectionChange"
    max-height="704"
    style="width: 100%">
	<el-table-column
      type="selection"
      width="55">
	</el-table-column>
    <el-table-column
      prop="content.name"
      label="歌曲名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="content.singer"
      label="歌手名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="content.format_type"
	  width="140"
      label="格式">
    </el-table-column>
	<el-table-column
	  prop="create_date"
	  width="180"
	  label="上传日期">
	</el-table-column>
	<el-table-column prop="size" label="大小">
		<template slot-scope="scope">
			<Size :item="scope.row" />
		</template>
	</el-table-column>
	<el-table-column prop="size" label="状态">
		<template slot-scope="scope">
			<UpState :item="scope.row" />
		</template>
	</el-table-column>
	<el-table-column  prop="size" label="操作"  width="150">
		<template slot-scope="scope">
			<Event :item="scope.row" />
		</template>
	</el-table-column>
  </el-table>
	</div>
</template>
<script>
	import Upload from '../../../upload.js'
	import Size from './components/size'
	import UpState from './components/upState'
	import Event from './components/event'
	import config from '../../../../config'
	export default{
		components:{
			Size,
			UpState,
			Event,
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
				arr: Upload.children,
			}
		},
		methods:{
			handleSelectionChange(val){
			  	
			},
		},
		mounted() {
			console.log(this.arr)
		}
	}
</script>

<style>
</style>
