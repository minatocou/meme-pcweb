<template>
    <div class="product-detail-wrapper">
      <empty v-if="detail.length == 0"></empty>
      <div class="product-detail-container" v-else>
      <!-- <div>{{detail}}</div> -->
        <div class="detail-wrap">
          <div class="detail-main">
            <div class="deta-left">
              <div class="logo">
                <img :src="stamap[detail.warehouse].logo" alt="">
              </div>
              <div class="pimg">
                <img class="" :src="detail.image" alt="">
              </div>
            </div>
            <div class="deta-right">
              <div class="title">
                {{detail.brand}}
                {{detail.name}}
                <p>{{stamap[detail.warehouse].des}}</p>
              </div>
              <div class="short-des" v-if=" detail.shortDescription" v-html="detail.shortDescription"></div>
              <div class="price">
                <div class="origin">
                  价格<del>￥{{price[0].originPrice || 0}}</del>
                </div>
                <div class="special">
                  <span class="label">超特价</span>
                  <span class="sp-price">￥{{price[0].price || 0}}</span>
                  <span class="discount">{{(10.0/(price[0].originPrice/price[0].price)).toFixed(1)}}折</span>
                </div>
              </div>
              <div class="reward">
                <i></i>
                <span>最高可返
                    <a href="/account/login" v-if="!$store.state.isLoggedIn">登录后查看</a>
                    <a v-else>{{mecoin.rewardAmout}}</a>
                 蜜豆</span>
              </div>
              <div class="shipment">
                邮费<span>{{stamap[detail.warehouse].ship}}</span></div>
              <div class="comment">
                  <div class="com">评价</div>
                  <div class="rating-box">
                    <div class="rating" :style=" {width: detail.reviewRating + '%'} "></div>
                  </div>
                  <span>已有<a>{{detail.reviewCount || 0}}</a>人评价</span>
              </div>
              <div class="options" v-if="detail.hasOptions == '1'">
              规格
                <select name="" class="opt" v-model="selected">
                    <option value="">请选择规格</option>
                  <template v-for="item in detail.options">
                    <option :value="item.value" :class="item.option_id">{{item.title}}</option>
                  </template>
                </select>
              </div>
              <div class="qty">
                数量
                <button class="reduce" @click="reduce">-</button>
                <input type="text" v-model="qty">
                <button class="add" @click="add">+</button>
              </div>
              <div class="action">
                <div class="wishlist" @click="addWish"><span>加入收藏</span></div>
                <div class="addCart" :class="(detail.status == '2' || detail.stockStatus == 0)?'close':'open'">
                  <span v-if="!(detail.status == '2' || detail.stockStatus == 0)" @click="addCart">加入购物车</span>
                  <span v-else>已抢光</span>
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <!-- <div class="tabs">
          <ul>
            <li :class="{'chosen':tab==1}" @click="changeTab(1)">图文详情</li>
            <li :class="{'chosen':tab==2}" @click="changeTab(2)">商品参数</li>
            <li :class="{'chosen':tab==3}" @click="changeTab(3)">配送说明</li>
            <li :class="{'chosen':tab==4}" @click="changeTab(4)">评论({{detail.reviewCount}})</li>
          </ul>
        </div> -->
        <el-tabs v-model="tab" type="card">
          <el-tab-pane label="图文详情" name="first"></el-tab-pane>
          <el-tab-pane label="商品参数" name="second"></el-tab-pane>
          <el-tab-pane label="配送说明" name="third"></el-tab-pane>
          <el-tab-pane label="评论" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="description" v-html="detail.description" v-show="tab == 'first'"></div>
        <div class="attributes" v-show="tab == 'second'">
          <template v-for="item in detail.attributes">
              <p><span>{{item.label}}: {{item.value}}</span></p>
          </template>
        </div>
        <div class="shippment" v-show="tab == 'third'">
          <ul v-html="stamap[detail.warehouse].shipdes"></ul>
        </div>
        <div class="commentdetail" v-show="tab == 'fourth'">
            <div>{{comment}}</div>
        </div>
        <div class="more-detail">
          <img src="/img/moredetails.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import Empty from '~components/Empty.vue'
import ProductService from '../../service/product'
import axios from 'axios'
export default {
  head: {
      link: [
          {rel: 'stylesheet', href: '/css/product/productDetail.css'}
      ]
  },
  components: {
    Empty
  },
  async data ( {store, params} ) {
    let productDetail = await ProductService.loadProductDetail(params)
    let productPrice = await ProductService.loadProductPrice(params)
    let productComment = await ProductService.loadProductComment(params)
    let mecoinDetail = await ProductService.loadMecoinDetail(store)
    return {
      stamap: {
        local: {
          des: '本地仓库发货',
          ship: '满99元免邮',
          logo: '/img/goods-local.png',
          shipdes: '<li>1、本仓订单金额满99元包邮；</li><li>2、16:00前的订单原则上当天便安排发货（大促期间物流压力剧增可能会稍有延迟，请谅解）；</li><li>3、下单后预计3-5个工作日到货（偏远地区除外）。</li>'
        },
        kr: {
          des: '韩国本土仓库发货',
          ship: '满249元免邮',
          logo: '/img/goods-global.png',
          shipdes: '<li>1、本仓订单金额满249元包邮；</li><li>2、下单后预计7-14个工作日到货（偏远地区除外）；</li><li>3、若遇法定节假日或进出口海关清关，可能会影响收货时间，如有急用，请您谨慎考虑。</li>'
        },
        epass: {
          des: '韩国直邮七日达',
          ship: '满299元免邮（自有品牌商品满199元即可包邮）',
          logo: '/img/goods-epass.png',
          shipdes: '<li>1、本仓订单金额满249元包邮（其中自有品牌商品满199元即可享受包邮）；</li><li>2、下单后预计4-7个工作日到货（偏远地区除外）；</li><li>3、若遇法定节假日或进出口海关清关，可能会影响收货时间，如有急用，请您谨慎考虑。</li>'
        },
        ftz: {
          des: '保税仓发货',
          ship: '满149包邮',
          logo: '/img/goods-ftz.png',
          shipdes: '<li>1、买满149元或产品数满2件包邮。</li><li>2、下单后2个工作日从深圳保税仓发货。</li><li>3、预计3-7个工作日收货（偏远地区除外）。</li>'
        }
      },
      tab: 'first',
      qty: 1,
      detail: productDetail.data || null,
      price: productPrice.data || null,
      comment: productComment.data || null,
      selected: '',
      mecoin: mecoinDetail.data || null
    }
  },
  validate ({ params }) {
    return !isNaN(params.product_id)
  },
  methods: {
    addCart () {
      let $this = this
      let productId = this.detail.id
      let options = {}
      let qty = this.qty
      if ($this.detail.hasOptions == '1') {
        let option_id = $this.detail.options[0].option_id
        if(!this.selected){
          alert('请选择规格')
          return 0
        }
        else{
          options[option_id] = $this.selected
        }
      }
      axios.post('/api/addCart', {productId, qty, options})
        .then(function(res){
          if(res.data.code == 1){
              $this.$store.state.minicart = res.data.data
        }
          alert(res.data.msg)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
    },
    addWish () {
      let productId = this.detail.id
      if(this.$store.state.isLoggedIn){
        axios.post('/api/addwish', {productId})
        .then(function(res){
          alert(res.data.msg)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
          }
        })
      }
      else{
        alert('请登录')
        location.href='/account/login'
      }
    },
    reduce () {
      this.qty --
    },
    add () {
      this.qty ++
    }
  }
}
</script>
