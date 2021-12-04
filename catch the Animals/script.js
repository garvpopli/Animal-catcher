const screens = document.querySelectorAll('.screen');
const choose_Animals_btns = document.querySelectorAll('.choose-Animals-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_Animals = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_Animals_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_Animals = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createAnimals, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createAnimals() {
    const Animals = document.createElement('div')
    Animals.classList.add('Animals')
    const { x, y } = getRandomLocation()
    Animals.style.top = `${y}px`
    Animals.style.left = `${x}px`
    Animals.innerHTML = `<img src="${selected_Animals.src}" alt="${selected_Animals.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    Animals.addEventListener('click', catchAnimals)

    game_container.appendChild(Animals)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchAnimals() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addAnimals()
}

function addAnimals() {
    setTimeout(createAnimals, 1000)
    setTimeout(createAnimals, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}