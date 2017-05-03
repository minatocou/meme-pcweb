/*
* @Author: Derek
* @Date:   2017-03-10 13:11:42
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:27:39
*/
import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl
const solr = apiConfig[env].solrUrl
const comment = apiConfig[env].commentUrl

export default {
    //获取商品详情
    loadProductDetail( params = {}) {
        let customParam = {
          id: params.product_id
        }
        return baseMethod.get(magento + '/web/product/detail', customParam)
    },
    //solr价格补偿
    loadProductPrice(params = {}) {
        let customParam = {
            productIds: params.product_id
        }
        return baseMethod.get( solr + '/global/price', customParam)
    },
    //获取评论接口
    loadProductComment( params = {}) {
        let customParam = {
            product_id: params.product_id,
            page: 1,
            pageSize: 10
        }
        return baseMethod.post(comment + '/web/comment/reviewList', customParam)
    },
    //获取category详情
    loadCategoryList( params = {}) {
        let customParam = {
          id: params.category_id
        }
        return baseMethod.get(magento + '/web/category/detail', customParam)
    },
    //获取分类信息
    loadClassifyList ( params = {}) {
        return baseMethod.get(magento + '/web/product/list', params)
    },
    //获取m币信息
    loadMecoinDetail (store){
        let accessToken = store.state.accessToken
        console.log(accessToken,'load mcoin accessToken')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.get(magento + '/web/account/getProductReward', {}, header)
    }
}

