<template>

 <el-table
    :data="tableData"
    stripe
    style="width: 100%" v-show="tableData.length" highlight-current-row>
    <el-table-column label="复选框" width="100" style="color:red" :render-header="renderHeader">
            
                    <el-checkbox v-model="tableData.checked"></el-checkbox>
                
            </el-table-column>
    <el-table-column
      prop="id"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="180">
    </el-table-column>
     <el-table-column
      prop="price"
      label="单价"
      width="180">
    </el-table-column>
     <el-table-column
      prop="num"
      label="数量"
      width="220">
      <el-input-number v-model="tableData.num" @change="handleChange(tableData.id,value)" :min="1" :max="10" label="描述文字"></el-input-number>
    </el-table-column>
    
    <el-table-column
      prop="number"
      label="总价">
    </el-table-column>
    <el-table-column label="删除功能">
            
                    <el-popover placement="top" width="160" v-model="tableData.remove">
                        <p>亲！确定删除此商品吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="tableData.remove=false">取消</el-button>
                            <el-button type="primary" size="mini" @click="removeId(tableData.id)">确定</el-button>
                        </div>
                        <el-button slot="reference">删除</el-button>
                    </el-popover>
            </el-table-column>
  </el-table>
 

</template>

<script>
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
        tableData: [{
                        id: 1,
                        name: "打火机",
                        price: 3,
                        number: 4,
                        checked: false,
                        num: 1,
                        remove: false
                    },
                    {
                        id: 2,
                        name: "冰淇淋",
                        price: 10,
                        number: 3,
                        checked: false,
                        num: 1,
                        remove: false
                    },
                    {
                        id: 3,
                        name: "冰淇淋",
                        price: 7,
                        number: 5,
                        checked: false,
                        num: 1,
                        remove: false
                    }],
                    count: 0,
                    istrue: false,
                    ruleForm2: {
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
                    
      }

    },
    computed: {
               
            },
            watch: {
                
            },
    methods: {
      
    }
  }

</script>
<style>

</style>