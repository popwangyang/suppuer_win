<template>
	<div id="SignIn" :style="note">
		<div class="head">
			<div style="width: 900px;height: 100px;float: left;-webkit-app-region: drag"></div>
			<div style="width: 124px;height: 30px;float: left;-webkit-app-region: drag"></div>
			<div style="width: 124px;height: 30px;float: left;margin-top: 40px;-webkit-app-region: drag"></div>
		</div>
		<span class="head_span">
			<i class="iconfont icon-subtract tubiao" @click="min"></i>
			<i class="iconfont icon-close tubiao" @click="close"></i>
		</span>
		<div class="section">
			<span class="section_left">
				<div class="section_left_div">
					<img src="../assets/sigin_banner.png" style="width: 100%;height: 100%;" />
				</div>
				<!--<img src="../assets/sigin_banner.png" style="width: 100%;height: 100%;"/>-->
			</span>
			<span class="section_right">
				<div class="section_right_div" v-if="stepPassworld == '1'">
					<h2 style="color: #5a5a5a;margin-bottom: 30px;">鲸唱云音乐</h2>
					<!-- <p style="margin-bottom: 0;color: #929292;">我是一句看起来很长的Log</p> -->
					<span class="section_right_div_span1">
						<span>
							<input type="email" v-model="user" placeholder="账号" />
						</span>
						<span>
							<input type="password" v-model="password" placeholder="密码" />
						</span>
					</span>
					<span class="section_right_div_span2">
						<el-checkbox v-model="checked" @change='automaticLogon'>自动登录</el-checkbox>
						<el-button type="text" @click="forgetPassword" :disabled="forgetPasswordFlage">忘记密码</el-button>
					</span>
					<el-button type="primary" size="medium" :disabled="dengluChecked" style="width: 100%;" @click='denglu' id="dengluID"
					 :loading="signInLoading">登录</el-button>
					<!--<el-button type="primary" size="medium" style="width: 100%;" @click='foo'>登录1</el-button>-->
				</div>
				<div class="section_right_div" v-if="stepPassworld == '2'">
					<h2 style="color: #5a5a5a;">忘记密码</h2>
					<span class="section_right_div_span1">
						<span>
							<input type="email" v-model="email2" placeholder="请输入邮箱" @input="inputEmail2" />
						</span>
						<span>
							<input type="text" v-model="yanzhengNumber" style="margin-right: 30px;" placeholder="请输入验证码" @input="inputNumber" />
							<el-button size="mini" type="primary" style="height: 30px;padding: 7px 7px;" v-show="newTextFlage == '2'" @click="getVerifyingCode"
							 :loading="newTextLoading">获取验证码</el-button>
							<el-button size="mini" type="info" style="height: 30px;padding: 7px 7px;" v-show="newTextFlage == '1'" :disabled="true">获取验证码</el-button>
							<span v-show="newTextFlage == '3'" style="border-bottom:none;font-size: 14px;width: 40px;">{{newTextTime}}</span>
						</span>

					</span>
					<el-button type="primary" size="medium" style="width: 100%;margin-top: 50px;margin-left: 0;" @click="modifyFun2"
					 v-show="modifyBtn2" :loading="modifyFun2loading">确定</el-button>
					<el-button type="info" size="medium" style="width: 100%;margin-top: 50px;margin-left: 0;" :disabled="true" v-show="!modifyBtn2">确定</el-button>
					<!-- <el-button type="text">上一步</el-button> -->
					<el-button type="text" @click="backLogin">已有账号？登录</el-button>

				</div>


				<div class="section_right_div" v-if="stepPassworld == '3'">
					<h2 style="color: #5a5a5a;">新密码设置</h2>
					<span class="section_right_div_span1">
						<span>
							<input type="password" v-model="password3" placeholder="请输入6-20位数字和字母组合" />
						</span>
						<span>
							<input type="password" v-model="password4" placeholder="再次输入密码" />
							<!--<el-button size="mini" type="primary" style="height: 30px;padding: 7px 7px;" v-show="newTextFlage" @click="getVerifyingCode">获取验证码</el-button>
												<el-button size="mini" type="info" style="height: 30px;padding: 7px 7px;" v-show="!newTextFlage" :disabled="true">获取验证码</el-button>-->
						</span>

					</span>
					<el-button type="primary" size="medium" style="width: 100%;margin-top: 50px;margin-left: 0;" @click="modifyFun3"
					 v-show="modifyBtn3">确定</el-button>
					<el-button type="info" size="medium" style="width: 100%;margin-top: 50px;margin-left: 0;" :disabled="true" v-show="!modifyBtn3">确定</el-button>
					<el-button type="text" @click="backLogin">已有账号？登录</el-button>
				</div>
			</span>
		</div>
		<el-dialog title="提示" :visible.sync="dialogVisible" custom-class="DELECT" top='25vh' width="30%">
			<span><i class="el-icon-warning" style="color: orange;margin-right: 10px;"></i>你好，该邮箱尚未注册，请联系管理员进行重置密码。</span>
			<span slot="footer" class="dialog-footer">

				<el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	const ipcRenderer = require('electron').ipcRenderer;
	const session = require('electron').remote.session;
	import {
		login,
		get,
		post,
		patch,
		put
	} from './api'
	import Img from '../assets/SignIn.png'
	export default {
		data() {
			return {
				stepPassworld: "1",
				checked: false,

				setPasswordFlage: false,
				dialogVisible: false,
				user: "",
				password: "",
				email2: "",
				yanzhengNumber: "",
				newTextFlage: '1',
				verificationCode: "",
				modifyBtn2: false,
				mac: "",
				newTextLoading: false,
				newTextTime: "60S",
				signInLoading: false,
				CItime: "",
				modifyFun2loading: false,
				password3: "",
				password4: "",
				note: {
					backgroundImage: "url(" + require("../assets/SignInBackground.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover"

				},
			}
		},
		computed: {
			dengluChecked: function() {
				if (this.user != "" && this.password != "") {
					return false
				} else {
					return true
				}
			},
			modifyBtn3: function() {
				if (this.password3 != "" && this.password4 != "") {
					return true;
				} else {
					return false;
				}
			},
			forgetPasswordFlage: function() {
				if (localStorage.getItem("UserInformation")) {
					return false;
				} else {
					return true;
				}
			}
		},
		methods: {
			getVerifyingCode() {
				var _this = this;
				var send_username = {
					"username": this.email2
				}
				this.newTextLoading = true;


				get("music/perm/verification-code", send_username)
					.then(res => {
						console.log(res)
						if (res.status == 200) {
							var i = 60
							_this.newTextLoading = false;
							// _this.verificationCode = res.data.info
							_this.newTextFlage = '3';
							_this.$message({
								showClose: true,
								message: '验证码已发送至邮箱，请查收',
								type: 'success'
							});

							_this.CItime = setInterval(function() {
								i--;
								// var fen = Math.floor(i / 60);
								// var miao = i % 60 >9 ? i % 60 : "0"+i % 60;
								_this.newTextTime = i + "S";
								if (i == 0) {
									_this.newTextFlage = "2"
									clearInterval(_this.CItime)
								}
							}, 1000)
						}
					})
					.catch(function(error) {
						_this.newTextLoading = false;
						if (error.data.error == "邮箱账号不存在，请联系系统管理员") {
							_this.dialogVisible = true;
						}
						console.log(error)
					});
			},
			modifyFun2() {
				// this.stepPassworld = '3'
				var _this = this;
				var send_data = {
					username: this.email2,
					code: this.yanzhengNumber
				}

				this.modifyFun2loading = true
				console.log(send_data)
				post("music/perm/verification-code", send_data).then(function(res) {
					_this.modifyFun2loading = false
					_this.stepPassworld = '3'
					_this.newTextFlage = "1"
					clearInterval(_this.CItime)
					_this.newTextTime = "10:00"
				}).catch(function(error) {
					_this.modifyFun2loading = false
					if (error.data.error == "验证码不正确") {
						_this.$message({
							showClose: true,
							message: '验证码错误',
							type: 'error'
						});
					}
				})

			},
			modifyFun3() {
				let password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z]{6,20}$/;
				var state = 0;
				var _this = this;
				if (!password.test(this.password3)) {
					state = 1;
				} else {
					if (this.password3 != this.password4) {
						state = 2;
					} else {
						state = 3;
					}
				}
				console.log(state)
				if (state == 1) {
					this.$message({
						showClose: true,
						message: '请输入6-20位数字和字母组合',
						type: 'warning'
					});
				}
				if (state == 2) {
					this.$message({
						showClose: true,
						message: '两次输入的密码不相同',
						type: 'warning'
					});
				}
				if (state == 3) {
					var user_id = localStorage.getItem('user_id')
					var password_origin = JSON.parse(localStorage.getItem('UserInformation')).password
					var send_data = {
						"code": this.yanzhengNumber,
						"password": this.password3,
						"username": this.email2
					}
					console.log(send_data, user_id)
					put("music/perm/password-reset-self", send_data).then(function(res) {
						console.log(res.data.info)
						if (res.data.info == "密码修改成功") {
							_this.$message({
								showClose: true,
								message: '密码修改成功',
								type: 'success'
							});

							var obj = JSON.parse(localStorage.getItem('UserInformation'))
							if (obj.user == _this.email2) {
								obj.password = _this.password3
								var str = JSON.stringify(obj)
								localStorage.setItem("UserInformation", str)
								// console.log("HHHHHH")
							}

							_this.stepPassworld = '1'
							_this.user = obj.user;
							_this.password = obj.password;
							_this.email2 = '';
							_this.yanzhengNumber = "";
							_this.password3 = "";
							_this.password4 = "";
						}


					}).catch(error => {
						console.log(error.error, "ooooooooooooo")
						_this.$message({
							showClose: true,
							message: '密码修改失败',
							type: 'error'
						});
						_this.stepPassworld = '1'
					})
				}

			},
			backLogin() {
				this.stepPassworld = "1";
				if (this.CItime) {

					clearInterval(this.CItime)
					this.newTextTime = "60S";

				}
				this.modifyBtn2 = false;
				this.email2 = "";
				this.yanzhengNumber = "";
				this.newTextFlage = '1';
				this.password3 = "";
				this.password4 = "";
			},
			inputNumber() {
				console.log(this.yanzhengNumber, this.newTextFlage)
				if (this.yanzhengNumber != "" && this.newTextFlage == '3') {
					this.modifyBtn2 = true
				}
			},
			inputEmail2() {
				var par = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if (this.newTextFlage != "3") {
					if (par.test(this.email2)) {
						this.newTextFlage = "2"
					} else {
						this.newTextFlage = "1"
					}
				}

			},

			hloo(e) {
				console.log(e.keyCode)
			},
			denglu() {
				this.signInLoading = true;
				var send_data = {
					"username": this.user,
					"password": this.password,
					"mac": localStorage.getItem('mac')
				}
				var _this = this;
				login('/music/api-token-auth/', send_data).then(res => {
						// console.log(res.data.user.id)
						if (res.status == 200) {
							console.log(res.data.user.code.indexOf("GY"))
							if (res.data.user.code.indexOf("GY") != -1) {
								localStorage.setItem('token', res.data.token)
								var date = new Date()
								console.log(res.data.user.id)
								var obj = {
									user: this.user,
									password: this.password,
									time: date.getTime(),
									user_id: res.data.user.id
								}
								console.log(obj)
								localStorage.setItem("user_id", res.data.user.id)
								var str = JSON.stringify(obj)
								this.$store.commit("RouteInitialization")
								localStorage.setItem("UserInformation", str)

								this.$router.push("/Main")

								this.signInLoading = false;
								ipcRenderer.send('window-login', this.user)
							} else {
								_this.signInLoading = false;
								_this.$message({
									showClose: true,
									message: "请填写正确的账号",
									type: 'error'
								});
							}

						}
					})
					.catch(function(error) {
						_this.signInLoading = false;
						var str = error.data.non_field_errors[0] == "Unable to log in with provided credentials." ? "密码错误" : error.data.non_field_errors[
							0];
						console.log()
						_this.$message({
							showClose: true,
							message: str,
							type: 'error'
						});
					})


			},
			foo() {
				var data = localStorage.getItem('UserInformation')
				var timeNew = new Date().getTime()
				var num = 15 * 1000 * 24 * 60 * 60
				if (data) {
					var timeOld = JSON.parse(data).time
					var timeCha = timeNew - timeOld
					var flage = localStorage.getItem("automaticLogon") == "1" ? true : false;
					this.checked = flage;
					if (timeCha < num) {
						this.user = JSON.parse(data).user
						if (!flage) {
							this.password = ""
						} else {
							this.password = JSON.parse(data).password
						}
					}
					var obj = {
						user: this.user,
						password: this.password,
						time: timeNew
					}
					var str = JSON.stringify(obj)
					localStorage.setItem("UserInformation", str)
					var send_data = {
						"username": this.user,
						"password": JSON.parse(data).password,
						"mac": localStorage.getItem('mac')
					}
					var str = this.$route.query.index;
					if (flage && !str) {
						login("/music/api-token-auth/", send_data).then(res => {
								if (res.status == 200) {
									localStorage.setItem('token', res.data.token)
									this.checked = true
									this.$router.push("/Main")
									ipcRenderer.send('window-login', this.user)
								}
							})
							.catch(function(error) {
								console.log("登录失败")
								_this.$message({
									showClose: true,
									message: '登录失败',
									type: 'error'
								});
							})
					}

				} else {
					localStorage.removeItem('UserInformation')
				}
			},
			min() {
				ipcRenderer.send('window-minSize')
			},
			close() {
				ipcRenderer.send('window-close')
			},
			automaticLogon(flage) {
				if (flage) {
					localStorage.setItem('automaticLogon', '1')
					localStorage.removeItem("clearPassWord")
				} else {
					localStorage.setItem('automaticLogon', '0')
					localStorage.setItem('clearPassWord', '1')
				}

			},
			clearPassWord() {
				localStorage.setItem('clearPassWord', '1')
				this.password = ""
				this.checked = false
				localStorage.removeItem("automaticLogon")
			},
			forgetPassword() {
				this.stepPassworld = '2'
				this.email2 = "";
				this.yanzhengNumber = "";
			},
			getMac() {
				var mac = ipcRenderer.sendSync('synchronous-message', 'mac')
				// console.log(mac)
				localStorage.setItem("mac", mac)
			},
			getVersion() {
				var version = ipcRenderer.sendSync('synchronous-message', 'version')
				localStorage.setItem("version", version)
			}

		},

		mounted() {
			this.foo()
			var _this = this;
			var element = document.getElementById("SignIn");
			element.addEventListener('keyup', function(event) {
				if (event.keyCode == "13" && !_this.dengluChecked) {
					_this.denglu()
				}
			}, true);
			this.getMac();
			this.getVersion();
		}
	}
