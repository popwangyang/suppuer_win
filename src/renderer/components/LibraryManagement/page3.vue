<template>
	<div id="editPage">
		<div class="box" :style="height" id="scroll-1">
			<el-row>
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
								<el-option 
								:label="item.label" 
								:value="item.value" 
								 v-for="(item, index) in songInfoData.language" 
								:key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="20" :offset="1" style="display: flex;justify-content:space-around;">
						<el-form-item label="歌手类型" prop="singer_type">
							<el-select v-model="formInline.singer_type" placeholder="无">
								<el-option 
								:label="item.label" 
								:value="item.value" 
								 v-for="(item, index) in songInfoData.singer_type" 
								:key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地区" prop="area">
							<el-select v-model="formInline.area" placeholder="无">
								<el-option 
								:label="item.label" 
								:value="item.value" 
								 v-for="(item, index) in songInfoData.area" 
								:key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专辑名称" prop="album" v-show="albumJurisdictionFlage">
							<el-autocomplete class="inline-input" v-model="formInline.album" :fetch-suggestions="querySearch" placeholder="无"
							 @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="20" :offset="1" style="display: flex;justify-content:space-around;">
						<el-form-item label="唱片公司" prop="company"  v-show="companyJurisdictionFlage">
							<el-autocomplete class="inline-input" v-model="formInline.company" :fetch-suggestions="querySearch1" placeholder="无"
							 @select="handleSelect1"></el-autocomplete>
						</el-form-item>
						<el-form-item></el-form-item>
						<el-form-item></el-form-item>
					</el-col>
					<el-col :span="20" :offset="1" style="display: flex;justify-content:flex-start;flex-direction: column;">
						<div>
							<i style="color: #c0c4cc;margin-right: 5px;">1.</i><i style="color: #c0c4cc;font-size: 10px;font-style: normal;">若一首歌有多个歌手，则以“名字+名字”格式录入，例如林俊杰+阿Sa;</i>
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
								<el-radio 
								:label="item.value" 
								 v-for="(item, index) in songInfoData.picture" 
								:key='index'>
									<i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">{{item.label}}</i>
							    </el-radio>
							</el-radio-group>
						</div>
						<div>
							<h3 style="color: #666666;">原唱声轨</h3>
							<el-radio-group v-model="formInline.voice_track" style="margin-left: 20px;">
								<el-radio 
								:label="item.value" 
								 v-for="(item, index) in songInfoData.voice_track" 
								:key='index'>
									<i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">{{item.label | filterLabel}}</i>
								</el-radio>
							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="22" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
						<div>
							<h3 style="color: #666666;">声音版本</h3>
							<el-radio-group v-model="formInline.voice_type" style="margin-left: 20px;">
								<el-radio 
								:label="item.value" 
								 v-for="(item, index) in songInfoData.voice_type" 
								:key='index'>
									<i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">{{item.label}}</i>
								</el-radio>
							</el-radio-group>
						</div>
						<div>
							<h3 style="color: #666666;">伴唱声轨</h3>
							<el-radio-group v-model="formInline.vocal_track" style="margin-left: 20px;">
							    <el-radio 
							    :label="item.value" 
							     v-for="(item, index) in songInfoData.vocal_track" 
							    :key='index'>
							    	<i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">{{item.label | filterLabel}}</i>
							    </el-radio>
							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="22" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
						<div>
							<h3 style="color: #666666;">格式</h3>
							<el-radio-group v-model="formInline.format_type" style="margin-left: 20px;">
								<el-radio 
								:label="item.value" 
								 v-for="(item, index) in songInfoData.format_type" 
								:key='index'>
									<i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">{{item.label}}</i>
								</el-radio>

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
	import config from '../../config'
	import { blackBox, chaxun, updateStoreDB } from '../util'
	import { Loading } from 'element-ui';
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
				loadingInstance: null,
				songInfoData: config.songInfoData,
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
		filters: {
			filterLabel: (value) => {
				let result = null;
					if(value == '1'){
						result = "第一声轨"
					}else if(value == '2'){
						result = "第二声轨"
					}else{
						result = value;
					}
				return result;
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
				var promisArr = []
				var p1;
				var p2;
				if (!send_data.company) {
					var str = this.formInline.company;
					var arr = this.restaurants1;
					var flage = true;
					arr.map(function(item) {
						console.log(item.value)
						if (item.value == str) {
							flage = false;
							send_data.company = item.id
							return;
						}
					})

					if (flage && this.formInline.company != "" && this.formInline.company != "无") {

						p1 = new Promise(function(resolve, reject) {
							var send_company = {
								name: this.formInline.company,
								is_publish: 0
							}
							post("/music/music/company", send_company).then(function(res) {
								send_data.company = res.data.id
								resolve('成功了')
							}).catch(error => {
								reject("失败了")
							})
						})
						promisArr.push(p1)
					}
				}
				if (!send_data.album) {
					var str = this.formInline.album;
					var arr = this.restaurants;
					var flage = true;
					console.log(str, arr)
					arr.map(function(item) {
						if (item.value == str && str != '') {
							flage = false;
							send_data.album = item.id
							return;
						}
					})
					if (flage && this.formInline.album != "" && this.formInline.album != "无") {
						p2 = new Promise(function(resolve, reject) {
							var send_album = {
								name: this.formInline.album,
								is_publish: 0
							}
							post("/music/music/album", send_album).then(function(res) {
								send_data.album = res.data.id
								resolve('成功了')
							}).catch(error => {
								reject("失败了")
							})
						})
						promisArr.push(p2)
					}

				}
				Promise.all(promisArr).then((res) => {
					patch('/music/music/store/' + id + '', send_data).then((res) => {
						if (res.status == 200) {
							this.$notify({
								message: '保存成功！',
								type: 'success',
								offset: 60,
								duration: 1000,
							});
						}
						setTimeout(() => {
							this.$router.back(-1)
						}, 1500)
					})
				})

			},
			SUsbbmit() {
				var id = this.$route.query.fileID;
				var obj = {}
				for (var key in this.formInline) {
					obj[key] = blackBox(key, this.formInline[key], 'value')
				}
				console.log(obj, this.formInline)
				if (obj.company == '无') {
					obj.company == ''
				}
				if (obj.album == '无') {
					this.formInline.album == ''
				}
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
					"￥" + obj.voice_type + "￥" + obj.format_type + "￥" + obj.voice_track + "￥" + obj.vocal_track + "." + this.type;
				var send_name = {
					name: [str]
				}
				post("/music/music/store-verification", send_name).then((res) => {
					var status = res.data[0].status
					if (status == 0) {
						obj.status = 0;
						var send_data = {
							name:str
						}
						this.$store.commit("setData", {
							fileID: id,
							content: obj
						})
						updateStoreDB(this, [id], 'content', obj);
						this.$notify({
							title: '提示',
							message: '保存成功！',
							type: 'success',
							offset: 60,
							duration: 1000,
						});
						setTimeout(() => {
							this.$router.back(-1)
						}, 1500)
					}
					if (status == 3) {
						chaxun(res.data[0], (results) => {
							if(results.length > 0){
								this.$notify({
									title: '提示',
									message: '系统已存在该版本的歌曲',
									type: 'error',
									offset: 120,
									duration: 2000,
								});
							}else{
								var id = this.$route.query.fileID;
								obj.status = 3;
								this.$store.commit("setData", {
									fileID: id,
									content: obj
								})
								updateStoreDB(this, id, 'content', obj);
								this.$notify({
									message: '保存成功！',
									type: 'success',
									offset: 60,
									duration: 1000,
								});
								setTimeout(() => {
									this.$router.back(-1)
								}, 1500)
							}
						});
					}
				}).catch((err) => {
					this.$notify({
						message: '保存失败！',
						type: 'error',
						offset: 60,
						duration: 1000,
					});
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			querySearch(queryString, callback) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				callback(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearch1(queryString, callback) {
				var restaurants = this.restaurants1;
				var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
				callback(results);
			},
			createFilter1(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			loadAllAlbum() {
				return new Promise((resolve, reject) => {
					get("/music/music/album").then(res => {
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
						this.restaurants = arr1
						resolve(true)
					}).catch(error => {
						if (error.data.error == "无权限") {
							this.albumJurisdictionFlage = false
						}
						reject(false)
					})
				})
			},
			loadAllCompany() {
				return new Promise((resolve, reject) => {
					get("/music/music/company").then(res => {
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
						this.restaurants1 = arr1
						resolve(true);
					}).catch(error => {
						if (error.data.error == "无权限") {
							this.companyJurisdictionFlage = false;
						}
						reject(false);
					})
				})
			},
			handleSelect(item) {
				this.formInline.album = item.value;
				this.formInline.album_id = item.id
			},
			handleSelect1(item) {
				this.formInline.company = item.value;
				this.formInline.company_id = item.id
			},
			getFileData(id) {
				if (this.$route.query.page == 'LM') {
					get('/music/music/store/' + id + '').then(res => {
						var data = res.data;
						for (var key in data) {
							if (data[key] == null) {
								this.formInline[key] = ""
							} else {
								this.formInline[key] = data[key]
							}
						}
						this.formInline.album = data.album != null ?  data.album.name:'';
						this.formInline.company = data.company != null ? data.company.name:'';
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
						  this.loadingInstance.close();
						});
					})
				} else if (this.$route.query.page == 'SU') {
					var data = this.$store.state.SongUpload.songNumbers;
					data.map(item => {
						if (item.id == id) {
							this.type = item.type
							for (var key in this.formInline) {
								this.formInline[key] = blackBox(key, item.content[key], 'label')
							}
						}
					})
					this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
					  this.loadingInstance.close();
					});
				}
			},
			async init(){
				let options = {
					target: document.getElementById('editPage'),
					lock: true,
				    text: 'Loading',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.7)'
				}
				this.loadingInstance = Loading.service(options);
				await this.loadAllAlbum();
				await this.loadAllCompany();
				this.getFileData(this.fileID)
			}
		},
		mounted() {
			this.init()
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

</style>
