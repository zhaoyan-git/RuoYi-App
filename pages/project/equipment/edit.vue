<template>
	<view class="container">
		<view class="example">
			<uni-forms ref="form" :model="form" labelWidth="80px">
				<uni-forms-item label="设备名称" name="name">
					<uni-easyinput v-model="form.name" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="型号" name="model">
					<uni-easyinput v-model="form.model" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="厂商" name="deptName">
					<uni-easyinput v-model="form.deptName" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="设备ID号" name="equipmentId">
					<uni-easyinput v-model="form.equipmentId" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="SIM卡号" name="sim">
					<uni-easyinput v-model="form.sim" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="备注" name="remark">
					<uni-easyinput v-model="form.remark" :clearable="false" :disabled="true" />
				</uni-forms-item>
			</uni-forms>
		</view>
	</view>
</template>

<script>
import { getDtu } from "@/api/dtu/dtu";

	export default {
		data() {
			return {
				form: {},
				sexs: [{
					text: '男',
					value: "0"
				}, {
					text: '女',
					value: "1"
				}],
        monitoringModelArr : [],
        monitoringFactorsArr : [],
				sid: null,
        globalConfig: getApp().globalData.config,
        fileImage:'http://localhost:81/dev-api',
        queryForm:{},
			}
		},
		onLoad(option) {
			this.sid = option.id;
			this.getUser();
		},
		onReady() {

		},
		methods: {
			getUser() {
        getDtu(this.sid).then(response => {
					this.form = response.data
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		margin-left: 10px;
	}
</style>
