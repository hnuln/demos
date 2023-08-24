const btn = document.querySelector('.gameBtn')
const dialog = document.querySelector('.dialog')
const confirm = document.querySelector('.confirm button')
const select = dialog.querySelector('select')
const title = document.querySelector('.title')
const result = document.querySelector('.result')
const message = document.querySelector('.message')
const robotImg = document.querySelector('.robot .img')
const meImg = document.querySelector('.me .img')

const robotInfor = document.querySelector('.robotInfor')
const meInfor = document.querySelector('.meInfor')
const imgSrc = {
    rock: './images/rock.png',
    paper: './images/paper.png',
    scissor: './images/scissor.png',
}
const roundSum = 3
let roundIndex = 1
const hand = ['rock', 'paper', 'scissor']

const countRobot = {
    name: "机器人",
    win: 0,
    fail: 0,
}
const countMe = {
    name: "俺",
    win: 0,
    fail: 0,
}

btn.addEventListener('click', () => {
    dialog.showModal()
})
// 机器人出拳
const robotHand = () => {
    const index = Math.floor(Math.random() * 3)
    const path = imgSrc[hand[index]]
    robotImg.innerHTML = `<img src="${path}" alt="">`
    return index
}
// 判输赢 
const isWin = (robot, me) => {
    if (me - robot === 1 || (me === 0 && robot === hand.length - 1)) {
        result.innerHTML = "本回合你赢"
        countMe.win++
        countRobot.fail++
    } else if (me === robot) {
        result.innerHTML = "本回合平"
    } else {
        result.innerHTML = "本回合机器人赢"
        countMe.fail++
        countRobot.win++
    }
    robotInfor.innerHTML = `胜：${countRobot.win} | 负：${countRobot.fail}`
    meInfor.innerHTML = `胜：${countMe.win} | 负：${countMe.fail}`
}

const isOver = () => {
    if (roundIndex === roundSum) {
        return true
    }
    if (countMe.win > roundSum - roundIndex || countRobot > roundSum - roundIndex) {
        return true
    }
    return false
}
const gameOver = () => {
    btn.style.display = "none"
    if (countMe.win > countRobot.win) {
        message.innerHTML = ` (≧v≦)o~~好棒，恭喜${countMe.name}获得胜利！`
    } else if (countMe.win < countRobot.win) {
        message.innerHTML = ` (≧v≦)o~~好棒，恭喜${countRobot.name}获得胜利！`
    } else {
        message.innerHTML = "不错嘛，平局了"
    }
}
dialog.addEventListener('close', () => {
    const robot = robotHand()
    const value = select.value
    const me = hand.indexOf(value)
    meImg.innerHTML = `<img src="${imgSrc[value]}" alt="">`
    title.innerHTML = `第${roundIndex}回合（共${roundSum}回合）`
    isWin(robot, me)
    if (isOver()) {
        gameOver()
    }
    roundIndex++
    
})
