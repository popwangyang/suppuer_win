<template>
	<div id="Uploading" :class="{ff:boxFlage,gg:!boxFlage}">
		<div class="box1" v-show="boxFlage">
			<i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			<div style="margin: 10px 0;font-size: 14px;">暂无上传的歌曲</div>						
		</div>
		<div class="box2" v-show="!boxFlage">
			<div class="box2a" :style="height" id="scroll-1">
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column
				  type="selection"
				 min-width="55">
				</el-table-column>
				<el-table-column
				  label="编号"
				  min-width="40">
				  <template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column
				  prop="content.name"
				  label="歌曲名称"
				  min-width="80">
				</el-table-column>
				<el-table-column
				  prop="content.singer"
				  label="歌手名称"
				  min-width="60"
				  >
				</el-table-column>
				
				<el-table-column
					prop="content.format_type"
					label="格式"
					min-width="60"
					>
					<template slot-scope="scope">
								<span v-if="scope.row.content.format_type =='0' || scope.row.content.format_type =='高清'">
								高清
							</span>
							<span v-else-if="scope.row.content.format_type =='1' || scope.row.content.format_type =='DVD'">
								DVD
							</span>
							<span v-else-if="scope.row.content.format_type =='2' || scope.row.content.format_type =='MP4'">
								MP4
							</span>
							<span v-else-if="scope.row.content.format_type =='3'">
								其他
							</span>
							<span v-else-if="scope.row.content.format_type ==null" style="color: red;">
								缺失
							</span>
							<span v-else>
								{{scope.row.content.format_type}}
							</span>										
					</template>
				</el-table-column>
				<el-table-column
				
					label="上传日期"
					min-width="60"
					>
							
								<template slot-scope="scope">
									<span v-if="scope.row.create_date">
										<div> {{scope.row.create_date.split("　")[0]}}</div>				
										<div>{{scope.row.create_date.split("　")[1]}}</div>
									</span>
									<span v-else>
										<div> {{scope.row.upload_data.split("　")[0]}}</div>				
										<div>{{scope.row.upload_data.split("　")[1]}}</div> 						
									</span>
							</template>
				</el-table-column>
				<el-table-column
				label="大小"
				min-width="40"
				>
				<template slot-scope="scope">
					<span>{{scope.row.UploadSize > scope.row.size ? scope.row.size:scope.row.UploadSize | FileSize }}</span>
					<span>/</span>
				<span>{{ scope.row.size | FileSize }}</span>
				
				</template>
				</el-table-column>
				<el-table-column
				prop="upState"
				label="状态"
				min-width="120"
				>
				<template slot-scope="scope">
					<div v-if="scope.row.upState=='0'">	
						<i>可上传</i>
					</div>
					<div v-if="scope.row.upState=='1'">
						<!--<el-progress :percentage="50"></el-progress>-->
						<Upload :file="scope.row" :ref="scope.row.id"></Upload>						
					</div>
					<div v-if="scope.row.upState=='2'">
						<!--<Upload :file="scope.row" :ref="scope.row.id"></Upload>-->
						<el-progress :percentage="Math.floor((scope.row.UploadSize/scope.row.size)*100)"></el-progress>
					</div>
					<div v-if="scope.row.upState=='3'">						
						<i style="color: red;">上传失败,请重新上传!</i>
					</div>
					<div v-if="scope.row.upState=='4'">						
						<i>正在等待上传</i>
					</div>
					<div v-if="scope.row.upState=='5'">						
						<i style="color: red;">网络断开</i>
					</div>
					<div v-if="scope.row.upState=='6'">						
						<i>替换中...</i>
					</div>
					<div v-if="scope.row.upState=='7'">						
						<i style="color: red;">歌曲信息重复</i><el-button type="text" style="font-size: 12px;margin-left: 10px;" @click="moveRepeat(scope.row)">请选择操作</el-button>
					</div>
					<div v-if="scope.row.upState=='8'">		
					<i>上传完成</i>
					</div>
					<div v-if="scope.row.upState=='9'">	
					<i style="color: red;">文件读取异常，请重新导入</i>
					</div>
				</template>
				</el-table-column>
				<el-table-column
				label="操作"
				min-width="80"
				>
				<template slot-scope="scope">
					<div style="display: flex;justify-content: center;">	
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">
							 <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='0'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="iconfont icon-xiazaizanting" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='1'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='2'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-refresh" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='3'"  @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-sort" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='4'"></i>
						   <i class="el-icon-refresh" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='5'"></i>
               <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='6'"></i>
							 <!-- <i class="el-icon-loading" style="font-size: 20px;" v-if="scope.row.upState=='9'"></i> -->

						</div>
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">					
						   <i class="el-icon-delete" style="font-size: 20px; cursor: pointer; margin: 0px 10px;" @click="uploadDelect(scope.row.id)"></i> 
						</div>
					</div>
				</template>
				</el-table-column>
			</el-table>
			</div>
			<div class="box2b" >
				<span class="demonstration" style="color: #999999;">已加载{{totleNumber}}条数据</span>
			</div>
		</div>	
		<el-dialog
		title="提示"
		@close="beforeClose"
		:visible.sync="delecteVisible"
		custom-class="DELECT"
		width="30%"
		top='30vh'
		>
		<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>是否要删除该条记录?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="delecteVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" @click="delecteBtn" size="mini" :loading="delecteLoading">确 定</el-button>
		</span>
		</el-dialog>
		
		<el-dialog
		title="提示"
		:visible.sync="delectesVisible"
		custom-class="DELECT"
		width="30%"
		top='30vh'
		>
		<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除选中文件, 是否继续?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="delectesVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" @click="delectAllBtn" size="mini" :loading="delectesLoading">确 定</el-button>
		</span>
		</el-dialog>
		<!--//重复操作框-->
		<el-dialog
  title="提示"
  :visible.sync="moveRepeatVisible"
  width="84%"
  >
	<span style="color: #909399;margin-bottom: 20px;display: block;text-align: left;">
		检测到以下信息存在重复（如需替换请选择需替换的歌曲）
	</span>
  <span style="border: 1px solid #ebeef5;display: block;position: relative;">
	<!--	<span style="position: absolute;
    left: 0px;
    top: 70px;
    display: block;
    z-index: 20000000;
    background: #e6a23c;
    width: 30px;
    border-radius: 0,50%,50%,0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;">
			新
		</span>-->
		 <el-table
      :data="tableData2"
			:row-class-name="tableRowClassName"
			max-height="300"
      style="width: 100%"
			@selection-change="handleSelectionChange1"
			>
			<!-- <el-table-column
      type="selection"
			:selectable="checkSelectable"
      width="55">
    </el-table-column> -->
      <el-table-column
			  
        prop="id"
        label="编号"
        >
				<template slot-scope="scope">
							<span v-if="scope.row.status ==3 " style="display: block;position: relative;">
								<span style="
									
									display:inline-block;
									margin-left: -28px;
									margin-right: 0px;
									background: #e6a23c;
									width: 30px;
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
      <el-table-column
        prop="name"
        label="歌曲名称"
       >
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手名称">
      </el-table-column>
			<el-table-column
				prop="language"
				min-width="60"
				label="语言">
				<template slot-scope="scope">
					
					<span v-if="scope.row.language =='0' || scope.row.language =='国语'">
							国语
						</span>
						<span v-else-if="scope.row.language =='1' || scope.row.language =='粤语'">
						粤语
						</span>
						<span v-else-if="scope.row.language =='2' || scope.row.language =='闽南语'">
						闽南语
						</span>
						<span v-else-if="scope.row.language =='3' || scope.row.language =='英语'">
						英语
						</span>
						<span v-else-if="scope.row.language =='4' || scope.row.language == '日语'">
						日语
						</span>
						<span v-else-if="scope.row.language =='5' || scope.row.language =='韩语'">
						韩语
						</span>
						<span v-else-if="scope.row.language =='6' || scope.row.language =='其他'" >
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
			<el-table-column
				prop="picture"
				min-width="50"
				label="画面">
				<template slot-scope="scope">
					<span v-if="scope.row.picture =='0' || scope.row.picture == '原版MV'">
						原版MV
					</span>
					<span v-else-if="scope.row.picture =='1' || scope.row.picture == 'LIVE' ">
						LIVE
					</span>
					<span v-else-if="scope.row.picture =='2' || scope.row.picture == '舞曲'">
						舞曲
					</span>
					<span v-else-if="scope.row.picture =='3' || scope.row.picture == '配置画面'">
						配置画面
					</span>
					<span v-else-if="scope.row.picture =='4' || scope.row.picture == 'MTV'">
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
			<el-table-column
				prop="area"
				min-width="60"
				label="地区">
				<template slot-scope="scope">
					<span v-if="scope.row.area =='0' || scope.row.area =='大陆'">
						大陆
					</span>
					<span v-else-if="scope.row.area =='1' || scope.row.area =='港台'">
						港台
					</span>
					<span v-else-if="scope.row.area =='2' || scope.row.area =='日韩'">
						日韩
					</span>
					<span v-else-if="scope.row.area =='3' || scope.row.area =='欧美'">
						欧美
					</span>
					<span v-else-if="scope.row.area =='4' || scope.row.area =='其他'" >
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
			<el-table-column
				prop="format_type"
				min-width="60"
				label="格式">
				<template slot-scope="scope">
					<span v-if="scope.row.format_type =='0' || scope.row.format_type =='高清'">
						高清
					</span>
					<span v-else-if="scope.row.format_type =='1' || scope.row.format_type =='DVD'">
						DVD
					</span>
					<span v-else-if="scope.row.format_type =='2' || scope.row.format_type =='MP4'">
						MP4
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
			<el-table-column
				prop="voice_type"
				label="声音版本">
				<template slot-scope="scope">
					<span v-if="scope.row.voice_type =='0' || scope.row.voice_type =='消音'">
						消音
					</span>
					<span v-else-if="scope.row.voice_type =='1' || scope.row.voice_type =='原版伴奏'">
						原版伴奏
					</span>
					<span v-else-if="scope.row.voice_type =='2' || scope.row.voice_type =='演唱会'">
						演唱会
					</span>
					<span v-else-if="scope.row.voice_type =='3' || scope.row.voice_type =='remix'">
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
	 	<el-table-column  label="原唱声轨" min-width="80">
				<template slot-scope="scope">
					<span v-if="scope.row.status">
						<span v-if="scope.row.voice_track =='1' ">
							第1声轨
						</span>   
						<span v-else-if="scope.row.voice_track =='2'">
							第2声轨
						</span> 
						<span v-else-if="scope.row.voice_track =='左' ">
							左声道
						</span>   
						<span v-else-if="scope.row.voice_track =='右'">
							右声道
						</span>   
							<span v-else-if="scope.row.voice_track ==null" style="color: red;">
							缺失
							</span>
							<span v-else style="color: red;">
							缺失
							</span>											
					</span>
					<span v-else>
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
					</span>
			
				</template>
			</el-table-column>
			<el-table-column  label="伴唱声轨" min-width="80">
				<template slot-scope="scope">
					
					<span v-if="scope.row.status">
						<span v-if="scope.row.vocal_track =='1'">
							第1声轨
						</span>   
						<span v-else-if="scope.row.vocal_track =='2'">
							第2声轨
						</span> 
						<span v-else-if="scope.row.vocal_track =='左'">
							左声道
						</span>   
						<span v-else-if="scope.row.vocal_track =='右'">
							右声道
						</span>   		
						<span v-else-if="scope.row.vocal_track ==null" style="color: red;">
							缺失
							</span>
							<span v-else style="color: red;">
							缺失
							</span>						
					</span>
			    <span v-else>
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
					</span>
				</template>
			</el-table-column>
			<el-table-column label="上传时间" min-width="80">
				<template slot-scope="scope">
					<span v-if="scope.row.upload_data">
						<!-- <div> {{scope.row.create_date.split("　")[0]}}</div>				
						<div>{{scope.row.create_date.split("　")[1]}}</div> -->
						{{scope.row.upload_data}}
					</span>
					<span v-else>
						<!-- <div> {{scope.row.upload_data.split("　")[0]}}</div>				
						<div>{{scope.row.upload_data.split("　")[1]}}</div> 				 -->		
						{{scope.row.upload_time}}
					</span> 
			</template>
			</el-table-column>
			<el-table-column
				prop="album.name"
				label="专辑名称">
				<template slot-scope="scope">
					 <span v-if="scope.row.album ==null"  >
						 无
					 </span>
					 <span v-if="scope.row.album !=null">
					 	{{scope.row.album.name}}
					 </span>
				</template>
			</el-table-column>
			<el-table-column
				prop="company"
				label="唱片公司">
				<template slot-scope="scope">
					<span v-if="scope.row.company ==null"  >
						无
					</span>
					<span v-if="scope.row.company !=null">
						{{scope.row.company.name}}
					</span>
				</template>
			</el-table-column>
			<el-table-column				
				label="操作">
				<template slot-scope="scope">
					   <el-button type="text" @click="xinZheng(scope.row.id)" v-if="scope.row.status == 3" style="font-size: 12px;">新增</el-button>
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
	
 <!-- <span slot="footer" class="dialog-footer">
   <el-button @click="moveRepeatVisible = false" size="mini">取 消</el-button>
	 
    <el-button type="info" @click="moveRepeatVisible = false" size="mini" :disabled="true" v-show="!replaceFlage">替换</el-button>
		<el-button type="primary" @click="tihuanAll" size="mini" v-show="replaceFlage" :loading="replaceBtnLoading">替换</el-button>

  </span> -->
