<template>
	<div id="Main" style="-webkit-user-select:none;overflow: hidden;" @click="goo">
		<el-container class="main">
	    <el-header style="height: 80px;display: flex;background: #7f74ef;">
	    	
	    		<div style="height: 100%;width: 180px;display: flex;justify-content: center;align-items: center;-webkit-app-region: drag;">
	    			<div style="width: 150px;height: 24px;color: white;border-radius: 5px;text-align: center;line-height: 30px;margin-left: -20px;">
							
						<img src="../assets/logo1.png" style="width: 100%;height: 100%;" />
	    		    </div>
	    		</div>
	    		<div style="height: 100%;flex: 1;">
	    			<div style="width: 100%;height: 25px;-webkit-app-region: drag;"></div>
	    			<div style="width: 100%;height: 30px;display: flex;flex-direction: row-reverse;">
	    				<div style="height: 100%;color:white;display: flex;align-items: center;justify-content: center;padding-right: 20px;">	    					
	    					<span style="display: block;width: 40px;height: 40px;margin: 0 5px;">
	    						<img src="../../../build/icons/2.jpg" style="width: 100%;height: 100%;border-radius: 50%;"/>
	    					</span>	    				
							 <div style="cursor: pointer;position: relative;" @click.stop.self="foo">
							  <p style="margin: 0;padding: 0;cursor: pointer;overflow: hidden;margin-right: 8px;" @click.stop.self="foo">{{this.userName}}</p> 
							   <div v-show="flage" style="padding: 10px 0;position: absolute;width: 100px;background: #fff;z-index: 10;left: 50%;top: 46px;margin-left: -50px;border-radius: 5px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);border: 1px solid #ebeef5;">
								   <div class="hoverList" @click="genxin">检查更新</div>
									 <div class="hoverList" @click="changePasswordFlage = true;flage = false">修改密码</div>
								   	<div class="hoverList" @click="exitLogin">退出登录</div>							  					   	 
							   	<div class="shanjiao">
							   		<span></span>
							   	</div>
							   </div>
							 </div>						 
                    <i class="el-icon-arrow-down" style="transition: all  .5s;"  :class="{transFormDown:!flage}" ></i>
	    				</div>
	    				<div style="flex: 1;display: flex;">
	    				   <div class="headBtn" style="display: flex;">
	    				   	 <span :class="{headBtn_back_left:btnLeft,headBtn_back_left1:!btnLeft}" @click="routerBack">
	    				   	    	<i class="el-icon-arrow-left el-icon-arrow-left1"></i>
	    				   	 </span>
									  <span :class="{headBtn_back_right:btnRight,headBtn_back_right1:!btnRight}" @click="routerGo">
									 	   <i class="el-icon-arrow-right el-icon-arrow-left1"></i>									 																		 
									 	 </span>
	    				   	 <span class="headBtn_refresh" @click="pageRefresh">
	    				   	 	<i class="el-icon-refresh el-icon-refresh1"></i>
	    				   	 </span>
	    				   	 <b style="display: block;margin: 3px 10px ;background:#a8a0fb;height: 24px;width: 1px;margin-right: 30px;" v-show="shugangFlage"></b>
	    				   	 <!--
                                	
                                	描述：曲库页面显示
                                -->
	    				   	  <span :class="{headBtn_stop1:selectFlage, headBtn_stop:!selectFlage}" v-show="pageBtn1" @click="exportFile">
	    				   	 	<i class="el-icon-tickets el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">导出</i>
	    				   	 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage, headBtn_stop:!selectFlage}" v-show="pageBtn1" @click="delected">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">删除</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：定制页面显示
                                -->
									<span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="UploadFileOK">
										<i class="el-icon-upload el-icon-stop1"></i>
										<i class="headBtn_stop_font">确认上传</i>
									</span>						
	    				   	<span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="makeFile">
	    				   	 	<i class="el-icon-printer el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">制作</i>
	    				   	 </span>
									 <span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="Disagree">
									 	<i class="el-icon-remove el-icon-stop1"></i>
									 	<i class="headBtn_stop_font">不通过</i>
									 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="exportFile1">
	    				   	 	<i class="el-icon-tickets el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">导出</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：歌曲导入页面显示
                                -->
	    				   	<span class="headBtn_stop1 fileinput-button" v-show="pageBtn3">
	    				   	 	<i class="el-icon-edit el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">歌曲导入</i>
										<input type="file" ref="file" @change="DRfoo"/>
	    				   	 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage2, headBtn_stop:!selectFlage2}" v-show="pageBtn3" @click="UploadFileOK2">
	    				   	 	<i class="el-icon-upload el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">全部上传</i>
	    				   	 </span>
	    				   	 <span :class="{headBtn_stop1:selectFlage2, headBtn_stop:!selectFlage2}" v-show="pageBtn3" @click="delected2">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">全部清除</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：正在上传页面显示
                                -->
                    <span class="headBtn_stop1" v-show="pageBtn4" @click="StopUpload">
	    				   	 	<i class="iconfont icon-xiazaizanting el-icon-stop1" style="font-size: 12px;"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部暂停</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">暂停</i>
	    				   	 </span>
	    				   	  <span class="headBtn_stop1" v-show="pageBtn4" @click="StartUpload">
	    				   	 	<i class="el-icon-caret-right el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部开始</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">开始</i>

	    				   	 </span>
	    				   	 <span class="headBtn_stop1" v-show="pageBtn4" @click="DelectUpload">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部清除</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">清除</i>
	    				   	 </span>   
	    				   </div>
	    					<div class="head_kong" style="flex: 1;-webkit-app-region: drag;"></div>
	    				</div>
	    			</div>
	    			<div style="width: 100%;height: 25px;-webkit-app-region: drag;"></div>
	    		</div>
	    		<div style="width: 80px;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;position: relative;">
	    			<div style="width: 110%;height: 26px;position: absolute;top: 0;right: -20px;border-top-right-radius: 10px;-webkit-app-region: drag;"></div>
	    			<div style="height: 22px;width: 100%;border-left: 1px solid #a8a0fb;display: flex;justify-content: space-around;align-items: center;padding: 0 10px;">
	    				<i class="iconfont icon-subtract tubiao" @click="minSize"></i>
	    				<!-- <i class="iconfont icon-zuidahua tubiao" @click="changeSize" v-show="screenFlage"></i>
	    				<i class="iconfont icon-zuixiaohua tubiao"  @click="changeSize" v-show="!screenFlage"></i> -->
	    				<i class="iconfont icon-close tubiao" @click="Close"></i>
	    			</div>
	    			<div style="width: 110%;height: 26px;position: absolute;bottom: 0;right: -20px;-webkit-app-region: drag;"></div>
	    			<div style="width: 30px;height: 28px;position: absolute;top: 26px;right: -20px;-webkit-app-region: drag;"></div>
	    			<div style="width: 20px;height: 28px;position: absolute;top: 26px;right: 34px;-webkit-app-region: drag;"></div>
	    			<div style="width: 22px;height: 28px;position: absolute;top: 26px;right: 82px;-webkit-app-region: drag;"></div>
	    			<div style="width: 20px;height: 80px;position: absolute;top: 0;left: -6px;-webkit-app-region: drag;"></div>
	    		</div>
	    		
	    	
	    </el-header>
	    <el-container class="content">
	    <el-aside width="200px">
	    	<el-row>
	    		<el-col :span="24">
				    <h5 style="height: 60px;background: white;margin: 0;padding: 0;"></h5>
				    <el-menu				      			      
				      active-text-color="#333333"
				      class="el-menu-vertical-demo"				      
				      @select='ItemSelect'
				     >
				      <el-menu-item index="LibraryManagement" :style="isArray">				        
				          <i class="iconfont icon-vynil" style="margin-right: 8px;"></i>
				          <span>曲库管理　　</span>
								
				      </el-menu-item>
				      <el-menu-item index="CustomManagement">
				        <i class="el-icon-menu"></i>
				            <span  v-if="DZnumber>0">定制管理 <el-badge class="mark" :value="DZnumber"  :max="99" style="margin-bottom: 6px;"/></span>
						 <span  v-else>定制管理  <span style="display: inline-block;height: 100%;width: 21px;"></span></span>
				      </el-menu-item>
				      <h5 style="margin: 0;padding: 0;height: 60px;line-height: 60px;font-size:14px;font-weight: normal;color: #ababab;text-indent:-110px;">上传管理</h5>
				      <el-menu-item index="SongsUploaded">
								
				        <i class="el-icon-edit"></i>
								<span v-if="DRnumber>0">歌曲导入  <el-badge class="mark" :value="DRnumber"  :max="99" style="margin-bottom: 6px;"/></span>
				        <span v-else>歌曲导入 <span style="display: inline-block;height: 100%;width: 21px;"></span> </span>
				      </el-menu-item>
				      <el-menu-item index="Uploading">
				        <i class="el-icon-upload"></i>
								
				        <span slot="title" v-if="UPnumber>0">正在上传 <el-badge class="mark" :value="UPnumber"  :max="99" style="margin-bottom: 6px;"/></span>
								<span slot="title" v-else>正在上传 <span style="display: inline-block;height: 100%;width: 21px;"></span></span>

				      </el-menu-item>
				    </el-menu>
				</el-col>	    		
	    	</el-row>	    	
	    </el-aside>
	    <el-main class="contentRight">
	    	<el-row style="height: 50px;borderBottom: 1px solid #E4E4E4;display: flex;display: none;">
	    		<div  style="height: 100%;width:150px;display: flex;justify-content: space-around;align-items: center;" class="contentRight_header">
	    			<i class="el-icon-arrow-left" style="cursor: pointer;" v-tishi:30="msg[3].content"></i>
	    			<i class="el-icon-arrow-right" style="cursor: pointer;" v-tishi:30="msg[4].content"></i>
	    			<i class="el-icon-refresh" style="cursor: pointer;" v-tishi:30="msg[5].content"></i>
	    			
	    		</div>
	    		<div  style="height: 100%;width: 500px;">
	    			<div style="width: 100%;height: 24px;margin-top: 13px;border-left: 1px solid #e4e4e4;padding-left:20px;display: flex;align-items: center;">
	    				<HistoryRouter @add-parent-total="addParentTotle"/>
	    			</div>
	    		</div>
	    	</el-row>
	    	<div class="contentRightDiv">
					<keep-alive>
	               <router-view  v-if="$route.meta.keepAlive"></router-view>
	        </keep-alive>
                 <router-view v-if="!$route.meta.keepAlive"></router-view>
	    	</div>
	    </el-main>
	    </el-container>
	    </el-container>
			
			
			<!--忘记密码-->
			<el-dialog
				title="修改密码"
				:visible.sync="changePasswordFlage"
				 @close="resetForm('ruleForm2')"
				custom-class="DELECT"
				width="30%"
				top='25vh'
				>
				<el-form 
				:label-position="labelPosition" 
				label-width="80px" 
				:model="ruleForm2" 
				size="mini" 
				:rules="rules2" 
				
				ref="ruleForm2">
					<el-form-item label="原密码" prop="password_origin">
						<el-input type="password" v-model="ruleForm2.password_origin" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="新密码"  prop="password">
						<el-input type="password" v-model="ruleForm2.password" placeholder="请输入6-20位数字和字母组合"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm2.checkPass" placeholder="再次输入密码"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="changePasswordFlage = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm2')" size="mini" :loading="ruleForm2BtnLoading">确 定</el-button>
				</span>
			</el-dialog>
			
			
			
			<el-dialog
				title="提示"
				:visible.sync="dialogUploadVisible"
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;font-size: 20px;margin: 0 10px;"></i>存在上传任务,退出后将丢失上传进度,是否要继续？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogUploadVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="dialogUploadBtn" :loading="dialogUploadBtnLoading" size="mini" >确 定</el-button>
				</span>
			</el-dialog>
			
			
			<el-dialog
				title="关闭提示"
				:visible.sync="dialogcloseSettingVisible"
				width="25%"
				custom-class="closeSetting"
				top='25vh'
				>
				<span style="display: block;">
					<p style="margin-left: 10px;">点击关闭按钮时:</p>
					<el-radio-group v-model="checkRadio" size="mini" >
						
						<span style="display: flex;flex-direction: column;margin-left: 20px;">
							
							<el-radio :label="1" style="margin-left: 10px;margin-bottom: 20px;"><i style="color: #606266;font-style: normal;">最小化到系统托盘</i></el-radio>
							
							<el-radio :label="2" style="margin-bottom: 10px;margin-left: 10px;"><i style="color: #606266;font-style: normal;">退出应用程序</i></el-radio>
											
						</span>
						
					</el-radio-group>
					
				</span>
			<span slot="footer" style="display: block;height: 60px;border-top: 1px solid #efeded;display: flex;justify-content: space-between;align-items: center;box-sizing: border-box;padding: 0 20px;">
				<span >
					
					<el-checkbox v-model="checkedSave">不在提醒</el-checkbox>
				
				</span>
				<el-button type="primary" size="mini" @click="dialogcloseSettingBtn">确定</el-button>
			</span>
				
			</el-dialog>
			
			<el-dialog
				title="提示"
				:visible.sync="dialogExitLoginVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>是否退出登录？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogExitLoginVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="dialogExitLoginBtn" size="mini" :loading="dialogExitLoginLoading">确 定</el-button>
				</span>
			</el-dialog>
			
			<el-dialog
				title="提示"
				:visible.sync="dialogcloseVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>{{dialogcloseText}}</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogcloseVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="dialogcloseBtn" size="mini" :loading="dialogcloseLoading">确 定</el-button>
				</span>
			</el-dialog>
			
			<el-dialog
				title="更新提示"
				:visible.sync="dialogQZupdateVisible"
				custom-class="PLSOSU" 
				:close-on-click-modal="false"
				:close-on-press-escape="false"
				width="30%"
				top='25vh'
				>
				<span v-show="QZupdate">
							<span style="margin-bottom: 20px;display: block;"> <i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>正在下载新版本，请耐心等待....</span>
							<span style="display: block;">
								
								<el-progress :text-inside="true" :stroke-width="12" :percentage="progressPrecent" status="success"></el-progress>
							
							</span>
				</span>
				<span v-show="QZerror">
					   <span style="margin-bottom: 20px;display: block;"> <i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>更新出错，请重试或联系开发人员。</span>
				</span>
							<span slot="footer" class="dialog-footer" v-show="QZupdate">
								<!-- <el-button @click="dialogQZupdateVisible = false" size="mini">取 消</el-button> -->
								<el-button type="primary" size="mini" @click="dialogQZupdateVisible = false">后台更新</el-button>
							</span>
							
							<span slot="footer" class="dialog-footer" v-show="QZerror">
								<!-- <el-button @click="dialogQZupdateVisible = false" size="mini">取 消</el-button> -->
								<el-button type="primary" size="mini" @click="dialogQZupdateVisible = false">关闭</el-button>
							</span>
					
				
			</el-dialog>
			
			<el-dialog
				title="更新提示"
				:visible.sync="dialogHDupdateVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>您当前的版本是{{version}},发现新的客户端版本。</span>
				<p style="margin-left: 34px;">建议您更新到最新版本，体验更优质的服务，谢谢。</p>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogHDupdateVisible = false" size="mini">暂不更新</el-button>
					<el-button type="primary" @click="dialogHDupdateBtn" size="mini" >立即更新</el-button>
				</span>
			</el-dialog>
			
			<el-dialog
				title="更新提示"
				:visible.sync="dialogHD_notupdateVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>您当前的版本是最新版本({{version}})，无需更新！</span>
				
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogHD_notupdateVisible = false" size="mini">关闭</el-button>
				
				</span>
			</el-dialog>
			
			
			<el-dialog
				title="更新提示"
				:visible.sync="dialogHD_errorupdateVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>检测更新出错，请联系管理员！！！</span>
				
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogHD_errorupdateVisible = false" size="mini">关闭</el-button>
				
				</span>
			</el-dialog>
			
			<!-- dialogHDupdateProgressVisible -->
			<el-dialog
				title="更新提示"
				:visible.sync="dialogHDupdateProgressVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				
					<span style="margin-bottom: 20px;display: block;"> <i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>检测到新版本正在下载，请耐心等待....</span>
					<span style="display: block;">
						
						<el-progress :text-inside="true"  :stroke-width="12" :percentage="progressPrecent" ></el-progress>
					
					</span>
				
				<span slot="footer" class="dialog-footer">
					
					<el-button type="primary" @click="dialogHDupdateProgressVisible = false" size="mini" >后台更新</el-button>
				</span>
			</el-dialog>
			<!-- dialogHDupdateInstallVisible -->
			<el-dialog
				title="安装提示"
				:visible.sync="dialogupdateInstallVisible"
				custom-class="PLSOSU" 
				width="30%"
				top='25vh'
				>
				<span><i class="el-icon-warning" style="color: #ffc107;margin: 0 10px;font-size: 16px;"></i>新版本已下载完成，程序将在{{installTime}}秒后安装。</span>
				<span slot="footer" class="dialog-footer">
					
					<el-button type="primary" @click="dialogupdateInstallBtn" size="mini" >立即安装</el-button>
				</span>
			</el-dialog>
			
			
