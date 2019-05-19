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
    <img  v-bind:src="item.image_url" style="width:100px;height:100px;">
        
        <div class="bottom clearfix">
        <div class="sub-tit">{{item.name}}</div><br>
           <div class="card-show">
           {{item.author }}</div><br>
           <div class="price">活动价：￥ {{item.member_price}}</div><br>
           <div class="card-show">市场价：￥<del>
           {{item.price }}</del></div>    
      </div>
    </el-card>
  </el-col>
</el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="下单时间"
      prop="createTime"
      align="center">
    </el-table-column>
    <el-table-column
      label="收货信息"
      prop="reciever"
      align="center">
      <template slot-scope="scope">
<span> 
<el-cascader
		:options="area"
		change-on-select
		v-model="scope.row.user.address"
		expand-trigger="hover"
		@change="handleChange" 
		class="wd400"
    disabled>
	</el-cascader>
      {{scope.row.user.detail+" "
        +scope.row.user.reciever+" "
        +scope.row.user.phone}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总价"
      prop="total">
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
      }
    },
   mounted: function() {
 //这个是钩子函数
 //如果cartView函数要执行，必须先执行钩子函数
 //这个钩子函数完成了对cratView函数的调用
 //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入       Vue.nextTick/vm.$nextTick
    this.$nextTick(function () {
     this.getAddress();
   })
 },
 methods:{
   getAddress(){
     let list=[];
     for(let i=0;i<this.tableData.length;i++){
       list.push(this.tableData[i].user.address);
     }
    //  console.log(list);
    for(let i=0;i<list.length;i++){
      for(let j=0;j<areajson.length;j++){
        if(areajson[j].value==list[i][0]){
          let province=areajson[j].label
        }
      }
    }
   }
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
</style>