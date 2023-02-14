\<template>
  <view class="container">
    <uni-collapse  accordion>

      <uni-collapse-item titleBorder="none" v-for="(item, index) in projectData" :key="index">
        <template v-slot:title>
          <uni-list>
            <uni-list-item
                :title="item.sname"
                :show-extra-icon="true"
                rightText="操作"
            >
            </uni-list-item>
          </uni-list>
        </template>
        <view class="content">
          <uni-list>
            <uni-list-item title="明细" :to="`./chat`" @click="showAlartmInfo(item.id)"/>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>


<script>
import {listRecord,getDictDataList} from "@/api/record/record"

export default {
  data() {
    return {
      searchVal: '',
      projectData: [],
      // 每页数据量
      pageSize: 10,
      // 当前页
      pageNum: 1,
      // 数据总量
      total: 0,
      loading: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      monitoringFactorsArr : [],

    }
  },
  onLoad() {
    this.getMonitoringFactorsFun();
    this.selectedIndexs = []
    this.getData();

  },
  methods: {
    // 分页触发
    change(e) {
      this.$refs.table.clearSelection()
      this.selectedIndexs.length = 0
      this.getData(e.current)
    },
    // 搜索
    search() {
      this.getData();
    },
    // 获取数据
    getData() {
      this.loading = true
      listRecord(this.queryParams).then(response => {
        this.projectData = response.rows;
        this.loading = false;
        this.total = response.total;
      })
    },
    //显示项目信息
    showProjectInfoFun(pid) {
      this.$tab.navigateTo('/pages/project/edit?id=' + pid);
    },
    //显示结构物列表
    showStructureInfoFun(pid) {
      this.$tab.navigateTo('/pages/project/structure/index?id=' + pid);
    },
    //获取监测因素信息
    getMonitoringFactorsFun(){
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
    //显示告警明细
    showAlartmInfo(id){
      this.$tab.navigateTo('/pages/work/edit?id=' + id);
    }
  }
}
</script>

<style>
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-group {
  display: flex;
  align-items: center;
}
</style>