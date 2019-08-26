<template>
	<div id="LibraryManagement" @click="album_nameFlage = false;company_nameFlage = false">
		<el-dialog @close="beforeClose" title="批量搜索" top='26vh' :close-on-click-modal="false" custom-class="PLSOSU"
		 :visible.sync="dialogVisible" width="401px">
			<span style="display: flex;background: #fbfbfb;box-sizing:border-box;height: 176px;border: 1px  dashed #fed347;border-radius: 5px;justify-content: center;align-items: center;">
				<span v-if="!showUpload" style="display: block;width: 70%;text-align: center;">
					<i class="el-icon-document" style="font-size: 50px;color: #96a0ba;"></i>
					<div style="margin-top: 20px;">
						<span style="display: flex;justify-content: space-between;margin: 0px 16px 0px 15px;align-items: center;" class="uploadFileName">
							<span class="fileName">
								<i class="el-icon-tickets"></i>
								<i style="font-style: normal;">{{fileName}}</i>
							</span>
							<i class="el-icon-close uploadFileClose" style="cursor: pointer;" @click="uploadClose"></i>
						</span>
						<span>
							<el-progress :stroke-width="2" :percentage="percentage" :status="percentageStatus"></el-progress>
						</span>
					</div>
				</span>
				<el-upload ref="upload" v-show="showUpload" :headers="headers" class="upload-demo" drag :on-progress="handleProgress"
				 :on-success="handleSuccess" :on-error="handleError" :before-upload="handleUpload" :action="actionUrl">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text" style="font-size: 14px;" v-show="TJerror">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__text" style="font-size: 14px;color: red;" v-show="!TJerror">{{fileName}}上传失败，请重新上传</div>
				</el-upload>
			</span>
			<p style="margin: 0;padding: 0; text-align: left;margin-top: 20px;font-size: 14px;">请先上传模板文件已完成批量搜索
				<a style="color:#7f74ef;cursor: pointer;text-decoration: underline;" @click="MBdown">下载模板</a>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="submitContent" size="mini" v-show="!uploadBtn" :loading="submitContentLoading">提交</el-button>
				<el-button type="info" size="mini" :disabled="true" v-show="uploadBtn">提交</el-button>
			</span>
		</el-dialog>
		<!--替换弹框-->
		<el-dialog :title="replacefileName" @close="replaceClose" :visible.sync="replaceVisible" width="401px"
		 :close-on-click-modal="false" top='26vh' custom-class="PLSOSU">
			<span style="display: flex;box-sizing:border-box;height: 176px;border-radius: 5px;justify-content: center;align-items: center;">
				<span v-if="showUpload1" style="display: block;width: 70%;text-align: center;">
					<img src="../../assets/file.png" />
					<div style="margin-top: 20px;">
						<span style="display: flex;justify-content: space-between;margin: 0px 16px 0px 15px;align-items: center;" class="uploadFileName">
							<span class="fileName">
								<i class="el-icon-tickets"></i>
								<i style="font-style: normal;display: inline-block;width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{isReplacefileName}}</i>
							</span>

							<i class="el-icon-close uploadFileClose" style="cursor: pointer;" @click="replaceClose"></i>
						</span>
						<span>
							<replaceFile :file="repFile" ref="replaceFileTemp" @onSuccess="replaceSuccess" @onError="replaceError"></replaceFile>
						</span>
					</div>
				</span>
				<span v-show="!showUpload1" style="text-align: center;">
					<span class="fileinput-button" style="cursor: pointer;">
						<el-button size="mini" style="width: 100px;"><i class="el-icon-upload el-icon--left"></i>上传</el-button>
						<!--<input type="file">-->
						<input type="file" ref="replaceUpload" @change="replaceBeforeUpload" style="background: yellow;" />
					</span>
					<div slot="tip" class="el-upload__tip" v-show="!replaceUploadError">请先上传文件已完成替换</div>
					<div slot="tip" class="el-upload__tip" v-show="replaceUploadError" style="color: red;">"文件名"上传失败，请从新上传</div>
				</span>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="replaceVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" v-show="!replaceBtn" @click="replaceFileBtn" :loading="replaceFileBtnStatus">替换</el-button>
				<el-button type="info" size="mini" :disabled="true" v-show="replaceBtn">替换</el-button>
			</span>
		</el-dialog>

		<!--单个删除弹框-->
		<el-dialog title="提示" :visible.sync="delecteVisible" custom-class="DELECT" width="30%" top='30vh'>
			<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除该文件, 是否继续?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delecteVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="delecteBtn" size="mini" :loading="delecteLoading">确 定</el-button>
			</span>
		</el-dialog>
		<!--批量删除弹框-->
		<el-dialog title="提示" :visible.sync="delectesVisible" custom-class="DELECT" width="30%" top='30vh'>
			<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除选中文件, 是否继续?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delectesVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="delectesBtn" size="mini" :loading="delectesLoading">确 定</el-button>
			</span>
		</el-dialog>
		<div class="soushuo">
			<el-row>
				<el-col :span="20" style="height: 50px;display: flex;align-items: center;font-size: 14px;">
					<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
						<el-form-item label="歌曲名称">
							<el-autocomplete class="inline-input" v-model="formInline.name" :fetch-suggestions="querySearch" placeholder="请输入内容"
							 @select="handleSelect"></el-autocomplete>
						</el-form-item>
						<el-form-item label="歌手名称">
							<el-autocomplete class="inline-input" v-model="formInline.singer" :fetch-suggestions="querySearch" placeholder="请输入内容"
							 @select="handleSelect"></el-autocomplete>
						</el-form-item>
						<el-form-item label="时间范围">
							<el-date-picker v-model="formInlineDate" @change="changeDate" type="daterange" align="right" unlink-panels
							 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
							 :picker-options="pickerOptions2">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="1" style="height: 50px;display: flex;align-items: center;margin-right: 40px;">
					<el-button type="primary" size="mini" @click="onSubmit" :loading="onSubmitLoading">搜索</el-button>
				</el-col>
				<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
					<el-button size="mini" @click="dialogVisible = true">批量搜索</el-button>
				</el-col>

			</el-row>
			<transition name="slide-fade">
				<div v-show="TipsFlage&&TipsFlage1" style="position: absolute;height: 24px;left: 0;top: 40px;background: #fffbe6;width: 99%;z-index: 7;border-radius: 5px;border: 1px solid #ffe58f;box-sizing: border-box;margin-left: 2px;display: flex;align-items: center;justify-content: space-between;">
					<span>
						<i class="el-icon-info" style="color: #faad15;margin: 0 10px; "></i><i style="font-style: normal;">当前存在{{errorNumber}}条记录存在信息缺失</i>
					</span>
					<i class="el-icon-close" style="margin: 0 10px;font-size: 14px;cursor: pointer;" @click="TipsCloseBtn"></i>
				</div>
			</transition>


		</div>
		<div style="height: 59px;width: 100%;" ref="box_head" class="box_head">
			<ul>
				<li style="width:40px">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
				</li>
				<li :style="widthHead1[0]">编号</li>
				<li :style="widthHead1[1]">歌曲名称</li>
				<li :style="widthHead1[2]">歌手名称</li>
				<li :style="widthHead1[3]">
					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							歌手类型<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.singer_type" :label="100" @change="singer_typeFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.singer_type" :key="index">
								<el-radio v-model="radioForm.singer_type" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[4]">
					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							语言<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.language" :label="100" @change="languageFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.language" :key="index">
								<el-radio v-model="radioForm.language" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[5]">
					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							画面<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.picture" :label="100" @change="pictureFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.picture" :key="index">
								<el-radio v-model="radioForm.picture" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[6]">

					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							地区<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.area" :label="100" @change="areaFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.area" :key="index">
								<el-radio v-model="radioForm.area" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[7]">

					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							格式<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.format_type" :label="100" @change="formatFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.format_type" :key="index">
								<el-radio v-model="radioForm.format_type" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[8]">

					<el-dropdown trigger="click" size="mini">
						<span class="el-dropdown-link" style="cursor: pointer;">
							声音版本<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-radio v-model="radioForm.voice_type" :label="100" @change="voice_typeFilter(100)">全部</el-radio>
							</el-dropdown-item>
							<el-dropdown-item v-for="(item, index) in songInfoData.voice_type" :key="index">
								<el-radio v-model="radioForm.voice_type" :label="item.value" @change="singer_typeFilter(item.value)">{{item.label}}</el-radio>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li :style="widthHead1[9]">原唱声轨</li>
				<li :style="widthHead1[10]">伴唱声轨</li>
				<li :style="widthHead1[11]" style="position: relative;">
					<span v-if="!albumJurisdictionFlage">
						专辑名称
					</span>
					<span v-else>
						<span class="el-dropdown-link" style="cursor: pointer;" @click.self.stop="album_nameFlage = !album_nameFlage;company_nameFlage = false;">
							专辑名称<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<transition name="bounce">
							<span v-show="album_nameFlage">
								<span style="position: absolute;top: 32px;left: 20px;">
									<span style="
										width: 0;
										height: 0;
										border-width: 8px;
										border-style: solid;
										border-color:  transparent transparent #ebeef5 transparent;
										position: absolute;					
										">
									</span>
									<span style="
										width: 0;
										height: 0;
										border-width: 8px;
										border-style: solid;
										border-color:  transparent transparent #ffffff; transparent;
										position: absolute;
										left: 0px;
										top: 2px;
										z-index: 2000000;">
									</span>
								</span>
								<ul style="height: 200px;
										position: absolute;
										top: 44px;
										left: 0%;
										background: yellow;
										z-index: 1000;
										overflow: auto;
										padding: 10px;    
										margin: 5px 0;
										background-color: #fff;
										border: 1px solid #ebeef5;
										border-radius: 4px;
										box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"
								        id="ulo">
									<li style="list-style: none;text-align: left;margin: 5px 0;font-size: 14px;">
										<el-radio v-model="radioForm.album_name" :label="100" @change="album_nameFilter(100)"><span style="font-size: 14px;">全部</span></el-radio>
									</li>
									<li style="list-style: none;text-align: left;margin: 5px 0;font-size: 14px;" v-for="item in album_nameArr">
										<el-radio v-model="radioForm.album_name" :label="item.value" @change="album_nameFilter()"><span style="font-size: 14px;">{{item.value}}</span></el-radio>
									</li>
								</ul>
							</span>
						</transition>
					</span>
				</li>
				<li :style="widthHead1[12]" style="position: relative;">
					<!--唱片公司-->
					<span v-if="!companyJurisdictionFlage">
						唱片公司
					</span>
					<span v-else>
						<span class="el-dropdown-link" style="cursor: pointer;" @click.self.stop="company_nameFlage = !company_nameFlage;album_nameFlage = false;">
							唱片公司<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<span v-show="company_nameFlage">
							<span style="position: absolute;top: 32px;left: 20px;">
								<span style="
									width: 0;
									height: 0;
									border-width: 8px;
									border-style: solid;
									border-color:  transparent transparent #ebeef5 transparent;
									position: absolute;					
									">
								</span>
								<span style="
										width: 0;
										height: 0;
										border-width: 8px;
										border-style: solid;
										border-color:  transparent transparent #ffffff; transparent;
										position: absolute;
										left: 0px;
										top: 2px;
										z-index: 2000000;					
										">
								</span>
							</span>
							<ul style="height: 200px;
										position: absolute;
										top: 44px;
										left: 0;
										background: yellow;
										z-index: 1000;
										overflow: auto;
										padding: 10px;    
										margin: 5px 0;
										background-color: #fff;
										border: 1px solid #ebeef5;
										border-radius: 4px;
										box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"
							 id="ulo">
								<li style="list-style: none;text-align: left;margin: 5px 0;font-size: 14px;">
									<el-radio v-model="radioForm.company_name" :label="100" @change="company_nameFilter(100)"><span style="font-size: 14px;">全部</span></el-radio>
								</li>
								<li style="list-style: none;text-align: left;margin: 5px 0;font-size: 14px;" v-for="item in company_nameArr">
									<el-radio v-model="radioForm.company_name" :label="item.value" @change="company_nameFilter()"><span style="font-size: 14px;">{{item.value}}</span></el-radio>
								</li>
							</ul>
						</span>
					</span>
				</li>
				<li :style="widthHead1[13]">上传日期</li>
				<li :style="widthHead1[14]">操作</li>
			</ul>
		</div>
		<div style="flex: 1; 100%;position: relative;" id="box">
			<div :class="{aa:flageClass,bb:!flageClass}" :style="height" id="scroll-1" @contextmenu.stop='rightMeun'>
				<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" @selection-change="handleSelectionChange"
				 @row-contextmenu="hoo" style="width: 100%;font-size: 14px;color: #666666;">
					<el-table-column type="selection" width="40">
					</el-table-column>
					<el-table-column prop="music_code" label="编号" :width="widthHead[0]">

					</el-table-column>
					<el-table-column prop="name" label="歌曲名称" :width="widthHead[1]">
						<template slot-scope="scope">
							<span v-if="scope.row.name ==null " style="color: red;">
								缺失
							</span>
							<span v-else>
								{{scope.row.name}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="singer" label="歌手名称" :width="widthHead[2]">
						<template slot-scope="scope">
							<span v-if="scope.row.singer ==null " style="color: red;">
								缺失
							</span>
							<span v-else>
								{{scope.row.singer}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="歌手类型" :width="widthHead[3]">
						<template slot-scope="scope">
							<span v-if="scope.row.singer_type == null || scope.row.singer_type == ''" style="color: red;">缺失</span>
							<span v-else>
								{{scope.row.singer_type}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="language" label="语言" :width="widthHead[4]">
						<template slot-scope="scope">
							<span v-if="scope.row.language == null || scope.row.language == ''" style="color: red;">缺失</span>
							<span v-else>{{scope.row.language}}</span>
						</template>
					</el-table-column>
					<el-table-column label="画面" :width="widthHead[5]">
						<template slot-scope="scope">
							<span v-if="scope.row.picture == null || scope.row.picture == ''" style="color: red;">缺失</span>
							<span v-else>{{scope.row.picture}}</span>
						</template>
					</el-table-column>
					<el-table-column label="地区" :width="widthHead[6]">
						<template slot-scope="scope">
							<span v-if="scope.row.area == null || scope.row.area == ''" style="color: red;">缺失</span>
							<span v-else>{{scope.row.area}}</span>
						</template>
					</el-table-column>
					<el-table-column label="格式" :width="widthHead[7]">
						<template slot-scope="scope">
							<span v-if="scope.row.format_type == null || scope.row.format_type == ''" style="color: red;">缺失</span>
							<span>
								{{scope.row.format_type}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="声音版本" :width="widthHead[8]">
						<template slot-scope="scope">
							<span v-if="scope.row.voice_type == null || scope.row.voice_type == ''" style="color: red;">缺失</span>
							<span>
								{{scope.row.voice_type}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="原唱声轨" :width="widthHead[9]">
						<template slot-scope="scope">
							<span v-if="scope.row.voice_track == null || scope.row.voice_track == ''" style="color: red;">缺失</span>
							<span v-else>
								{{scope.row.voice_track}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="伴唱声轨" :width="widthHead[10]">
						<template slot-scope="scope">
							<span v-if="scope.row.vocal_track == null || scope.row.vocal_track == ''" style="color: red;">缺失</span>
							<span>
								{{scope.row.vocal_track}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="album" label="专辑名称" :width="widthHead[11]">
						<template slot-scope="scope">
							<span v-if="scope.row.album ==null ">
								无
							</span>
							<span v-else>
								{{scope.row.album.name}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="company" label="唱片公司" :width="widthHead[12]">
						<template slot-scope="scope">
							<span v-if="scope.row.company ==null ">
								无
							</span>
							<span v-else>
								{{scope.row.company.name}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="upload_time" label="上传日期" :width="widthHead[13]">
						<template slot-scope="scope">
							<span v-if="scope.row.upload_time ==null " style="color: red;">
								缺失
							</span>
							<span v-else>
								<div>{{scope.row.upload_time.split(" ")[0]}}</div>
								<div>{{scope.row.upload_time.split(" ")[1]}}</div>
							</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" :width="widthHead[14]">
						<template slot-scope="scope">
							<!-- <i class="iconfont icon-bofang" style="font-size: 20px;cursor: pointer;margin: 0 5px;" @click="play(scope.row.id)"
							 title="播放"></i> -->
							<span v-show="user_id == scope.row.user_id">
								<i class="iconfont icon-bianji" style="font-size: 20px;cursor: pointer;margin: 0 5px;" @click="JumpPage(scope.row.id)"
								 title="编辑"></i>
								<i class="iconfont icon-dianliangqiang_daohang_tihuan_moren" title="替换" style="font-size: 20px;cursor: pointer;margin: 0 5px;"
								 @click="replaceFile(scope.row)"></i>
								<i class="iconfont icon-shanchu" style="font-size: 20px;cursor: pointer;margin: 0 5px;" @click="deleteFile(scope.row.id)"
								 title="删除"></i>
							</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div style="height: 64vh;background: white;width: 100%;position: absolute;left: 0;top: 116px;display: flex;justify-content: center;align-items: center;z-index: 30;"
		 v-show="loading">
			<Loading />
			<!-- <Error/> -->
		</div>
		<div style="height: 50px;width:100%;position: absolute;bottom: 0;right: 0;padding: 0 20px;box-sizing: border-box;border-top: 1px solid gainsboro;">
			<div class="block lastBlock">
				<span class="demonstration" style="color: #999999;">已加载{{tableData3.length}}条数据</span>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]"
				 :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="count">
				</el-pagination>
			</div>
		</div>
		<div class="rightBox" ref='pppp'>
			<ul>
				<!-- <li @click="newBox">播放视频</li> -->
				<li @click="JumpPageRight" v-show="user_id == rowData.user_id">编辑</li>
				<li @click="replaceFileRight" v-show="user_id == rowData.user_id">替换</li>
				<li @click="deleteFileRight" v-show="user_id == rowData.user_id">删除</li>
			</ul>
		</div>
	</div>
	</div>
</template>
<script>
	const ipcRenderer = require('electron').ipcRenderer;
	import Loading from '../CustomComponents/Loading';
	import replaceFile from '../CustomComponents/replaceFile';
	import Bus from '../bus.js'
	import axios from 'axios'
	import Upload from "../upload.js";
	import config from '../../config'
	import { transformData, validateFormat, chaxun } from '../util'
	import {
		get,
		baseUrl,
		DELETE,
		post
	} from '../api'
	export default {
		components: {
			Loading,
			replaceFile
		},
		data() {
			return {
				songInfoData: config.songInfoData,
				albumJurisdictionFlage: true,
				companyJurisdictionFlage: true,
				user_id: "",
				formInline: {
					name: '',
					singer: '',
					published_0: "",
					published_1: ""
				},
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				formInlineDate: [],
				album_nameArr: [],
				album_nameFlage: false,
				company_nameArr: [],
				company_nameFlage: false,
				dialogVisible: false, //批量上传模特框		    
				flage: false,
				// TipsFlage:false,//
				flageClass: false, //控制滚动条
				showFlage: true, //
				TipsFlage1: true,
				showUpload: true, //切换批量上传模特框的
				uploaderror: false, //上传文件出错是调用
				percentage: 0, //上传文件的进度条
				uploadBtn: true, //改变提价按键状态
				loading: false, //table加载状态
				TJerror: true, //搜索失败显示
				fileName: "", //当前上传文件的名字
				templateFile: "", //最终的模板文件	
				submitContentLoading: false, //提交按钮的loading图标
				showUpload1: false,
				replaceVisible: false,
				replacefileName: "",
				isReplacefileName: "",
				replacePercentage: 0,
				// replaceTemplateFile:"",
				replaceBtn: true,
				replaceUploadError: false,
				replaceStatus: false,
				replaceFileBtnStatus: false,
				repFile: "", //替换选取文件
				replaceID: "", //替换文件的ID
				delecteVisible: false,
				deldecteFileID: "",
				delecteLoading: false,
				delectesLoading: false,
				multipleSelection: [],
				delectesVisible: false,
				checkAll: false,
				isIndeterminate: false,
				songName: "",
				singerName: '',
				restaurants: [],
				rowData: "",
				height: "",
				errorNumber: 0,
				onSubmitLoading: false,
				actionUrl: baseUrl + "/music/music/excel-upload",
				msg: [{
						content: '播放'
					},
					{
						content: '编辑'
					},
					{
						content: '替换'
					},
					{
						content: "删除"
					},
					{
						content: "搜索"
					},
					{
						content: "批量搜索"
					}
				],
				tableData3: [],
				multipleSelection: [],
				videoData: [],
				page: 1,
				page_size: 100,
				count: 0,
				widthHead: [110, 70, 80, 80, 60, 70, 50, 60, 80, 70, 70, 80, 80, 100, 150],
				widthHead1: [],
				radioForm: {
					singer_type: 100,
					language: 100,
					picture: 100,
					area: 100,
					format_type: 100,
					voice_type: 100,
					album_name: 100,
					company_name: 100
				},
				isplSolo: false
			}
		},
		computed: {
			percentageStatus: function() {
				if (!this.uploaderror) {
					if (this.percentage == 100) {
						return 'success'
					} else {
						return ""
					}
				} else {

					return "exception"
				}
			},
			replacePercentageStatus: function() {
				if (!this.replaceUploadError) {
					if (this.replacePercentage == 100 && this.replaceStatus) {
						return 'success'
					} else {
						return ""
					}
				} else {

					return "exception"
				}
			},
			headers: function() {
				var token = localStorage.getItem('token');
				var obj = {
					'Authorization': 'Bearer ' + token
				}
				return obj
			},
			TipsFlage: function() {
				var arr = this.tableData3;
				var n = 0;
				var arrError = []
				var arr1 = []
				arr.map(function(item) {
					if (item.name == null || item.singer == null || item.singer_type == 4 || item.language == null || item.picture ==
						null || item.picture == 5 || item.area == null || item.format_type == null || item.format_type == 3 || item.voice_type ==
						null || item.voice_track == null || item.voice_track == 4 || item.vocal_track == null || item.vocal_track == 4 ||
						item.update_date == null) {
						n++;
						arrError.push(item)
					} else {
						arr1.push(item)
					}
				})
				this.errorNumber = n;
				if (n > 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			changeDate() {
				// console.log(this.formInlineDate)
				if (this.formInlineDate != null) {
					this.formInline.published_0 = this.formInlineDate[0]
					this.formInline.published_1 = this.formInlineDate[1] + "  23:59:59"
				} else {
					this.formInline.published_0 = ""
					this.formInline.published_1 = ""
				}
			},
			MBdown() { //批量搜索模板下载
				var str = baseUrl + "/music/file/excel/load_search.xlsx"
				ipcRenderer.send('download', str);
			},
			singer_typeFilter(n) {
				// this.radioForm.singer_type = n
				this.searchHandler()
			},
			languageFilter(n) {
				// this.radioForm.language = n
				this.searchHandler()
			},
			pictureFilter(n) {
				// this.radioForm.picture = n
				this.searchHandler()
			},
			areaFilter(n) {
				// this.radioForm.area = n
				this.searchHandler()
			},
			formatFilter(n) {
				// this.radioForm.format = n
				this.searchHandler()
			},
			voice_typeFilter(n) {
				// this.radioForm.voice = n
				this.searchHandler()
			},
			album_nameFilter() {
				this.album_nameFlage = false;
				// console.log(this.radioForm)
				this.searchHandler()
			},
			company_nameFilter() {
				this.company_nameFlage = false;
				// console.log(this.radioForm)
				this.searchHandler()
			},
			loadAllAlbum() {
				var _this = this;
				get("/music/music/album").then(function(res) {
					// console.log(res)
					var arr = res.data.results
					var arr1 = []
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
					_this.album_nameArr = arr1
					// console.log(arr1, "arr")
				}).catch(error => {
					if (error.data.error == "无权限") {
						_this.albumJurisdictionFlage = false
					}
				})
			},
			loadAllCompany() {
				var _this = this;
				get("/music/music/company").then(function(res) {
					var arr = res.data.results
					var arr1 = []
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
					_this.company_nameArr = arr1
				}).catch(error => {
					if (error.data.error == "无权限") {
						_this.companyJurisdictionFlage = false;
					}
				})
			},
			searchHandler() {
				this.isplSolo = false;
				this.tableData3 = []
				var _this = this;
				this.loading = true;
				var send_data = this.formInline; 
				for (var key in this.radioForm) {
					if (this.radioForm[key] == 100) {
						send_data[key] = ""
					} else {
						send_data[key] = this.radioForm[key]
					}
				}
				send_data.page = this.page;
				send_data.page_size = this.page_size;
				send_data.voice = send_data.voice_type;
				get("/music/music/store", send_data).then(function(res) {
					_this.loading = false
					_this.count = res.data.count
					_this.tableData3 = res.data.results ;
				}).catch(() => {
					_this.loading = false
					_this.$notify.error({
						title: '错误',
						message: '加载失败，请重试！！'
					});
				})
			},
			getWidthHead() {
				// console.log(this.$refs.box_head.offsetWidth)
				var _this = this
				var arr = this.widthHead;
				var num1 = this.$refs.box_head.offsetWidth;
				var num2 = 40;
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
				var li = this.$refs.box_head.getElementsByTagName("li");
				for (var i = 1; i < li.length; i++) {
					li[i].style.Width = arr[i]
				}
			},
			TipsCloseBtn() {
				this.TipsFlage1 = false;
			},
			//上传调用函数
			beforeClose() {
				this.showUpload = true
				this.uploaderror = false
				this.percentage = 0
				this.uploadBtn = true
				this.TJerror = true
				this.fileName = ""
				this.$refs.upload.clearFiles()
			},
			submitContent() {
				this.dialogVisible = false
				this.submitContentLoading = true
				this.tableData3
				this.loading = true;
				var _this = this

				var send_id = {
					task_id: this.templateFile.response.task_id
				}
				get("/music/music/task-result", send_id).then(function(res) {
					var send_data = {
						name: res.data.filter_json.songs.join(","),
						singer: res.data.filter_json.singer.join(","),
					}
					send_data.page = _this.page;
					send_data.page_size = _this.page_size;
					get("/music/music/store-search", send_data).then(function(res) {
						_this.isplSolo = true;
						_this.tableData3 = res.data.results
						_this.submitContentLoading = false
						_this.count = res.data.count;
						_this.loading = false
					}).catch(error => {
						_this.$notify({
							title: '提示',
							message: '搜索失败，请重试',
							type: 'warning',
							offset: 120,
							duration: 2000,
						});
						_this.$refs.upload.clearFiles()
						_this.showUpload = true
						_this.uploadBtn = true
						_this.submitContentLoading = false
					})
				}).catch(errro => {
					_this.$notify({
						title: '提示',
						message: '提交失败，请重试',
						type: 'warning',
						offset: 120,
						duration: 2000,
					});
					_this.TJerror = false
					_this.showUpload = true
					_this.uploadBtn = true
					_this.submitContentLoading = false
				})
			},
			JumpPageRight() {
				var id = this.rowData.id
				this.$router.push({
					path: "/editPage",
					query: {
						fileID: id,
						page: "LM"
					}
				})
			},
			replaceFileRight() {
				var row = this.rowData;
				this.replaceVisible = true;
				this.replaceID = row.id;
				this.replacefileName = "替换" + "-" + row.name + "-" + row.singer
			},
			deleteFileRight() {
				var id = this.rowData.id;
				this.deldecteFileID = id;
				this.delecteVisible = true;
			},
			handleError() {
				this.uploaderror = true
			},
			handleProgress(event, file, fileList) {
				var percentage = event.percent
				this.percentage = parseInt(percentage)
			},
			handleSuccess(response, file, fileList) {
				this.templateFile = fileList[0]
				this.uploadBtn = false
			},
			handleUpload(file) {
				var type = file.name.split('.')[1]
				this.uploaderror = false;
				if (type == "xls" || type == "xlsx") {
					this.fileName = file.name
					this.showUpload = false
					this.percentage = 0
				} else {
					this.$notify({
						title: '提示',
						message: '上传文件格式不正确',
						type: 'warning',
						offset: 150,
						duration: 2000,
					});
				}
			},
			uploadClose() {
				this.$refs.upload.abort()
				var fileList = this.$refs.upload.fileList
				this.$refs.upload.clearFiles()
				this.templateFile = ""
				this.showUpload = true
				this.uploaderror = false
				this.uploadBtn = true
				this.TJerror = true
			},
			//编辑跳转页面
			JumpPage(id) {
				this.$router.push({
					path: "/editPage",
					query: {
						fileID: id,
						page: "LM"
					}
				})
			},
			//替换文件
			replaceFile(row) {
				this.replaceVisible = true
				this.replaceID = row.id;
				this.songName = row.name;
				this.singerName = row.singer;
				this.replacefileName = "替换" + "-" + row.name + "-" + row.singer
			},
			replaceBeforeUpload() {
				let file = this.$refs.replaceUpload.files[0]
				if (validateFormat(file.name)) {
					let send_data = {
						name: [file.name]
					}
					post("/music/music/store-verification", send_data).then((res) => {
						var flag;
						var name = res.data[0].name;
						var singer = res.data[0].singer;
						if (this.songName == name && this.singerName == singer) {
							flag = true;
						} else {
							flag = false;
						};
						if([1, 2].includes(res.data[0].status) || !flag){
							this.$notify({
								title: '提示',
								message: '文件名有误, 无法上传',
								type: 'error',
								offset: 120,
								duration: 3000,
							});
						}else if(res.data[0].status == 3){
							chaxun(res.data[0], (results) => {
								if(results.length > 0){
									this.$refs.replaceUpload.value = ""
									this.$notify({
										title: '提示',
										message: '歌曲已存在，请勿重复上传',
										type: 'error',
										offset: 120,
										duration: 3000,
									});
								}else{
									console.log(res.data[0])
									this.uploadFile(file, res.data[0]);
								}
							})
						}else{
							// this.uploadFile(file, res.data[0]);
						}
					})
				} else {
					this.$notify({
						title: '提示',
						message: '请上传正确格式的文件',
						type: 'warning',
						offset: 120,
						duration: 2000,
					});
				}
			},
			uploadFile(file, data){
				this.isReplacefileName = file.name
				this.showUpload1 = true
				this.replaceBtn = false
				file.id = this.replaceID;
				let obj = {
					"currentNum": 0,
					"id": new Date().getTime(),
					"name": file.name,
					"path": file.path,
					"type": file.name.split(".").pop(),
					"isUpload": false,
					"size": file.size,
					"upState": "0",
					"UploadSize" : 0,
					"startFlage": true,
					"content": data,
					"file": file,
				}
				this.repFile =  new Upload(obj, "http://up-z1.qiniup.com");
				this.repFile.stopUpload();
			},
			replaceSuccess() {
				this.replaceVisible = false;
				this.replaceFileBtnStatus = false;
				this.replaceStatus = true;
				this.$refs.replaceUpload.value = ""
				var name = "已替换" + this.songName + "歌曲文件"
				this.$notify({
					title: '提示',
					message: name,
					type: 'success',
					offset: 120,
					duration: 2000,
				});
				if (!this.isplSolo) {
					this.detail()
				} else {
					this.submitContent()
				}
			},
			replaceError(obj) {
				this.replaceUploadError = true
				this.showUpload1 = false
				this.replaceBtn = true
			},
			replaceClose() {
				if (this.$refs.replaceFileTemp) {
					this.$refs.replaceFileTemp.cancleUpload()
				}
				this.$refs.replaceUpload.value = ""
				this.replaceFileBtnStatus = false;
				this.replaceStatus = true;
				this.showUpload1 = false
				this.replaceUploadError = false
				this.replaceBtn = true
				this.replacePercentage = 0
				this.replaceStatus = false
			},
			replaceFileBtn() {
				this.replaceFileBtnStatus = true
				console.log(this.repFile)
				this.$refs.replaceFileTemp.start()
			},
			//  单个删除文件         
			deleteFile(id) {
				this.deldecteFileID = id
				this.delecteVisible = true
			},
			delecteBtn() {
				var arr = this.tableData3
				var ID = this.deldecteFileID
				var _this = this
				this.delecteLoading = true
				var send_data = {
					ids: [ID],
					type: 4
				}
				post("/music/music/store-batch", send_data).then(function(res) {
					arr.map(function(item, index) {
						if (item.id == ID) {
							arr.splice(index, 1)
						}
					})
					_this.delecteLoading = false
					_this.delecteVisible = false
					_this.$notify({
						title: '提示',
						message: '删除成功！',
						type: 'success',
						offset: 120,
						duration: 2000,
					});
				}).catch(error => {
					_this.delecteLoading = false
					_this.delecteVisible = false
					_this.$notify({
						title: '提示',
						message: '删除失败！',
						type: 'error',
						offset: 120,
						duration: 2000,
					});

				})
			},
			//批量删除文件
			delectesBtn() {
				var _this = this
				var arr = this.tableData3
				var arr1 = this.multipleSelection
				this.delectesLoading = true
				var flage = true
				var IDlist = []
				arr1.map(function(item) {
					if (item.user_id == _this.user_id) {
						IDlist.push(item.id)
					} else {
						flage = false;

						return
					}

				})
				if (flage) {
					var send_data = {
						ids: IDlist,
						type: 4
					}
					post("/music/music/store-batch", send_data).then(function(res) {
						for (var i = 0; i < arr1.length; i++) {
							var id = arr1[i].id
							arr.map(function(item, index) {
								if (item.id == id) {
									arr.splice(index, 1)
									return
								}
							})
						}
						_this.$notify({
							message: '删除成功！',
							type: 'success',
							offset: 120,
							duration: 2000,
						});
					}).catch(error => {

						_this.$notify({
							message: '删除失败！',
							type: 'error',
							offset: 120,
							duration: 2000,
						});
					})
				} else {

					_this.$notify({
						message: '存在不可操作选项！',
						type: 'error',
						offset: 120,
						duration: 2000,
					});
				}
				_this.delectesLoading = false
				_this.delectesVisible = false
				// console.log(_this)
			},
			//表单的模糊查询
			querySearch(queryString, callback) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				callback(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
			},
			handleCheckAllChange(val) {
				this.isIndeterminate = false;
				this.checkAll = val
				var arr = this.tableData3
				if (this.checkAll) {
					arr.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row, true);
					})
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				if (this.multipleSelection.length > 0) {
					this.isIndeterminate = true;
					this.checkAll = false;
					Bus.$emit('val', "1")
				}else if(this.multipleSelection.length == 0) {
					this.isIndeterminate = false;
					this.checkAll = false;
					Bus.$emit('val', "0")
				}else if(this.multipleSelection.length == this.tableData3.length) {
					this.isIndeterminate = false;
					this.checkAll = true;
					Bus.$emit('val', "1")
				}
			},
			handleSizeChange(val) {
				var _this = this
				this.tableData3 = []
				this.loading = true
				this.page_size = val;
				this.page = 1;
				if (!this.isplSolo) {
					this.detail()
				} else {
					this.submitContent()
				}
			},
			handleCurrentChange(val) {
				var _this = this
				this.tableData3 = []
				this.loading = true
				this.page = val;
				if (!this.isplSolo) {
					this.detail()
				} else {
					this.submitContent()
				}
			},
			playVideo() {
				this.$router.push('/LibraryManagement/VideoPlayback')
			},
			zhanKai() {
				this.flage = !this.flage
			},
			onSubmitPL() { //批量搜索

			},
			onSubmit() {
				this.isplSolo = false;
				var send_data = this.formInline
				send_data.page = 1;
				send_data.page_size = this.page_size;
				var _this = this;
				this.tableData = [];
				this.loading = true;
				this.onSubmitLoading = true;
				this.tableData3 = []
				get("/music/music/store", send_data).then(function(res) {
					_this.loading = false;
					_this.count = res.data.count;
					_this.tableData3 = res.data.results;
					_this.onSubmitLoading = false;
				}).catch(error => {
					_this.loading = false;

					_this.onSubmitLoading = false;
				})
			},
			open2() {
				this.$notify({
					message: '这是一闭的消息',
					type: 'success',
					duration: 0,
					offset: 60
				});
			},
			afterLeave() {
				this.flageClass = !this.flageClass
			},
			beforeEnter() {
				this.flageClass = !this.flageClass
			},
			isScrollEnd() {
				this.t2 = this.scroll.scrollTop;
				if (this.t2 == this.t1) {
					this.propFlage = false
				}
			},
			rightMeun(e) {
				e.preventDefault();
				var menu = document.querySelector(".rightBox");
				menu.style.left = e.clientX - 200 + 'px';
				menu.style.top = e.clientY - document.querySelector("#scroll-1").offsetTop - 80 + 'px';
				menu.style.width = 100 + 'px'
			},
			hoo(row, event) {
				this.rowData = row
			},
			detail() {
				this.loading = true
				this.isIndeterminate = false;
				this.checkAll = false;
				this.handleSelectionChange([])
				var send_data = this.formInline
				for (var key in this.radioForm) {
					if (this.radioForm[key] == 100) {
						send_data[key] = ""
					} else {
						send_data[key] = this.radioForm[key]
					}
				}
				send_data.page = this.page;
				send_data.page_size = this.page_size;
				get('/music/music/store', send_data).then( (response) => {
					this.loading = false
					this.count = response.data.count
					transformData(response.data.results)
					this.tableData3 = response.data.results
				})
			},
			loadAll() {
				var _this = this
				axios.get('http://localhost:8888/data1').then(function(response) {
					_this.restaurants = response.data
				})
			},
			asyncFunc(id) {
				var _this = this;
				var send_id = {
					"task_id": id
				}
				get("/music/music/task-result", send_id).then(function(res1) {
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
			this.user_id = localStorage.getItem("user_id");
			var _this = this
			this.getWidthHead();
			this.loadAllAlbum();
			this.loadAllCompany();
			this.height = "height:" + (document.body.clientHeight - 239) + "px"
			this.detail();
			window.onclick = function() {
				var menu = document.querySelector(".rightBox");
				if (menu) {
					menu.style.width = 0 + "px"
				}
			}
			window.oncontextmenu = function() {
				var menu = document.querySelector(".rightBox");
				if (menu) {
					menu.style.width = 0 + "px"
				}
			}
			Bus.$on("currentWindow", function(flage) {
				// console.log(flage, "currentWindow")
				setTimeout(function() {
					_this.height = "height:" + (document.body.clientHeight - 239) + "px"
					if (_this.$refs.box_head) {
						_this.getWidthHead()
					}
				}, 30)
			})
			Bus.$on("delected", function() {
				_this.delectesVisible = true
			})
			Bus.$on("exportFile", function() {
				var arr = [];
				_this.multipleSelection.map(function(item) {
					arr.push(item.id)
				})
				var send_data = {
					ids: arr,
					type: 5
				}
				post("/music/music/store-batch", send_data).then(function(res) {
					_this.asyncFunc(res.data.task_id)
				})
			})
		},
		beforeDestroy() {
			Bus.$emit('val', "0")
			Bus.$off('delected')
			Bus.$off('exportFile')
		}
	}
</script>
<style>
	.el-picker-panel__shortcut {
		font-size: 14px;
	}

	#LibraryManagement .has-gutter {
		display: none;
	}
	#LibraryManagement .fileinput-button {
		position: relative;
		display: inline-block;
		overflow: hidden;
	}

	#LibraryManagement .fileinput-button input {
		position: absolute;
		left: 0px;
		top: 0px;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
	}


	#LibraryManagement .soushuo .el-input__inner {
		/*width: 130px;*/
	}

	#LibraryManagement .el-button {
		font-size: 14px;
	}

	#LibraryManagement .cell {
		text-align: center;
	}

	#LibraryManagement .el-upload-list {
		display: none;
	}

	.el-notification {
		width: 300px;
		border-radius: 5px;
		box-shadow: -1px 2px 18px 7px rgba(0, 0, 0, .3);
	}

	#LibraryManagement .PLSOSU {
		border: none;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to

	/* .slide-fade-leave-active for below version 2.1.8 */
		{
		transform: translateY(10px);
		opacity: 0;
	}

	#LibraryManagement .PLSOSU .el-dialog__header {
		padding: 6px 10px;
		text-align: left;
		border-bottom: 1px solid #efeded;
	}

	#LibraryManagement .PLSOSU .el-dialog__header .el-dialog__title {
		font-size: 14px;
		color: #666666;
	}

	#LibraryManagement .PLSOSU .el-dialog__body {
		padding: 30px 20px 10px 20px;
	}

	#LibraryManagement .PLSOSU .el-dialog__header .el-dialog__headerbtn {
		top: 10px;
		right: 10px;
	}

	#LibraryManagement .PLSOSU .el-dialog__body .el-upload-dragger {
		border: none;
		background-color: rgba(255, 255, 255, 0);
		font-size: 14px;
	}

	#LibraryManagement .PLSOSU .el-dialog__footer {
		border-top: 1px solid #efeded;
	}

	#LibraryManagement .PLSOSU .uploadFileName:hover {
		background: #e6e6e0;
	}

	#LibraryManagement .PLSOSU .uploadFileClose:hover {
		color: #409eff;
	}

	#LibraryManagement .DELECT .el-dialog__header .el-dialog__title {
		font-size: 16px;
	}

	#LibraryManagement .DELECT .el-dialog__header {
		display: flex;
		align-items: center;
	}

	#LibraryManagement .DELECT .el-dialog__body {
		text-align: left;

	}

	#LibraryManagement .lastBlock {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background: white;
	}
