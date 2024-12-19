let gameSequence = []
let playerSequence = []
let level = 0
let credits = 3

const colors = ['green', 'red', 'yellow', 'blue']
const startButton = document.getElementById('start-btn')
const hintButton = document.getElementById('hint-btn')
const message = document.getElementById('message')
const buttons = document.querySelectorAll('.btn-square')

function startGame() {
  gameSequence = []
  playerSequence = []
  level = 0
  credits = 3
  hintButton.textContent = `Hint (Credits: ${credits})`
  hintButton.disabled = false
  message.textContent = 'Watch the sequence!'
  nextSequence()
}

function nextSequence() {
  level++
  playerSequence = []
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  gameSequence.push(randomColor)

  message.textContent = `Level ${level}`
  activateButton(randomColor)
}

function playSequence() {
  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      activateButton(color)
    }, index * 600)
  })
}

function activateButton(color) {
  const button = document.querySelector(`.btn-square.${color}`)
  button.classList.add('active')
  setTimeout(() => {
    button.classList.remove('active')
  }, 300)
}

function handleButtonClick(event) {
  const color = event.target.dataset.color
  if (!color) return

  playerSequence.push(color)
  activateButton(color)

  if (!checkSequence()) {
    message.textContent = 'Game Over! Try again.'
    hintButton.disabled = true
    return
  }

  if (playerSequence.length === gameSequence.length) {
    setTimeout(() => {
      nextSequence()
    }, 1000)
  }
}

function checkSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      return false
    }
  }
  return true
}

hintButton.addEventListener('click', () => {
  if (credits > 0) {
    playSequence()
    credits--
    hintButton.textContent = `Hint (Credits: ${credits})`

    if (credits === 0) {
      hintButton.disabled = true
    }
  }
})

startButton.addEventListener('click', startGame)
buttons.forEach((button) => button.addEventListener('click', handleButtonClick))
