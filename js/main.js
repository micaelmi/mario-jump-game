const game = document.querySelector('main')
const distance = document.querySelector('#distance')
const character = document.querySelector('.character')
const obstacle = document.querySelector('.obstacle')
const enemy = document.querySelector('.enemy')
const clouds = document.querySelector('.clouds')
const gameOver = document.querySelector('.game-over')
const tryAgain = document.querySelector('#try-again')
const highScore = document.querySelector('#high')
const musicPlayer = document.querySelector('#music')
const checkMusic = document.querySelector('#check-music')
let end = false
let travelledDistance = 0000

const setJump = () => {
    character.classList.add('jump')

    setTimeout(() => {
        character.classList.remove('jump')
    }, 700)
}

const loop = setInterval(() => {
    const obstaclePosition = obstacle.offsetLeft
    const enemyPosition = enemy.offsetLeft
    const cloudsPosition = clouds.offsetLeft
    const characterPosition = +window.getComputedStyle(character).bottom.replace('px', '')

    if ((obstaclePosition <= 120 && characterPosition < 80 && obstaclePosition > 0) ||
        (enemyPosition <= 120 && enemyPosition > 0 && characterPosition < 60)) {

        musicPlayer.setAttribute('src', './audio/game-over-song.mp3')
        musicPlayer.removeAttribute('loop')

        obstacle.style.animation = 'none'
        obstacle.style.left = `${obstaclePosition}px`

        enemy.style.animation = 'none'
        enemy.style.left = `${enemyPosition}px`

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        character.style.animation = 'none'
        character.style.bottom = `${characterPosition}px`

        character.src = './img/game-over.png'
        character.style.width = '80px'
        character.style.marginLeft = '50px'

        gameOver.style.display = 'block'
        game.style.filter = 'grayscale(50%)'

        if (localStorage.getItem('highScore') < travelledDistance) {
            localStorage.setItem('highScore', travelledDistance)
        }
        highScore.textContent = localStorage.getItem('highScore')


        end = true
        document.addEventListener('keydown', reloadGame)
        clearInterval(loop)
    }
}, 10)

const distanceCounter = setInterval(() => {
    if (end === false) {
        travelledDistance++
        distance.textContent = travelledDistance
    }
}, 200)

function reloadGame() {
    window.location.reload()
}

document.addEventListener('keydown', setJump)
game.addEventListener('click', setJump)

tryAgain.addEventListener('click', reloadGame)
