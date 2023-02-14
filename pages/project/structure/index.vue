<template>
  <view class="container">
    <uni-collapse  accordion>
      <uni-collapse-item titleBorder="none" v-for="(item, index) in projectData" :key="index">
        <template v-slot:title>
          <uni-list>
            <uni-list-item :title="item.name" :show-extra-icon="true" :thumb="fileImage+item.photoFile" :note="item.projectName">
            </uni-list-item>
          </uni-list>
        </template>
        <view class="content">
          <uni-list>
            <uni-list-item title="明细" :to="`./chat`" @click="showStructureDetailFun(item.id)"/>
            <uni-list-item title="设备信息" :to="`./chat`" @click="showEquimentListFun(item.id)"/>
            <uni-list-item title="测点信息" :to="`./chat`" @click="showPointListFun(item.id)"/>
            <uni-list-item title="传感器信息" :to="`./chat`" @click="showProjectInfoFun(item.id)"/>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>

</template>
<script>
import {listStructure} from "@/api/structure/structure"
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
      projectId : null,
      fileImage: 'http://localhost:81/dev-api',
    }
  },
  onLoad(option) {
    this.projectId = option.id;
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
      this.queryParams.projectId = this.projectId;
      listStructure(this.queryParams).then(response => {
        this.projectData = response.rows;
        this.loading = false;
        this.total = response.total;
      })
    },
    //显示结构物明细
    showStructureDetailFun(sid){
      this.$tab.navigateTo('/pages/project/structure/edit?id='+sid);
    },
    //显示设备列表
    showEquimentListFun(sid){
      this.$tab.navigateTo('/pages/project/equipment/index?sid='+sid);
    },
    //显示测点列表
    showPointListFun(sid){
      this.$tab.navigateTo('/pages/project/point/index?sid='+sid);
    },
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