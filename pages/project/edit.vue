<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="form" labelWidth="100px">
        <uni-forms-item label="项目名称" name="name">
          <uni-easyinput v-model="form.name" />
        </uni-forms-item>
        <uni-forms-item label="所属企业" name="deptName">
          <uni-easyinput v-model="form.deptName" />
        </uni-forms-item>
        <uni-forms-item label="监控目的" name="aim">
          <uni-easyinput v-model="form.aim" />
        </uni-forms-item>
        <uni-forms-item label="示意图" name="photoFile">
          <image style="width: 100rpx;height: 100rpx;" :src="fileImage+form.photoFile" mode="widthFix">
          </image>
        </uni-forms-item>
        <uni-forms-item label="项目位置纬度" name="positionLat">
          <uni-easyinput v-model="form.positionLat" />
        </uni-forms-item>
        <uni-forms-item label="项目位置经度" name="positionLng">
          <uni-easyinput v-model="form.positionLng" />
        </uni-forms-item>
        <uni-forms-item label="警告标志" name="alarmFlag">
          <uni-data-select
              v-model="form.alarmFlag"
              :localdata="alarmFlagArr"
          ></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="备注" name="details">
          <uni-easyinput v-model="form.details" />
        </uni-forms-item>
      </uni-forms>
    </view>
  </view>
</template>

<script>
import {
  getProject,getDictDataList
} from "@/api/project/project"

export default {
  data() {
    return {
      form: {},
      alarmFlagArr : [],
      sid: null,
      globalConfig: getApp().globalData.config,
      fileImage:'http://localhost:81/dev-api',
    }
  },
  onLoad(option) {
    this.sid = option.id;
    this.getUser();
    this.getAlarmFlagArrFun();
  },
  onReady() {

  },
  methods: {
    getUser() {
      getProject(this.sid).then(response => {
        this.form = response.data
      })
    },
    getAlarmFlagArrFun(){
      var _this = this;
      getDictDataList('alarm_flag').then(res => {
        if (res.code == 200) {
          for (let index in res.data) {
            _this.alarmFlagArr.push({
              text: res.data[index].dictLabel,
              value: res.data[index].dictValue,
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
