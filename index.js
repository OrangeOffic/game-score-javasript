var $start = document.querySelector('#start')
var $game = document.querySelector('#game')

var score = 0

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)

function startGame() {

  $game.style.backgroundColor = '#fff'
  $start.classList.add('hide')

  renderBox()
}

function handleBoxClick(event) {
  if(event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  var box = document.createElement('div')

  box.style.backgroundColor = '#000'
  box.style.display = 'block'
  box.style.height = box.style.width = '50px'
  box.style.position = 'absolute'
  box.style.left = box.style.right = '20px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement("afterbegin", box)
}