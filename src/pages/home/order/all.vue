<template>
<el-table
    :data="tableData"
    style="width: 100%">
    <!-- 商品内页 -->
    <el-table-column type="expand">
      <template slot-scope="props">
    <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in props.row.items" :key="index" >
    <el-card shadow="hover" :body-style="{ padding: '5px' }">
    <img  v-bind:src="item.image_url" style="width:180px;height:180px;">
        
        <div class="bottom clearfix">
        <div class="sub-tit">{{item.name}}</div><br>
           <div class="card-show">
           {{item.author }}</div><br>
           <div class="price">活动价：￥ {{item.member_price}}</div><br>
           <div>数目：X{{item.number+" 总价： "+item.total}}</div>   
      </div>
    </el-card>
  </el-col>
</el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="订单号"
      prop="id"
      align="center">
    </el-table-column>
    <el-table-column
      label="下单时间"
      align="center"
      sortable>
      <template slot-scope="scope">
       <i class="el-icon-time"></i>
       {{scope.row.createTime}}
      </template>
    </el-table-column>
    <el-table-column
      label="收货信息"
      prop="reciever"
      align="center"
      width="1000px">
      <template slot-scope="scope">
<span> 
<i class="el-icon-location"></i>
<el-cascader
		:options="area"
		change-on-select
		v-model="scope.row.user.address"
		expand-trigger="hover"
	
    disabled>
	</el-cascader>
      {{scope.row.user.detail+" "
        +scope.row.user.reciever+" "
        +scope.row.user.phone}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总价"
      prop="total"
      align="center"
      width="80px">
      <template slot-scope="scope">
      <div style="font-size:20px;color: red;">￥{{scope.row.total}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      prop="state"
      align="center"
      width="80px">
      <template slot-scope="scope">
<div  class="block" > {{scope.row.state}}</div>
      </template>

    </el-table-column>
    <el-table-column
      label="操作" 
      width="300px"
      
      >
      <template  slot-scope="scope">
      <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)" >删除</el-button>
        <el-button v-show="scope.row.state=='未付款'" type="primary" icon="el-icon-money" >付款</el-button>
        <el-button v-show="scope.row.state=='待评价'" type="primary" icon="el-icon-s-comment" >评价</el-button>
        
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import  orderItem  from "../../../assets/js/order.js";
import area from "../../../assets/js/select_area.js";
  export default {
    data() {
      return {
        tableData: order,
        area:areajson,
        address:{},
        key: '',
      }
    },
   mounted: function() {
 //这个是钩子函数
 //如果cartView函数要执行，必须先执行钩子函数
 //这个钩子函数完成了对cratView函数的调用
 //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入       Vue.nextTick/vm.$nextTick

    
 },
 methods:{
   handleDelete(val){
     let index=0;
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].id==val){
            index=i;
          }

        }
        console.log(this.tableData[index]);
        this.tableData.splice(index,1);  //index 位置   1个数
       
   },
   
 }
  }
</script>

<style>
 .price{
    color:red;
    font-size:18px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block{
  
    font-size:18px;
    color:red;
   
  }
</style>