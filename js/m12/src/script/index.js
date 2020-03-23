'use strict'

let $el_ball = null

function getRandom(min = 0, max = 90) {
  // случайное число от min до max
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function getPositionX() {
  if ($el_ball.position().left === 0) {
    return '95%'
  } else {
    return '0'
  }
}

function moveBall() {
  $el_ball.animate({
    left: getPositionX(),
    top: getRandom() + '%'
  }, 400,
  'swing',
  () => isGoal(45)
  )
}

function isGoal(ballPercentageTolerance = 40) {
  // допуск в процентах от размеров мяча. При 0 мяч не должен выходить за границы ворот
  const goalHeight = $('.goal').eq(0).height()
  const goalTop = $('.goal').eq(0).position().top
  const goalBottom = goalTop + goalHeight
  const ballHeight = $el_ball.height()
  const ballTop = $el_ball.position().top
  const ballBottom = ballTop + ballHeight
  const ballTolerance = ballHeight / 100 * ballPercentageTolerance

  if ((ballTop + ballTolerance) >= goalTop && (ballBottom - ballTolerance) <= goalBottom) alert('Гооооол!')
}

function init() {
  $el_ball = $('.ball')
  $el_ball.bind('click', moveBall)
}

document.addEventListener('DOMContentLoaded', init)
