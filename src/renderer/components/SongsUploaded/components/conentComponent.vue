<template>
	<div>
		<el-table
				:data="data"
				max-height="704"
				@selection-change="handleSelectionChange"
				style="width: 100%">
				<el-table-column type="selection" width="55">
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
						<i class="el-icon-upload uploadIcon" @click="uploadFile(scope.row.id)"
						 v-if="scope.row.content.status == 0"></i>
						<i class="el-icon-upload uploadIcon" 
						 v-if="scope.row.content.status == 1"></i>
						<i class="el-icon-upload uploadIcon uploadIcon-not-allowed" 
						 v-if="scope.row.content.status == 2"></i>
						<i class="el-icon-upload uploadIcon" @click="uploadFile(scope.row.id)"
						 v-if="scope.row.content.status == 3"></i>
						<i class="el-icon-edit-outline uploadIcon" @click="JumpPage(scope.row.id)"></i>
						<i class="el-icon-delete uploadIcon" @click="deleteFile(scope.row.id)"></i>
					</template>
				</el-table-column>
		</el-table>
		
		<!-- 删除提示弹框 -->
		<el-dialog title="提示" :visible.sync="delecteVisible" custom-class="DELECT" width="30%" top='30vh'>
			<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>{{deldecteFileTxt}}, 是否继续?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delecteVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="delecteBtn" size="mini">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Bus from '../../bus.js'
	export default{
		data(){
			return{
				delecteVisible: false,
				deldecteFileIDS: [], // 需要删除的列表集合。
				multipleSelection: [], // table中多选的集合
				deldecteFileTxt: '此操作将删除该文件', 
			}
		},
		computed: {
			data() {
				return this.$store.state.SongUpload.songNumbers 
			}
		},
		watch: {
			multipleSelection(newValue, oldValue) {
				console.log(newValue)
				if (newValue.length > 0) {
					Bus.$emit('val2', "1")
				} else {
					Bus.$emit('val2', "0")
				}
			}
		},
		methods: {
			uploadFile(id){
				this.$store.commit("uploadSong", [id])
			},
			JumpPage(id){
				this.$router.push({
					path: "/editPage",
					query: {
						fileID: id,
						"page": "SU"
					}
				})
			},
			deleteFile(id){
				this.deldecteFileIDS = [id]
				this.delecteVisible = true
			},
			delecteBtn(){
				this.multipleSelection = [];
				this.$store.commit('deleteSong', this.deldecteFileIDS);
				this.delecteVisible = false;
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			}
		},
		mounted(){
			Bus.$on("UploadFileOK2", () => {
				let ids = this.multipleSelection.reduce((cur, next) => {
					cur.push(next.id);
					return cur;
				}, [])
				this.$store.commit("uploadSong", ids)
				this.multipleSelection = [];
			})
			Bus.$on("delected2", () => {
				this.deldecteFileIDS = this.multipleSelection.reduce((cur, next) => {
					cur.push(next.id);
					return cur;
				}, []);
				this.deldecteFileTxt = '此操作将删除选中文件';
				this.delecteVisible = true;
			})
		},
		beforeDestroy() {
			Bus.$off('delected2')
			Bus.$emit('val2', "0")
		}
	}
</script>

<style scoped="scoped">
	.uploadIcon{
		font-size: 20px;
		cursor: pointer;
		margin: 0px 5px;
	}
	.uploadIcon-not-allowed{
		cursor: not-allowed;
		color: #d4d4d4;
	}
</style>

