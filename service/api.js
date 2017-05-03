/*
 * @Author: derek
 * @Date:   2017-03-02 16:36:49
 * @Last Modified by:   Derek
 * @Last Modified time: 2017-04-06 11:54:51
 */
'use strict'
const app = require('../memebox')
const router = require('express').Router()
const axios = require('axios')
const qs = require('qs')
const env = process.env.NODE_ENV || "development";
const apiConfig = require('../conf/config')[env]
const magento = apiConfig.baseUrl
const solr = apiConfig.solrUrl


/*
账户
 */

// 登录，获取accesstoken和登录状态
router.post('/login', function(req, res) {
    if (req.body.username && req.body.pwd && req.headers.nowdate) {
        let accessToken = ''
        if (req.session.token) {
            accessToken = req.session.token.accessToken || ''
        }
        let cusparams = qs.stringify({
            userName: req.body.username,
            password: req.body.pwd
        })
        let header = {
            headers: {
                nowdate: req.headers.nowdate,
                token: accessToken
            }
        }
        axios.post(magento + '/web/customer/login', cusparams, header).then(function(res1) {
                if (res1.data.code == '1') {
                    console.log('login success')
                    if (res1.headers.token) {
                        req.session.token = {
                            accessToken: res1.headers.token,
                            isLoggedIn: res1.data.data.isLoggedIn,
                            userId: res1.data.data.userId,
                            userName: res1.data.data.userName
                        }
                    }
                }
                res.json(res1.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    throw new Error('Bad credentialssss')
                }
            })
    }
})

// 注册，获取accesstoken和登录状态
router.post('/register', function(req, res) {
    if (req.body.username && req.body.pwd && req.headers.nowdate) {
        let accessToken = ''
        if (req.session.token) {
            accessToken = req.session.token.accessToken || ''
        }
        let cusparams = qs.stringify({
            userName: req.body.username,
            password: req.body.pwd,
            authCode: req.body.authcode
        })
        let header = {
            headers: {
                nowdate: req.headers.nowdate,
                token: accessToken
            }
        }
        console.log(cusparams, header, 'derekk');
        axios.post(magento + '/web/customer/register', cusparams, header).then(function(res1) {
                if (res1.data.code == '1') {
                    console.log('register success')
                    req.session.token = {
                        accessToken: res1.headers.token,
                        isLoggedIn: res1.data.data.isLoggedIn,
                        userId: res1.data.data.userId,
                        userName: res1.data.data.userName
                    }
                }
                res.json(res1.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    throw new Error('Bad credentialssss')
                }
            })
    }
})

// 登出
router.post('/logout', function(req, res) {
    let accessToken = req.session.token.accessToken || ''
    let cusparams = qs.stringify({})
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/customer/logout', cusparams, header).then(function(res1) {
            if (res1.data.code == '1') {
                console.log('logout success')
                req.session.token.isLoggedIn = 0
                req.session.token.accessToken = ''
                req.session.token.userName = ''
                req.session.token.userId = ''
            }
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

// 请求短信验证码
router.post('/authcode', function(req, res) {
    let username = req.body.username
    axios.get(magento + '/web/sms/getAuth', {
        params: {
            userName: username
        }
    }).then(function(res1) {
        if (res1.data.code == '1') {
            console.log('get authcode success')
        }
        res.json(res1.data)
    }).catch((error) => {
        if (error.response.status === 401) {
            throw new Error('Bad credentialssss')
        }
    })
})

/*
收藏
 */

//加入收藏
router.post('/addwish', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/wishlist/add', cusparams, header)
        .then(function(res1) {
            if (res1.data.code == '1') {
                console.log('add wishlist success')
            }
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//取消收藏
router.post('/cancelwish', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/wishlist/remove', cusparams, header)
        .then(function(res1) {
            if (res1.data.code == '1') {
                console.log('cancel wishlist success')
            }
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

/*
购物车
 */

//加入购物车
router.post('/addCart', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/cart/add', cusparams, header)
        .then(function(res1) {
            if (res1.data.code == '1') {
                console.log('add cart success')
                if (res1.headers.token) {
                    req.session.token = {
                        accessToken: res1.headers.token,
                        isLoggedIn: res1.data.data.isLoggedIn
                    }
                }
            }
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//加减数量
router.post('/updateCart', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/cart/updateItem', cusparams, header)
        .then(function(res1) {
            console.log('update cart res')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//勾选
router.post('/mark', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/cart/mark', cusparams, header)
        .then(function(res1) {
            console.log('mark cart res')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//删除单件
router.post('/delete', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/cart/deleteItem', cusparams, header)
        .then(function(res1) {
            console.log('delete cart res')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//删除选择
router.post('/deleteChosen', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/cart/batchDel', cusparams, header)
        .then(function(res1) {
            console.log('delete allchosen cart res')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

/*
确认订单
 */

//保存地址
router.post('/saveAddress', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/address/save', cusparams, header)
        .then(function(res1) {
            console.log('save address')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//获取编辑地址
router.post('/editAddress', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/address/getAddressData', cusparams, header)
        .then(function(res1) {
            console.log('get edit address data')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//删除地址
router.post('/deleteAddress', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/address/delete', cusparams, header)
        .then(function(res1) {
            console.log('delete address')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//设置默认地址
router.post('/setDefault', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/address/setDefault', cusparams, header)
        .then(function(res1) {
            console.log('setDefault address')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//改变选择地址
router.post('/changeAddress', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/address/change', cusparams, header)
        .then(function(res1) {
            console.log('change address')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//确认订单
router.post('/saveOrder', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/checkout/saveOrder', cusparams, header)
        .then(function(res1) {
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})


/*
订单
 */

//状态订单列表
router.post('/getSortedOrder', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/order/history', cusparams, header)
        .then(function(res1) {
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//去支付
router.post('/goPay', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/checkout/pay', cusparams, header)
        .then(function(res1) {
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//确认收货
router.post('/conf', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/order/confirm', cusparams, header)
        .then(function(res1) {
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//取消订单
router.post('/cancelOrder', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/order/cancel', cusparams, header)
        .then(function(res1) {
            console.log('cancel order success')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//重新下单
router.post('/reorder', function(req, res) {
    let accessToken = ''
    if (req.session.token) {
        accessToken = req.session.token.accessToken || ''
    }
    let cusparams = qs.stringify(req.body)
    let header = {
        headers: {
            token: accessToken
        }
    }
    axios.post(magento + '/web/order/reorder', cusparams, header)
        .then(function(res1) {
            console.log('reorder success')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//search
router.post('/search', function(req, res) {
    let cusparams = qs.stringify(req.body)
    axios.post(solr + '/global/search', cusparams)
        .then(function(res1) {
            console.log(res1, 'search result')
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

//classifylist
router.post('/classifylist', function(req, res) {
    let cusparams = qs.stringify(req.body)
    console.log(cusparams)
    axios.post(magento + '/web/product/list', cusparams)
        .then(function(res1) {
            res.json(res1.data)
        })
        .catch((error) => {
            if (error.response.status === 401) {
                throw new Error('Bad credentialssss')
            }
        })
})

module.exports = router
