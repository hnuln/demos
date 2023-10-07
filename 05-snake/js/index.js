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
    speed: 25,
    direction: 'right'
}
const boxList = [
    {
        x: 0,
        y: 0,
        direction: 'right'
    },
    {
        x: 25,
        y: 0,
        direction: 'right'
    },
    {
        x: 50,
        y: 0,
        direction: 'right'
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
    for (let i = 0; i < boxList.length; i++) {
        if (boxList[i].direction === 'right') {
            // 车头与车身做不同处理
            if (i === boxList.length - 1) {
                boxList[i].x = boxList[i].x + config.speed >= (areaWidth - boxSize.width) ? (areaWidth - boxSize.width) : boxList[i].x + config.speed
            } else {
                // 车身移动位置两种处理，转弯和不转弯
                // 根据车厢与车头的方向是否相等判断
                if (boxList[i].direction === boxList[boxList.length - 1].direction) {
                    // 如果是直走则要考虑游戏框的大小，控制游戏是否结束
                    boxList[i].x = boxList[boxList.length - 1].x + config.speed >= (areaWidth - boxSize.width) ? areaWidth - boxSize.width * (boxList.length - i) : boxList[i + 1].x
                } else {
                    // 如果车辆正在拐弯，则直接移动到前一车厢的位置
                    boxList[i].x = boxList[i + 1].x
                }
                boxList[i].y = boxList[i + 1].y
                boxList[i].direction = boxList[i + 1].direction
            }
        } else if (boxList[i].direction === 'down') {
            if (i === boxList.length - 1) {
                boxList[i].y = boxList[i].y + config.speed >= (areaHeight - boxSize.height) ? (areaHeight - boxSize.height) : boxList[i].y + config.speed
            } else {
                if (boxList[i].direction === boxList[boxList.length - 1].direction) {
                    boxList[i].y = boxList[boxList.length - 1].y + config.speed >= (areaHeight - boxSize.height) ? areaHeight - boxSize.height * (boxList.length - i) : boxList[i + 1].y
                } else {
                    boxList[i].y = boxList[i + 1].y
                }
                boxList[i].x = boxList[i + 1].x
                boxList[i].direction = boxList[i + 1].direction
            }

        } else if (boxList[i].direction === 'left') {
            if (i === boxList.length - 1) {
                boxList[i].x = boxList[i].x - config.speed >= 0 ? boxList[i].x - config.speed : 0
            } else {
                if (boxList[i].direction === boxList[boxList.length - 1].direction) {
                    boxList[i].x = boxList[boxList.length - 1].x - config.speed >= 0 ? boxList[i + 1].x : (boxList.length - 1 - i) * boxSize.width
                } else {
                    boxList[i].x = boxList[i + 1].x
                }
                boxList[i].y = boxList[i + 1].y
                boxList[i].direction = boxList[i + 1].direction
            }

        } else {
            if (i === boxList.length - 1) {
                boxList[i].y = boxList[i].y - config.speed >= 0 ? boxList[i].y - config.speed : 0
            } else {
                if (boxList[i].direction === boxList[i + 1].direction) {
                    boxList[i].y = boxList[boxList.length - 1].y - config.speed >= 0 ? boxList[i + 1].y : (boxList.length - 1 - i) * boxSize.height
                } else {
                    boxList[i].y = boxList[i + 1].y
                }
                boxList[i].x = boxList[i + 1].x
                boxList[i].direction = boxList[i + 1].direction
            }

        }
        box[i].style.left = `${boxList[i].x}px`
        box[i].style.top = `${boxList[i].y}px`
        // 控制车辆的方向
        box[i].classList.remove('right', 'left', 'up', 'down')
        box[i].classList.add(boxList[i].direction)
    }
    isOver()
}
// 改变火车方向
function turnDirection() {
    boxList[2].direction = config.direction
}
function handleKey(event) {
    console.log(1);
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
}
function keyEvent() {
    window.addEventListener('keydown',handleKey)
}
// 游戏结束
function isOver() {
    if ((boxList[2].y === 0 && config.direction === 'up') || (boxList[2].y + boxSize.height === areaHeight && config.direction === 'down') || (boxList[2].x === 0 && config.direction === 'left') || (boxList[2].x + boxSize.width  === areaWidth && config.direction === 'right')) {
        overGame()
    }
}
let endTimer = null
function overGame() {
    window.removeEventListener('keydown', handleKey)
    if (!endTimer) {
        endTimer = setTimeout(() => {
            alert("游戏结束")
            clearInterval(timer)
        }, 200)
    }
}
init()