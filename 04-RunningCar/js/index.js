// 资源
const images = [
    './images/car1.png',
    './images/car2.png',
    './images/car3.png',
    './images/car4.png',
    './images/car5.png',
    './images/car6.png'
]
// 车辆配置信息
let setting = {
    speed: 1,
    model: 0,
    direction: 'r',
    x: 0,
    y: 0,
    isTurn: false
}
// 游戏框
const box = document.querySelector('.box')
const speed = document.querySelector('.speed').querySelector('select')
const model = document.querySelector('.model').querySelector('select')
// 车型变化函数
function reCar() {
    box.innerHTML = `<img src="${images[setting.model]}" alt="" class="car">`
    updateDirection()
}
// 改变车辆方向
function updateDirection() {
    const car = document.querySelector('.car')
    car.classList.remove('up', 'down', 'left', 'right')
    if (setting.direction === 'd') {
        car.classList.add('down')
    } else if (setting.direction === 'l') {
        car.classList.add('left')
    } else if (setting.direction === 'u') {
        car.classList.add('up')
    } else {
        car.classList.add('right')
    }
    car.style.left = `${setting.x}px`
    car.style.top = `${setting.y}px`

}
// 初始化游戏
function init() {
    setting = JSON.parse(localStorage.getItem('setting')) || setting
    // console.log(setting);
    speed.value = setting.speed
    model.value = setting.model
    reCar()
    updateDirection()
}
// 更改配置
function updateSetting() {
    localStorage.setItem('setting', JSON.stringify(setting))
}
// 监听速度和车型选择变化
speed.addEventListener('change', () => {
    setting.speed = Number(speed.value)
    updateSetting()
    speed.blur()
})
model.addEventListener('change', () => {
    setting.model = Number(model.value)
    updateSetting()
    reCar()
    model.blur()
})
let timer = null
// 弹窗函数
function isModal(width, height) {
    if ((setting.direction === 'r' && setting.x === width) || (setting.direction === 'l' && setting.x === 0) || (setting.direction === 'd' && setting.y === height) || (setting.direction === 'u' && setting.y === 0)) {
        if (!timer) {
            timer = setTimeout(() => {
                alert("小车碰到边框了，请返回")
                timer = null
            }, 100)
        }
    }
}
// 小车运动处理函数
function running() {
    const boxWidth = box.clientWidth
    const boxHeight = box.clientHeight
    const car = document.querySelector('.car')
    const carWidth = car.clientWidth
    const carHeight = car.clientHeight
    if (setting.direction === 'r') {
        setting.x += setting.speed
        setting.x = setting.x > boxWidth - carWidth ? boxWidth - carWidth : setting.x
        car.style.left = `${setting.x}px`
    } else if (setting.direction === 'd') {
        setting.y += setting.speed
        setting.y = setting.y > boxHeight - carHeight ? boxHeight - carHeight : setting.y
        car.style.top = `${setting.y}px`
    } else if (setting.direction === 'l') {
        setting.x -= setting.speed
        setting.x = setting.x < 0 ? 0 : setting.x
        car.style.left = `${setting.x}px`
    } else if (setting.direction === 'u') {
        setting.y -= setting.speed
        setting.y = setting.y < 0 ? 0 : setting.y
        car.style.top = `${setting.y}px`
    }
    updateSetting()
    isModal(boxWidth - carWidth, boxHeight - carHeight)
}
window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp') {
        if (setting.direction !== 'u') {
            setting.direction = 'u'
            updateDirection()
        }
        running()
    } else if (event.key == 'ArrowDown') {
        if (setting.direction !== 'd') {
            setting.direction = 'd'
            updateDirection()
        }
        running()
    } else if (event.key == 'ArrowLeft') {
        if (setting.direction !== 'l') {
            setting.direction = 'l'
            updateDirection()
        }
        running()
    } else if (event.key == 'ArrowRight') {
        if (setting.direction !== 'r') {
            setting.direction = 'r'
            updateDirection()
        }
        running()
    }
})
init()
