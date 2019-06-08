<template>
  <div class="navMenu">
 
    <label v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.child==null"
                    :key="navMenu.id" :index="navMenu.id" :route="'/list'+navMenu.id"
                    disabled="">
       
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
 
      <el-submenu 
                  :key="navMenu.id" :data="navMenu" :index="navMenu.id">
        <template slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span> {{navMenu.name}}</span>
        </template>
        <NavMenu :navMenus="navMenu.child"></NavMenu>
      </el-submenu>
    </label>
 
  </div>
</template>
 
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>
 
<style scoped>
 
</style>
