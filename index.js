var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $resultHeader = document.querySelector('#result-header')
var $timeHeader = document.querySelector('#time-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

var colors = ['yellow', 'red', 'black', 'grey', 'pink', 'blue', 'purple']
var score = 0
var isStartedGame = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {

  setGameTime()
  score = 0

  isStartedGame = true
  $gameTime.setAttribute('disabled', 'true')

  $game.style.backgroundColor = '#fff'
  hide($start)

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }

  }, 100)

  renderBox()
}

function setGameTime() {
  var time = +$gameTime.value

  show($timeHeader) 
  hide($resultHeader)

  $time.textContent = time.toFixed(1)
}

function setGameScore() {
  $result.textContent = score.toString()
}

function endGame() {
  isStartedGame = false
  $gameTime.removeAttribute('disabled')

  setGameScore()
  hide($timeHeader)
  show($resultHeader)

  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  show($start)
}

function handleBoxClick(event) {
  if (isStartedGame) {
    if(event.target.dataset.box) {
      score++
      renderBox()
    }
  } else {
    return
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(20, 100)
  var gameSize = $game.getBoundingClientRect()
  var randomColorIndex = getRandom(0, colors.length)

  box.style.backgroundColor = colors[randomColorIndex]
  box.style.display = 'block'
  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.left = getRandom(0, gameSize.width - boxSize) + 'px'
  box.style.top = getRandom(0, gameSize.height - boxSize) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement("afterbegin", box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}