</div>
</template>

<script>
	import '../assets/css/common.css'
	const {ipcRenderer} = require('electron')
	const fs = require("fs")
	const path = require("path")
	let currentWindow = require('electron').remote.getCurrentWindow()
	import HistoryRouter from './CustomComponents/HistoryRouter';
	import Bus from './bus.js'
	import { patch } from "./api.js"
	import { getDingZiNum } from "./util.js"
	export default{
		components:{ HistoryRouter },
		data(){
			const pro = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z]{6,20}$/
			const validatePass = (rule, value, callback) => {
				let password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z]{6,20}$/;
           // let password = /^[a-zA-Z0-9_-]{6,20}$/
                if (value === '') {
									console.log(pro.test(value))
                    callback(new Error('请输入密码'));
                } else if(!password.test(value)){
									  callback(new Error('请输入6-20位数字和字母组合'));
								} else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
      const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

			return{
				isArray:'background: #f1f1f1;',
				flage:false,
				changePasswordFlage:false,
				routerFlage:true,
				screenFlage:true,
				selectFlage:false,
				selectFlage1:false,
				selectFlage2:false,
				selectFlage3:false,
				ruleForm2BtnLoading:false,
				dialogUploadVisible:false,//退出登录时有上传任务；
				dialogcloseSettingVisible:false,//系统托盘；
				dialogExitLoginVisible:false,//退出登录时无上传任务；
				dialogExitLoginLoading:false,//退出登录loading；
				dialogUploadBtnLoading:false,//有任务退出登录loading；
				dialogcloseVisible:false,
				dialogcloseLoading:false,
				dialogQZupdateText:"",
				dialogcloseText:"",
				checkRadio:1,
				checkedSave:false,
				childWindowFlage:true,
				dialogQZupdateVisible:false,
				dialogHDupdateVisible:false,
				dialogHD_notupdateVisible:false, //手动检测没有更新的弹框；
				dialogHD_errorupdateVisible:false, //手动检测出错的弹框；
			  dialogupdateInstallVisible:false,
				updateStep:0, //更新步骤
				QZupdate:false,
				QZerror:false,
				installTime:10,
				msg:[
				 {content:'缩小'},
				 {content:'放大'},
				 {content:'关闭'},
				 {content:"后退"},
				 {content:"前进"},
				 {content:"刷新"},
				 {content:"还原"}				 
				],
				pageBtn1:false,
				pageBtn2:false,
				pageBtn3:false,
				pageBtn4:false,
				shugangFlage:true,
				labelPosition: 'top',
				DZnumber:0,
        ruleForm2:{
						password: '',
						checkPass: '',
						password_origin: ''
				},
				rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    password_origin: [
                        { required:true, trigger: 'blur',message: '请输入原密码', }
                    ]
                },
       progressPrecent:0,
			 dialogHDupdateProgressVisible:false,
			 handleUpdateFlage:false,
			 HDmessage:"",
			 version:""

			}
		},
		computed: {
		  UPnumber() {
				var arr = this.$store.state.Counter.data;
				var i = 0;
				    arr.map(function(item){
							  if(item.upState == "1" || item.upState == "4"){
									i++
								}
						})
				return i; 
			},
			DRnumber() {
				return this.$store.state.Counter.data1.length; 
			},
			btnLeft() {
				if(this.$store.state.Router.currentIndex!=0){
					    return true;
				}else{
					   return false;
				}
			},
			btnRight() {
				if(this.$store.state.Router.currentIndex<this.$store.state.Router.historyRoute.length-1){
					    return true;
				}else{
					    return false;
				}
			},
			userName(){
				return JSON.parse(localStorage.getItem('UserInformation')).user;
			},
			uploadingNum(){
				return this.$store.getters.number;
			}
		},
		methods:{
			dialogupdateInstallBtn(){
				
				  ipcRenderer.send("startInstall")
				
			  },				
			   dialogHDupdateBtn(){
					  ipcRenderer.send("startUpdate")
						this.dialogHDupdateVisible = false;
						this.dialogHDupdateProgressVisible = true;
						this.updateStep = 3;
				 },
			    
			    submitForm(formName) {
						    var _this = this;
                this.$refs[formName].validate((valid) => {
									console.log("lllllllll")
                    if (valid) {
											  this.ruleForm2BtnLoading = true;
                        let user_id = JSON.parse(localStorage.getItem('UserInformation')).user_id;
                        let obj={};
                        obj.password_origin=this.ruleForm2.password_origin;
                        obj.password=this.ruleForm2.password;
                        console.log(obj,"表单提交表单提交表单提交表单提交")
                        patch('music/perm/password/'+user_id,obj).then(res=>{
													
                            if(res.status==200){
															_this.ruleForm2BtnLoading = false;
															_this.changePasswordFlage=false;
															
                              _this.$notify({				          
                               					message: '密码修改成功！',
                               					type: 'success',
                               					offset: 60,
                               					duration:1000,
                               				});
													  
												var obj1 = JSON.parse(localStorage.getItem('UserInformation'))
												    obj1.password = obj.password;
														localStorage.setItem('automaticLogon','0')
												var str = JSON.stringify(obj1)
													  localStorage.setItem("UserInformation",str)
														setTimeout(function(){
															
													     	_this.$router.push("/")  
                               },1000)
                            }
                        }).catch(error => {
													_this.ruleForm2BtnLoading = false;
													  console.log(error.data.errors)
													_this.$notify({				          
																		message: error.data.errors,
																		type: 'error',
																		offset: 60,
																		duration:2000,
																	});
												})
                        console.log(this.ruleForm2,"提交的数据")

                    } else {
                        console.log('error submit!!');
                        return false;
                    }


                });
            },
      resetForm(formName) {
                //关闭模态框事件
                // this.dialogVisible=false;
                this.$refs[formName].resetFields();
            },
     
			//退出登录
			exitLogin(){
				var _this = this;
				this.flage = false;
				this.childWindowFlage = true;
				// localStorage.setItem('automaticLogon','0')
				console.log("pppp",this.flage)
			    console.log(this.$store.getters.number)
				// ipcRenderer.send('exitLogin')
				if(this.childWindowFlage){
					if(this.$store.getters.number>0){
						this.dialogUploadVisible = true;
					}else {
						// this.$router.push({path:"/",query:{index:true}})
						this.dialogExitLoginVisible = true;
					}
				}
			},
			dialogExitLoginBtn(){
				this.dialogExitLoginLoading = true;
				setTimeout( () => {
					
				this.$router.push({path:"/",query:{index:true}})
				ipcRenderer.send('window-exitLogin')
				},200)
			},
			dialogUploadBtn(){
				Bus.$emit("exitLogin")
				this.dialogUploadBtnLoading = true;
				setTimeout( ()=> {
					console.log(this.dialogUploadBtnLoading)
					this.$store.commit("signOut");
					this.dialogUploadBtnLoading = false;
					this.dialogUploadVisible = false;
					this.$router.push({path:"/",query:{index:true}});
           ipcRenderer.send('window-exitLogin')					
				},200)
       
				
			},
		  changeSize(){
		    	
		    	
		      	var flage = currentWindow.isMaximized()
		      	this.screenFlage = flage
		    	
		      	if(flage){
		      		
		      		ipcRenderer.send('window-restore')
		      	}else{
		      		
		      		ipcRenderer.send('window-maxSize')
		      	}
						Bus.$emit("currentWindow",flage)
		    },
			Close(){
				
				var _this = this
				var flage = localStorage.getItem('closeSetting')
				if( flage == null ){
					this.dialogcloseSettingVisible = true;
				}else if(flage=='1'){
					currentWindow.hide()      		
				}else if(flage=='2'){

					if(this.$store.getters.number>0){
								this.dialogcloseVisible = true;
								this.dialogcloseText = "存在上传任务,退出后将丢失上传进度,是否要继续？"
							}else{
								ipcRenderer.send('window-close')
								
							}
				}
			},
			Close1(){
				if(this.$store.getters.number>0){
							this.dialogcloseVisible = true;
							this.dialogcloseText = "存在上传任务,退出后将丢失上传进度,是否要继续？"
						}else{
							ipcRenderer.send('window-close')
							
						}
			},
//       Close(){
// 				var _this = this;
// 				this.dialogcloseVisible = true;
// 				if(this.$store.getters.number>0){
// 					    this.dialogcloseText = "存在上传任务,退出后将丢失上传进度,是否要继续？"
// 							
// 							
// 						}else{
// 							
// 							this.dialogcloseText = "是否要退出应用程序？"
// 
// 							
// 						}
// 			},
			dialogcloseBtn(){
				this.dialogcloseLoading = true;
				setTimeout( () => {
					
				ipcRenderer.send('window-close')
				// ipcRenderer.send('window-exitLogin')
				},200)
			},
			dialogcloseSettingBtn(){
				this.dialogcloseSettingVisible = false;
				  if(this.checkedSave){
						localStorage.setItem("closeSetting",this.checkRadio)
					}
					if(this.checkRadio == '1'){
						setTimeout(function(){
							currentWindow.hide()
						
						},200)
					}else{
						if(this.$store.getters.number>0){
									this.dialogcloseVisible = true;
									this.dialogcloseText = "存在上传任务,退出后将丢失上传进度,是否要继续？"
								}else{
									ipcRenderer.send('window-close')
									ipcRenderer.on('closeChild',function(){
										_this.$message({
													message: '请关闭视频窗口',
													type: 'warning'
												});
										
									})
								}
					}
					
			},
			minSize(){
				ipcRenderer.send('window-minSize')
			},
			ItemSelect(str){
				this.isArray=""
				this.$router.push('/'+str)
			},
			routerBack(){	
				var arr = this.$store.state.Router.historyRoute;
				var currentIndex = this.$store.state.Router.currentIndex;
				if(this.btnLeft){
					 var str = arr[currentIndex-1]
					 // this.routerFlage = true;
					 console.log(this.$store.state.Router.flage)
				   this.$store.commit("RouterFlageGB")
					 console.log(this.$store.state.Router.flage)
					 this.$router.push(str)
					 this.$store.commit("RouterBack")
					 console.log(this.$store.state.Router.currentIndex,this.$store.state.Router.historyRoute)
				}								
			},
			routerGo(){
				var arr = this.$store.state.Router.historyRoute;
				var currentIndex = this.$store.state.Router.currentIndex;
				if(this.btnRight){
					var str = arr[currentIndex+1]
					// this.routerFlage = false;
					console.log(this.$store.state.Router.flage)
					this.$store.commit("RouterFlageGB")
					this.$router.push(str)
					this.$store.commit("RouterGo")
					console.log(this.$store.state.Router.currentIndex,this.$store.state.Router.historyRoute)
				}				
			},
			pageRefresh(){
				this.$router.push('/Refresh')			
			},
			foo(){
				this.flage = !this.flage
			},
			goo(){
				this.flage = false
			},
			addParentTotle(str){
				console.log(str,"ppppoo444444444o")
				this.pageBtn1 = false
				this.pageBtn2 = false
				this.pageBtn3 = false
				this.pageBtn4 = false
				this.shugangFlage = true
				switch(str){
					case 'LibraryManagement':
					    this.pageBtn1 = true;
					break;
					case 'CustomManagement':
					    this.pageBtn2 = true;
					break;
					case 'SongsUploaded':
					    this.pageBtn3 = true;
					break;
					case 'Uploading':
					    this.pageBtn4 = true;
					break;
					case "editPage":
					   this.shugangFlage = false;
					break;
				}
				
			},
			delected(){
				if(this.selectFlage){
					Bus.$emit('delected')				
				}
			},
			exportFile(){
				if(this.selectFlage){
					Bus.$emit("exportFile")				
				}
			},
			
			
			
			
			UploadFileOK(){
				if(this.selectFlage1){
					Bus.$emit('UploadFileOK')
				}
				
			},
			makeFile(){
				if(this.selectFlage1){
				  Bus.$emit('makeFile')
				}
			},
			Disagree(){
				if(this.selectFlage1){
					Bus.$emit('Disagree')
				}
			},
			exportFile1(){
				if(this.selectFlage1){
				  Bus.$emit("exportFile1")
				}
			},
			DRfoo(){
				var currentFile = this.$refs.file.files[0]	
				console.log("Main_DRfoo")
				Bus.$emit("DRfoo",currentFile)
				this.$refs.file.value = ""
			},
			UploadFileOK2(){
				
				if(this.selectFlage2){
					console.log("wangyan")
					Bus.$emit('UploadFileOK2')
				}
			},
			delected2(){
				if(this.selectFlage2){
					Bus.$emit('delected2')
				}
			},
			
			
			StopUpload(){
				
					Bus.$emit("StopUpload")
				
			},
			StartUpload(){
				
					Bus.$emit("StartUpload")
				
			},
			DelectUpload(){
				
					Bus.$emit("DelectUpload")
				
			},
     genxin(){
			      console.log(this.updateStep,this.HDmessage,"pppppp")
					this.flage = false;//下拉框箭头动画
					
					if(this.updateStep == 1){
						
						this.dialogQZupdateVisible = true;
						
					}else if(this.updateStep == 2){
						
						setTimeout(()=>{
							
								this.handleUpdateFlage = true;
								
						if(this.HDmessage == "update-available"){
											
									this.dialogHDupdateVisible = true;
															
									}else{
										
									ipcRenderer.send('handle-update');	
															
								}
							},200)
					}else if(this.updateStep == 3){
						
						this.dialogHDupdateProgressVisible = true;
					}	
	                
			},
			getVersion(){
				this.version = localStorage.getItem('version')
			}
			

		},

	    mounted(){

				var _this = this;
				setTimeout(()=>{
					this.updateStep = 1;
					ipcRenderer.send('force-update');
					console.log('force-update')
				},500)
				ipcRenderer.on("QZmessage",function(event,message){
					console.log(message,"QZmessage")
					
					if(message == "update-available"){
						_this.dialogQZupdateVisible = true;
						_this.QZupdate = true;
					}
					if(message == "error"){
						_this.dialogQZupdateVisible = true;
						_this.QZupdate = false;
						_this.QZerror = true;	
						
					}
					if(message == "update-downloaded"){					
						_this.dialogQZupdateVisible = false;
						_this.dialogQZupdateProgressVisible = false;
						_this.dialogupdateInstallVisible = true;
						setInterval(function(){
							_this.installTime--;
							if( _this.installTime == 0){
									_this.dialogupdateInstallBtn() 
							}
						},1000)
					}
					if(message == "update-not-available"){						
						setTimeout(()=>{
							_this.updateStep = 2;
							ipcRenderer.send('handle-update'); 								
						},1000)						
					}
				})
				ipcRenderer.on("HDmessage",function(event,message){
					console.log(message,"HDmessage")
					_this.HDmessage = message;
					if(message == "update-available"){
						_this.dialogHDupdateVisible = true;
					}
					if(message == "update-downloaded"){
						_this.dialogHDupdateVisible = false;
						_this.dialogHDupdateProgressVisible = false;
						_this.dialogupdateInstallVisible = true;
						setInterval(function(){
							 _this.installTime--;
							if( _this.installTime == 0){
								  _this.dialogupdateInstallBtn() 
							 }
						},1000)
					}
					if(message == "update-not-available"&&_this.handleUpdateFlage == true){
						_this.dialogHD_notupdateVisible = true;
						_this.handleUpdateFlage == false;
					}
					if(message == "error"&&_this.handleUpdateFlage == true){
						_this.dialogHD_errorupdateVisible = true;
						_this.handleUpdateFlage == false;
					}
				})
	    	ipcRenderer.on("downloadProgress",function(event,Progress){
					  console.log(Progress)
						_this.progressPrecent = Math.ceil(Progress.percent) > 100 ? 100:Math.ceil(Progress.percent)
				})

        this.getVersion();
				window.ononline = function() {
						// alert("链接上网络了");
						console.log(_this.$store.state.Router.historyRoute)
						_this.$router.push(_this.$store.state.Router.historyRoute[_this.$store.state.Router.historyRoute.length-1])
					}
				window.onoffline = function() {
						_this.$router.push("/404")
					}
				var box = document.getElementById('Main')
					box.ondragover = function (ev) {
						//阻止浏览器默认打开文件的操作
						ev.preventDefault();				   
				}
					box.ondrop = function (ev) {
						//阻止浏览器默认打开文件的操作
						ev.preventDefault();				   
				}
	      	window.onresize=function(){
	      		// console.log('currentWindow.isMaximized()',currentWindow.isMaximized())
	      		   
	      			_this.screenFlage = !currentWindow.isMaximized()
	      		Bus.$emit("currentWindow",_this.screenFlage)
	      	}
	      Bus.$on('val',function(data){
	        	  if(data == '1'){
	        	  	  _this.selectFlage = true
	        	  }else{
	        	  	 _this.selectFlage = false
	        	  }
	        })
				Bus.$on('val1',function(data){
						if(data == '1'){
								_this.selectFlage1 = true
						}else{
							_this.selectFlage1 = false
						}
				})
				Bus.$on('val2',function(data){
						if(data == '1'){
								_this.selectFlage2 = true
						}else{
							_this.selectFlage2 = false
						}
				})
				Bus.$on('val3',function(data){
						if(data == '1'){
								_this.selectFlage3 = true
						}else{
							_this.selectFlage3 = false
						}
				})
				ipcRenderer.on('closeChild',function(){
					_this.$message({
								message: '请关闭视频窗口',
								type: 'warning'
							});
					_this.childWindowFlage = false;
				})
       ipcRenderer.on('exitLogin',function(){
				
            if(_this.uploadingNum>0){
            	_this.dialogUploadVisible = true;
            }else {
            	// this.$router.push({path:"/",query:{index:true}})
            	_this.dialogExitLoginVisible = true;
            }
       })
			 ipcRenderer.on("closeWindow",function(){
				 console.log("closeWindow")
				 _this.Close1()
			 })
		    getDingZiNum((num) => {
			 	this.DZnumber = num
			 	console.log(num)
			 })
			 
			 setInterval(() => {
			 	getDingZiNum((num) => {
			 		this.DZnumber = num
			 		console.log(num)
			 	})
			 	
			 },1000*20)
			 Bus.$on("getDingZiNum",() => {
				  getDingZiNum((num) => {
				  	this.DZnumber = num
				  	console.log(num)
				  })
			 })
	    }
		
	}
