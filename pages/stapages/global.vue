<template>
  <div>
    <div id="right-wrapper">
        <div class="footer-static-container">
            <div class="title">美美全球</div>
            <div class="con">
                <div class="globallayout">
                    <div class="con-title">全球布局</div>
                    <img src="/img/footer/memeglobal1.png">
                </div>
                <div class="">
                    <div class="con-title">韩国美妆翘楚</div>
                    <el-carousel type="card" height="300px">
                        <el-carousel-item v-for="img in imgf">
                            <img :src="img" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <div class="intro">
                        <p>Memebox2012年成立于韩国首尔，2015年被评为韩国消费者满意指数排名第一的化妆品部门，并获大韩民国优秀企业大奖。</p>
                    </div>
                </div>
                <div class="">
                    <div class="con-title">全球市场布局</div>
                    <el-carousel type="card" height="300px">
                        <el-carousel-item v-for="img in imgs">
                            <img :src="img" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <div class="intro">
                        <p>Memebox从2014年开始，先后在美国和中国成立了分公司，2016年开始进军东南亚市场。致力于为全世界的女性提供最优质有趣的美妆时尚服务。</p>
                    </div>
                </div>
                <div class="">
                    <div class="con-title">线下全新体验</div>
                    <el-carousel type="card" height="300px">
                        <el-carousel-item v-for="img in imgt">
                            <img :src="img" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <div class="intro">
                        <p>为给用户提供更为细致的服务，Memebox的产品已在屈臣氏，乐天免税店等线下实体店有售。</p>
                        <p>2016年，第一家线下旗舰店也在首尔江南地区开设。</p>
                    </div>
                </div>
                <div class="">
                    <div class="con-title">公司发展大事件</div>
                    <el-carousel type="card" height="300px">
                        <el-carousel-item v-for="img in imgfo">
                            <img :src="img" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    layout: 'stapages',
    head: {
        link: [
            {rel: 'stylesheet', href: '/css/stapages/global.css'}
        ]
    },
    data() {
        return {
            imgf: [
                '/img/footer/global-kr1.png',
                '/img/footer/global-kr2.png',
                '/img/footer/global-kr3.png'
            ],
            imgs: [
                '/img/footer/global-laout1.png',
                '/img/footer/global-laout2.png',
                '/img/footer/global-laout3.png'
            ],
            imgt: [
                '/img/footer/global-experience1.png',
                '/img/footer/global-experience2.png',
                '/img/footer/global-experience3.png'
            ],
            imgfo: [
                '/img/footer/global-develop1.png',
                '/img/footer/global-develop1.png',
                '/img/footer/global-develop1.png'
            ]
        }
    }
}
</script>
