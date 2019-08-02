<template>
	<div id="CustomManagement">
		<div ref="box_head" style="height: 57px;width: 100%;" class="box_head">
			<ul>
				<li>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
				</li>
				<li :style="widthHead1[0]">编号</li>
				<li :style="widthHead1[1]">歌曲名称</li>
				<li :style="widthHead1[2]">歌手名称</li>
				<li :style="widthHead1[3]">语言</li>
				<li :style="widthHead1[4]">来源</li>
				<li :style="widthHead1[5]">格式</li>
				<li :style="widthHead1[6]">
					<el-dropdown trigger="click" placement="bottom-end" size="mini">
						<span class="el-dropdown-link songStateSpan">
							歌曲状态<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<span style="display: flex;align-items: center;margin-top:10px ;padding-bottom:2px ;">
									<el-radio v-model="songStateradio" :label="4" @change="songeStateFilterHandler(4)">全部</el-radio>
								</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span style="display: flex;align-items: center;padding:2px 0;">
									<!--<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #999999;margin-right: 8px;"></span><i style="font-size: 12px;">待制作</i>-->
									<el-radio v-model="songStateradio" :label="0" @change="songeStateFilterHandler(0)">待制作</el-radio>
								</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span style="display: flex;align-items: center;padding:2px 0;">
									<!--<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #2eba07;margin-right: 8px;"></span><i style="font-size: 12px;">制作中</i>-->
									<el-radio v-model="songStateradio" :label="1" @change="songeStateFilterHandler(1)">制作中</el-radio>
								</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span style="display: flex;align-items: center;font-size: 12px;padding:2px 0;">
									<!--<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #108de9;margin-right: 8px;"></span><i style="font-size: 12px;">已上传</i>-->
									<el-radio v-model="songStateradio" :label="2" size="mini" @change="songeStateFilterHandler(2)">已上传</el-radio>
								</span>
							</el-dropdown-item>

							<el-dropdown-item>
								<span style="display: flex;align-items: center;padding-bottom:10px;padding-top:2px">

									<!--<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #999999;margin-right: 8px;"></span><i style="font-size: 12px;">审核不通过</i>-->
									<el-radio v-model="songStateradio" :label="3" @change="songeStateFilterHandler(3)">审核不通过</el-radio>
								</span>
							</el-dropdown-item>
						</el-dropdown-menu>

					</el-dropdown>
				</li>
				<li :style="widthHead1[7]">
					提交时间


				</li>
				<li :style="widthHead1[8]">操作</li>
			</ul>
		</div>
		<div class="boxLoading" v-show="!loading" style="margin-top: 22vh;">
			<Loading></Loading>

		</div>
		<div class="box" ref="scroll_1" :style="height" id="scroll-1" v-show="loading">

			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :row-class-name="tableRowClassName" style="width: 100%"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="id" label="编号" :width="widthHead[0]">

				</el-table-column>
				<el-table-column prop="name" label="歌曲名称" :width="widthHead[1]">
				</el-table-column>

				<el-table-column prop="singer" label="歌手名称" :width="widthHead[2]">
				</el-table-column>

				<el-table-column prop="language" label="语言" :width="widthHead[3]">
					<template slot-scope="scope">
						<span v-if="scope.row.language =='0'">
							国语
						</span>
						<span v-if="scope.row.language =='1'">
							粤语
						</span>
						<span v-if="scope.row.language =='2'">
							闽南语
						</span>
						<span v-if="scope.row.language =='3'">
							英语
						</span>
						<span v-if="scope.row.language =='4'">
							日语
						</span>
						<span v-if="scope.row.language =='5'">
							韩语
						</span>
						<span v-if="scope.row.language =='6'">
							其他
						</span>
					</template>
				</el-table-column>

				<el-table-column prop="origin" label="来源" :width="widthHead[4]">
					<template slot-scope="scope">

						<span v-if="scope.row.uid != null">{{scope.row.origin}}-消费者</span>
						<span v-else>{{scope.row.origin}}</span>
					</template>
				</el-table-column>

				<el-table-column prop="format" label="来源" :width="widthHead[5]">
					<template slot-scope="scope">
						<span>
							{{scope.row.format}}
						</span>

					</template>
				</el-table-column>




				<el-table-column prop="songState" label="歌曲状态" sortable :width="widthHead[6]">
					<template slot-scope="scope">
						<div style="display: flex;align-items: center;justify-content: center;" v-if="scope.row.state=='0'">
							<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #2eba07;margin-right: 8px;"></span><i
							 style="font-style: normal;">待制作</i>
						</div>
						<div style="display: flex;align-items: center;justify-content: center;" v-if="scope.row.state=='1'">
							<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #108de9;margin-right: 8px;"></span><i
							 style="font-style: normal;">制作中</i>
						</div>
						<div style="display: flex;align-items: center;justify-content: center;" v-if="scope.row.state=='2'">
							<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #999999;margin-right: 8px;"></span><i
							 style="font-style: normal;">已上传</i>
						</div>
						<div style="display: flex;align-items: center;justify-content: center;" v-if="scope.row.state=='3'">
							<span style="display: block;width: 5px;height: 5px;border-radius: 50%;background: #999999;margin-right: 8px;"></span><i
							 style="font-style: normal;">审核不通过</i>
						</div>
						<div style="display: flex;align-items: center;justify-content: center;" v-if="scope.row.state== '4'">
							<i style="font-style: normal;">加载中...</i>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="update_date" label="提交时间" :width="widthHead[7]">
				</el-table-column>

				<el-table-column label="操作" :width="widthHead[8]">
					<template slot-scope="scope">
						<el-button v-if="scope.row.state=='1'" type="text" @click="btnUpload(scope.row.id)" size="small">
							确认上传
						</el-button>
						<el-button v-if="scope.row.state=='2'" type="text" @click="queryBtn(scope.row.id)" size="small">
							查询曲库
						</el-button>
						<div v-if="scope.row.state=='4'">
							<i class="el-icon-loading" style="font-size: 24px;"></i>
						</div>
						<div style="display: flex;align-content: center;justify-content: center;" v-if="scope.row.state=='0'">
							<el-button type="text" @click="make(scope.row.id)" size="small">
								制作
							</el-button>
							<i style="display: block;height: 16px;width: 0px;border-left: 1px solid #cdc0cd;margin: 0 10px;margin-top:8px ;"></i>
							<el-button type="text" @click.stop="showBackReasonDialog(scope.row.id)" size="small">
								不通过
							</el-button>
						</div>
						<div @mouseenter="goo" @mouseleave="goo1">
							<el-popover v-if="scope.row.state=='3'" placement="left-start" title="不通过原因" width="200" trigger="hover"
							 :content="scope.row.refuse_reason">
								<el-button type="text" slot="reference" size="small">
									查看原因
								</el-button>
							</el-popover>
						</div>
					</template>
				</el-table-column>

			</el-table>
			<!--不通过提示框-->
			<el-dialog title="请填写不通过原因" width="501px" top='26vh' custom-class="BackReason" @close="handleClose" :visible.sync="dialogVisible">
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="mini">
					<el-form-item label="原因选择">
						<el-select v-model="formLabelAlign.reason" placeholder="请选择" @change="backReasonFlage = false">
							<el-option label="用户提交数据混乱，无法制作歌曲" value="用户提交数据混乱，无法制作歌曲"></el-option>
							<el-option label="暂无歌曲资源，无法制作" value="暂无歌曲资源，无法制作"></el-option>

						</el-select>
					</el-form-item>
					<el-form-item label="其他">
						<el-input type="textarea" :rows="4" :maxlength="50" resize="none" v-model="formLabelAlign.otherReason" @change="backReasonFlage = false"></el-input>
					</el-form-item>
					<el-form-item>
						<div style="height: 20px;">
							<p style="margin: 0;padding: 0;line-height: 20px;color: red;" v-show="backReasonFlage">*请填写退回原因</p>
						</div>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" size="mini" @click="notThroughBtn" :loading="notThroughLoading">确 定</el-button>
				</span>
			</el-dialog>

			<!--批量操作不通过提示框-->


			<el-dialog title="请填写不通过原因" width="501px" top='26vh' custom-class="BackReason" @close="handleClose" :visible.sync="dialogAllVisible">
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="mini">
					<el-form-item label="原因选择">
						<el-select v-model="formLabelAlign.reason" placeholder="请选择" @change="backReasonFlage = false">
							<el-option label="用户提交数据混乱，无法制作歌曲" value="用户提交数据混乱，无法制作歌曲"></el-option>
							<el-option label="暂无歌曲资源，无法制作" value="暂无歌曲资源，无法制作"></el-option>

						</el-select>
					</el-form-item>
					<el-form-item label="其他">
						<el-input type="textarea" :rows="4" :maxlength="50" resize="none" v-model="formLabelAlign.otherReason" @change="backReasonFlage = false"></el-input>
					</el-form-item>
					<el-form-item>
						<div style="height: 20px;">
							<p style="margin: 0;padding: 0;line-height: 20px;color: red;" v-show="backReasonFlage">*请填写退回原因</p>
						</div>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="mini" @click="dialogAllVisible = false">取 消</el-button>
					<el-button type="primary" size="mini" @click="AllNotThroughBtn" :loading="notThroughLoading">确 定</el-button>
				</span>
			</el-dialog>


		</div>
		<div style="padding: 0 20px;height: 50px;width:100%; box-sizing: border-box;border-top: 1px solid gainsboro;position: absolute;left: 0;bottom: 0;">
			<div class="block lastBlock">
				<span class="demonstration" style="color: #999999;">已加载{{tableData.length}}条数据</span>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]"
				 :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	const ipcRenderer = require('electron').ipcRenderer;
	import Loading from '../CustomComponents/Loading';
	import Bus from '../bus.js'
	import axios from 'axios'
	import {
		get,
		patch,
		post,
		baseUrl
	} from '../api'
	import {
		getFormat
	} from "../util.js"
	var os = require("os");
	export default {
		components: {
			Loading
		},
		data() {
			return {
				multipleSelection: [],
				dialogVisible: false,
				dialogAllVisible: false,
				labelPosition: 'right',
				notThroughLoading: false,
				formLabelAlign: {
					reason: "",
					otherReason: ""
				},
				backReasonFlage: false,
				height: "",
				widthHead: [40, 100, 100, 65, 65, 90, 100, 180, 120],
				widthHead1: [],
				checkAll: false,
				isIndeterminate: false,
				value: [],
				checkList: [],
				filterTableData: [],
				putTimeArr: [],
				timeFilterBtn: true,
				timeFilterFlage: false,
				loading: false,
				tableData: [],
				warningArr: [],
				songStateradio: 4,
				page: 1,
				page_size: 100,
				count: 0

			}
		},

		methods: {
			goo() { //鼠标移到查看原因点时隐藏滚动条；
				console.log(this.$refs)
				var box = this.$refs.scroll_1;
				box.style.overflow = 'hidden'
				// box.bind("scroll",function (){box.scrollTop(box.scrollTop); });
			},
			goo1() { //鼠标移处查看原因点时显示滚动条；
				var box = this.$refs.scroll_1;
				box.style.overflow = 'auto';
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				var arr = this.warningArr;

				var str = arr.indexOf(rowIndex)
				console.log(str)
				if (str !== -1) {
					return 'warning-row';
				} else {
					return 'normal-row';
				}
				return '';
			},

			handleCheckAllChange(val) {
				this.isIndeterminate = false;
				this.checkAll = val
				var arr = this.tableData
				if (this.checkAll) {
					arr.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row, true);
					})

				} else {
					this.$refs.multipleTable.clearSelection();
				}
				console.log(this.multipleSelection, "multipleSelection")
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.warningArr = [];
				if (this.multipleSelection.length > 0) {
					this.isIndeterminate = true;
					this.checkAll = false;
					Bus.$emit('val1', "1")
				}
				if (this.multipleSelection.length == 0) {
					this.isIndeterminate = false;
					this.checkAll = false;
					Bus.$emit('val1', "0")
				}
				if (this.multipleSelection.length == this.tableData.length) {
					this.isIndeterminate = false;
					this.checkAll = true;
					Bus.$emit('val1', "1")
				}
			},
			songeStateFilterHandler() {
				console.log(this.songStateradio)
				this.detail()

			},

			showBackReasonDialog(id) {
				this.BackReasonFileID = id
				this.dialogVisible = true
			},
			notThroughBtn() {
				var _this = this;
				var id = this.BackReasonFileID
				var arr = this.tableData
				if (this.formLabelAlign.reason == "" && this.formLabelAlign.otherReason == "") {
					this.backReasonFlage = true
				} else {
					this.notThroughLoading = true;
					var str = this.formLabelAlign.reason + "\n" + this.formLabelAlign.otherReason

					var send_data = {
						state: '3',
						refuse_reason: str
					}
					patch('/music/music/custom-manage/' + id + '', send_data).then(function(res) {
						console.log(res)
						_this.notThroughLoading = false;
						_this.dialogVisible = false;
						_this.formLabelAlign = {
							reason: "",
							otherReason: ""
						}
						Bus.$emit("getDingZiNum");
						arr.map(function(item) {
							if (item.id == id) {
								item.state = '3';
								item.refuse_reason = str;
								return
							}
						})
						_this.$notify({
							message: '提交成功',
							type: 'success',
							offset: 120,
							duration: 2000,
						});
					})
				}
			},
			AllNotThroughBtn() {
				var _this = this;
				console.log(this.formLabelAlign)
				if (this.formLabelAlign.reason == "" && this.formLabelAlign.otherReason == "") {
					this.backReasonFlage = true
				} else {
					this.notThroughLoading = true;
					var str = this.formLabelAlign.reason + "\n" + this.formLabelAlign.otherReason;
					var arr = this.multipleSelection;
					var ids = [];
					arr.map(function(item) {
						// console.log(item)
						ids.push(item.id)
					})
					var send_data = {
						id: ids,
						type: 3,
						reason: str
					}
					post("/music/music/custom-batch", send_data).then((res) => {

						// console.log(res.date.task_id)
						this.asyncNotThrough(res.data.task_id)
					}).catch((error) => {
						_this.notThroughLoading = false;
						_this.dialogAllVisible = false;
						_this.$notify({
							message: '操作失败',
							type: 'error',
							offset: 120,
							duration: 2000,
						});


					})

				}
			},
			asyncNotThrough(id) {
				var _this = this;
				var send_id = {
					"task_id": id
				}
				get("/music/music/task-result", send_id).then(function(res1) {
					_this.detail()
					_this.notThroughLoading = false;
					_this.dialogAllVisible = false;
					Bus.$emit("getDingZiNum");
				}).catch(function(error) {
					if (error.status == 400) {
						setTimeout(function() {
							_this.asyncNotThrough(id)
						}, 500)
					}
				})
			},


			handleClose() {
				console.log("oooo")
				this.formLabelAlign = {
					reason: "",
					otherReason: ""
				}
				this.notThroughLoading = false;
				this.backReasonFlage = false;
			},
			make(id) {
				var arr = this.tableData;
				var data = "";
				console.log(arr)
				arr.map(function(item) {
					if (item.id == id) {
						data = item
						item.state = '4';
						return
					}
				})
				var send_data = {
					state: "1"
				}
				console.log(send_data)
				patch('/music/music/custom-manage/' + id + '', send_data).then(function(res) {
					console.log(res)
					arr.map(function(item) {
						if (item.id == id) {
							item.state = '1';
						}
					})
				})
			},
			queryBtn(id) {
				this.$router.push({
					path: "/LibraryManagement",
					query: {
						fileID: id
					}
				})
			},
			btnUpload(id) {
				var arr = this.tableData
				var _this = this;
				console.log(arr)
				arr.map(function(item) {
					if (item.id == id) {
						item.state = '4';
						return
					}
				})

				var send_data = {
					state: '2'
				}
				patch('/music/music/custom-manage/' + id + '', send_data).then(function(res) {
					console.log(res)
					arr.map(function(item) {
						if (item.id == id) {
							item.state = '2';
						}
					})
					Bus.$emit("getDingZiNum");
				}).catch(error => {
					console.log(error)
					if (error.data[0] == "未找到歌曲，确认上传失败") {
						_this.$notify({
							message: '请先上传歌曲',
							type: 'warning',
							offset: 120,
							duration: 2000,
						});
					}
					arr.map(function(item) {
						if (item.id == id) {
							item.state = '1';
							return
						}
					})
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.tableData = []
				this.page = 1;
				this.page_size = val;
				this.detail()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.tableData = []
				this.page = val;
				this.detail()
			},
			getWidthHead() {
				console.log(this.$refs.box_head.offsetWidth)
				var _this = this
				var arr = this.widthHead;
				var num1 = this.$refs.box_head.offsetWidth;
				var num2 = 55;
				var num3 = 0;
				this.widthHead1 = []
				arr.map(function(item) {
					num2 += item
				})
				num3 = (num1 - 15 - num2) / arr.length
				arr.forEach(function(item, index) {
					var str = "width:" + (item + num3) + "px"
					_this.widthHead1.push(str)
					return arr[index] = item + num3;
				})
				console.log(this.widthHead1)
			},
			RomveRepeat(arr) {
				var res = [];
				var json = {};
				for (var i = 0; i < arr.length; i++) {
					if (!json[arr[i]]) {
						res.push(arr[i]);
						json[arr[i]] = 1;
					}
				}
				return res;
			},
			detail() {
				var _this = this
				this.loading = false

				var send_data = {
					page: this.page,
					page_size: this.page_size,
					state: this.songStateradio == 4 ? "" : this.songStateradio
				}
				get("/music/music/custom-manage", send_data).then(function(response) {
					_this.count = response.data.count


					_this.loading = true
					response.data.results.map((item) => {

						item.format = getFormat(JSON.parse(item.format))
					})
					console.log(response.data.results, "ppppooo")
					_this.tableData = response.data.results
					_this.count = response.data.count;
				}).catch(function(response) {
					console.log(response); //发生错误时执行的代码
				})
			},
			asyncFunc(id) {
				var _this = this;
				var send_id = {
					"task_id": id
				}
				get("/music/music/task-result", send_id).then(function(res1) {
					console.log(res1.data)
					console.log(baseUrl + "/music/file/excel/" + res1.data)
					// console.log(ipcRenderer)
					var str = baseUrl + "/music/file/excel/" + res1.data
					ipcRenderer.send('download', str);

				}).catch(function(error) {
					if (error.status == 400) {
						setTimeout(function() {
							_this.asyncFunc(id)
						}, 500)
					}
				})
			}

		},
		mounted() {
			console.log(os.totalmem(), "ppppppososso")
			var _this = this
			this.height = "height:" + (document.body.clientHeight - 187) + "px"
			this.getWidthHead()
			this.detail()
			console.log(this.putTimeArr)

			window.onresize = function() {
				console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height = "height:" + (document.body.clientHeight - 187) + "px"
					_this.getWidthHead()
					console.log(_this.height)
				}, 2)
			}

			Bus.$on("UploadFileOK", function() {
				var arr = _this.tableData;
				var flage = false;
				console.log(arr)
				_this.warningArr = [];
				arr.map(function(item, index) {

					if (item.state != 1 && _this.multipleSelection.indexOf(item) > -1) {
						console.log("ll")
						_this.warningArr.push(index)
						flage = true
					}

				})
				console.log(_this.warningArr, "warningArr")
				if (flage) {
					this.$notify({
						message: '存在不符的文件',
						type: 'warning',
						offset: 120,
						duration: 2000,
					});
				} else {
					var IDlist = []
					_this.multipleSelection.map(function(item) {
						IDlist.push(item.id)
						item.state = '4'
					})
					var send_data = {
						id: IDlist,
						type: 0
					}
					post("/music/music/custom-batch", send_data).then(function(res) {
						Bus.$emit("getDingZiNum");
						_this.multipleSelection.map(function(item) {
							IDlist.push(item.id)
							item.state = '2'
						})
					}).catch(error => {
						this.$notify({
							message: '请先上传歌曲',
							type: 'warning',
							offset: 120,
							duration: 2000,
						});
						_this.multipleSelection.map(function(item) {
							IDlist.push(item.id)
							item.state = '1'
						})
					})
				}
			})
			Bus.$on("makeFile", function() {
				var arr = _this.tableData;
				var flage = false;
				// console.log(arr)
				_this.warningArr = [];
				arr.map(function(item, index) {

					if (item.state != 0 && _this.multipleSelection.indexOf(item) > -1) {
						console.log("ll")
						console.log(item.state)
						_this.warningArr.push(index)
						flage = true
					}

				})
				console.log(_this.warningArr, "warningArr")
				if (flage) {
					this.$notify({
						message: '存在不符的文件',
						type: 'warning',
						offset: 120,
						duration: 2000,
					});
				} else {
					var IDlist = []
					_this.multipleSelection.map(function(item) {
						IDlist.push(item.id)
						item.state = '4'
					})

					var send_data = {
						id: IDlist,
						type: 1
					}
					post("/music/music/custom-batch", send_data).then(function(res) {
						_this.multipleSelection.map(function(item) {
							IDlist.push(item.id)
							item.state = '1'
						})
					})
				}
			})

			Bus.$on("Disagree", function() {
					var arr = _this.tableData;
					var flage = false;
					// console.log(arr)
					_this.warningArr = [];
					arr.map(function(item, index) {

						if (item.state != 0 && _this.multipleSelection.indexOf(item) > -1) {
							// console.log("ll")
							// console.log(item.state)
							_this.warningArr.push(index)
							flage = true
						}

					})
					if (flage) {
						_this.$notify({
							message: '存在不符的文件',
							type: 'warning',
							offset: 120,
							duration: 2000,
						});
					} else {
						// console.log(_this.dialogVisible)
						_this.dialogAllVisible = true;
					}






				}),
				Bus.$on("exportFile1", function() {
					var arr = [];
					_this.multipleSelection.map(function(item) {
						arr.push(item.id)
					})
					// ipcRenderer.sendSync('download',"pppp");
					var send_data = {
						id: arr,
						type: 2
					}
					post("/music/music/custom-batch", send_data).then(function(res) {
						console.log(res.data)
						// 							var send_id = {
						// 								"task_id":res.data.task_id
						// 							}
						_this.asyncFunc(res.data.task_id)


					})
				})
		},
		beforeDestroy() {
			Bus.$off('UploadFileOK')
			Bus.$off('makeFile')
			Bus.$off('exportFile1')
			Bus.$emit('val1', "0")
			window.onresize = null

		}
	}
