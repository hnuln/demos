const beginBtn = document.querySelector('.beginBtn')
const resetBtn = document.querySelector('.resetBtn')
const gameBtn = document.querySelector('.gameBtn')
const initDialog = document.querySelector('.initDialog')
const dialog = document.querySelector('.dialog')
const enterForm = document.querySelector('#enterForm')
const selectForm = document.querySelector('#selectForm')
const confirm = document.querySelector('.confirm button')
const enter = document.querySelector('.enter')
const gameName = initDialog.querySelector('input')
const round = initDialog.querySelector('select')
const select = dialog.querySelector('select')
const title = document.querySelector('.title')
const result = document.querySelector('.result')
const message = document.querySelector('.message')
const robotImg = document.querySelector('.robot .img')
const meImg = document.querySelector('.me .img')
const player = document.querySelector('.player')

const robotInfor = document.querySelector('.robotInfor')
const meInfor = document.querySelector('.meInfor')
const imgSrc = {
    rock: './images/rock.png',
    paper: './images/paper.png',
    scissor: './images/scissor.png',
}
let roundSum = 3
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
beginBtn.addEventListener('click', () => {
    initDialog.showModal()
})
gameBtn.addEventListener('click', () => {
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
    // console.log();
    if (roundIndex === roundSum) {
        return true
    }
    if (countMe.win > (roundSum - roundIndex+countRobot.win) || countRobot.win > (roundSum - roundIndex +countMe.win)) {
        return true
    }
    return false
}
const gameOver = () => {
    gameBtn.classList.add('display')
    if (countMe.win > countRobot.win) {
        message.innerHTML = ` (≧v≦)o~~好棒，恭喜${countMe.name}获得胜利！`
    } else if (countMe.win < countRobot.win) {
        message.innerHTML = ` (≧v≦)o~~好棒，恭喜${countRobot.name}获得胜利！`
    } else {
        message.innerHTML = "不错嘛，平局了"
    }
    resetBtn.classList.remove('display')
}
selectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const robot = robotHand()
    const value = select.value
    const me = hand.indexOf(value)
    dialog.close()
    meImg.innerHTML = `<img src="${imgSrc[value]}" alt="">`
    title.innerHTML = `第${roundIndex}回合（共${roundSum}回合）`
    isWin(robot, me)
    console.log(roundIndex);
    if (isOver()) {
        gameOver()
    }
    roundIndex++
})
enterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    countMe.name = gameName.value
    player.innerHTML = countMe.name
    // console.log(typeof round.value);
    roundSum = parseInt(round.value)
    initDialog.close()
    gameBtn.classList.remove('display')
    beginBtn.classList.add('display')
})
resetBtn.addEventListener('click', () => {
    location.reload()
})
