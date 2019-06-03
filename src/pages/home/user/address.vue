<template>
<div id="address">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home/homepage' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/index' }">我的个人中心</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/home/user/address' }">地址管理</el-breadcrumb-item>
</el-breadcrumb>

<el-table
      :data="tableData"
      style="width: 100%"
     
     >
      <el-table-column
        label="收货人"
        width="180"
        align="center">
        <template slot-scope="scope"> {{scope.row.receiver}}</template>
      </el-table-column>
      <el-table-column
        label="省市区"
        width="200"
        align="center">
        <template slot-scope="scope">
          {{scope.row.province+scope.row.city+scope.row.district}}
        </template>
      </el-table-column> 
      <el-table-column
        label="详细街道"
        width="200"
        align="center">
        <template slot-scope="scope"> {{scope.row.detail}}</template>
      </el-table-column>
      <el-table-column
        label="联系电话"
        width="180"
        align="center">
         <template slot-scope="scope"> {{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle slot="reference" @click="openEdit(scope.row.id)" ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle slot="reference" @click="handleDelete(scope.row.id)" ></el-button>
        </template>
      </el-table-column>
    </el-table>

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
<el-dialog
      width="60%"
      title="添加地址"
      :visible.sync="editVisable"
      center>
      <!-- 注册 -->
  <el-form :model="addressForm" status-icon   label-width="180px" >
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
  <el-button type="info" @click="editVisable=false; "  icon="el-icon-arrow-left" >返回</el-button>
    <el-button type="primary"  icon="el-icon-success" @click="handleEdit('addressForm')">提交</el-button>
  </el-form-item>
</el-form>
    </el-dialog>
    <el-button type="primary" @click="handleAdd()"  icon="el-icon-plus" >返回</el-button>
</div>
</template>
<script>
import { pca, pcaa } from 'area-data';
import 'vue-area-linkage/dist/index.css'; // 样式
export default{
    data(){
      return{
        pcaa: pcaa,//省市区联动
        pageSize:10,//页面大小
        total:0,//总数
        currentPage:1,//当前页面
        tableData:[],//地址数组
        editVisable: false,//修改栏
        addressForm:{
        area: [], //此处填写对应的value值
        detail:"",
        phone:"",
        receiver:""
        },

      }
    },
    mounted(){
      this.handleGet();
      
      console.log(this.tableData);
    },
    methods:{
      //获取地址
      handleGet:function(){
      var that=this;
      var id=that.$store.state.user.id;
      console.log(id);
        this.$ajax({
          method:'get',
          url:'address/list.do',
          params: {
            userId:id,
            pageNo: that.currentPage,
            pageSize:that.pageSize,
          }
        }).then(function (response) {
          console.log(response.data.tableData);
          that.tableData=response.data.tableData;
          that.total=response.data.total;
          
        });
      },
      //更改页码
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
       this.handleGet();
      },
      //更改每一页大小
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
       this.handleGet();
      },
      //删除地址
      handleDelete(val){
        let index=0;
        var that=this;
        for(let i=0;i<that.tableData.length;i++){
          if(that.tableData[i].id==val){
            index=i;
          }
        }
        this.$ajax({
          method:'delete',
          url:'address/delete.do',
          params:{
            id:val
          }
        }).then(function(response){
            that.$msgbox({
              type:'success',
              message:'删除成功'
            })
        })
        that.tableData.splice(index,1);  //index 位置   1个数
      },
      //更改地址
      openEdit(val){
        this.editVisable=true;
        var index=0;
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].id==val)
            index=i;
        }
        console.log(this.tableData[index]);
        this.addressForm=this.tableData[index];
      },
      //提交更改
      handleEdit(formName){
        //  this.$refs[formName].validate((valid) => {
        //   if (valid) {
            var that=this;
            var addressArr={
              id:that.addressForm.id,
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
              url:'address/update.do',
              data:request,
            }).then(function(response){
                that.handleGet();
                that.$msgbox({
              message: "更新成功",
              type: 'success'
            });
            that.editVisable=false;
            }).catch(function(response){
              that.$msgbox({
                title: '更新地址失败',
                message: '服务器异常',
                type: 'error'
              });
            });
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      //添加地址
      handleAdd(){
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
                that.handleGet();
                that.$msgbox({
              message: "添加成功",
              type: 'success'
            });
            that.editVisable=false;
            }).catch(function(response){
              that.$msgbox({
                title: '添加地址失败',
                message: '服务器异常',
                type: 'error'
              });
            });
      }

    }

}
</script>