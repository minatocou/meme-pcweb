<template>
  <div>
    <div id="right-wrapper">
        <div class="footer-static-container">
            <div class="title">包邮政策</div>
            <div class="con">
                <div class="shipment">
                    <ul>
                        <li>
                            <ol>
                                <li>（1）中国仓购满99元即可包邮；</li>
                                <li>（2）保税仓购满149元或2件产品即可包邮；</li>
                                <li>（3）韩国直邮购满249元即可包邮。</li>
                            </ol>
                        </li>
                        <li>若未达到包邮金额，系统将自动结算您需要支付的邮资（一般每公斤30元），之后将不再产生其他费用，请您放心购买！</li>
                        <li>注.部分活动产品在特定时间段可直接包邮，以网站标识活动为准。</li>
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
            {rel: 'stylesheet', href: '/css/stapages/shipment.css'}
        ]
    },
  layout: 'stapages',
}
</script>
