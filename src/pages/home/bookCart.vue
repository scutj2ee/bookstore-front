<template>
<div class="bookCart">
<el-container>
  <el-header class="sub-header">

  <el-steps :active="active" finish-status="success" align-center>
  <el-step title="加入书栏" icon="el-icon-goods"></el-step>
  <el-step title="填写清单" icon="el-icon-edit"></el-step>
  <el-step title="付款结算" icon="el-icon-tickets"></el-step>
</el-steps>

  </el-header>
  <el-main>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    :default-sort = "{prop: 'id', order: 'ascending'}"
    style="width: 100%" 
    v-show="tableData.length" 
    :row-class-name="tableRowClassName"
    row-key="id">
    <el-table-column 
    label="选择" 
    width="100" 
    style="color:red" 
    :render-header="renderHeader"
    align="center">
  <template slot-scope="scope">
 <el-checkbox v-model="scope.row.is_check"  ></el-checkbox>
  </template>
</el-table-column>

    <el-table-column
    prop="id"
      label="序号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="180"
      align="center">
      <template slot-scope="scope">
      {{scope.row.bookInfo.name}}
      </template>
    </el-table-column>
     <el-table-column
      label="单价"
      width="180"
      sortable
      align="center">
       <template slot-scope="scope">
      {{scope.row.bookInfo.price}}
      </template>
    </el-table-column>
     <el-table-column
      prop="buyNum"
      label="数量"
      width="220"
      align="center">
      <template slot-scope="scope">
      <el-input-number v-model="scope.row.buyNum"   :min="0" :max="20"  ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="总价"
      align="center">
      <template slot-scope="scope">
      {{scope.row.bookInfo.price*scope.row.buyNum }}
      </template>
    </el-table-column>
    <el-table-column 
     label="图片" 
     width="120" 
     align="center">
      <template slot-scope="scope">
      <el-image class="head-pic" v-bind:src="scope.row.imageUrl" style="width: 100px;height:100px;" @click="openImg(scope.row.image_url)">
      <div slot="error" class="image-slot" >
        <!-- <i  class="el-icon-picture-outline" style="font-size:160px;"></i> -->
        <el-image v-bind:src="default_img"></el-image>
      </div>
      </el-image>
      </template>
  </el-table-column>
    <el-table-column 
    label="操作"
    align="center"
    >
    <template slot="header" slot-scope="scope">
        <el-input
          style="border-color:#f6a7ba"
          v-model="search"
          size="medium"
          placeholder="输入书名搜索"/>
      </template>
    <template slot-scope="scope">
    <el-button   type="danger" icon="el-icon-delete" circle @click="removeId(scope.row.id)"></el-button>
    </template>
            </el-table-column>
            
  </el-table>
  
  <!-- 账单 -->
 <div  class="pay-card">
    <el-pagination
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :currentPage="currentPage"
  :page-sizes="[10, 20,30,40]"
  :page-size="pageSize"
  layout="prev, pager, next,jumper, total, sizes"
  :total="total">
</el-pagination>
<div class="sub-card">
<div class="btn_box pay-text">
 共：{{totalItem}}本书 &nbsp 总价钱:￥ {{countList}}</div>
   <div class="btn_box">
   <el-button style="margin-top: 12px; margin-left:10px; margin-right:10px; background-color:#ff502f " icon="el-icon-arrow-right"  type="primary"  @click="next"  >下一步</el-button>
   </div>
   <div  class="btn_box">
      <transition name="el-fade-in-linear">
         <el-button   style="margin-top: 12px; margin-right:10px; " type="primary"  @click="handlePay" icon="el-icon-bank-card" v-show="paymentVisiable"  >去付款</el-button>
      </transition>
      </div>
</div>
</div>



 <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img v-bind:src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
   
   
    
   
    
<el-dialog title="地址选择" 
  :visible.sync="outerVisible" 
  width="60%" 
  center>
  <!-- 地址选择 -->
 <el-form  status-icon  label-width="70px" class="demo-addressForm">
 <el-form-item>

 <h3>选择收货地址</h3> 
  <el-select v-model="addressSelected" placeholder="请选择您的收货地址信息"  autocomplete="true" style="width:150px;" >
    <el-option  class="address-select"
      v-for="item in addressSelect"
      :key="item.index"
      :label="item.address"
      :value="item.value">
    </el-option>
  </el-select>
 <i class="el-icon-goods" size="large"></i>
 </el-form-item>
</el-form>
 <el-dialog
      width="60%"
      title="添加地址"
      :visible.sync="innerVisible"
      append-to-body
      center>
      <!-- 注册 -->
        <el-form  :model="addressForm" status-icon   label-width="180px" >
  <el-form-item label="收货人" prop="receiver">
    <el-input type="text" v-model="addressForm.receiver" ></el-input>
  </el-form-item>
