<template>
	<div id="editPage">
		<div class="box" :style="height" id="scroll-1">
			<el-row style="width: 1120px;">
				<el-col>
					<h1 style="color: #666666;margin-left: 20px;">歌曲信息</h1>
				</el-col>
				<el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" size="mini"
				 status-icon :rules="rules" ref="formInline">
					<el-col :span="20" :offset="1" style="display: flex;justify-content:space-around;">
						<el-form-item label="歌曲名称" prop="name">
							<el-input v-model="formInline.name" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="歌手名称" prop="singer">
							<el-input v-model="formInline.singer" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="语言" prop="language">
							<el-select v-model="formInline.language" placeholder="请选择">
								<el-option label="国语" :value="0"></el-option>
								<el-option label="粤语" :value="1"></el-option>
								<el-option label="闽南语" :value="2"></el-option>
								<el-option label="英语" :value="3"></el-option>
								<el-option label="日语" :value="4"></el-option>
								<el-option label="韩语" :value="5"></el-option>
								<el-option label="其他" :value="6"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="20" :offset="1" style="display: flex;justify-content:space-around;">
						<el-form-item label="歌手类型" prop="singer_type">
							<el-select v-model="formInline.singer_type" placeholder="无">
								<el-option label="男歌手" :value="0"></el-option>
								<el-option label="女歌手" :value="1"></el-option>
								<el-option label="组合" :value="2"></el-option>
								<el-option label="合唱" :value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地区" prop="area">
							<el-select v-model="formInline.area" placeholder="无">
								<el-option label="大陆" :value='0'></el-option>
								<el-option label="港台" :value="1"></el-option>
								<el-option label="日韩" :value="2"></el-option>
								<el-option label="欧美" :value="3"></el-option>
								<el-option label="其他" :value="4"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专辑名称" prop="album" v-show="albumJurisdictionFlage">
							<el-autocomplete class="inline-input" v-model="formInline.album" :fetch-suggestions="querySearch" placeholder="无"
							 @select="handleSelect"></el-autocomplete>
						</el-form-item>
						<el-form-item v-show="!albumJurisdictionFlage">

						</el-form-item>
					</el-col>

					<el-col :span="20" :offset="1" style="display: flex;justify-content:flex-start;">

						<el-form-item label="唱片公司" prop="company" style="margin-left: 26px;" v-show="companyJurisdictionFlage">
							<el-autocomplete class="inline-input" v-model="formInline.company" :fetch-suggestions="querySearch1" placeholder="无"
							 @select="handleSelect1"></el-autocomplete>
						</el-form-item>

					</el-col>
					<el-col :span="20" :offset="1" style="display: flex;justify-content:flex-start;flex-direction: column;">
						<div>
							<i style="color: #c0c4cc;margin-right: 5px;">1.</i><i style="color: #c0c4cc;font-size: 10px;font-style: normal;">若一首歌有多个歌手，则以“名字+名字”格式录入，例如林俊杰+阿Sa
								;</i>
						</div>
						<div v-show="albumJurisdictionFlage">
							<i style="color: #c0c4cc;margin-right: 5px;">2.</i><i style="color: #c0c4cc;font-size: 10px;font-style: normal;">若歌曲为非专辑音乐属性,
								专辑名称请选择“无”或不填写;</i>
						</div>
						<div v-show="companyJurisdictionFlage">
							<i style="color: #c0c4cc;margin-right: 5px;">3.</i><i style="color: #c0c4cc;font-size: 10px;font-style: normal;">若歌曲无唱片公司属性,
								唱片公司请选择“无”或不填写;</i>
						</div>
					</el-col>
					<el-col :span="22" :offset="1">
						<i style="display: block;width: 100%;height: 1px;border-top: 1px solid #efeded;margin: 20px 0;"></i>
					</el-col>
					<el-col>
						<h1 style="color: #666666;margin-left: 20px;">文件信息</h1>
					</el-col>
					<el-col :span="22" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
						<div>
							<h3 style="color: #666666;">画面</h3>
							<el-radio-group v-model="formInline.picture" style="margin-left: 20px;">
								<el-radio :label="4"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MTV </i></el-radio>
								<el-radio :label="1"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">LIVE </i></el-radio>
								<el-radio :label="2"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">舞曲 </i></el-radio>
								<el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">配置画面</i></el-radio>
								<!--<el-radio :label="4"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MTV</i></el-radio>-->

							</el-radio-group>
						</div>
						<div>
							<h3 style="color: #666666;">原唱声轨</h3>
							<el-radio-group v-model="formInline.voice_track" style="margin-left: 20px;">
								<el-radio :label="0"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第1声轨</i></el-radio>
								<el-radio :label="1"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第2声轨</i></el-radio>
								<el-radio :label="2"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">左声道</i></el-radio>
								<el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">右声道</i></el-radio>
							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="22" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
						<div>
							<h3 style="color: #666666;">声音版本</h3>
							<el-radio-group v-model="formInline.voice_type" style="margin-left: 20px;">
								<el-radio :label="1"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">原版伴奏</i></el-radio>
								<el-radio :label="0"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">消音</i></el-radio>
								<el-radio :label="2"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">演唱会</i></el-radio>
								<el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">remix</i></el-radio>
								<el-radio :label="4"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">其他</i></el-radio>

							</el-radio-group>
						</div>
						<div>
							<h3 style="color: #666666;">伴唱声轨</h3>
							<el-radio-group v-model="formInline.vocal_track" style="margin-left: 20px;">
								<el-radio :label="0"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第1声轨</i></el-radio>
								<el-radio :label="1"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第2声轨</i></el-radio>
								<el-radio :label="2"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">左声道</i></el-radio>
								<el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">右声道</i></el-radio>
								<!--<el-radio :label="4"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">无</i></el-radio>-->
							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="22" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
						<div>
							<h3 style="color: #666666;">格式</h3>
							<el-radio-group v-model="formInline.format_type" style="margin-left: 20px;">
								<el-radio :label="1"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">DVD</i></el-radio>
								<el-radio :label="0"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">高清</i></el-radio>
								<el-radio :label="2"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MP4</i></el-radio>
								<el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MKV</i></el-radio>

							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="22" :offset="1">
						<i style="display: block;width: 100%;height: 1px;border-top: 1px solid #efeded;margin: 20px 0;"></i>
					</el-col>
					<el-col :span="22" :offset="1">
						<el-button size="mini" @click="resetForm('formInline')" style="margin-bottom: 150px;">重置</el-button>
						<el-button type="primary" size="mini" @click="submitForm('formInline')">保存</el-button>
					</el-col>
				</el-form>
			</el-row>
		</div>

	</div>
