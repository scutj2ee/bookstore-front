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
    :data="tableData"
    stripe
    style="width: 100%" 
    v-show="tableData.length" 
    highlight-current-row>
    <el-table-column 
    label="选择" 
    width="100" 
    style="color:red" 
    :render-header="renderHeader"
    align="center">
  <el-checkbox 
  prop="is_check"
  ></el-checkbox>
</el-table-column>
    <el-table-column
      prop="id"
      label="序号"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="180"
      align="center">
    </el-table-column>
     <el-table-column
      prop="price"
      label="单价"
      width="180"
      align="center">
    </el-table-column>
     <el-table-column
      prop="number"
      label="数量"
      width="220"
      align="center">
      <template slot-scope="scope">
      <el-input-number v-model="scope.row.number"   :min="1" :max="10"  ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      prop="total"
      label="总价"
      align="center">
    </el-table-column>
    <el-table-column 
     label="图片" 
     width="120" 
     align="center">
      <template slot-scope="scope">
         <img v-bind:src="scope.row.image_url" style="width: 100px;height:100px;" >
      </template>
  </el-table-column>
    <el-table-column label="删除功能">
            
                    <el-popover placement="top" width="160" v-model="tableData.remove">
                        <p>亲！确定删除此商品吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="tableData.remove=false">取消</el-button>
                            <el-button type="primary" size="mini" @click="removeId(tableData.id)">确定</el-button>
                        </div>
                        <el-button type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
                        
                    </el-popover>
            </el-table-column>
  </el-table>
 <div >
 <div class="btn_box">
 <el-button style="margin-top: 12px; background-color:#f6a7ba " icon="el-icon-arrow-right" circle  @click="next" :disabled="isDisabled" ></el-button>
 
 </div>
 <div v-show="show" class="btn_box">
      <transition name="el-fade-in-linear">
         <el-button   type="primary" @click="pay" icon="el-icon-bank-card" circle ></el-button>
      </transition>
      </div>
  </div>

   
   
    
   
    
<el-dialog title="地址选择" 
  :visible.sync="outerVisible" 
  width="60%" 
  center>
  <!-- 地址选择 -->
 <el-form :model="addressForm" status-icon  ref="addressForm" label-width="70px" class="demo-addressForm">
 <el-form-item>

 <h3>选择收货地址</h3> 
  <el-select v-model="addressSelected" placeholder="请选择" size="large" autocomplete="true" width="60%">
    <el-option
      v-for="item in addressSelect"
      :key="item.value"
      :label="item.label"
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
        <el-form :model="addressForm" status-icon   label-width="100px" class="demo-addressForm">
  <el-form-item label="收货人" prop="receiver">
    <el-input type="text" v-model="addressForm.receiver" autocomplete="off"></el-input>
  </el-form-item>
<el-form-item label="地点">
  	<el-cascader
		:options="address"
		change-on-select
		v-model="addressForm.area"
		expand-trigger="hover"
		@change="handleChange" 
		class="wd400">
	</el-cascader>
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
      <el-button type="success" icon="el-icon-check"  @click="onSubmit; outerVisible = false; show = !show">确认信息</el-button>
      <el-button type="primary" icon="el-icon-plus"  @click="outerVisible= false;innerVisible=true">添加地址</el-button>
    </div>
  </el-dialog>
   
  </el-main>
 
</el-container>
 
 </div>
</template>
<script>
// 引入外部js文件
import areaJs from '../../assets/js/select_area.js';//引入省市区联级json
import areaSelectedJs from '../../assets/js/area.js';//引入本地一些已保存地址json
import carts from '../../assets/js/cart.js';//引入本地已保存商品信息json
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
        address: areajson, //调用外部js文件的json数据
        //自定义 默认值
        addressSelect:areaSelected ,
        addressSelected: '',
        addressForm:{
        // province:"",
        // city:"",
        // distinct:"",
        // stress:"",
        area: ['340000', '340100', '340104'], //此处填写对应的value值
        detail:"",
        phone:"",
        receiver:""
        },
        outerVisible:false,//选择地址
        innerVisible:false,//添加地址
        paymentVisiable:false,//付款按钮
        show: false,
        isDisabled: false,
        active: 1,
        tableData: cart,
                    count: 0,
                    istrue: false,
                    addressForm2: {
                        name: '',
                        price: '',
                        age: ''
                    },
                    rules2: {
                        age: [
                            { validator: checkAge, trigger: 'blur' }
                        ],
                        price: [
                            { validator: checkAge, trigger: 'blur' }
                        ]
                    },          
      };
    },
    mounted(){
  this.$watch("tableData",function () {
    for(let i=0;i<tableData.length;i++){
      this.tableData[i].total=this.tableData[i].number*this.tableData[i].price;
    }
  
});
    },
    watch:{

     
    },

    methods:{
      // 控制进度条
      next() {
       
          this.outerVisible=true;
        if (this.active++ > 2) this.active = 0;
      },
      //提交地址
       onSubmit() {
        this. writed=!this.writed;
        console.log('submit!');
        this. paymentVisiable=true;
      },
      //提交新地址
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //reset
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleGetTotal(id, value){
        this.tableData[id].number=value*this.tableData[id].price;
      }
    }
  }
</script>
<style>
.btn_box{
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
    line-height: 160px;
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
</style>