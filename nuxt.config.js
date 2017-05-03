const path = require('path')
module.exports = {
  // cache: {
  //   max: 20,
  //   maxAge: 600000
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: '全球No.1韩国化妆品平台  - 美美箱Memebox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'baidu-site-verification', content: '0NcBQMiC0n'},
      { name: 'description', content: "美美箱是全球No.1韩国专业化妆品电商平台,每件商品均由美妆专家严格挑选，韩国直邮到您家, 详情登陆美美箱官网, 韩国化妆品，美美礼盒，pony, NARS，Benefit，芭比波朗，BOBBIBROWN，兰蔻，兰芝，爱茉莉，蜜丝佛陀，BB霜, whoo后，雪花秀" },
      { name: 'keywords', content: "美美箱，韩国化妆品，美美礼盒，pony, memebox, MEMEBOX, 礼盒，美美箱官网，美美箱中国官网，韩国,韩国化妆品特卖 ：cn.memebox.com, 彩妆，护肤，眼影，眼线，睫毛膏，眉妆，假睫毛，唇膏，唇彩，润唇膏，护唇，粉底，遮瑕，蜜粉，腮红，指甲油，亮肤，卸妆，保湿，修复，MAC，魅可，NARS，Benefit，芭比波朗，BOBBIBROWN，兰蔻，兰芝，爱茉莉，蜜丝佛陀，BB霜，CC霜，飞霞，定妆，妆前隔离，自然肌肤，油性肌肤，干性肌肤，遮瑕刷，粉底刷，蜜粉刷，修饰刷，刷具，眉刷，眼影刷，眼线刷，唇刷，腮红刷，匀脸刷，防晒，眼影盘，丝芙兰，莎莎，香水，磨砂去角质，沐浴香皂，沐浴露，沐浴块，美体仪，乳霜，护理油，香体膏，香体乳，护理膜，颈霜，面膜，免洗面膜，水洗面膜，泡泡面膜，片状面膜，撕拉式面膜，眼霜，眼膜，睫毛滋养液，美容仪，喷雾，乳液，面霜，卸妆液，卸妆乳，卸妆油，卸妆巾，洗发水，精华素，精油，护发素，弹力素，发胶，发蜡，染发，发膜，发霜，剃须泡沫，剃须啫喱，啫喱，剃须液，须后水，须后乳"},
      { name: 'robots', content: 'INDEX,FOLLOW'},
      { property: "qc:admins", content: "245747717255552706375"},
      { property: "og:title", content: "全球No.1韩国化妆品平台  - 美美箱Memebox"},
      { property: "og:type", content: "website"},
      { property: "og:url", content: "http://cn.memebox.com" },
      { property: "wb:webmaster", content: "cae0bbcb35831a50"},
      { property: "og:description", content: "美美箱，韩国化妆品，美美礼盒，pony, memebox, MEMEBOX, 礼盒，美美箱官网，美美箱中国官网，韩国,韩国化妆品特卖 ：cn.memebox.com，兰蔻，兰芝，爱茉莉，whoo后，雪花秀，悦诗风吟，伊蒂之屋，伊思，爱丽小屋，芭妮兰，梦妆，欧惠，菲诗小铺，魔法森林，呼吸，思亲肤，高丽雅娜，亦博，赫拉，婵真，一理，奥普，3CE，珂莱欧，自然乐园，菲丽菲拉，秀丽韩，托尼魅力，吕，谜尚，美迪惠尔，丽得姿，ARITAUM，DR.JART+，HOLIKA HOLIKA，MEME BEAUTY，PONY EFFECT，NOONI，美妆达人，DAYOUNG，SOYOUNG，KYUNGSUN，护肤，眼影，眼线，睫毛膏，眉妆，假睫毛，唇膏，唇彩，润唇膏，护唇，粉底，遮瑕，蜜粉，腮红，指甲油，亮肤，卸妆，保湿，修复，，BB霜，CC霜，飞霞，定妆，妆前隔离，自然肌肤，油性肌肤，干性肌肤，遮瑕刷，粉底刷，蜜粉刷，修饰刷，刷具，眉刷，眼影刷，眼线刷，唇刷，腮红刷，匀脸刷，防晒，眼影盘，丝芙兰，莎莎，香水，磨砂去角质，沐浴香皂，沐浴露，沐浴块，美体仪，乳霜，护理油，香体膏，香体乳，护理膜，颈霜，面膜，免洗面膜，水洗面膜，泡泡面膜，片状面膜，撕拉式面膜"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/common/css/global.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ffffff' },
  /*
  ** Build configuration
  */
  build: {
  // 将重复引用的第三方模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'jquery',
      'element-ui'
    ],
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    }
  },
  // srcDir: '/opt/www/meme-pcweb',
  // router: {
  //   extendRoutes(routes) {

  //   },
  //   base: '/opt/www/'
  // },
  plugins: [
    '~plugins/element-ui.js'
  ]
}