</style>
<style scoped="scoped">
	.box_head>ul,
	.box_head>ul>li {
		margin: 0;
		padding: 0;
	}

	.album_name .el-dropdown-menu {
		height: 240px;
		overflow: auto;
	}

	.el-dropdown {
		color: #909399;
	}

	.box_head>ul>li {
		list-style: none;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		font-weight: 600;
		color: #909399;
		font-size: 14px;
	}

	.box_head>ul {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ebeef5;
		box-sizing: border-box;

	}

	#LibraryManagement {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-to

	/* .fade-leave-active below version 2.1.8 */
		{
		opacity: 0;
	}

	#LibraryManagement .rightBox {
		width: 0px;
		height: 100px;
		background: yellow;
		position: absolute;
		z-index: 20000;
		display: flex;
		overflow: hidden;
		box-shadow: 1px 1px 7px #a59e9e;
	}

	#LibraryManagement .rightBox ul {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 10px 0;
		margin: 0;
	}

	#LibraryManagement .rightBox ul li {
		width: 100%;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}

	#LibraryManagement .rightBox ul li:hover {
		background: #ececec;
	}

	#LibraryManagement .chaozhuo {
		font-size: 14px;
	}

	#LibraryManagement .demo-form-inline {
		height: 30px;
	}

	#LibraryManagement .soushuo {
		border-bottom: 1px solid #ebebeb;
	}

	.fileName {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.fileName:hover {
		color: #409eff;
	}

	.slide-fade-enter-active {
		transition: all .5s ease;
	}

	.slide-fade-leave-active {
		transition: all .5s ease;
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}

	.aa {
		overflow: auto;
		font-size: 14px;
	}

	.bb {
		overflow: auto;
		font-size: 14px;
	}

</style>