</el-dialog>
	</div>
</template>

<script>
	import Bus from '../bus.js'
	import Loading from '../CustomComponents/Loading';
	import Upload from '../CustomComponents/upload';
	const fs = require("fs")
	var filename=`${__dirname}/../../assets/data.json`;
	import { get } from "../api.js";
	export default{
		components: { Upload },
		data(){
			return{
				
				multipleSelection:[],
				multipleSelection1:[],
				height:'',
				currentID:"",
				delecteVisible:false,
				delecteLoading:false,
				delectesVisible:false,
				delectesLoading:false,
				flageAll:true,
				moveRepeatVisible:false,
				moveRepeatID:"",
				tableData2:[],
				step:1024*1024,
				replaceFlage:false,
				replaceBtnLoading:false,
				hackReset:true,
				user_id:""
				
			}
		},
		filters: {
			FileSize: function(value) {
				
				return Math.floor(value/1024/1024) >1024? Math.floor(value/1024/1024)/1024+"G" : Math.floor(value/1024/1024)+"M";
			}
		},
		computed: {
			boxFlage() {
				if(this.tableData.length>0){
					return false
				}else{
					return true
				}				
			},
			totleNumber(){
				return this.tableData.length;
			},
			tableData(){
				
				return this.$store.state.Counter.data
				
			},
			tableData1(){
				 
					
					return this.$store.state.Counter.data;
			}
		},

		methods:{
			checkSelectable(row,index) {
      return index > 0
      },
			tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'new-row';
        } 
        return '';
      },
      moveRepeat(obj){
				String.prototype.trim = function() {
						return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
					}
				var _this = this;
				_this.tableData2 = [];
				obj.content.upload_data = obj.upload_data;
				_this.tableData2.push(obj.content)
				var send_data = {
					   name: obj.content.name.trim(),
						 singer: obj.content.singer.trim()
				}
				this.moveRepeatID = obj.id;
				get("/music/music/store",send_data).then(function(res){
					    console.log(res)
							res.data.results.map(function(item,index){
								 if(item.official_is_publish == '0'){
									 res.data.results.splice(index,1)									 
								 }								
							})
							
						_this.tableData2 = _this.tableData2.concat(res.data.results )	
						console.log(_this.tableData2	)
						_this.moveRepeatVisible = true
				})  
			},
			tihuan(id){
				this.moveRepeatVisible = false
				console.log(this.moveRepeatID,id,this.$store.getters.number)
				if(this.$store.getters.number<3){
					this.$store.commit("startUplaodRepeat",{fileID:this.moveRepeatID,THid:id})
				
				}else{
					this.$store.commit("startUplaodRepeat1",{fileID:this.moveRepeatID,THid:id})
				}
			},
			tihuanAll(){
				this.replaceBtnLoading = true
				var arr = this.multipleSelection1;
				var _this = this;
				var arr1 = this.$store.state.Counter.data;
				var obj = {}
				var length = arr1.length;
				var number = this.$store.getters.number;
				arr1.map(function(item){
					  if(item.id == _this.moveRepeatID){
							for(var key in item){
								obj[key] = item[key]
							}
						}
				})
			var arr2 = [];
			this.$store.commit('delect',this.moveRepeatID);
			this.$store.commit("genXindex");
				// this.$store.commit('startUplaodRepeatAll',arr)
				arr.map(function(item){
					item.status = 3;
					var file = {
						THid:item.id,
						content:item,
						currentNum:0,
						file:obj.file,
						id:length,
						path:obj.path,
						size:obj.size,
						type:obj.type,
						upload_data:item.update_date,
						name:obj.file.name
					}
// 					item.currentNum = 0;
// 					item.file = obj.file;
// 					item.THid = item.id;
// 					item.id = length;
					length++;
// 					
// 					 if(_this.$store.getters.number<3){
// 					 	_this.$store.commit("startUplaodRepeatAll",{fileID:_this.moveRepeatID,THid:item.id})
// 					 
// 					 }else{
// 					 	_this.$store.commit("startUplaodRepeatAll1",{fileID:_this.moveRepeatID,THid:item.id})
// 					 }
          
       if(number<3){
				   file.upState = '1'
					 number++
			 }else{
				 file.upState = '4'
				
			 }
     arr2.push(file)
				})
				console.log(arr2)
				this.$store.commit("startUplaodRepeatAll",arr2)
				this.moveRepeatVisible = false;
				this.replaceBtnLoading = false;
			},
			xinZheng(id){
				this.moveRepeatVisible = false;
				// this.uploadBtn(this.moveRepeatID)
				if(this.$store.getters.number<3){
					this.$store.commit("startUplaodxiZheng",{fileID:this.moveRepeatID})				
				}else{
					this.$store.commit("startUplaodxiZheng1",{fileID:this.moveRepeatID})	
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				if(this.multipleSelection.length>0){
					this.flageAll = false
					Bus.$emit('val3', "1")
				}else{
					this.flageAll = true
					Bus.$emit('val3', "0")
				}
			},
			handleSelectionChange1(val){
				this.multipleSelection1 = val;
				if(this.multipleSelection1.length>0){
					this.replaceFlage = true;
					
				}else{
					this.replaceFlage = false;
					
				}
			},
			uploadBtn(id){
				console.log(id,"id")
				var arr = this.tableData;
				var _this = this;
				    arr.map(function(item){
							 if(item.id == id){
								 // console.log(_this.$store.getters.number)
								 if(item.upState == "0"){
									 
								    // item.upState = '1'
										if(_this.$store.getters.number<3){
											
												var obj = {
													
													 "id":id,
													 "key":"upState",
													 "value":"1"
												}
												_this.$store.commit("goo",obj)
												
										}else{
											var obj = {												
												"id":id,
												"key":"upState",
												"value":"4"
											}
											_this.$store.commit("goo",obj)
										}
										
								 }else if(item.upState == "1"){
									 
									 
										var obj = {
											
											"id":id,
											"key":"upState",
											"value":"2"
										}
										_this.$refs[id].stop()
										_this.$store.commit("goo",obj)
										_this.$store.commit("NEXT")
										
								 }else if(item.upState == "2"){
									     	var obj = {									 	
									     	"id":id,
									     	"key":"startFlage",
									     	"value":true
									     	}
									     _this.$store.commit("goo",obj)
									 if(_this.$store.getters.number<3){
											
												 var obj = {									 	
													"id":id,
													"key":"upState",
													"value":"1"
												 }
												 _this.$store.commit("goo",obj)
												 // _this.$refs[id].start()									 
										 }else{
									    var obj = {												
									    	"id":id,
									    	"key":"upState",
									    	"value":"4"
									    }
									    _this.$store.commit("goo",obj)
									 }
								 }else if(item.upState == "3"){
									 console.log("重新上传")
									 if(_this.$store.getters.number<3){
										 var obj1 = {
										 	
										 	"id":id,
										 	"key":"currentNum",
										 	"value":0
										 }
										 _this.$store.commit("goo",obj1)
										 
										 var obj = {
										 
										 "id":id,
										 "key":"upState",
										 "value":"1"
										 }
										 _this.$store.commit("goo",obj)
									 }else{
										 var obj1 = {
										 
										 "id":id,
										 "key":"currentNum",
										 "value":0
										 }
										 _this.$store.commit("goo",obj1)
										 
										 var obj = {
										 
										 "id":id,
										 "key":"upState",
										 "value":"4"
										 }
										 _this.$store.commit("goo",obj)
									 }
									
								 }
							 }
						})

			},
			uploadDelect(id){
				this.currentID = id;
				this.delecteVisible = true
				var _this = this;

			
			},
			beforeClose(){
				console.log("beforeClose")
				var _this = this;

			},
			StopUpload(){
				var _this = this;
				var arr = [];
				if(this.flageAll){
					arr = [...this.tableData]
					
				}else{
					arr = this.multipleSelection
				}
				arr.map(function(item){
					   if(item.upState == "1"){
							    var obj = {
										 "id":item.id,
										 "key":"upState",
										 "value":"2"
										 
									}
								_this.$refs[item.id].stop()
								_this.$store.commit("goo",obj)
						 }else if(item.upState == "4"){
							   var obj = {
									  "id":item.id,
										"key":"upState",
										"value":"0"
								 }
								_this.$store.commit("goo",obj)
						 }
				})
				// this.$store.commit("NEXT")
			},
			StartUpload(){
				var _this = this;
				var arrAll = [];
				if(this.flageAll){
					arrAll = [...this.tableData]
				}else{
					arrAll = this.multipleSelection
				}
				arrAll.map(function(item){
					  if(item.upState == "0"&& _this.$store.getters.number<3){
							    var obj = {
										"id":item.id,
										"key":"upState",
										"value":"1"
									}
								_this.$store.commit("goo",obj)
								// _this.$refs[item.id].start()
								
						}else if(item.upState == "0"&& _this.$store.getters.number>=3){
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"4"
								}
							_this.$store.commit("goo",obj)
						}else if(item.upState == "2"&& _this.$store.getters.number<3){
								var obj = {									 	
								"id":item.id,
								"key":"startFlage",
								"value":true
								}
							_this.$store.commit("goo",obj)
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"1"
								}
							_this.$store.commit("goo",obj)
							 // _this.$refs[item.id].start()
						}else if(item.upState == "2"&& _this.$store.getters.number>=3){
								var obj = {									 	
								"id":item.id,
								"key":"startFlage",
								"value":true
								}
							_this.$store.commit("goo",obj)
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"4"
								}
							_this.$store.commit("goo",obj)
						}else if(item.upState == "3"&& _this.$store.getters.number<3){
							var obj1 = {
								
								"id":item.id,
								"key":"currentNum",
								"value":0
							}
							_this.$store.commit("goo",obj1)
							
							var obj = {
							
							"id":item.id,
							"key":"upState",
							"value":"1"
							}
							_this.$store.commit("goo",obj)
						}else if(item.upState == "3"&& _this.$store.getters.number>=3){
							var obj1 = {
								
								"id":item.id,
								"key":"currentNum",
								"value":0
							}
							_this.$store.commit("goo",obj1)
							
							var obj = {
							
							"id":item.id,
							"key":"upState",
							"value":"4"
							}
							_this.$store.commit("goo",obj)
						}
				})
				
					
				
			},
			DelectUpload(){
				if(this.tableData.length>0){				
				   this.delectesVisible = true;
					 var _this = this;
					 console.log("oolkkjmbb")
					 
				}
			},
			
			
			//多个删除；
			delectAllBtn(){
				var _this = this;
				this.delectesLoading = true;
				var arrAll = [];
				if(this.flageAll){
					arrAll = [...this.tableData]
				}else{
					arrAll = this.multipleSelection
				}
				console.log(arrAll)
				arrAll.map((item)=>{
					 if(item.currentNum>0){
						 var name =item.name.split('.')[0];
						 var index = Math.ceil(item.currentNum/this.step)
						 var send_data = {
						 			name:name,
						 			index:index
						 }
						 get("music/music/video-upload",send_data).then(function(res){
						 						console.log(res)
						 })
					 }
				})
				this.tableData.map(function(item){
					if(item.upState == "1"){
						_this.$refs[item.id].stop();
					}
				})
				this.checkStopAll(this.tableData)
			},
			checkStopAll(data){
				var flage = true;
				data.map((item)=>{
					
					if(item.upState == "1" && item.startFlage){
							flage = false
					}
				})
				if(flage){
					this.kooAll()
				}else{
					console.log("kooAll循环了")
					setTimeout(()=>{
						this.checkStopAll(data)
					},200)
				}
			},
		kooAll(){
				
				var _this = this;
        var arrAll = [];
        if(this.flageAll){
        	arrAll = [...this.tableData]
        }else{
        	arrAll = this.multipleSelection
        }
				 
				_this.$store.commit("delectAll",arrAll)
					
					
					setTimeout(()=>{
						_this.$store.state.Counter.data.map(function(item){
									if(item.upState == "1"){
										_this.$refs[item.id].start()
									}
								})
							var num = _this.$store.getters.number;
							if(num<3){
								var key = 3-num;
								for(var i =0;i<key;i++){
									_this.$store.commit("NEXT")
								}				 		
							}					 
					},200)								
					_this.delectesLoading = false;
					_this.delectesVisible = false;
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//单个删除
			delecteBtn(){
			var _this = this;
			this.delecteLoading = true;
			var id = this.currentID;
			var fileData = ""
			// this.$refs[id].cancleUpload();
			var arr = this.$store.state.Counter.data;
			arr.map(function(item){
				 if(item.id == id){
					 fileData = item;
				 }
			})
			console.log(fileData)
			if(fileData.currentNum>0 && fileData.currentNum<=fileData.file.size){
				  var name =fileData.name.split('.')[0];
					var index = Math.ceil(fileData.currentNum/this.step)
					var send_data = {
						    name:name,
								index:index
					}
					get("music/music/video-upload",send_data).then(function(res){
						           console.log(res)
					})
			}
			
			
			
			this.tableData.map(function(item){
								  if(item.upState == "1"){
										console.log(_this.$refs[item.id])
										 _this.$refs[item.id].stop();													 
									}
									
							})
			this.checkStop(this.tableData);				

			},
		checkStop(data){
			var flage = true;
			data.map((item)=>{
				
				if(item.upState == "1" && item.startFlage){
					  flage = false
				}
			})
			if(flage){
				this.koo()
			}else{
				console.log("koo循环了")
				setTimeout(()=>{
					this.checkStop(data)
				},200)
			}
		},
	
		koo(){
			var id = this.currentID;
			var _this = this;

			
				console.log("delect")
				_this.$store.commit("delect",id)
				
				console.log(_this.tableData,"this.tableData")
				setTimeout(()=>{
					_this.$store.state.Counter.data.map(function(item){
								if(item.upState == "1"){
									_this.$refs[item.id].start()
								}
							})
						var num = _this.$store.getters.number;
						if(num<3){
							var key = 3-num;
							for(var i =0;i<key;i++){
								_this.$store.commit("NEXT")
							}				 		
						}					 
				},200)								
				_this.delecteVisible = false;
				_this.delecteLoading = false;
		}
		 
		},
		
		mounted(){
			this.user_id = localStorage.getItem("user_id");
			var _this = this;
			var box = document.getElementById('Uploading')
				box.ondragover = function (ev) {
					//阻止浏览器默认打开文件的操作
					ev.preventDefault();				   
			}
			  box.ondrop = function (ev) {
					//阻止浏览器默认打开文件的操作
					ev.preventDefault();				   
			}
			console.log(this.$store.state.Counter.data)
			this.height =  "height:" + (document.body.clientHeight - 130) + "px"					
			window.onresize = function() {
			
				setTimeout(function() {
					_this.height =  "height:" + (document.body.clientHeight - 130) + "px"
					
				
				}, 2)
			}
			Bus.$on('StopUpload',function(){
				_this.StopUpload()
			})
			Bus.$on("StartUpload",function(){
				_this.StartUpload()
			})
			Bus.$on("DelectUpload",function(){
				_this.DelectUpload()
			})
			Bus.$on("exitLogin",function(){
				_this.StopUpload()
				_this.delectAllBtn()
			})
			console.log(this.$store.state.Counter.data,"Counter")
			setInterval(()=>{
				// console.log(this.tableData)
				var arr = this.tableData;
				    arr.map((item)=>{
							 if(item.upState == 0 && this.$store.getters.number < 3){
								 var obj = {
								 
								 "id":item.id,
								 "key":"upState",
								 "value":"1"
								 }
								 _this.$store.commit("goo",obj)
							 }else if(item.upState == 0 && this.$store.getters.number >= 3){
								 var obj = {
								 
								 "id":item.id,
								 "key":"upState",
								 "value":"4"
								 }
								 _this.$store.commit("goo",obj)
							 }
						})
			},200)
		},
		beforeDestroy(){
// 				Bus.$off('delected2')
// 				Bus.$off('DRfoo')
				Bus.$emit('val3', "0")
				// window.onresize=null	
	  }
	}
