<template>
	<el-dialog title="提示" :visible.sync="moveRepeatVisible" width="90%">
				<span style="color: #909399;margin-bottom: 20px;display: block;text-align: left;">
					检测到以下信息存在重复（如需替换请选择需替换的歌曲）
				</span>
				<span style="border: 1px solid #ebeef5;display: block;position: relative;">
					<el-table :data="tableData" :row-class-name="tableRowClassName" max-height="300" style="width: 100%">
						<el-table-column prop="id" label="编号" :width="110">
							<template slot-scope="scope">
								<span v-if="scope.row.status ==3 " style="display: block;position: relative;">
									<span style="
										display:inline-block;
										margin-right: 0px;
										background: #e6a23c;
										width: 40px;
										border-radius: 0,50%,50%,0;
										border-top-right-radius: 10px;
										border-bottom-right-radius: 10px;">
										新
									</span>
								</span>
								<span v-else>
									{{scope.row.music_code}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="歌曲名称">
						</el-table-column>
						<el-table-column prop="singer" label="歌手名称">
						</el-table-column>
						<el-table-column prop="singer_type" label="歌手类型">
							<template slot-scope="scope">
								<span v-if="scope.row.singer_type =='0'">
									男歌手
								</span>
								<span v-if="scope.row.singer_type =='1'">
									女歌手
								</span>
								<span v-if="scope.row.singer_type =='2'">
									组合
								</span>
								<span v-if="scope.row.singer_type =='3'">
									合唱
								</span>
								<span v-if="scope.row.singer_type =='4'" style="color: red;">
									缺失
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="language" min-width="60" label="语言">
							<template slot-scope="scope">
								<span v-if="scope.row.language =='0'">
									国语
								</span>
								<span v-else-if="scope.row.language =='1'">
									粤语
								</span>
								<span v-else-if="scope.row.language =='2'">
									闽南语
								</span>
								<span v-else-if="scope.row.language =='3'">
									英语
								</span>
								<span v-else-if="scope.row.language =='4'">
									日语
								</span>
								<span v-else-if="scope.row.language =='5'">
									韩语
								</span>
								<span v-else-if="scope.row.language =='6'">
									其他
								</span>
								<span v-else-if="scope.row.language ==null" style="color: red;">
									缺失
								</span>
								<span v-else>
									{{scope.row.language}}
								</span>
	
							</template>
						</el-table-column>
						<el-table-column prop="picture" min-width="50" label="画面">
							<template slot-scope="scope">
								<span v-if="scope.row.picture =='0'">
									原版MV
								</span>
								<span v-else-if="scope.row.picture =='1'">
									LIVE
								</span>
								<span v-else-if="scope.row.picture =='2'">
									舞曲
								</span>
								<span v-else-if="scope.row.picture =='3'">
									配置画面
								</span>
								<span v-else-if="scope.row.picture =='4'">
									MTV
								</span>
								<span v-else-if="scope.row.picture ==null" style="color: red;">
									缺失
								</span>
								<span v-else>
									{{scope.row.picture}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="area" min-width="60" label="地区">
							<template slot-scope="scope">
								<span v-if="scope.row.area =='0'">
									大陆
								</span>
								<span v-else-if="scope.row.area =='1'">
									港台
								</span>
								<span v-else-if="scope.row.area =='2'">
									日韩
								</span>
								<span v-else-if="scope.row.area =='3'">
									欧美
								</span>
								<span v-else-if="scope.row.area =='4'">
									其他
								</span>
								<span v-else-if="scope.row.area ==null" style="color: red;">
									缺失
								</span>
								<span v-else>
									{{scope.row.area}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="format_type" min-width="60" label="格式">
							<template slot-scope="scope">
								<span v-if="scope.row.format_type =='0'">
									高清
								</span>
								<span v-else-if="scope.row.format_type =='1'">
									DVD
								</span>
								<span v-else-if="scope.row.format_type =='2'">
									MP4
								</span>
								<span v-else-if="scope.row.format_type =='4'">
									MKV
								</span>
								<span v-else-if="scope.row.format_type =='3'">
									其他
								</span>
								<span v-else-if="scope.row.format_type ==null" style="color: red;">
									缺失
								</span>
								<span v-else>
									{{scope.row.format_type}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="voice_type" label="声音版本">
							<template slot-scope="scope">
								<span v-if="scope.row.voice_type =='0'">
									消音
								</span>
								<span v-else-if="scope.row.voice_type =='1'">
									原版伴奏
								</span>
								<span v-else-if="scope.row.voice_type =='2'">
									演唱会
								</span>
								<span v-else-if="scope.row.voice_type =='3'">
									remix
								</span>
								<span v-else-if="scope.row.voice_type =='4'" style="color: red;">
									缺失
								</span>
								<span v-else>
									{{scope.row.voice_type}}
								</span>
							</template>
						</el-table-column>
						<el-table-column label="原唱声轨" min-width="80">
							<template slot-scope="scope">
									<span v-if=" scope.row.voice_track =='0'">
										第1声轨
									</span>
									<span v-else-if=" scope.row.voice_track =='1'">
										第2声轨
									</span>
									<span v-else-if=" scope.row.voice_track =='2'">
										左声道
									</span>
									<span v-else-if=" scope.row.voice_track =='3'">
										右声道
									</span>
									<span v-else-if="scope.row.voice_track ==null" style="color: red;">
										缺失
									</span>
									<span v-else style="color: red;">
										缺失
									</span>
							</template>
						</el-table-column>
						<el-table-column label="伴唱声轨" min-width="80">
							<template slot-scope="scope">
									<span v-if="scope.row.vocal_track =='0'">
										第1声轨
									</span>
									<span v-else-if="scope.row.vocal_track =='1'">
										第2声轨
									</span>
									<span v-else-if="scope.row.vocal_track =='2'">
										左声道
									</span>
									<span v-else-if="scope.row.vocal_track =='3'">
										右声道
									</span>
									<span v-else-if="scope.row.vocal_track ==null" style="color: red;">
										缺失
									</span>
									<span v-else style="color: red;">
										缺失
									</span>
							</template>
						</el-table-column>
						<el-table-column label="上传时间" min-width="80">
							<template slot-scope="scope">
								<span v-if="scope.row.upload_data">
									{{scope.row.upload_data}}
								</span>
								<span v-else>
									{{scope.row.upload_time}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="album.name" label="专辑名称">
							<template slot-scope="scope">
								<span v-if="scope.row.album ==null">
									无
								</span>
								<span v-if="scope.row.album !=null">
									{{scope.row.album.name}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="company" label="唱片公司">
							<template slot-scope="scope">
								<span v-if="scope.row.company ==null">
									无
								</span>
								<span v-if="scope.row.company !=null">
									{{scope.row.company.name}}
								</span>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="xinZheng" v-if="scope.row.status == 3" style="font-size: 12px;">新增</el-button>
								<span v-else-if="scope.row.user_id == user_id">
									<el-button type="text" @click="tihuan(scope.row.id)" style="font-size: 12px;">替换</el-button>
								</span>
								<span v-else>
									<el-button type="text" :disabled="true" style="font-size: 12px;">替换</el-button>
								</span>
							</template>
						</el-table-column>
					</el-table>
				</span>
			</el-dialog>
</template>

<script>
	export default{
		props: {
			tableData: Array,
		},
		data() {
			return {
				moveRepeatVisible: false,
				user_id : localStorage.getItem("user_id"),
			}
		},
		methods: {
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 0) {
					return 'new-row';
				}
				return '';
			},
			xinZheng(){
				this.$emit('change')
			},
			tihuan(id){
				this.$emit('change', id)
			}
		},
	}
</script>

<style>
</style>
