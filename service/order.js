/*
* @Author: Derek
* @Date:   2017-03-17 15:37:36
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:23:42
*/

import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl

export default {

    //最近订单
    loadRecentOrder (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd recent order')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.post(magento + '/web/order/recent', {}, header)
    },
    //获取各状态订单数量
    loadAllOrderCount (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd all order count')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.post(magento + '/web/order/count', {}, header)
    },
    //获取全部订单
    loadSortedOrders (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd all order list')
        let header = {
            headers: {
                token: accessToken
            }
        }
        let ops = {
            page: 1,
            size: 5,
            status: 0
        }
        return baseMethod.post(magento + '/web/order/history', ops, header)
    },
    //获取订单详情
    loadOrderDetail (store, ops) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd order detail')
        let header = {
            headers: {
                token: accessToken
            }
        }
        console.log(header,ops)
        return baseMethod.post(magento + '/web/order/detail', ops, header)
    }
}
