<template>
	<view class="container">
		<view class="example">
			<uni-forms ref="form" :model="form" labelWidth="80px">
				<uni-forms-item label="测点名称" name="name">
					<uni-easyinput v-model="form.name" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="监测因素" name="model">
					<uni-easyinput v-model="form.mfName" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="数据来源方式" name="deptName">
					<uni-easyinput  value="设备采集" :clearable="false" :disabled="true" />
				</uni-forms-item>
				<uni-forms-item label="设备" name="equipmentName">
					<uni-easyinput v-model="form.equipmentName" :clearable="false" :disabled="true" />
				</uni-forms-item>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
    getPoint,getDictDataList
	} from "@/api/point/point"

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
        getPoint(this.sid).then(response => {
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
