<template>
  <view class="container">
    <uni-collapse  accordion>
      <uni-collapse-item titleBorder="none" v-for="(item, index) in projectData" :key="index">
        <template v-slot:title>
          <uni-list>
            <uni-list-item :title="item.name" :show-extra-icon="true"  :note="item.deptName">
            </uni-list-item>
          </uni-list>
        </template>
        <view class="content">
          <uni-list>
            <uni-list-item title="明细" :to="`./chat`" @click="showEquipmentInfo(item.id)"/>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>



</template>


<script>
import { notPagelistDtu } from "@/api/dtu/dtu";
export default {

  data() {
    return {
      searchVal: '',
      projectData: [],

      // 当前页
      pageNum: 1,
      // 数据总量
      total: 0,
      loading: false,
      queryParams: {

      },
      sid :null,
    }
  },
  onLoad(option) {
    this.sid = option.sid;
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
      this.queryParams.businessId = this.sid;
      notPagelistDtu(this.queryParams).then(response => {
        this.projectData = response.rows;
        this.loading = false;
        this.total = response.total;
      })
    },
    showEquipmentInfo(id){
      this.$tab.navigateTo('/pages/project/equipment/edit?id=' + id);
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