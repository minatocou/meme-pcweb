/*
* @Author: Derek
* @Date:   2017-03-22 19:03:09
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-22 19:37:15
*/
$(document).ready(function($) {
    var banners = $('.categorybanners .make-qr');
    banners.each(function(){
        if($(this).find('.bannerImg').data('link')){
            var qrcode = new QRCode(this);
            qrcode.makeCode($(this).find('.bannerImg').data('link'));
        }
    })

    $('.categorybanners').on('mouseenter','.make-qr',function(){
        if($(this).find('.bannerImg').data('link')){
            $(this).find('.wa').css('display', 'block');
            $(this).find('img:not(.bannerImg)').css('z-index', '3');
        }
    })
    $('.categorybanners').on('mouseleave','.make-qr',function(){
        if($(this).find('.bannerImg').data('link')){
            $(this).find('.wa').css('display', 'none');
            $(this).find('img:not(.bannerImg)').css('z-index', '-1');
        }
    })

});