</script>
<style>
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
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

	.el-dialog__header .el-dialog__headerbtn {
		top: 10px;
		right: 10px;
	}
</style>
<style scoped="scoped">
	#SignIn {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	#SignIn .tubiao {
		font-size: 30px;
		font-weight: 700;
		cursor: pointer;
	}

	#SignIn .head {
		height: 100px;

		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		position: relative;
	}

	#SignIn .head_span {
		position: absolute;
		right: 20px;
		top: 30px;
		display: block;
		width: 100px;
		height: 30px;
		color: black;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	#SignIn .section {
		flex: 1;

		display: flex;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	#SignIn .section_left {
		width: 60vw;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-app-region: drag;
		box-sizing: border-box;
	}

	#SignIn .section_left_div {
		width: 660px;
		height: 550px;
		margin-top: -50px;
		background: black;
		margin-left: 100px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 10px;
		box-shadow: 1px 1px 10px 2px #424040;
	}

	#SignIn .section_right {
		width: 40vw;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	#SignIn .section_right_div {
		-webkit-user-select: none;
		width: 280px;
		height: 340px;
		margin-top: -50px;
		text-align: center;
		background: white;
		border-radius: 8px;
		padding: 0 20px;
		box-sizing: border-box;
		box-shadow: 1px 1px 10px 2px #424040;
	}

	#SignIn .section_right_div_span1 {
		display: flex;
		width: 100%;
		height: 120px;
		flex-direction: column;

	}

	#SignIn .section_right_div_span1 span {
		display: flex;
		border-bottom: 1px solid #d7d7d7;
		height: 60px;
		box-sizing: border-box;
		padding-top: 17px;
	}

	#SignIn .section_right_div_span1 span input {
		border: 0;
		outline: none;
		width: 100%;
		height: 40px;
		font-size: 14px;
		color: rgb(90, 90, 90);
	}

	#SignIn .section_right_div_span2 {
		display: flex;
		height: 50px;
		align-items: center;
		color: rgb(90, 90, 90);
		justify-content: space-between;
	}
</style>
