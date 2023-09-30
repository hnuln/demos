// 选择要操作的dom元素
const area = document.querySelector('.area')
const box = document.querySelectorAll('.box')
// 游戏框和火车的大小
const areaWidth = area.clientWidth
const areaHeight = area.clientHeight
const boxSize = {
    width: 25,
    height: 25
}
// 配置信息
const config = {
    speed: 30,
    isTurn: false,
    direction: 'right'
}
const boxList = [
    {
        x: 0,
        y: 0,
    },
    {
        x: 25,
        y: 0,
    },
    {
        x: 50,
        y: 0,
    }
]

// 游戏初始化
let timer = null
function init() {
    selectInit()
    keyEvent()
    timer = setInterval(() => {
        stright()
    }, 200)
}
function selectInit() {
    // 通过select选择器控制音频播放与否
    const select = document.querySelector('select')
    select.addEventListener('change', () => {
        const audio = document.querySelector('audio')
        if (select.value === '是') {
            audio.play()
        } else {
            audio.pause()
        }
        select.blur()
    })
}
function stright() {
    if (config.isTurn) {
        config.isTurn = false
        box[0].classList.remove('right', 'left', 'up', 'down')
        box[0].classList.add(config.direction)
        if (config.direction === 'up' || config.direction === 'down') {
            boxList[0].x = boxList[1].x
            boxList[1].y = boxList[2].y
            boxList[2].y = config.direction === 'up' ? boxList[2].y -= boxSize.height : boxList[2].y += boxSize.height
            box[0].style.left = `${boxList[0].x}px`
            box[1].style.top = `${boxList[1].y}px`
            box[2].style.top = `${boxList[2].y}px`
        } else {
            boxList[0].y = boxList[1].y
            boxList[1].x = boxList[2].x
            boxList[2].x = config.direction === 'right' ? boxList[2].x += boxSize.width : boxList[2].x -= boxSize.width
            box[0].style.top = `${boxList[0].y}px`
            box[1].style.left = `${boxList[1].x}px`
            box[2].style.left = `${boxList[2].x}px`
        }
    }
    if (config.direction === 'right') {
        boxList.forEach((item, index) => {
            item.x += config.speed
            let limit = areaWidth - (box.length  - index) * boxSize.width
            item.x = item.x >= limit ? limit : item.x
            box[index].style.left = `${item.x}px`
        })
    } else if (config.direction === 'left') {
        boxList.forEach((item, index) => {
            item.x -= config.speed
            let limit = (box.length - 1-index) * boxSize.width
            item.x = item.x <= limit ? limit : item.x
            box[index].style.left = `${item.x}px`
        })
    } else if (config.direction === 'up') {
        boxList.forEach((item, index) => {
            item.y -= config.speed
            let limit = (box.length -1- index) * boxSize.height
            item.y = item.y <= limit ? limit : item.y
            box[index].style.top = `${item.y}px`
        })
    } else {
        boxList.forEach((item, index) => {
            item.y += config.speed
            let limit = areaHeight - (box.length- index) * boxSize.height
            item.y = item.y >= limit ? limit : item.y
            box[index].style.top = `${item.y}px`
        })
    }
    isOver()
}
// 改变火车方向
function turnDirection() {
    config.isTurn = true
    box[1].classList.remove('right', 'left', 'up', 'down')
    box[2].classList.remove('right', 'left', 'up', 'down')
    box[1].classList.add(config.direction)
    box[2].classList.add(config.direction)
    if (config.direction === 'down') {
        boxList[0].x = boxList[1].x
        boxList[1].x = boxList[2].x
        box[0].style.left = `${boxList[0].x}px`
        box[1].style.left = `${boxList[1].x}px`
        boxList[2].y += boxSize.height
        box[2].style.top = `${boxList[2].y}px`
    } else if (config.direction === 'up') {
        boxList[0].x = boxList[1].x
        boxList[1].x = boxList[2].x
        box[0].style.left = `${boxList[0].x}px`
        box[1].style.left = `${boxList[1].x}px`
        boxList[2].y -= boxSize.height
        box[2].style.top = `${boxList[2].y}px`
    } else if (config.direction === 'left') {
        boxList[0].y = boxList[1].y
        boxList[1].y = boxList[2].y
        box[0].style.top = `${boxList[0].y}px`
        box[1].style.top = `${boxList[1].y}px`
        boxList[2].x -= boxSize.width
        box[2].style.left = `${boxList[2].x}px`
    } else if (config.direction === 'right') {
        boxList[0].y = boxList[1].y
        boxList[1].y = boxList[2].y
        box[0].style.top = `${boxList[0].y}px`
        box[1].style.top = `${boxList[1].y}px`
        boxList[2].x += boxSize.width
        box[2].style.left = `${boxList[2].x}px`
    }

}
function keyEvent() {
    window.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowUp') {
            if (config.direction !== 'up' && config.direction !== 'down') {
                config.direction = 'up'
                turnDirection()
            }
        } else if (event.key == 'ArrowDown') {
            if (config.direction !== 'down' && config.direction !== 'up') {
                config.direction = 'down'
                turnDirection()
            }

        } else if (event.key == 'ArrowLeft') {
            if (config.direction !== 'left' && config.direction !== 'right') {
                config.direction = 'left'
                turnDirection()
            }

        } else if (event.key == 'ArrowRight') {
            if (config.direction !== 'right' && config.direction !== 'left') {
                config.direction = 'right'
                turnDirection()
            }
        }

    })
}
// 游戏结束
function isOver() {
    if ((boxList[2].y === 0 && config.direction === 'up') || (boxList[2].y+boxSize.height === areaHeight && config.direction === 'down') || (boxList[2].x === 0 && config.direction === 'left') || (boxList[2].x+boxSize.width === areaWidth && config.direction === 'right')) {
        overGame()
    }
}
let endTimer = null
function overGame() {
    if (!endTimer) {
        endTimer = setTimeout(() => {
            alert("游戏结束")
            clearInterval(timer)
        }, 200)
    }
}
init()