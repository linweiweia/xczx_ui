<template>
  <div>
    <el-button type="primary" @click="query">查询</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="50"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float:right"
    ></el-pagination>
  </div>
</template>
<script>
// 导包
import * as cmsApi from '../api/cms'

/*编写页面静态部分，即model及vm部分。*/
export default {
  data() {
    return {
      list: [],
      total: 50,
      params: {
        page: 4,
        size: 2
      }
    };
  },
  methods: {
    changePage: function() {
      this.query();
    },
    query: function() {
      //调用cms.js中的方法
      cmsApi.page_list(this.params.page, this.params.size).then((res => {
        this.list = res.queryResult.list
        this.total = res.queryResult.total
        console.log(this.total);
      }))
    }
  }
};
</script>
<style>
/*编写页面样式，不是必须*/
</style>
