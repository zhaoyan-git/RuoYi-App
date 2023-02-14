<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="form" labelWidth="80px">
        <uni-forms-item label="结构物" name="sname">
          <uni-easyinput v-model="form.sname" :clearable="false" :disabled="true"/>
        </uni-forms-item>
        <uni-forms-item label="告警源" name="alarmSource">
          <uni-easyinput v-model="form.alarmSource" :clearable="false" :disabled="true"/>
        </uni-forms-item>
        <uni-forms-item label="等级" name="lev">
          <uni-easyinput v-model="form.lev" :clearable="false" :disabled="true"/>
        </uni-forms-item>
        <uni-forms-item label="告警信息" name="alarmInfo">
          <uni-easyinput v-model="form.alarmInfo" :clearable="false" :disabled="true"/>
        </uni-forms-item>
        <uni-forms-item label="产生次数" name="prodNum">
          <uni-easyinput v-model="form.prodNum" :clearable="false" :disabled="true"/>
        </uni-forms-item>
        <uni-forms-item label="产生时间" name="prodDate">
          <view class="uni-common-mt">
            <uni-easyinput v-model="form.prodDate" :clearable="false" :disabled="true"/>
          </view>
        </uni-forms-item>


        <!--
                <uni-forms-item label="内容" name="model">
                  <view class="uni-common-mt" >
                    <rich-text :nodes="form.content"></rich-text>
                  </view>
                </uni-forms-item>
        -->

      </uni-forms>
    </view>
  </view>
</template>

<script>
import {
  getPoint, getDictDataList, getRecord
} from "@/api/record/record"

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
      monitoringModelArr: [],
      monitoringFactorsArr: [],
      sid: null,
      globalConfig: getApp().globalData.config,
      fileImage: 'http://localhost:81/dev-api',
      queryForm: {},
    }
  },
  onLoad(option) {
    this.sid = option.id;
    this.getMonitoringFactorsFun();
    this.getUser();
  },
  onReady() {

  },
  methods: {
    getUser() {
      getRecord(this.sid).then(response => {
        this.form = response.data
        if (this.form.prodDate) {
          this.form.prodDate = this.parseTime(this.form.prodDate);
        }
      })
    },
    //获取监测因素信息
    getMonitoringFactorsFun() {
      var _this = this;
      getDictDataList('sys_yes_no').then(res => {
        if (res.code == 200) {
          for (let index in res.data) {
            _this.monitoringFactorsArr.push({
              text: res.data[index].dictLabel,
              value: res.data[index].dictValue,
            })
          }
        }
      });
    },
    parseTime(time, pattern) {
      if (arguments.length === 0 || !time) {
        return null
      }
      const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
          time = parseInt(time)
        } else if (typeof time === 'string') {
          time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
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