</script>

<style>
	i {
		font-style: normal;
	}
	.el-table .new-row {
    background: oldlace;
		
		
  }

  /*.el-table .success-row {
    background: #f0f9eb;
  }*/
	.el-progress__text{
		display: none;
	}
	.cell{
		text-align: center;
	}
	#Uploading{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;	
		position: relative;
	}
	#Uploading .box2{
		width: 100%;
		
	}
	.el-table td{
		height: 54px;
	}
	#Uploading .box2a{
		overflow: auto;
		
		height: 100%;
		
		margin-right: 5px;
	}
	#Uploading .box2b{
		padding: 0 20px;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		border-top: 1px solid gainsboro;
		width: 100%;
		height: 50px;
		background: white;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
   .ff{
	    align-items: center;
	}
	.gg{
	   align-items: flex-start;
	}
	#scroll-1::-webkit-scrollbar-track,.el-checkbox-group::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f0f0f0;
		}
	
		#scroll-1::-webkit-scrollbar,.el-checkbox-group::-webkit-scrollbar {
		width: 10px;
		background-color: #f0f0f0;
		}
	
		#scroll-1::-webkit-scrollbar-thumb,.el-checkbox-group::-webkit-scrollbar-thumb {
		border-radius: 20px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #cfd1d3;
		}
	
		#scroll-1::-webkit-scrollbar-thumb:hover,.el-checkbox-group::-webkit-scrollbar-thumb:hover {
		background-color: #a7acb1;
		}
	
		#scroll-1::-webkit-scrollbar-thumb:active,.el-checkbox-group::-webkit-scrollbar-thumb:active {
		background-color: #9da2a7;
		}	
</style>