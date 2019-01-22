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
			<div class="span1_input" style="margin-right: 20px;width: 330px;float: right;">  
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
		<span class="span2"></span>
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
					}
			}
		}
	}
</script>
<style scoped="scoped">
	.box{
		width: 100%;
		height: 100%;
		background: yellow;
	}
	.span1{
		width: 100%;				
		background: white;			
		display: block;
		padding: 10px 0;
		float: left;
	}
	.span1_input{
		display: flex;
		float: left;
		align-content: center;
		height: 30px;
		padding: 10px 0;
		width: 240px;
	}
	@media screen and (max-width: 1235px) {
    body {
        background-color:lightblue;
    }
}
</style>