</script>

<style>
	ul,
	li {
		margin: 0;
		padding: 0;
	}

	i {
		font-style: normal;
	}

	.el-checkbox-group {
		max-height: 200px;
		overflow: auto;
	}

	.el-dropdown-menu__item:not(.is-disabled):hover {
		background-color: white;
		color: #66b1ff;
	}

	#CustomManagement .cell {
		text-align: center;
		font-size: 12px;
	}

	#CustomManagement {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	#CustomManagement .box {
		overflow: auto;
		margin-right: 5px;
		font-size: 12px;
	}

	#CustomManagement .box_head ul {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-right: 15px;
		border-bottom: 1px solid #ebeef5;
	}

	#CustomManagement .box_head ul li {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #909399;
		font-weight: 600;
		font-size: 14px;

	}

	#CustomManagement .box_head li:nth-child(1) {
		width: 55px;
	}

	#CustomManagement .songStateSpan {
		cursor: pointer;
		color: #909399;
		font-weight: 600;
	}

	#CustomManagement .box_head .a {
		flex: 1;
	}

	#CustomManagement .has-gutter {
		display: none;
	}

	#CustomManagement .lastBlock {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background: white;
	}

	.el-table-filter__content .el-checkbox__label {
		font-size: 12px;
	}

	.el-dialog {
		text-align: left;
	}

	.el-dialog__header .el-dialog__title {
		font-size: 14px;
		color: #5a5a5a;
		font-weight: 600;
	}

	.el-dialog__header {
		padding: 6px 10px;
		text-align: left;
		border-bottom: 1px solid #efeded;
	}

	#CustomManagement .el-dialog__body {
		padding: 30px 20px 10px 20px;
	}

	.el-dialog__header .el-dialog__headerbtn {
		top: 10px;
		right: 10px;
	}

	.el-select-dropdown__item {
		font-size: 12px;
	}

	.el-form-item__label {
		font-size: 12px;
	}

	.el-popover {
		font-size: 12px;
	}

	.el-popover__title {
		font-size: 14px;
		color: #5a5a5a;
		font-weight: 600;
	}

	.el-table .warning-row {
		background: oldlace;
		color: red;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.el-table .normal-row {
		background: #ffffff;
		color: #606266;
	}

	.el-dropdown-menu__item .el-radio__label {
		font-size: 12px;
	}

	.el-select-dropdown__item {
		font-size: 12px;
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
