<template>
    <div class="homebanners" v-if="banners.length!=0">
      <el-carousel >
        <el-carousel-item v-for="banner in banners">
          <img :src="banner.img">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
    export default{
        name: 'home-banner',
        props: {
            banners: {
                type: Array
            }
        }
    }
</script>
