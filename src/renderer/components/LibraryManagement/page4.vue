<template>
	<el-dropdown @command="handleCommand">
	  <span class="el-dropdown-link">
	    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
	  </span>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item command="a"><label><input   type="radio" name="pp" @click="foo"/>黄金糕</label></el-dropdown-item>
	    <el-dropdown-item command="b"><label><input  type="radio" name="pp" @click="foo"/>狮子头</label></el-dropdown-item>
	    <el-dropdown-item command="c"><label><input   type="radio" name="pp" @click="foo"/>螺蛳粉</label></el-dropdown-item>
	  </el-dropdown-menu>
	</el-dropdown>
</template>


<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
	  name:'pag4',
    methods: {
      handleCommand(command) {
		  console.log("pppppppppp")
        this.$message('click on item ' + command);
      },
	  foo(){
		  event.stopPropagation();
		  console.log('foo')
	  }
    }
  }
</script>