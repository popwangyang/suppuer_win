<template>
	<div class="box">
		<span class="span1">
		    <div class="span1_input">
				  <span style="display: flex;width: 100px;height: 100%;align-items: center;margin-left: 20px;">
					属性方式：  
				  </span>
				<el-input
					placeholder="请选择日期"
					size='mini'
					>
				</el-input>				
		     </div>  
			
			 <div class="span1_input" style="margin-right: 20px;">
				  <span style="display: flex;width: 100px;height: 100%;align-items: center;margin-left: 20px;">
					属性方式：  
				  </span>
				<el-input
					placeholder="请选择日期"
					size='mini'
					>
				</el-input>				
			 </div>  
			  <div class="span1_input" style="margin-right: 20px;width: 140px;text-align: center;float: right;">  
			    	<el-button type="primary" size="mini" >搜索</el-button>
			  	 <el-button size="mini"  >批量搜索</el-button>
			   </div>   
			<div class="span1_input" style="margin-right: 20px;width: 240px;float: left;">  
				 <el-date-picker
				  v-model="value"
				  type="daterange"
				  align="right"
				  unlink-panels
				  size='mini'
				  range-separator="至"
				  start-placeholder="开始日期"
				  end-placeholder="结束日期"
				  :picker-options="pickerOptions">
				</el-date-picker>
			 </div>  			
		</span>
		<span class="span2">			
		<!-- 	<el-table
			:data="tableData4"
			style="width: 100%;"
			max-height="564"
			>
			<el-table-column
			  fixed			  
			  prop="date"
			  label="日期"
			  width="150">
			</el-table-column>
			<el-table-column
			  prop="name"
			  label="姓名"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="province"
			  label="省份"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="city"
			  label="市区"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="地址"
			  width="300">
			</el-table-column>
			<el-table-column
			  prop="zip"
			  label="邮编"
			  width="120">
			</el-table-column>
			<el-table-column
			  fixed="right"
			  label="操作"
			  width="120">
			  <template slot-scope="scope">
				<el-button
				  @click.native.prevent="deleteRow(scope.$index, tableData4)"
				  type="text"
				  size="small">
				  移除
				</el-button>
			  </template>
			</el-table-column>
		  </el-table>-->
		</span> 
		
		<span class="span3"></span>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				form:{
					name:''					
				},
				value:"",
				pickerOptions: {
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
				 tableData4: [{
					  date: '2016-05-03',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-02',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-04',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-01',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-08',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-06',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-07',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-07',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-07',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}, {
					  date: '2016-05-07',
					  name: '王小虎',
					  province: '上海',
					  city: '普陀区',
					  address: '上海市普陀区金沙江路 1518 弄',
					  zip: 200333
					}]
			}
		},
		methods: {
			deleteRow(index, rows) {
                 rows.splice(index, 1);
               },
			
			
	
	
		},
		mounted(){
			var span2 = document.getElementsByClassName('span2')[0];
			    console.log(span2.offsetHeight)
				this.height = span2.offsetHeight
				console.log(this.height)
			window.onresize = () => {
				console.log("ppp",span2.offsetHeight)
                   this.height = span2.offsetHeight
                };
		}
	}
</script>
<style>
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f0f0f0;
	}
	
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
		background-color: #f0f0f0;
	}
	
	::-webkit-scrollbar-thumb {
		border-radius: 20px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #cfd1d3;
	}
	
	::-webkit-scrollbar-thumb:hover {
		background-color: #a7acb1;
	}
	
	::-webkit-scrollbar-thumb:active {
		background-color: #9da2a7;
	}
</style>
<style scoped="scoped">
	.box{
		width: 100%;
		height: 100%;
		background: yellow;
		display: flex;
		flex-direction: column;
		
	}
	.span1{
		width: 100%;				
		background: white;			
		display: block;
		padding: 10px 0;
		float: left;
		border-bottom: 1px solid #e4e4e4;
	}
	.span1_input{
		display: flex;
		float: left;
		align-content: center;
		height: 30px;
		padding: 10px 0;
		width: 240px;
	}
	.span2{
		flex: 1;
		overflow: auto;
		display: block;
		width: 100%;
		background: cyan;
	}
	.span3{
		display: flex;
		height: 50px;
	}
    
</style>