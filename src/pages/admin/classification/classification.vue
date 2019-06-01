<template>
<div>
<!-- 面包屑 -->
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>一类管理</el-breadcrumb-item>
</el-breadcrumb>
 <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="cate_id"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="类别"
      width="180"
      :disabled=false>
    </el-table-column>
    <el-table-column
      prop="parent_id"
      label="父类">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="created"
      label="创建时间">
    </el-table-column>
       <el-table-column
      prop="update"
      label="修改时间">
    </el-table-column>
  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
 import {mapActions,mapGetters} from 'vuex'
 const CURRENT_DAY=new Date();
 import DateUtil from '../../../assets/util/DateUtil.js'
export default {
  
 data() {
      return {
        tableData:[{
  cate_id:1,
  parent_id: 1,
  name:"  ",
  status:0 ,
  type: 0,
  created:new Date(),
  update:new Date(),
  }],
      }
    },
    mounted(){
        this.tableData=this.$store.state.categories;
        this.tableData.created=DateUtil.formatDate( this.tableData.created);
    },
     methods: {
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
</style>
