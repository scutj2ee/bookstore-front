<template>
 <div id="bookshelf">
  <!-- 步骤组件 -->
  <el-table
    max-height="800"
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="name"
      label="书名"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数目"
      width="180"
      align="center">
    </el-table-column> 
    <el-table-column
      prop="price"
      label="价格"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="member_price"
      label="会员价"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="is_shelf"
      label="上架"
      width="180"
      align="center">
      <template slot-scope="scope">
      <el-switch v-model="scope.row.is_shelf"></el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="上架时间"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="outline"
      label="大纲"
      width="250"
      align="center">
    </el-table-column>
     <el-table-column 
     label="图片" 
     width="120" 
     align="center">
      <template slot-scope="scope">
         <img v-bind:src="scope.row.image_url||defaultImg" style="width: 100px;height:100px;" @click="openImg(scope.row.image_url)">
      </template>
  </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="info"  icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle ></el-button>
        <el-button type="danger" icon="el-icon-delete" circle slot="reference" @click="handleDelete(scope.$index)" ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next,jumper"
  :total="1000">
  
</el-pagination>
<el-button type="primary" @click="handleAdd" >添加书目</el-button>
  <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img v-bind:src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
    
 </div>
</template>


<script>
import books from "../../../assets/js/book.js"
import defaultImg from "../../../assets/images/logo/logo.png"
  export default {
  
    data() {
      
      return {
        tableData: book,
        defaultImg:defaultImg,
        imgVisible: false,
        dialogImgUrl: null,
      }
    },
      methods: {
      tableRowClassName({row, rowIndex}) {
        if (this.tableData[rowIndex].is_shelf === false) {
          return 'warning-row';
        } else if (this.tableData[rowIndex].is_shelf=== true) {
          return 'success-row';
        }
        return '';
      }, 
      // 展示图片
    openImg(url) {
      if (url) {
        this.imgVisible = true
        this.dialogImgUrl = url
      }
    },handleAdd(){
      this.$router.push({path: '/admin/bookshelf/add'});
    },
    //删除商品
    handleDelete(rowIndex){
this.tableData.splice(rowIndex,1);
    }
    },
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .img-dialog {
    .el-dialog__header {
        padding: 0!important;
    }
}
</style>