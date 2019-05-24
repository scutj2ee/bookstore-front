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
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="classfication"
      label="类别"
      width="180"
      :disabled=false>
    </el-table-column>
    <!-- <el-table-column
      prop="address"
      label="地址">
    </el-table-column> -->
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
export default {
 data() {
      return {
        tableData: [{
          date: '2016-05-02',
          classfication: '科技',
          // address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          classfication: '人文',
          // address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          classfication: '艺术',
          // address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          classfication: '王小虎',
          // address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
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
