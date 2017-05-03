/*
* @Author: Derek
* @Date:   2017-03-24 15:05:29
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 10:26:32
*/
import baseMethod from './BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const solr = apiConfig[env].solrUrl

export default{
    //获取搜索结果
    loadSearchResult (params) {
        return baseMethod.get(solr + '/global/search', params)
    }
}
