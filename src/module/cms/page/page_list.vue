<template>
  <div>
    <el-select v-model="params.siteId" placeholder="请选择站点">
      <el-option
        v-for="item in siteList"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
      </el-option>
    </el-select>
    页面别名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>
    <el-button type="primary" @click="query">查询</el-button>

    <!--点击就会跳到路由-->
    <router-link :to="{path:'/cms/page/add', query:{page:this.params.page,siteId:this.params.siteId}}">
      <el-button type="primary">新增</el-button>
    </router-link>

    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="250"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="100">
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
      siteList: [],  //站点列表
      list: [],      //页面列表
      total: 50,
      params: {
        page: 1,     //默认第一页
        size: 10,     //这个用户选择每页显示多少条
        siteId: '',
        pageAliase: ""
      }
    };
  },
  methods: {
    changePage: function(page) {
      this.params.page = page
      this.query();
    },
    query: function() {
      //调用cms.js中的方法
      cmsApi.page_list(this.params.page, this.params.size, this.params).then((res => {
        this.list = res.queryResult.list
        this.total = res.queryResult.total
        console.log(this.total);
      }))
    },
    edit:function(pageId){
      //打开修改页面
      this.$router.push({
        path:'/cms/page/edit/'+pageId
      })
    },
    del:function (pageId) {
      this.$confirm('您确认删除吗?', '提示', { }).then(() => {

        //调用服务端接口
        cmsApi.page_del(pageId).then(res=>{

          if(res.success){
            this.$message.success("删除成功")
            //刷新页面
            this.query()
          }else{
            this.$message.error("删除失败")
          }
        })
      })

    }
  },
  created() {
    this.query();
    //模拟假数据
    this.siteList = [
      {"siteId":"5a751fab6abb5044e0d19ea1","siteName":"门户主站"},
      {"siteId":"000","siteName":"测试数据"}
    ];

    //新增返回时记录页数
    if (this.$route.query.page){
      this.params.page = this.$route.query.page;
      this.params.siteId = this.$route.query.siteId;
    }

  }
};
</script>
<style>
/*编写页面样式，不是必须*/
</style>
