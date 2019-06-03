<template>
    <video-bg :sources="[path]" img="../../assets/images/homepages/add1.jpg" >
  <!-- If you want to add content here, a slot is waiting! -->
</video-bg>
</template>
<script>
export default{
    data () {
   return {
     path: require('../../assets/videos/video1.mp4'),
   }
 }
}
</script>