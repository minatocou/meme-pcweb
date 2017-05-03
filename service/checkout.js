/*
* @Author: Derek
* @Date:   2017-03-17 17:57:55
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:23:19
*/

import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl

export default {
    //获取购物车详情
    loadCart (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'load cart accessToken')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.get(magento + '/web/cart/view', {}, header)
    },
    //订单确认页数据
    loadCheckout (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'checkout confirm')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.get(magento + '/web/checkout/view', {}, header)
    },
    //订单支付页数据
    loadCheckoutOrder (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'checkout order')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.post(magento + '/web/checkout/review', {}, header)
    }
}
