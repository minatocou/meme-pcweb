/*
* @Author: Derek
* @Date:   2017-03-22 16:37:10
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:23:38
*/

import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl

export default{
    //获取首页详情
    loadHomepage() {
        return baseMethod.get(magento + '/web/view/index', {})
    },
}