</script>
<style>
body{
		margin: 0;
		padding: 0;
		font-size: 12px !important;
	}
#Main .el-menu-vertical-demo{
	border: 0;
}	
#Main .el-menu-item:focus, .el-menu-item:hover {
	background: #f1f1f1;
}
#Main .el-popover{
	min-width: 80px;
}
.DELECT{
	box-shadow: 1px 2px 12px 6px rgba(0,0,0,.3);
	}
	.closeSetting .el-dialog__footer{
		padding: 0;
	}

.PLSOSU .el-progress-bar__outer{
	border-radius:0;
}
.PLSOSU .el-progress-bar__inner{
	border-radius:0;
}
.PLSOSU .el-progress-bar__innerText{
	display: none;
}

/*#Main .el-menu-item:nth-child(1){
	background: #F1F1F1;
}	*/
</style>

<style scoped="scoped">
	  .fileinput-button {
            position: relative;
            display: inline-block;
            overflow: hidden;
        }

        .fileinput-button input{
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
						height: 30px;
						cursor: pointer;
            -ms-filter: 'alpha(opacity=0)';
        }
	#Main{
		height: 100vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
		
	}
	#Main .tubiao{
		color: white;
		font-size: 24px;
		cursor: pointer;
	}
	#Main .main{
		height: 100vh;
		display: flex;
		flex-direction: column;
		
	}
	#Main .transFormDown{
		
		transform: rotate(180deg)
	}
	#Main .transFormUp{
		
		transform: rotate(180deg)
	}
