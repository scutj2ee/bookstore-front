<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in categories">
        <template v-if="item.child">
          <el-submenu :index="'/list'+item.id" :key="item.id">
            <template slot="title">
             <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.child" :key="i" :index="'/list'+subItem.id">
              {{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="'/list'+item.index" :key="item.id">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from './utils/bus';

  export default {
      props: ['onSideBar'],
    data() {
      return {
        collapse: false,
        
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
       
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
   
  }
  
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    text-align: left;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 10;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
