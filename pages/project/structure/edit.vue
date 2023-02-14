<template>
	<view class="container">
		<view class="example">
			<uni-forms ref="form" :model="form" labelWidth="80px">
				<uni-forms-item label="名称" name="name">
					<uni-easyinput v-model="form.name" />
				</uni-forms-item>
				<uni-forms-item label="精度" name="positionLat">
					<uni-easyinput v-model="form.positionLat" />
				</uni-forms-item>
				<uni-forms-item label="纬度" name="positionLng">
					<uni-easyinput v-model="form.positionLng" />
				</uni-forms-item>
				<uni-forms-item label="地址" name="location">
					<uni-easyinput v-model="form.location" />
				</uni-forms-item>
				<uni-forms-item label="监测目的" name="monitoringPurpose">
					<uni-easyinput v-model="form.monitoringPurpose" />
				</uni-forms-item>
				<uni-forms-item label="监测依据" name="monitoringBasis">
					<uni-easyinput v-model="form.monitoringBasis" />
				</uni-forms-item>
				<uni-forms-item label="示意图" name="photoFile">
          <image style="width: 100rpx;height: 100rpx;" :src="fileImage+form.photoFile" mode="widthFix">
          </image>
				</uni-forms-item>
				<uni-forms-item label="描述" name="dedc">
					<uni-easyinput v-model="form.dedc" />
				</uni-forms-item>
				<uni-forms-item label="施工单位" name="constructionUnit">
					<uni-easyinput v-model="form.constructionUnit" />
				</uni-forms-item>
				<uni-forms-item label="联系人" name="constructionPserson">
					<uni-easyinput v-model="form.constructionPserson" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" name="constructionPhone">
					<uni-easyinput v-model="form.constructionPhone" />
				</uni-forms-item>
				<uni-forms-item label="监理单位" name="manageUnit">
					<uni-easyinput v-model="form.manageUnit" />
				</uni-forms-item>
				<uni-forms-item label="联系人" name="managePerson">
					<uni-easyinput v-model="form.managePerson" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" name="managePhone">
					<uni-easyinput v-model="form.managePhone" />
				</uni-forms-item>
				<uni-forms-item label="监测模型" name="typeId">
          <uni-data-select
              v-model="form.typeId"
              :localdata="monitoringModelArr"
          ></uni-data-select>
				</uni-forms-item>
<!--				<uni-forms-item label="监测因素" name="monitoringFactors">
          <uni-data-select
              v-model="form.monitoringFactors"
              :localdata="monitoringFactorsArr"
          ></uni-data-select>
				</uni-forms-item>-->
				<uni-forms-item label="所属项目" name="projectName">
					<uni-easyinput v-model="form.projectName" />
				</uni-forms-item>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		getStructure,getDictDataList
	} from "@/api/structure/structure"

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
			this.getMonitoringModelFun();
			this.getMonitoringFactorsFun();
		},
		onReady() {

		},
		methods: {
			getUser() {
				getStructure(this.sid).then(response => {
					this.form = response.data
          if(this.form.monitoringFactors){
            this.form.monitoringFactors = parseInt(this.form.monitoringFactors)
          }else if(this.form.typeId){
            this.form.typeId = parseInt(this.form.typeId)
          }
				})
			},
      //获取监测模型信息
      getMonitoringModelFun(){
        var _this = this;
        getDictDataList('structure_type').then(res => {
          if (res.code == 200) {
            for (let index in res.data) {
              _this.monitoringModelArr.push({
                text: res.data[index].dictLabel,
                value: parseInt(res.data[index].dictValue),
              })
            }
          }
        });
      },
      //获取监测因素信息
      getMonitoringFactorsFun(){
        var _this = this;
        getDictDataList('monitoring_factors').then(res => {
          if (res.code == 200) {
            for (let index in res.data) {
              _this.monitoringFactorsArr.push({
                text: res.data[index].dictLabel,
                value: parseInt(res.data[index].dictValue),
              })
            }
          }
        });
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
