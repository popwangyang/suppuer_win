<template>
	<el-table
		:data="data"
		height="250"
		border
		style="width: 100%">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column label="编号" min-width="50">
			<template slot-scope="scope">{{ scope.row.id }}</template>
		</el-table-column>
		<el-table-column prop="content.name" label="歌曲名称" min-width="100">
			<template slot-scope="scope">
				<span v-if="scope.row.content.name == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.name}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.singer" label="歌手名称" min-width="100">
			<template slot-scope="scope">
				<span v-if="scope.row.content.singer == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.singer}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.singer_type" label="歌手类型" min-width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.content.singer_type == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.singer_type}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.language" label="语言" min-width="60">
			<template slot-scope="scope">
				<span v-if="scope.row.content.language == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.language}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.picture" label="画面" min-width="70">
			<template slot-scope="scope">
				<span v-if="scope.row.content.picture == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.picture}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.area" label="地区" min-width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.content.area == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.area}}</span>
		
			</template>
		</el-table-column>
		<el-table-column prop="content.format_type" label="格式" min-width="60">
			<template slot-scope="scope">
				<span v-if="scope.row.content.format_type == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.format_type}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="content.picture" label="声音版本" min-width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.content.voice_type == null" style="color: red;">缺失</span>
				<span v-else>{{scope.row.content.voice_type}}</span>
			</template>
		</el-table-column>
		<el-table-column label="原唱声轨" min-width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.content.voice_track =='1'">
					第1声轨
				</span>
				<span v-if="scope.row.content.voice_track =='2'">
					第2声轨
				</span>
				<span v-if="scope.row.content.voice_track =='左'">
					左声道
				</span>
				<span v-if="scope.row.content.voice_track =='右'">
					右声道
				</span>
				<span v-if="scope.row.content.voice_track ==null" style="color: red;">
					缺失
				</span>
				<span v-if="scope.row.content.voice_track !='1'&&scope.row.content.voice_track !='2'&&scope.row.content.voice_track !='左'&&scope.row.content.voice_track !='右'&&scope.row.content.voice_track !=null">
					{{scope.row.content.voice_track}}
				</span>
			</template>
		</el-table-column>
		<el-table-column label="伴唱声轨" min-width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.content.vocal_track =='1'">
					第1声轨
				</span>
				<span v-if="scope.row.content.vocal_track =='2'">
					第2声轨
				</span>
				<span v-if="scope.row.content.vocal_track =='左'">
					左声道
				</span>
				<span v-if="scope.row.content.vocal_track =='右'">
					右声道
				</span>
				<span v-if="scope.row.content.vocal_track ==null" style="color: red;">
					缺失
				</span>
				<span v-if="scope.row.content.vocal_track !='1'&&scope.row.content.vocal_track !='2'&&scope.row.content.vocal_track !='左'&&scope.row.content.vocal_track !='右'&&scope.row.content.vocal_track !=null">
					{{scope.row.content.vocal_track}}
				</span>
			</template>
		</el-table-column>
		<el-table-column label="上传时间" min-width="80">
			<template slot-scope="scope">
				<div> {{scope.row.upload_data.split("　")[0]}}</div>
				<div>{{scope.row.upload_data.split("　")[1]}}</div>
			</template>
		</el-table-column>
		<el-table-column prop="content.songeState" label="状态" min-width="70">
			<template slot-scope="scope">
				<span v-if="scope.row.content.status ==0">
					可上传
				</span>
				<span v-if="scope.row.content.status ==1">
					缺失字段
				</span>
				<span v-if="scope.row.content.status ==2">
					需要完善
				</span>
				<span v-if="scope.row.content.status ==3">
					重复
				</span>
			</template>
		</el-table-column>
		<el-table-column prop="address" label="操作" min-width="130">
			<template slot-scope="scope">
				<i class="el-icon-upload" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="uploadFile(scope.row.id)"
				 v-if="scope.row.content.status == 0"></i>
				<i class="el-icon-upload" style="font-size: 20px; cursor: pointer; margin: 0px 5px;cursor: not-allowed;color: #d4d4d4;"
				 v-if="scope.row.content.status == 1"></i>
				<i class="el-icon-upload" style="font-size: 20px; cursor: pointer; margin: 0px 5px;cursor: not-allowed;color: #d4d4d4;"
				 v-if="scope.row.content.status == 2"></i>
				<i class="el-icon-upload" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="uploadFile(scope.row.id)"
				 v-if="scope.row.content.status == 3"></i>
				<i class="el-icon-edit-outline" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="JumpPage(scope.row.id)"></i>
				<i class="el-icon-delete" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="deleteFile(scope.row.id)"></i>
			</template>
		</el-table-column>
  </el-table>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		computed: {
			data() {
				return this.$store.state.SongUplod.songNumbers 
			}
		},
	}
</script>

<style>
	
</style>

