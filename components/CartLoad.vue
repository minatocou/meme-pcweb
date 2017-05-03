<template>
    <div class="cartload">
      <ul>
        <li class= 'first'>
            <span>1</span>
            <p>购物车</p>
            <i></i>
        </li>
        <li class= 'second'>
            <span>2</span>
            <p>提交订单</p>
            <i></i>
        </li>
        <li class= 'third'>
            <span>v</span>
            <p>选择支付</p>
        </li>
      </ul>
    </div>
</template>
<script>
export default{
    head: {
        link: [
            {rel:'stylesheet', href:'/common/css/cartload.css'}
        ]
    }
}
</script>
