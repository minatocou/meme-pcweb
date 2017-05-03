/*
 * @Author: derek
 * @Date:   2017-02-22 16:33:19
 * @Last Modified by:   Derek
 * @Last Modified time: 2017-03-29 10:25:45
 */
import baseMethod from '../service/BaseMethod'
import apiConfig from '../conf/config'
const env    = process.env.NODE_ENV || "development";
const magento = apiConfig[env].baseUrl
const solr = apiConfig[env].solrUrl

export const state = {
    accessToken: '',
    isLoggedIn: 0,
    userName: '',
    userId: '',
    showDCode: false,
    minicart: {},
    topnav: [],
    leftnav: []
}

export const mutations = {
    SET_TOKEN: function(state, token) {
        console.log(state,token,'default')
        state.isLoggedIn = token.isLoggedIn
        state.accessToken = token.accessToken
        state.userId = token.userId
        state.userName = token.userName
        console.log(state,token,'after')
    },
    SET_TOPNAV: function(state, navdata) {
        state.topnav = navdata
    },
    SET_LEFTNAV: function(state, navdata) {
        state.leftnav = navdata
    },
    SET_MINICART: function(state, minicartdata){
        state.minicart = minicartdata
    }
}

export const actions = {
    nuxtServerInit({commit}, { store,req }) {
        if (req.session && req.session.token) {
            commit('SET_TOKEN', req.session.token)
        }
        const initAppData = [
            store.dispatch('getMiniCart', store.state.accessToken),
            store.dispatch('loadTopNav'),
            store.dispatch('loadLeftNav'),
        ]
        return Promise.all(initAppData)
    },
    showDownload({ state }) {
        state.showDCode = !state.showDCode
    },
    conCS ({state}){
        if(process.BROWSER_BUILD){
            window.NTKF_PARAM.uid = state.userId
            window.NTKF_PARAM.uname = state.userName
            NTKF.im_openInPageChat('kf_9366_1469771719610')
        }
    },
    getMiniCart ({commit}, param = {}) {
        let header = {
            headers: {
                token: param
            }
        }
        return baseMethod.get(magento + '/web/cart/getCartInfo', {}, header)
        .then(response => {
            if(response.code == 1){
                commit('SET_MINICART', response.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    loadTopNav({ commit }) {
        return baseMethod.get(magento + '/web/navigation/top', {})
        .then(response => {
            if(response.code == '1'){
                commit('SET_TOPNAV', response.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    loadLeftNav({ commit }) {
        return baseMethod.get(magento + '/web/navigation/left', {})
        .then(response => {
            if(response.code == '1'){
                commit('SET_LEFTNAV', response.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}
