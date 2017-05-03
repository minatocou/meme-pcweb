<template>
  <div>
    <div id="right-wrapper">
        <div class="footer-static-container">
            <div class="advance">
                <div class="title">品牌专区</div>
                <div class="con">
                    <div class="self-brand">
                        <div class="con-title">自有品牌</div>
                        <ul>
                            <li class="self-brand-item">
                                <img src="/img/footer/advance-self-pony.png">
                                <div class="intro">
                                    <h3>PONY EFFECT</h3>
                                    <p>PONY通过在化妆领域十余年的不懈探究，千种产品万次上妆效果尝试，因坚持而做到极致，以其精湛的化妆技巧和色彩搭配天赋而引起极大关注，被称为拥有一双“整容手”。</p>
                                    <p>PONY EFFECT是由品牌缪斯人物PONY自创的独立彩妆品牌。</p>
                                    <p>品牌力求在彩妆领域专注探索，给产品注入PONY自身的灵感，教程视频化帮助人们更容易掌控彩妆技巧，发掘适合自己的绝美妆容，影响更多人坚持做自己，为自己而妆  ，让更多人爱上妆自己。</p>
                                </div>
                            </li>
                            <li class="self-brand-item">
                                <img src="/img/footer/advance-self-meme.png">
                                <div class="intro">
                                    <h3>I’M MEME</h3>
                                    <p>I’m MEME是一个来自韩国，充满朝气的彩妆品牌。为了每天早晨在镜子面前犹豫的您，打造最适合的妆容。I’M MEME致力于寻找到专属于你个性的美，为了对美妆潮流敏感的您，提供多种质感、不同颜色的产品，满足您的多种需求。它是在韩国屈臣氏销售前四，Lohb’s彩妆销售第一，乐天百货弘大店(L-cube)销售第一的彩妆品牌。还是韩国排名前三的化妆品生产厂商Cosmeca的最大订单客户。I’m MEME将是您寻找美的旅途中最真诚的伙伴。</p>
                                </div>
                            </li>
                            <li class="self-brand-item">
                                <img src="/img/footer/advance-self-bonvivant.png">
                                <div class="intro">
                                    <h3>bonvivant</h3>
                                    <p>bonvivant,vivant在法语上的意思是指“生机勃勃，活着的”，bonvivant则是指“有活力的人，享受人生的人”。由研发高级护肤品活力成分的原料公司，秉承着创新的原则及丰富的美容心得，通过20年的研究下创造而成的bonvivant,拥有着不同功效的面膜系列，打造出“一天一面膜”的新概念。从自然生物开始，用珍贵的原料，让失去活力的肌肤重复生机，分享打造红润有血色的秘诀。</p>
                                </div>
                            </li>
                            <li class="self-brand-item">
                                <img src="/img/footer/advance-self-nooni.png">
                                <div class="intro">
                                    <h3>nooni</h3>
                                    <p>nooni，取自韩语中“雪”的发音，寓意是如雪一般纯净。它是韩国memebox第一个自有护肤品牌，一直致力于寻找韩国当地最优质的水源。水，是护肤品里最主要的成分，nooni意识到水的绝对重要性，将重点放在“水”上，集中于研发更好的水成分，只为给予您的肌肤源于自然健康的美丽。</p>
                                </div>
                            </li>
                            <li class="self-brand-item">
                                <el-carousel type="card" height="300px">
                                    <el-carousel-item v-for="img in imgs">
                                        <img :src="img" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </li>
                        </ul>
                    </div>
                    <div class="proxy-brand">
                        <div class="con-title">韩国代理品牌</div>
                        <ul>
                            <li><img src="/img/footer/proxy1.png"></li>
                            <li><img src="/img/footer/proxy2.png"></li>
                            <li><img src="/img/footer/proxy3.png"></li>
                            <li><img src="/img/footer/proxy4.png"></li>
                            <li><img src="/img/footer/proxy5.png"></li>
                            <li><img src="/img/footer/proxy6.png"></li>
                            <li><img src="/img/footer/proxy7.png"></li>
                            <li><img src="/img/footer/proxy8.png"></li>
                            <li><img src="/img/footer/proxy9.png"></li>
                            <li><img src="/img/footer/proxy10.png"></li>
                            <li><img src="/img/footer/proxy11.png"></li>
                            <li><img src="/img/footer/proxy12.png"></li>
                        </ul>
                    </div>
                    <div class="proxy-qualify">
                        <div class="con-title">代理资质</div>
                        <el-carousel type="card" height="300px">
                            <el-carousel-item v-for="img in imgse">
                                <img :src="img" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    head: {
        link: [
            {rel: 'stylesheet', href: '/css/stapages/advance.css'}
        ]
    },
    layout: 'stapages',
    data() {
        return {
            imgs: [
                '/img/footer/self-brand-qualify1.png',
                '/img/footer/self-brand-qualify2.png',
                '/img/footer/self-brand-qualify3.png'
            ],
            imgse: [
                '/img/footer/proxy-brand-qualify1.png',
                '/img/footer/proxy-brand-qualify2.png',
                '/img/footer/proxy-brand-qualify3.png'
            ]
        }
    }
}
</script>
