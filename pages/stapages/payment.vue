<template>
  <div>
    <div id="right-wrapper">
        <div class="footer-static-container">
            <div class="title">支付相关</div>
            <div class="con">
                <div class="payment">
                    <ul>
                        <li>1、为何要实名身份证验证？
                            <p>直邮产品、保税仓产品需要海关出关处理，故用户必须实名认证身份证信息，以保证出关正常。</p>
                            <p>（直邮订单身份证和姓名不匹配不正确的订单，我们会短信通知顾客，3天内不联系我们，我们将为客户取消订单并退款。）</p>
                        </li>
                        <li>2、为何未支付的订单被取消？
                            <p>提交订单后20分钟未支付，订单将会自动取消。若有任何疑问，可与客服400-720-9967联系。</p>
                        </li>
                        <li>3、购买产品后，可以更换收货地址么？
                            <p>（1）订单确认生成后，无法对产品、收货地址、姓名、收货电话做任何修改；请仔细填写收货信息，一旦发生错误，往返运费及相关后果由您自行承担；</p>
                            <p>（2）由于您的订单地址不详、地址错误等问题无法正常收货，一切后果由您自行承担；在您购买时请务必准确填写核对收货地址；若由于更换地址而导致的退货，往返运费需您自行承担。</p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    head: {
        link: [
            {rel: 'stylesheet', href: '/css/stapages/payment.css'}
        ]
    },
  layout: 'stapages',
}
</script>


