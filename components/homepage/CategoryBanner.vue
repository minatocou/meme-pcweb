<template>
    <div class="categorybanners" v-if="banners.length!=0">
        <div class="make-qr" v-for="(banner,index) in banners" v-if="index < 8">
            <img :src="banner.image" alt="" class="bannerImg" :data-link="banner.link">
            <div class="wa">
                <div class="banner-wrapper"></div>
                <div class="qr-wrapper"></div>
                <div class="meme-logo"></div>
                <div class="qr-title">扫一扫即可查看特惠活动</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'category-banner',
    props: {
        appbanners: {
            type: Array
        }
    },
    head: {
        script: [
            {src:'/js/jquery.min.js'},
            {src:'/js/qrcode.min.js'}
        ]
    },
    data () {
        let banners = this.appbanners
        if(banners.length%2 != 0 && banners.length < 8){
            banners.push({
                image: '/img/originBanner.jpg',
                link: ''
            })
        }
        return {
            banners: banners
        }
    },
    mounted () {
        if(process.BROWSER_BUILD){
            this.$nextTick(function () {
                require('../../static/js/appbanner.js')
            })
        }
    }
}
</script>
