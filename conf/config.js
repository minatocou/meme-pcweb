/*
* @Author: Derek
* @Date:   2017-03-29 10:21:51
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 18:51:47
*/
module.exports = {
  'development': {
    baseUrl: 'http://qah5app.cn.memebox.com',
    solrUrl: 'http://qah5search.cn.memebox.com',
    commentUrl: 'http://qah5app.cn.memebox.com',
  },
  'qah5': {
    baseUrl: 'http://qah5app.cn.memebox.com:8080',
    solrUrl: 'http://qah5search.cn.memebox.com:8080',
    commentUrl: 'http://qah5app.cn.memebox.com:8080',
  },
  'production': {
    baseUrl: 'http://qah5app.cn.memebox.com:8080',
    solrUrl: 'http://qah5search.cn.memebox.com:8080',
    commentUrl: 'http://qah5app.cn.memebox.com:8080',
  }
}

