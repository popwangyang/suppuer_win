<template>
	<div class="box">
		<span class="item" v-for="item in titles" :key="item.key" :style="{width: item.width+'%'}">
			<span v-if="item.name != ''">{{item.name}}</span>
			<span v-else>
				 <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"/>
			</span>
		</span>
	</div>
</template>

<script>
	export default{
		props: {
			titles: {
				type: Array,
			},
			isIndeterminate: {
				type: Boolean,
			}
		},
		data() {
			return {
				checkAll: false
			}
		},
		methods: {
			handleCheckAllChange(e) {
				this.$emit('change', this.checkAll)
			}
		},
	}
</script>

<style scoped="scoped">
	.box{
		display: flex;
		border-bottom: 1px solid #ebeef5;
		height: 100%;
	}
	.item{
		display: flex;
		font-size: 14px;
		font-weight: bold;
		color: #909399;
		align-items: center;
		justify-content: center;
	}
</style>