</template>

<script>
	const fs = require("fs")
	const filename = `${__dirname}/../../assets/data.json`;
	import {
		patch,
		get,
		put,
		post
	} from '../api.js'

	export default {
		data() {
			var validateSongName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请填写歌名'));
				} else {
					callback();
				}
			};
			var validateSingerName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('歌手名不能为空'));
				} else {
					callback();
				}
			};
			var validateLanguage = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请选择语言'));
				} else {
					callback();
				}
			};
			var validateAlbumName = (rule, value, callback) => {
				if (value.length > 20) {

					callback();
				} else {
					callback();
				}
			};
			var validateRecordCompany = (rule, value, callback) => {
				if (value.length > 20) {

					callback();
				} else {
					callback();
				}
			};
			var validateArea = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请选择曲风'));
				} else {
					callback();
				}
			};
			var validateSinger_type = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请选择歌手类型'));
				} else {
					callback();
				}
			};
			return {
				formInline: {
					name: "",
					singer: "",
					language: "",
					album: "",
					company: "",
					picture: '',
					vocal_track: '',
					voice_track: '',
					voice_type: '',
					format_type: '',
					area: "",
					singer_type: ""

				},
				albumJurisdictionFlage: true,
				companyJurisdictionFlage: true,
				height: "",
				restaurants: [],
				restaurants1: [],
				type: "",
				rules: {
					name: [{
						required: true,
						validator: validateSongName,
						trigger: ['blur', 'change']
					}],
					singer: [{
						required: true,
						validator: validateSingerName,
						trigger: ['blur', 'change']
					}],
					language: [{
						required: true,
						validator: validateLanguage,
						trigger: ['blur', 'change']
					}],
					album: [{
						validator: validateAlbumName,
						trigger: ['blur', 'change']
					}],
					company: [{
						validator: validateRecordCompany,
						trigger: ['change']
					}],
					area: [{
						required: true,
						validator: validateArea,
						trigger: ['blur', 'change']
					}],
					singer_type: [{
						required: true,
						validator: validateSinger_type,
						trigger: ['blur', 'change']
					}]
				},
				labelPosition: 'top',

			}
		},
		computed: {
			fileID() {
				return this.$route.query.fileID;
			}
		},
		methods: {
			submitForm(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.$route.query.page == 'LM') {
							this.LMsubmit()
						} else {
							this.SUsbbmit()
						}
					}
				})
			},
			LMsubmit() {
				var id = this.fileID
				switch (this.formInline.area) {
					case '大陆':
						send_data.area = 0;
						break;
					case '港台':
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
				}
				if (this.formInline.company == '无') {
					this.formInline.company == ''
				}
				if (this.formInline.album == '无') {
					this.formInline.album == ''
				}
				if (this.formInline.singer.length > 50) {
					this.formInline.singer = this.formInline.singer.substr(0, 50)
				}
				if (this.formInline.name.length > 50) {
					this.formInline.name = this.formInline.name.substr(0, 50)
				}
				if (this.formInline.company.length > 20) {
					this.formInline.company = this.formInline.company.substr(0, 20)
				}
				if (this.formInline.album.length > 20) {
					this.formInline.album = this.formInline.album.substr(0, 20)
				}
				var send_data = {
					name: this.formInline.name,
					singer: this.formInline.singer,
					album: this.formInline.album_id,
					company: this.formInline.company_id,
					language: this.formInline.language,
					picture: this.formInline.picture,
					format_type: this.formInline.format_type,
					voice_type: this.formInline.voice_type,
					voice_track: this.formInline.voice_track,
					vocal_track: this.formInline.vocal_track,
					area: this.formInline.area,
					singer_type: this.formInline.singer_type

				}
				console.log(send_data.company, this.formInline.company)
				var promisArr = []
				var _this = this;
				var p1;
				var p2;
				if (!send_data.company) {
					var str = _this.formInline.company;
					var arr = _this.restaurants1;
					var flage = true;
					arr.map(function(item) {
						console.log(item.value)
						if (item.value == str) {
							flage = false;
							send_data.company = item.id
							return;
						}
					})

					if (flage && _this.formInline.company != "" && _this.formInline.company != "无") {

						p1 = new Promise(function(resolve, reject) {
							var send_company = {
								name: _this.formInline.company,
								is_publish: 0
							}
							post("/music/music/company", send_company).then(function(res) {
								//console.log(res.data.id,"Company")
								send_data.company = res.data.id
								resolve('成功了')
							}).catch(error => {
								reject("失败了")
							})
						})
						promisArr.push(p1)
					}
				}
				// 										

				if (!send_data.album) {
					var str = _this.formInline.album;
					var arr = _this.restaurants;
					var flage = true;
					console.log(str, arr)
					arr.map(function(item) {
						if (item.value == str && str != '') {
							flage = false;
							send_data.album = item.id
							return;
						}
					})
					if (flage && _this.formInline.album != "" && _this.formInline.album != "无") {
						p2 = new Promise(function(resolve, reject) {
							var send_album = {
								name: _this.formInline.album,
								is_publish: 0
							}
							post("/music/music/album", send_album).then(function(res) {
								//console.log(res,"album")
								send_data.album = res.data.id
								resolve('成功了')
							}).catch(error => {
								reject("失败了")
							})
						})
						promisArr.push(p2)
					}

				}
				//console.log(promisArr)
				Promise.all(promisArr).then(function(res) {
					//console.log(res)
					console.log(send_data)
					patch('/music/music/store/' + id + '', send_data).then(function(res) {
						//console.log(res)
						if (res.status == 200) {
							_this.$notify({
								message: '保存成功！',
								type: 'success',
								offset: 60,
								duration: 1000,
							});
						}
						setTimeout(function() {

							_this.$router.back(-1)

						}, 1500)
					})
				})

			},
			SUsbbmit() {
				var _this = this;

				var id = _this.$route.query.fileID;
				var obj = {}
				for (var key in this.formInline) {
					obj[key] = this.formInline[key]
				}
				if (obj.company == '无') {
					obj.company == ''
				}
				if (obj.album == '无') {
					this.formInline.album == ''
				}
				switch (obj.picture) {
					case 4:
						obj.picture = "MTV";
						break;
					case 1:
						obj.picture = "LIVE";
						break;
					case 2:
						obj.picture = "舞曲";
						break;
					case 3:
						obj.picture = "配置画面";
						break;

				}
				switch (obj.format_type) {
					case 0:
						obj.format_type = "高清";
						break;
					case 1:
						obj.format_type = "DVD";
						break;
					case 2:
						obj.format_type = "MP4";
						break;
					case 3:
						obj.format_type = "MKV";
						break;

				}
				switch (obj.singer_type) {
					case 0:
						obj.singer_type = "男歌手";
						break;
					case 1:
						obj.singer_type = "女歌手";
						break;
					case 2:
						obj.singer_type = "组合";
						break;
					case 3:
						obj.singer_type = "合唱";
						break;
				}
				switch (obj.voice_track) {
					case 0:
						obj.voice_track = "1";
						break;
					case 1:
						obj.voice_track = "2";
						break;
					case 2:
						obj.voice_track = "左";
						break;
					case 3:
						obj.voice_track = "右";
						break;
				}
				switch (obj.vocal_track) {
					case 0:
						obj.vocal_track = "1";
						break;
					case 1:
						obj.vocal_track = "2";
						break;
					case 2:
						obj.vocal_track = "左";
						break;
					case 3:
						obj.vocal_track = "右";
						break;
				}
				switch (obj.voice_type) {
					case 0:
						obj.voice_type = "消音";
						break;
					case 1:
						obj.voice_type = "原版伴奏";
						break;
					case 2:
						obj.voice_type = "演唱会";
						break;
					case 3:
						obj.voice_type = "remix";
						break;
					case 4:
						obj.voice_type = "其他";
						break;
				}
				switch (obj.language) {
					case 0:
						obj.language = "国语";
						break;
					case 1:
						obj.language = "粤语";
						break;
					case 2:
						obj.language = "闽南语";
						break;
					case 3:
						obj.language = "英语";
						break;
					case 4:
						obj.language = "日语";
						break;
					case 5:
						obj.language = "韩语";
						break;
					case 6:
						obj.language = "其他";
						break;
				}
				switch (obj.area) {
					case 0:
						obj.area = "大陆";
						break;
					case 1:
						obj.area = "港台";
						break;
					case 2:
						obj.area = "日韩";
						break;
					case 3:
						obj.area = "欧美";
						break;
					case 4:
						obj.area = "其他";
						break;
				};

				if (obj.singer.length > 50) {
					obj.singer = obj.singer.substr(0, 50)
				}
				if (obj.name.length > 50) {
					obj.name = obj.name.substr(0, 50)
				}
				if (obj.company.length > 20) {
					obj.company = obj.company.substr(0, 20)
				}
				if (obj.album.length > 20) {
					obj.album = obj.album.substr(0, 20)
				}
				var str = obj.singer + "￥" + obj.name + "￥" + obj.singer_type + "￥" + obj.language + "￥" + obj.picture + "￥" + obj.area +
					"￥" + obj.voice_type + "￥" + obj.format_type + "￥" + obj.voice_track + "￥" + obj.vocal_track + "." + _this.type;
				var send_name = {
					name: [str]
				}
				var _this = this;
				post("/music/music/store-verification", send_name).then(function(res) {

					console.log(res)
					var status = res.data[0].status
					if (status == 0) {
						obj.status = 0;
						var send_data = {
							name:str
						}
						post("music/music/store-credential", send_data).then((res) => {
							console.log(obj)
							_this.$store.commit("changeData1", {
								fileID: id,
								content: obj,
								credential:res.data.credential,
								key:Base64.encode(res.data.key)
							})
							_this.$notify({
								message: '保存成功！',
								type: 'success',
								offset: 60,
								duration: 1000,
							});
							setTimeout(function() {

								_this.$router.back(-1)

							}, 1500)
						})
					}
					if (status == 3) {
						_this.chaxun(res.data[0], obj);
					}


				}).catch((err) => {
					_this.$notify({
						message: '保存失败！',
						type: 'error',
						offset: 60,
						duration: 1000,
					});
				})


			},
			chaxun(data, obj) {
				console.log(data.format_type, "format_type")
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
					case "MKV":
						send_data.format_type = 4;
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
				};
				console.log(send_data, "send_data")
				get("/music/music/store", send_data).then((res) => {
					console.log(res)
					if (res.data.results.length > 0) {

						this.$notify({
							message: '该版本歌曲已存在，请重新修改信息',
							type: 'error',
							offset: 120,
							duration: 3000,
						});
					} else {
						var id = this.$route.query.fileID;
						var _this = this;
						obj.status = 0;
						this.$store.commit("changeData1", {
							fileID: id,
							content: obj
						})
						console.log(obj, "pppppppppppppp")
						this.$notify({
							message: '保存成功！',
							type: 'success',
							offset: 60,
							duration: 1000,
						});
						setTimeout(function() {

							_this.$router.back(-1)

						}, 1500)

					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			querySearch(queryString, callback) {
				var restaurants = this.restaurants;
				// //console.log(this.restaurants,"ppllkkmm")
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				callback(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearch1(queryString, callback) {
				var restaurants = this.restaurants1;
				// ////console.log(this.restaurants,"ppllkkmm")
				var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				callback(results);
			},
			createFilter1(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},

			loadAllAlbum() {
				var _this = this;
				get("/music/music/album").then(function(res) {
					// ////console.log(res)
					var arr = res.data.results
					var arr1 = [{
						"value": "无",
						"id": ""
					}]
					var arr2 = []

					arr.map(function(item) {
						var obj = {
							'value': item.name,
							"id": item.id
						}
						if (obj.value == "天籁之战" || obj.value == "中国新歌声" || obj.value == "我是歌手" || obj.value == "抖音") {
							arr1.push(obj)
						} else {
							arr2.push(obj)
						}

					})
					arr1 = arr1.concat(arr2)
					_this.restaurants = arr1
					//console.log(arr1,"arr")
				}).catch(error => {
					if (error.data.error == "无权限") {
						_this.albumJurisdictionFlage = false
					}

				})
			},
			loadAllCompany() {
				var _this = this;
				get("/music/music/company").then(function(res) {
					////console.log(res)
					var arr = res.data.results
					var arr1 = [{
						"value": "无",
						"id": ""
					}]
					var arr2 = []


					arr.map(function(item) {
						var obj = {
							'value': item.name,
							"id": item.id
						}
						if (obj.value == "索尼" || obj.value == "杰威尔" || obj.value == "滚石" || obj.value == "超出") {
							arr1.push(obj)
						} else {
							arr2.push(obj)
						}

					})
					arr1 = arr1.concat(arr2)
					_this.restaurants1 = arr1
					////console.log(arr1,"arr")
				}).catch(error => {
					if (error.data.error == "无权限") {
						_this.companyJurisdictionFlage = false;
					}
				})
			},
			handleSelect(item) {
				// //console.log(item.value)
				this.formInline.album = item.value;
				this.formInline.album_id = item.id
				////console.log( this.formInline)
			},
			handleSelect1(item) {
				// //console.log(item)
				this.formInline.company = item.value;
				this.formInline.company_id = item.id
			},
			getFileData(id) {
				////console.log(id,"ppp[[]]")
				var _this = this;
				if (this.$route.query.page == 'LM') {
					////console.log("LM")
					get('/music/music/store/' + id + '').then(function(res) {
						////console.log(res)
						var data = res.data;

						//console.log(data)
						for (var key in data) {
							if (data[key] == null) {
								_this.formInline[key] = ""
							} else {
								_this.formInline[key] = data[key]

							}
						}
						if (data.album != null) {
							_this.formInline.album = data.album.name
						}
						if (data.company != null) {
							_this.formInline.company = data.company.name
						}
						switch (_this.formInline.picture) {
							case 4:
								_this.formInline.picture = 4;
								break;
							case 5:
								_this.formInline.picture = 4;
								break;
						}
						switch (_this.formInline.vocal_track) {
							case 4:
								_this.formInline.vocal_track = 0;
								break;
						}
						switch (_this.formInline.voice_track) {
							case 4:
								_this.formInline.voice_track = 0;
								break;
						}
						switch (_this.formInline.voice_type) {
							case 4:
								_this.formInline.voice_type = 1;
								break;
						}
						switch (_this.formInline.format_type) {
							case 3:
								_this.formInline.format_type = 1;
								break;
						}
						switch (_this.formInline.singer_type) {
							case 4:
								_this.formInline.singer_type = 0;
								break;
						}
						switch (_this.formInline.area) {
							case 4:
								_this.formInline.area = 4;
								break;
						}
					})
				} else if (this.$route.query.page == 'SU') {
					

					var data = [...this.$store.state.Counter.data1]
					console.log(data)

					data.map(function(item) {
						if (item.id == id) {
						
							_this.type = item.type
							for (var key in item.content) {
								_this.formInline[key] = item.content[key]
							}
							
							switch (_this.formInline.language) {
								case "国语":
									_this.formInline.language = 0;
									break;
								case "粤语":
									_this.formInline.language = 1;
									break;
								case "闽南语":
									_this.formInline.language = 2;
									break;
								case "英语":
									_this.formInline.language = 3;
									break;
								case "日语":
									_this.formInline.language = 4;
									break;
								case "韩语":
									_this.formInline.language = 5;
									break;
								default:
									_this.formInline.language = 0;

							}
							switch (_this.formInline.area) {
								case "大陆":
									_this.formInline.area = 0;
									break;
								case "港台":
									_this.formInline.area = 1;
									break;
								case "日韩":
									_this.formInline.area = 2;
									break;
								case "欧美":
									_this.formInline.area = 3;
									break;
								case "其他":
									_this.formInline.area = 4;
									break;
								default:
									_this.formInline.area = 0;

							}
							switch (_this.formInline.singer_type) {
								case "男歌手":
									_this.formInline.singer_type = 0;
									break;
								case "女歌手":
									_this.formInline.singer_type = 1;
									break;
								case "组合":
									_this.formInline.singer_type = 2;
									break;
								case "合唱":
									_this.formInline.singer_type = 3;
									break;
								case "无":
									_this.formInline.singer_type = 0;
									break;
								default:
									_this.formInline.singer_type = 0;

							}
							switch (_this.formInline.picture) {
								case "MTV":
									_this.formInline.picture = 4;
									break;
								case "LIVE":
									_this.formInline.picture = 1;
									break;
								case "舞曲":
									_this.formInline.picture = 2;
									break;
								case "配置画面":
									_this.formInline.picture = 3;
									break;
								default:
									_this.formInline.picture = 4;

							}
							switch (_this.formInline.voice_track) {
								case "1":
									_this.formInline.voice_track = 0;
									break;
								case "2":
									_this.formInline.voice_track = 1;
									break;
								case "左":
									_this.formInline.voice_track = 2;
									break;
								case "右":
									_this.formInline.voice_track = 3;
									break;
								default:
									_this.formInline.voice_track = 0;
							}
							switch (_this.formInline.vocal_track) {
								case "1":
									_this.formInline.vocal_track = 0;
									break;
								case "2":
									_this.formInline.vocal_track = 1;
									break;
								case "左":
									_this.formInline.vocal_track = 2;
									break;
								case "右":
									_this.formInline.vocal_track = 3;
									break;
								default:
									_this.formInline.vocal_track = 0;
							}
							switch (_this.formInline.voice_type) {
								case "消音":
									_this.formInline.voice_type = 0;
									break;
								case "原版伴奏":
									_this.formInline.voice_type = 1;
									break;
								case "演唱会":
									_this.formInline.voice_type = 2;
									break;
								case "remix":
									_this.formInline.voice_type = 3;
									break;
								case "其他":
									_this.formInline.voice_type = 4;
									break;
								default:
									_this.formInline.voice_type = 1;
							}
							switch (_this.formInline.format_type) {
								case "高清'":
									_this.formInline.format_type = 0;
									break;
								case "DVD":
									_this.formInline.format_type = 1;
									break;
								case "MP4":
									_this.formInline.format_type = 2;
									break;
								case "MKV":
									_this.formInline.format_type = 4;
									break;
								default:
									_this.formInline.format_type = 1;

							}
						}
					})

				}

			}
		},
		mounted() {
			this.loadAllAlbum();
			this.loadAllCompany();
			this.getFileData(this.fileID)
			var _this = this;
			window.onresize = function() {
				//console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height = "height:" + (document.body.clientHeight - 80) + "px"
				}, 2)
			}
		}
	}
</script>

<style>
	#editPage {

		width: 100%;
		height: 100%;
		text-align: left;
		overflow: hidden;
		/*background: yellow;*/
		margin-right: 5px;
		display: flex;
		box-sizing: border-box;
	}

	#editPage .box {
		overflow: auto;
		flex: 1;
		/*background: yellow;*/
		/*display: none;*/
		margin-right: 5px;
		/**/
	}

	#editPage .el-form-item__label {

		color: #666666;
		margin-left: -28px;
		font-weight: 600;

	}

	#editPage .el-form-item__content {
		width: 250px;
	}

	#editPage .el-select--mini {
		width: 250px;
	}

	#editPage .el-autocomplete {
		width: 250px;
	}

	.el-select-dropdown__list .el-select-dropdown__item {
		font-size: 14px;
	}

	.el-autocomplete-suggestion .el-autocomplete-suggestion__wrap .el-autocomplete-suggestion__list li {
		font-size: 14px;
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
