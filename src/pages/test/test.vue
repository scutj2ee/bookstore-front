
<template>
<div id="pca">
<!-- v5及之后的版本 -->
<area-select v-model="selected" :data="pca"></area-select>   

<area-cascader v-model="selected2" :data="pca"></area-cascader>
<!-- setting -->
<area-select type='all' :level='2' v-model="selected" :data="pcaa"></area-select>
<area-cascader type='all' v-model="selected2" :level='1' :data="pcaa"></area-cascader>
</div>
</template>
 
<script>
import {pca, pcaa} from 'area-data'; // 城市数据
import 'vue-area-linkage/dist/index.css'; // 样式
export default {
   data () {
            return {
                pca: pca,
                pcaa: pcaa,
                selected2: '',
           }
}
};
</script>
<style>


</style>