<el-form-item label="地点" prop="area">
  <area-select type='text' :level='2' v-model="addressForm.area" :data="pcaa" autocomplete="off"></area-select>
  </el-form-item>
   <el-form-item label="详细地址" prop="detail">
    <el-input v-model="addressForm.detail" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="手机号码" prop="phone">
    <el-input v-model.number="addressForm.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="info" @click="innerVisible=false; outerVisible=true "  icon="el-icon-arrow-left" >返回</el-button>
    <el-button type="primary"  icon="el-icon-plus" @click="submitForm('addressForm')">添加</el-button>
    <el-button @click="resetForm('addressForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false" icon="el-icon-arrow-left">取 消</el-button>
      <el-button type="success" icon="el-icon-check"  @click="onSubmit(); outerVisible = false; ">确认信息</el-button>
      <el-button type="primary" icon="el-icon-plus"  @click="outerVisible= false;innerVisible=true; ">添加地址</el-button>
    </div>
  </el-dialog>
   
  </el-main>
 
</el-container>
 
 </div>
</template>
<script>
// 引入外部js文件
// import areaJs from '../../assets/js/select_area.js';//引入省市区联级json
// import areaSelectedJs from '../../assets/js/area.js';//引入本地一些已保存地址json
import carts from '../../assets/js/cart.js';//引入本地已保存商品信息json
import { pca, pcaa } from 'area-data';
import 'vue-area-linkage/dist/index.css'; // 样式
 export default {
    data() {
            var checkAge = (rule, value, callback) => {
                    if (!value) {
                        return callback(new Error('不能为空或者0'));
                    }
                    setTimeout(() => {
                        if (!Number.isInteger(value)) {
                            callback(new Error('请输入数字值'));
                        } else {
                            if (value < 0) {
                                callback(new Error('不能小于0'));
                            } else {
                                callback();
                            }
                        }
                    }, 1000);}


      return {
        pcaa: pcaa,
        search: '',//搜索
        pageSize:10,//页面大小
        total:0,//总数
        currentPage:1,//当前页面
        //自定义 默认值
        addressSelect:[],//已写入的地址
        addressSelected: {
          address:'',
          value:0
        },//选择地址
        addressForm:{
        area: [], //此处填写对应的value值
        detail:"",
        phone:"",
        receiver:""
        },
        outerVisible:false,//选择地址
        innerVisible:false,//添加地址
        paymentVisiable:false,//付款按钮
        active: 1,
        default_img:'',//默认图片
        dialogImgUrl:null,
        tableData: [{
          is_check:true,
        }],//导入购物车json文件
        count: 0,
        istrue: false,
        imgVisible:false,
        totalCount:0,//总商品件数         
      };
    },
    computed:{
      countList: function () {
                    var a = 0;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].is_check == true) {

                            a += this.tableData[i].bookInfo.price * this.tableData[i].buyNum;
                        }
                    }
                    this.count= a;
                    return this.count;
                },
    totalItem:function(){
      var totalCount=0;
      var book=0;
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].is_check==true){
          book+=1;
          totalCount+=this.tableData[i].buyNum;
        }
      
      }
      this.totalCount=totalCount;
      return this.totalCount;
    }

    },
    mounted(){
      this.default_img=require('../../assets/images/default.jpg');
      this.handleGetAddress();
      this.handleGetCart();
      for(var i=0;i<this.tableData.length;i++){
        console.log("----------"+this.tableData[i].is_check);
      }

    },
    watch:{
          istrue: function () {
                    if (this.istrue == true) {
                        for (let k = 0; k < this.tableData.length; k++) {
                            this.tableData[k].is_check = true;
                        }
                    } else {
                        for (let k = 0; k < this.tableData.length; k++) {
                            this.tableData[k].is_check = false;
                        }
                    }
                   },
    },

    methods:{
      //获取地址信息
      handleGetAddress(){
         var that=this;
      var id=that.$store.state.user.id;
      console.log(id);
        this.$ajax({
          method:'get',
          url:'address/list.do',
          params: {
            userId:id,
            pageNo: 1,
            pageSize:1000,
          }
        }).then(function (response) {
          console.log(response.data.tableData);
          var table=response.data.tableData;
          var addressStr=[];
          for(var i=0;i<table.length;i++){
            var str='';
            var obj={};
            str=table[i].province+table[i].city+table[i].district+" "+table[i].phone+" "+table[i].receiver;
            obj={
              value:table[i].id,
              address:str,
            }
            addressStr.push(obj);
          }
          that.addressSelect=addressStr;
          console.log(that.addressSelect);
          // that.$message({
          //   title:"获取成功",
          //   type:'success',
          //   message:'获取成功'
          // })
        });
      },
        //行变色
        tableRowClassName({row, rowIndex}) {
        if (this.tableData[rowIndex].is_check === false) {
          return 'warning-row';
        } else if (this.tableData[rowIndex].is_check=== true) {
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
    },
      //删除item
      removeId(val){
        let index=0;
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].id==val){
            index=i;
          }

        }
        console.log(this.tableData[index]);
        this.tableData.splice(index,1);  //index 位置   1个数
       
      },
      // 控制进度条
      next() {
       if(!this.totalCount){
          this.$confirm('您还没有选择任何商品', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
       }else{
        this.outerVisible=true;
      
       }
         
      },
      //提交地址
       onSubmit() {
         if(this.addressSelected){
           if(this.totalCount){
        console.log('submit!');
        this. paymentVisiable=true;
         this.active++;
           }
         }else{
           this.$message.error('请选择收货地址');
         }
         return null;
        
      },
      //提交新地址
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
           
            var that=this;
            var addressArr={
              userId:that.$store.state.user.id,
              province:that.addressForm.area[0],
              city:that.addressForm.area[1],
              district:that.addressForm.area[2],
              detail:that.addressForm.detail,
              phone:that.addressForm.phone,
              receiver:that.addressForm.receiver,
            };
            var address=JSON.stringify(addressArr);
           
            var request=this.$qs.stringify({
              address:address
            });
            //vuex
            that.$store.commit('modifyAddress',addressArr);
             sessionStorage.setItem('state',JSON.stringify(that.$store.state.address));
            
            this.$ajax({
              method:'post',
              url:'address/add.do',
              data:request,
            }).then(function(response){

                that.handleGetAddress();
                that.$message({
              message: "添加成功",
              type: 'success'
            });
            }).catch(function(response){
              that.$msgbox({
                title: '添加地址失败',
                message: '服务器异常',
                type: 'error'
              });
            });


            // console.log(this.addressForm.area);
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      //reset
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleGetTotal(id, value){
        this.tableData[id].buyNum=value*this.tableData[id].price;
      }, 
      renderHeader: function (h, params) {//实现table表头添加
                    var self = this;
                    return h('div', [
                        h('el-checkbox', {
                            on: {
                                change: (i) => {
                                    self.istrue = i;
                                }
                            }
                        }, '全选')
                    ]);

                },
                //获取购物车信息
    handleGetCart(){
      var that=this;
      var userId=that.$store.state.user.id;
      this.$ajax({
        url:'cart/list.do',
        method:'post',
        params:{
          userId:userId,
          pageNo: that.currentPage,
          pageSize:that.pageSize,
        }
      }).then(function(response){
         console.log("tableData:"+response.data.tableData);
          that.tableData=response.data.tableData;
          // for(var i=0;i<that.tableData.length;i++){
          //   var key="is_check";
          //   var value=true;
          //   // eval("that.tableData[i].p"+ key + "='" + value + "'");
          //   that.tableData[i][key]=value;
          //  console.log(that.tableData[i].is_check);
          // }
          
          that.total=response.data.total;
      })
    },
     //更改页码
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
       this.handleGetCart();
      },
      //更改每一页大小
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
       this.handleGetCart();
      },
    handlePay(){
      this.active++;
      var that=this;
      var list=[];
      console.log("dizhishi"+that.addressSelected);
      var addressId=that.addressSelected;
      for(let i=0;i<that.tableData.length;i++){
      if(that.tableData[i].is_check==1){
      list.push(that.tableData[i].id);
        }
      }
      console.log(list);
      if(that.$store.state.user.id==''||that.$store.state.user.id==null)
      {
      //TODO: 交易失败提醒，可以考虑使用dialogue或者冒泡
      }
      var request=that.$qs.stringify({
        userId:that.$store.state.user.id,
        addressId:addressId,
        cartIdList:list,
      })
      this.$ajax({
        url:'order/submit.do',
        method:'post',
        params:{
        request:request,
        }
      }).then(function(response){
      that.$message({
        type:'success',
        message:'提交成功'
      });
      }).catch(function(response){
         that.$message({
        type:'error',
        message:'提交失败'
      });
      });
      
    },


    },
     

  }
</script>
<style>
.address-select{
  width:250px;
}
.pay-card{
  height:180px;

  background-color:#ff9900;
  text-align:center;
  position:center;
  
}
.btn_box{
  float:center;
  display:inline;
}
.sub-header{
  background:#d2f3e0;
}
 .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 0px;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .pay-text{
    font-family:"微软雅黑";
    font-size:25px;
    color:#fff;
  }
 .sub-card{
   position:relative;
   width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
   height:100px;
   top:50%;
   left :50%;
   transform:translate(-50%,-50%);
   background-color:#348498;
   /* overflow: hidden; */
   border-radius:10px;


 }
</style>
