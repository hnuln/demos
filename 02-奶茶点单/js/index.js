const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    // console.log(formData);
    // console.log(formData.get('count'));
    alert(`【您的订单已经生成】
    ------------------------
    奶茶口味: ${formData.get('taste')}
    几杯: ${formData.get('count')}
    杯型: ${formData.get('capacity')}
    甜度: ${formData.get('sweet')}
    免费小料: ${formData.getAll('extra')}
    加价小料: ${formData.getAll('addPrice')}
    是否加冰: ${formData.get('isIce')}
    是否去茶底: ${formData.get('isTea')}
    你的地址: ${formData.get('address')}
    你的手机号: ${formData.get('tel')}
    期待送达时间: ${formData.get('time')}
    备注: ${formData.get('remark')}
    支付方式: ${formData.get('payWay')}`)
})

const topBtn = document.querySelector('.toTopBtn')
topBtn.addEventListener('click', () => {
    // console.log(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
})

window.addEventListener('scroll', () => {
    const btn = document.querySelector('.toTop')
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
        btn.classList.remove('hidden')
    } else {
        btn.classList.add('hidden')
    }
})
