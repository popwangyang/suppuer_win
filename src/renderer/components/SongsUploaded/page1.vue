<template>
	<div id="SongsUploaded" :class="{ff:flage,gg:!flage}">
		<div class="box" v-show="flage">
			<i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			<i style="margin: 10px 0;">暂无导入的歌曲</i>
			<span class="fileinput-button">
				<el-button type="primary" style="width: 150px;" size="mini"><i style="padding: 0 20px;">导入</i></el-button>
				<input type="file" ref="file" @change="foo" />
			</span>
			<i style="margin: 10px 0;">或将文件直接拖入框中</i>
		</div>
		<div class="box1" v-show="!flage">
			<!--单个删除弹框-->
			<div class="box1a" :style="height" id="scroll-1">
				<el-dialog title="提示" :visible.sync="delecteVisible" custom-class="DELECT" width="30%" top='30vh'>
					<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除该文件, 是否继续?</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="delecteVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="delecteBtn" size="mini" :loading="delecteLoading">确 定</el-button>
					</span>
				</el-dialog>
				<!--批量删除弹框-->
				<el-dialog title="提示" :visible.sync="delectesVisible" custom-class="DELECT" width="30%" top='30vh'>
					<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除选中文件,
						是否继续?</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="delectesVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="delectesBtn" size="mini" :loading="delectesLoading">确 定</el-button>
					</span>
				</el-dialog>
				<!--全部上传-->
				<el-dialog title="提示" :visible.sync="UploadesVisible" custom-class="DELECT" width="30%" top='30vh'>
					<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>确定要上传所选文件?</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="UploadesVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="UploadesBtn" size="mini" :loading="UploadesLoading">确 定</el-button>
					</span>
				</el-dialog>
				<el-table ref="multipleTable" :data="fileList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
			</div>
			<div class="box1b">
				<div class="block lastBlock">
					<span class="demonstration" style="color: #999999;">已加载{{fileList.length}}条数据</span>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Bus from '../bus.js'
	import UploadObj from "../upload.js"
	import Loading from '../CustomComponents/Loading';

	const fs = require("fs")
	var filename = `${__dirname}/../../assets/data.json`;
	import {
		validateFormat
	} from '../util.js'
	import {
		post,
		get
	} from '../api.js';
	export default {
		data() {
			return {
				deldecteFileID: "",
				delecteVisible: false,
				delecteLoading: false,
				delectesVisible: false,
				delectesLoading: false,
				UploadesVisible: false,
				UploadesLoading: false,
				tableData: [],
				multipleSelection: [],
				height: "",
				numberID: 0,
				BlockLength: 4 * 1024 * 1024,
				ChunkLength: 1024 * 1024 / 2
				// fileError:[]
			}
		},
		computed: {
			flage() {
				if (this.$store.state.Counter.data1.length > 0) {

					return false
				} else {
					return true
				}
			},
			fileRepeat() {
				var arr = this.$store.state.Counter.data1;
				var arr1 = [];
				arr.map(function(item, index) {
					if (item.content.status == 3) {
						arr1.push(index)
					}
				})
				return arr1;
			},
			fileError() {
				var arr = this.$store.state.Counter.data1;
				var arr1 = [];
				arr.map(function(item, index) {
					if (item.content.status == 1) {
						arr1.push(index)
					}
				})
				return arr1;
			},
			fileList() {
				return this.$store.state.Counter.data1;
			}
		},
		methods: {

			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
				if (this.multipleSelection.length > 0) {
					Bus.$emit('val2', "1")
				} else {
					Bus.$emit('val2', "0")
				}
			},
			uploadFile(id) {

				this.$store.commit("uploadFile", id)
				// this.$store.commit("genXindex")
				this.$router.push("/Uploading")

			},

			//编辑跳转页面

			JumpPage(id) {

				this.$router.push({
					path: "/editPage",
					query: {
						fileID: id,
						"page": "SU"
					}
				})
			},
			deleteFile(id) {
				this.deldecteFileID = id
				this.delecteVisible = true
			},

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);

			},
			delecteBtn() {
				var _this = this
				this.delecteLoading = true
				setTimeout(function() {


					_this.delecteLoading = false
					_this.delecteVisible = false

					_this.deletedFile(true)
				}, 1000)
			},


			//批量上传文件

			UploadesBtn() {
				this.UploadesLoading = true;
				var _this = this;
				console.log(this.multipleSelection)
				var arr = []
				var arrError = []
				this.multipleSelection.map(function(item) {
					if (item.content.status == 3 || item.content.status == 0) {
						arr.push(item)
					} else {
						arrError.push(item)
					}
				})
				setTimeout(function() {
					_this.UploadesLoading = false;
					_this.UploadesVisible = false;
					_this.$store.commit("UploadesAll", arr)

					// _this.$store.commit("genXindex")
					_this.$router.push("/Uploading")
				}, 1000)

			},
			//批量删除文件
			delectesBtn() {
				var _this = this
				this.delectesLoading = true
				setTimeout(function() {
					_this.deletedFile(false)
				}, 1000)
			},


			deletedFile(flage) {
				console.log(flage)
				if (flage) {
					var ID = this.deldecteFileID
					console.log(ID)
					this.$store.commit("delect1", ID)
					this.$notify({
						message: '删除成功！',
						type: 'success',
						offset: 60,
						duration: 1000,
					});
				} else {
					var arr = this.multipleSelection;
					this.$store.commit("delectAll1", arr)
					this.delectesLoading = false
					this.delectesVisible = false
					console.log(arr)
					this.$notify({
						message: '删除成功！',
						type: 'success',
						offset: 60,
						duration: 1000,
					});
				}
			},
			sliceFile(file) {
				console.log(file)
				var allChunkNum = Math.ceil(file.size / this.ChunkLength);
				var arr = []
				var n = 0;
				for (let i = 0; i < allChunkNum; i++) {
					if (n < 8) {
						n++;
					} else {
						n = 1;
					};
					var obj = {};
					obj.type = n;

					obj.start = this.ChunkLength * i;
					obj.end = this.ChunkLength * (i + 1);
					obj.BlockIndex = Math.ceil((i + 1) / 8);
					obj.ChunkIndex = n;

					if (n == 1) {
						obj.typeText = "firstChunkBinary"
						if (i < (allChunkNum - 8)) {
							obj.BlockSize = this.BlockLength
						} else {
							obj.BlockSize = file.size - this.ChunkLength * i;

						}

					} else {
						obj.typeText = "nextChunkOffset"
					}

					arr.push(obj);

				};

				console.log(arr);
				return arr;
			},
			saveFile(arr) {
				for (let i = 0; i < arr.length; i++) {
					arr[i].UploadSize = 0;
					arr[i].arr = this.sliceFile(arr[i].file);
					this.$store.commit("saveUpload", [arr[i]])
					this.$notify({
						message: '导入成功！',
						type: 'success',
						offset: 60,
						duration: 1000
					});
					// 						var send_data = {
					// 							name:arr[i].name
					// 						}
					// 						post("music/music/store-credential", send_data).then((response) => {
					// 							console.log(response.data.credential)
					// 							   arr[i].credential = response.data.credential;
					// 								 arr[i].key = Base64.encode(response.data.key);
					// 								 arr[i].arr = this.sliceFile(arr[i].file);	
					// 								 arr[i].UploadSize = 0;
					// 								 this.$store.commit("saveUpload",[arr[i]])
					// 								 this.$notify({				          
					// 								 		message: '导入成功！',
					// 								 		type: 'success',
					// 								 		offset: 60,
					// 								 		duration:1000
					// 								 	});
					// 						}).catch(() => {
					// 							this.$notify({				          
					// 								message: '导入失败！',
					// 								type: 'error',
					// 								offset: 60,
					// 								duration:1000
					// 							});
					// 						})
				}

			},

			foo(e, data) {
				console.log(data)
				if (data) {
					if (data.type.split("/")[0] == 'video' || validateFormat(data.name)) {

						this.getName(data, true);
					} else {
						this.$notify({
							message: '请导入视频文件！',
							type: 'warning',
							offset: 60,
							duration: 1000,
						});
					}
				} else {
					console.log(this.$refs.file.files[0].type.split("/")[0], "视屏文件")
					if (this.$refs.file.files[0].type.split("/")[0] == 'video' || validateFormat(this.$refs.file.files[0].name)) {
						this.getName(this.$refs.file.files[0], true);
					} else {
						this.$notify({
							message: '请导入视频文件！',
							type: 'warning',
							offset: 60,
							duration: 1000,
						});
					}
				}
			},
			changeName(name) {

			},
			getName(data, flage) {
				console.log(data)
				var name = data.name
				var _this = this;
				var send_data = {
					"name": [name]
				}
				_this.numberID++;

				console.log(new Date().getTime())
				if (flage) {
					post("/music/music/store-verification", send_data).then(function(res) {
						if (res.data[0].status == 3) {
							_this.chaxun(res.data[0], data);
						} else {
							console.log(data.name.split(".")[data.name.split(".").length - 1])
							var time = _this.getDate();
							var obj = {
								"currentNum": 0,
								"id": new Date().getTime(),
								"name": data.name,
								"path": data.path,
								"type": data.name.split(".")[data.name.split(".").length - 1],
								"isRepeated": false,
								"size": data.size,
								"upState": "0",
								"startFlage": true,
								"content": res.data[0],
								"file": data,
								"upload_data": time,
							}
							_this.saveFile([obj])
						};
					}).catch(error => {
						_this.$notify({
							message: '导入文件失败！',
							type: 'error',
							offset: 60,
							duration: 1000,
						});

					})
				}

			},
			chaxun(data, file) {
				console.log(data)
				var send_data = {};
				send_data.name = data.name;
				send_data.singer = data.singer;
				switch (data.singer_type) {
					case "男歌手":
						send_data.singer_type = 0;
						break;
					case "女歌手":
						send_data.singer_type = 1;
						break;
					case "组合":
						send_data.singer_type = 2;
						break;
					case "合唱":
						send_data.singer_type = 3;
						break;
				};
				switch (data.language) {
					case "国语":
						send_data.language = 0;
						break;
					case "粤语":
						send_data.language = 1;
						break;
					case "闽南语":
						send_data.language = 2;
						break;
					case "英语":
						send_data.language = 3;
						break;
					case "日语":
						send_data.language = 4;
						break;
					case "韩语":
						send_data.language = 5;
						break;
				};
				switch (data.picture) {
					case "MTV":
						send_data.picture = 4;
						break;
					case "LIVE":
						send_data.picture = 1;
						break;
					case "舞曲":
						send_data.picture = 2;
						break;
					case "配置画面":
						send_data.picture = 3;
						break;
				};
				switch (data.area) {
					case "大陆":
						send_data.area = 0;
						break;
					case "港台":
						send_data.area = 1;
						break;
					case "日韩":
						send_data.area = 2;
						break;
					case "欧美":
						send_data.area = 3;
						break;
					case "其他":
						send_data.area = 4;
						break;
				};
				switch (data.format_type) {
					case "高清":
						send_data.format_type = 0;
						break;
					case "DVD":
						send_data.format_type = 1;
						break;
					case "MP4":
						send_data.format_type = 2;
						break;
					case '其他':
						send_data.format_type = 3;
						break;
				};
				switch (data.voice_type) {
					case "消音":
						send_data.voice = 0;
						break;
					case "原版伴奏":
						send_data.voice = 1;
						break;
					case "演唱会":
						send_data.voice = 2;
						break;
					case "remix":
						send_data.voice = 3;
						break;
					case "其他":
						send_data.voice = 4;
						break;
				};
				switch (data.vocal_track) {
					case "1":
						send_data.vocal_track = 0;
						break;
					case "2":
						send_data.vocal_track = 1;
						break;
					case "左声道":
						send_data.vocal_track = 2;
						break;
					case "右声道":
						send_data.vocal_track = 3;
						break;
					case "左":
						send_data.vocal_track = 2;
						break;
					case "右":
						send_data.vocal_track = 3;
						break;
				};
				switch (data.voice_track) {
					case "1":
						send_data.voice_track = 0;
						break;
					case "2":
						send_data.voice_track = 1;
						break;
					case "左声道":
						send_data.voice_track = 2;
						break;
					case "右声道":
						send_data.voice_track = 3;
						break;
					case "左":
						send_data.voice_track = 2;
						break;
					case "右":
						send_data.voice_track = 3;
						break;
				};
				console.log(send_data)
				get("/music/music/store", send_data).then((res) => {
					console.log(res)
					if (res.data.results.length > 0) {
						// this.$refs.replaceUpload.value = ""
						this.$notify({
							message: '系统已存在该版本的歌曲',
							type: 'error',
							offset: 120,
							duration: 2000,
						});
					} else {

						var time = this.getDate();

						var obj = {
							"currentNum": 0,
							"id": new Date().getTime(),
							"name": file.name,
							"path": file.path,
							"type": file.name.split(".")[file.name.split(".").length - 1],
							"isRepeated": false,
							"size": file.size,
							"upState": "0",
							"startFlage": true,
							"content": data,
							"file": file,
							"upload_data": time,
						}
						// obj.content.status = 0;
						this.saveFile([obj])
					}
				})
			},
			asyncTesk(data, id) {
				var _this = this;
				get("/music/music/task-result", {
					"task_id": id
				}).then(function(res1) {
					console.log(res1)

					var time = _this.getDate();

					var obj = {
						"currentNum": 0,
						"id": _this.numberID,
						"name": data.name,
						"path": data.path,
						"type": data.type,
						"isRepeated": false,
						"size": data.size,
						"upState": "0",
						"startFlage": true,
						"content": res1.data[0],
						"file": data,
						"upload_data": time,

					}
					console.log(obj)
					_this.saveFile([obj])
				}).catch(error => {
					setTimeout(function() {

						_this.asyncTesk(data, id)

					}, 500)

				})


			},
			getDate() {
				var date = new Date();
				var y = date.getFullYear()

				var M = date.getMonth() + 1 //月份   
				var d = date.getDate() //日   
				var h = date.getHours() > 9 ? date.getHours() : "0" + date.getHours() //小时   
				var m = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes() //分   
				var s = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds() //秒   
				var str = y + "-" + M + "-" + d + "　" + h + ":" + m + ":" + s
				return str;
			}

		},
		mounted() {
			var box = document.getElementById('SongsUploaded')
			var _this = this

			this.height = "height:" + (document.body.clientHeight - 130) + "px"




			window.onresize = function() {
				console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height = "height:" + (document.body.clientHeight - 130) + "px"

					console.log(_this.height)
				}, 2)
			}
			box.ondragover = function(ev) {
				//阻止浏览器默认打开文件的操作
				ev.preventDefault();

			}
			box.ondrop = function(e) {

				e.preventDefault();
				var files = e.dataTransfer.files

				var types = ['mpeg', 'mp4', 'mpg', 'mkv'];

				console.log(files.length, "ppollkiijjij")
				if (files) {
					for (var i = 0; i < files.length; i++) {
						if (fs.statSync(files[i].path).isDirectory()) {
							_this.$notify({
								message: '暂不支持文件夹拖拽！',
								type: 'error',
								offset: 60,
								duration: 2000,
							});
						} else {
							var type = files[i].path.split('.')[files[i].path.split('.').length - 1];
							if (types.indexOf(type) != -1) {
								_this.getName(files[i], true)



							} else {
								_this.$notify({
									message: '请导入正确格式的文件！',
									type: 'warning',
									offset: 60,
									duration: 2000,
								});
							}

						}


					}


				}
			}

			Bus.$on("UploadFileOK2", function() {
				_this.UploadesVisible = true

			})
			Bus.$on("delected2", function() {
				_this.delectesVisible = true
			})
			Bus.$on("DRfoo", function(data) { //Main导入函数；
				if (data.type.split('/')[0] == 'video' || validateFormat(data.name)) {

					_this.getName(data, true)

				} else {

					_this.$notify({
						message: '请导入视频文件！',
						type: 'warning',
						offset: 60,
						duration: 1000,
					});

				}

			})
		},
		beforeDestroy() {
			Bus.$off('delected2')
			Bus.$off('DRfoo')
			Bus.$emit('val2', "0")
			window.onresize = null
		}
	}