/*	#Main .slide-fade-enter-active {
  transition: all .3s ease;
}
#Main .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
#Main .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ 
  /*transform: rotate(180deg);*/
 /* opacity: 0;*/

	#Main .headBtn{
		height: 100%;
		margin-left:10px ;
		display: flex;				
	}
	#Main .headBtn span{
		display: block;
		height: 28px;		
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px solid #b6bcce;
		margin-right: 20px;
		
	}

	#Main .headBtn .headBtn_back_left,#Main .headBtn .headBtn_refresh,#Main .headBtn .headBtn_back_right{
		border: 1px solid white;		
	}	
	#Main .headBtn .headBtn_back_left1,#Main .headBtn .headBtn_back_right1{
		border: 1px solid #b6bcce;
		cursor: not-allowed;
		
	}
	#Main .headBtn .headBtn_back_left1 .el-icon-arrow-left1,#Main .headBtn .headBtn_back_right1 .el-icon-arrow-left1{
		font-size: 20px;
		color: #b6bcce;
	}
	#Main .headBtn .headBtn_back_left .el-icon-arrow-left1{
		color: white;
	}
	#Main .headBtn span:hover .el-icon-refresh1{
		color: white;
	}
	
	/*#Main .headBtn span:hover .el-icon-stop1{
		color: white;
	}*/
	/*#Main .headBtn span:hover .headBtn_stop_font{
		color: white;
	}*/
    
	
  
	
	
	#Main .headBtn .headBtn_stop1:active{
		background: #8f86f2;
	}
	#Main .headBtn .headBtn_back_left,#Main .headBtn .headBtn_back_left1{
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding:0 10px;
		margin-right: 0;
		

	}
	#Main .headBtn .headBtn_back_right,#Main .headBtn .headBtn_back_right1{
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		padding:0 10px;
		border-left: 0;

	}
	#Main .headBtn .headBtn_back_left .el-icon-arrow-left1,#Main .headBtn .headBtn_back_right .el-icon-arrow-left1{
		font-size: 20px;
		color: white;
		
		
	}
	
	#Main .headBtn .headBtn_refresh{
		border-radius: 5px;
		padding: 0 10px;
	}
	#Main .headBtn .headBtn_refresh .el-icon-refresh1{
		font-size:20px;
		color: white;
	}
	
	#Main .headBtn .headBtn_stop{
		border-radius: 5px;
		padding: 0 8px;
		cursor: no-drop;
		
	}	
	#Main .headBtn .headBtn_stop .el-icon-stop1{
		font-size:20px;
		color: #b6bcce;
	}
	#Main .headBtn .headBtn_stop .headBtn_stop_font{
		font-style: normal;
		color: #b6bcce;
		margin-left: 5px;
	}
	#Main .headBtn .headBtn_stop1{
		border-radius: 5px;
		padding: 0 8px;
		cursor: pointer;
		border: 1px solid white;
	}	
	#Main .headBtn .headBtn_stop1 .el-icon-stop1{
		font-size:20px;
		color: white;
	}
	#Main .headBtn .headBtn_stop1 .headBtn_stop_font{
		font-style: normal;
		color: white;
		margin-left: 5px;
	}
	.hoverList{
		text-align: center;
		height: 30px;
		color: #797979;
		font-size: 14px;
		line-height: 30px;
	}
	.hoverList:hover{
		background: #ececee;
	}
	.shanjiao{
		position: absolute;
		width: 0;
		height: 0;
		border-width: 0 6px 6px;
		border-style: solid;
		border-color: transparent transparent #ebeef5; 		
		left: 50%;
		margin-left: -3px;
		top: -6px;		
	}
	.shanjiao span{
		display: block;
		width: 0;
		height: 0;
		border-width: 0 6px 6px;
		border-style: solid;
		border-color: transparent transparent #fff; 		
		margin-left: -6px;	
		margin-top: 2px;	
	}
	.el-header {
    background-color: #f5f5f9;
    color: #333;
    text-align: center;
   
  }
  .contentRight_header{
  	font-size: 24px;
  	line-height: 50px;
  }
  .content{
  	flex: 1;
  	background: white;
  	border: 1px solid #adabab;
  	box-sizing: border-box;
  	border-top: none;  	
  	/*border-bottom-left-radius: 100px;
	border-bottom-right-radius: 100px;	*/
  }
  .contentRight{
  	display: flex;
  	flex-direction: column;
  	
  	
  }
  .contentRightDiv{
  	flex: 1;
  	overflow: hidden;
  	
  }
  .el-aside {
    
    color: #333;
    border-right: 1px solid #E4E4E4;
    text-align: center;
    box-sizing: content-box;
   
  }
  
  .el-main {
    
    color: #333;
   
    text-align: center;
    
    padding: 0;
  }
</style>