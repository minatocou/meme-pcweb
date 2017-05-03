/*
* @Author: Derek
* @Date:   2017-03-08 10:41:09
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 12:47:39
*/
'use strict'
export default function ({ store, redirect, error }) {
  // If user not connected, redirect
  if (!store.state.isLoggedIn) {
    return redirect('/account/login')
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
  }
}
