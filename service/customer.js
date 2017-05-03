/*
* @Author: Derek
* @Date:   2017-03-17 18:39:09
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:23:32
*/

import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl

export default{
    //customer info
    loadCustomerInfo (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd customer info')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.post(magento + '/web/account/index', {}, header)
    },
    //wishlist info
    loadWishlist (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'locd wishlist info')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.post(magento + '/web/wishlist/list', {}, header)
    },
    //address info
    loadAddress (store) {
        let accessToken = store.state.accessToken
        console.log(accessToken,'load address info')
        let header = {
            headers: {
                token: accessToken
            }
        }
        return baseMethod.get(magento + '/web/address/list', {}, header)
    }
}