</script>
<style>
	.has-gutter .cell {
		text-align: center;
	}

	.el-table__row {
		font-size: 12px;
	}

	.el-table .warning-row {
		background: oldlace;
		color: black;
	}

	.el-table .error-row {
		color: red;
	}

	.el-table .warning-error-row {
		background: oldlace;
		color: red;
	}
</style>

<style scoped="scoped">
	#SongsUploaded i {
		font-style: normal;

	}

	#SongsUploaded {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: white;
		display: flex;
		justify-content: center;
		font-size: 12px;

	}

	.ff {
		align-items: center;
	}

	.gg {
		align-items: flex-start;
	}

	#SongsUploaded .lastBlock {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background: white;
	}

	#SongsUploaded .box {

		display: flex;

		flex-direction: column;

	}

	#SongsUploaded .box1 {

		width: 100%;
		height: 100%;


		font-size: 12px;

	}

	#SongsUploaded .box1a {
		overflow: auto;
		width: 100%;
		height: 100%;
		margin-right: 5px;
	}

	#SongsUploaded .box1b {
		padding: 0 20px;
		box-sizing: border-box;
		border-top: 1px solid gainsboro;
		width: 100%;
		height: 50px;
		background: white;

	}

	.fileinput-button {
		position: relative;
		display: inline-block;
		overflow: hidden;
	}

	.fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		height: 28px;
		cursor: pointer;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
	}

	#scroll-1::-webkit-scrollbar-track,
	.el-checkbox-group::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f0f0f0;
	}

	#scroll-1::-webkit-scrollbar,
	.el-checkbox-group::-webkit-scrollbar {
		width: 10px;
		background-color: #f0f0f0;
	}

	#scroll-1::-webkit-scrollbar-thumb,
	.el-checkbox-group::-webkit-scrollbar-thumb {
		border-radius: 20px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #cfd1d3;
	}

	#scroll-1::-webkit-scrollbar-thumb:hover,
	.el-checkbox-group::-webkit-scrollbar-thumb:hover {
		background-color: #a7acb1;
	}

	#scroll-1::-webkit-scrollbar-thumb:active,
	.el-checkbox-group::-webkit-scrollbar-thumb:active {
		background-color: #9da2a7;
	}
</style>
