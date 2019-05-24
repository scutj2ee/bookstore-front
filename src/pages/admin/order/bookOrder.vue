<template>
	<div id='bookOrder'>
		<!-- 面包屑 -->
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 搜索框 -->
		<div class="search">
			<el-input v-model="keyWord" placeholder="搜索订单" clearable size="medium">
				<el-select v-model="searchSelect" slot="prepend" placeholder="高级">
					<el-option label="书名" value="1"></el-option>
					<el-option label="作者" value="2"></el-option>
					<el-option label="出版社" value="3"></el-option>
					<el-option label="用户ID" value="4"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<!-- 表格 -->
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
				label="用户"
				prop="userID"
				align="center">
				<template slot-scope='scope'>
					{{scope.row.user.id}}
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
				prop="createTime"
				sortable>
			</el-table-column>
			<el-table-column
				label="收货信息"
				prop="reciever"
				align="center"
				width="500px">
				<template slot-scope="scope">
					<span> 
						<i class="el-icon-location"></i>
						<el-cascader
							:options="area"
							change-on-select
							v-model="scope.row.user.address"
							expand-trigger="hover"
							size="mini"
							:disabled='scope.row.edit.notedit'>
						</el-cascader>
						{{scope.row.user.detail+" "
						+scope.row.user.reciever+" "
						+scope.row.user.phone}}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				label="金额"
				prop="total">
				<template slot-scope="scope">
					<div style="font-size:20px;color: red;">￥{{scope.row.total}}</div>
				</template>
			</el-table-column>
			<el-table-column
				label="状态"
				prop="state"
				:filters="[{text:'未付款', value:'未付款'}, {text:'已完成', value: '已完成'}, {text: '待评价', value:'待评价'}]"
				:filter-method="filterTag"
				filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag 
						v-if="scope.row.state == '已完成'"
						type="success"
						close-transition>{{scope.row.state}}
					</el-tag>
					<el-tag
						v-else-if="scope.row.state == '未付款'"
						type="danger"
						close-transition>{{scope.row.state}}
					</el-tag>
					<el-tag
						v-else-if="scope.row.state == '待评价'"
						type="warning"
						close-transition>{{scope.row.state}}
					</el-tag>
					<!-- <div class="block"> {{scope.row.state}}</div> -->
				</template>
			</el-table-column>
			<el-table-column
				label="操作">
				<template  slot-scope="scope">
					<el-button v-if="scope.row.edit.notedit==true" type="info" icon="el-icon-edit" @click="handleEdit(scope.row)" round size="mini">编辑</el-button>
					<el-button v-else type="primary" icon="el-icon-s-claim" @click="handleSave(scope.row)" round size="mini">保存</el-button>
					<!-- <el-button v-show="scope.row.state=='未付款'" type="primary" icon="el-icon-money" >付款</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			layout="prev, pager, next"
			:total="50">
		</el-pagination>
	</div>
</template>

<script>
import orderItem from "../../../assets/js/order.js";
import area from "../../../assets/js/select_area.js";
export default {
	data(){
		return{
			notedit: true,
			keyWord: null,
			searchSelect: null,
			tableData: order,
			area:areajson,
			address:{}
		}
	},
	methods: {
		filterTag(value, row){
			return row.state == value;
		},
		handleEdit(row){
			row.edit.notedit = false;
		},
		handleSave(row){
			row.edit.notedit = true;
		}
	}
}
</script>

<style scoped>
	.el-breadcrumb {
		margin: 10px;
	}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

	.search {
		width: 400px;
		line-height: 50px;
		float: right;
	}

	.el-select {
		width: 80px;
	}

	.el-pagination {
		float: right;
		margin: 5px;
	}
</style>
