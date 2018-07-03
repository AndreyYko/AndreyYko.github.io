const body = document.body
const element = document.querySelector('#f-div')
element.style.height = `${element.offsetWidth}px`
let count = 0
let currentTagText = ''
element.onclick = (e) => {
  count++
  const span = document.createElement('span')
  const buttonClose = document.createElement('span')
  let buttonSide = 'right'
  buttonClose.innerHTML = 'X'
  const tagText = document.querySelector('#tag').value
  const coordinate = getMouseCoordinate(element, e)
  if (currentTagText !== tagText) {
    span.innerHTML = tagText
    span.style.display = `block`
    span.setAttribute('id', `tag${count}`)
    span.setAttribute('onclick', 'showCloseButton(this)')
    span.setAttribute('onmousedown', 'move(this, event)')
    span.setAttribute('onmouseup', 'stopMove(this, event)')
    element.appendChild(span)
    if (coordinate.x < span.offsetWidth / 2 && coordinate.y < span.offsetHeight / 2) { // top-left corner
      span.style.top = `${5}px`
      span.style.left = `${5}px`
    } else if (coordinate.x + span.offsetWidth / 2 > element.offsetWidth && coordinate.y < span.offsetHeight / 2) { // top-right corner
      let outside = coordinate.x + span.offsetWidth / 2 - element.offsetWidth
      span.style.top = `${5}px`
      span.style.left = `${(coordinate.x - span.offsetWidth / 2) - (outside + 5)}px`
    } else if (coordinate.x + span.offsetWidth / 2 > element.offsetWidth && coordinate.y + span.offsetHeight / 2 > element.offsetHeight) { // bottom-right corner
      let outsideRight = coordinate.x + span.offsetWidth / 2 - element.offsetWidth
      let outsideBottom = coordinate.y + span.offsetHeight / 2 - element.offsetHeight
      span.style.top = `${coordinate.y - span.offsetHeight / 2 - (outsideBottom + 5)}px`
      span.style.left = `${(coordinate.x - span.offsetWidth / 2) - (outsideRight + 5)}px`
    } else if (coordinate.x < span.offsetWidth / 2 && coordinate.y + span.offsetHeight / 2 > element.offsetHeight) { // bottom-left corner
      let outsideBottom = coordinate.y + span.offsetHeight / 2 - element.offsetHeight
      span.style.top = `${coordinate.y - span.offsetHeight / 2 - (outsideBottom + 5)}px`
      span.style.left = `${5}px`
    } else if (coordinate.x < span.offsetWidth / 2) { // top border
      let outside = coordinate.x - span.offsetWidth / 2
      span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
      span.style.left = `${5}px`
    } else if (coordinate.x + span.offsetWidth / 2 > element.offsetWidth) { // bottom border
      let outside = coordinate.x + span.offsetWidth / 2 - element.offsetWidth
      span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
      span.style.left = `${(coordinate.x - span.offsetWidth / 2) - (outside + 5)}px`
    } else if (coordinate.y < span.offsetHeight / 2) { // left border
      span.style.top = `${5}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
    } else if (coordinate.y + span.offsetHeight / 2 > element.offsetHeight) { // right border
      let outside = coordinate.y + span.offsetHeight / 2 - element.offsetHeight
      span.style.top = `${coordinate.y - span.offsetHeight / 2 - (outside + 5)}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
    } else { // free motion
      span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
    }
    // button close
    buttonClose.setAttribute('id', `close-tag${count}`)
    buttonClose.style.top = `0px`
    if (coordinate.x + (span.offsetWidth / 2) + 22 >= element.offsetWidth) {
      buttonClose.style.left = `-22px`
      console.log('left')
    } else {
      buttonClose.style.right = `-22px`
      console.log('right')
    }
    buttonClose.setAttribute('onclick', `closeTag(this.getAttribute('id'))`)
    span.appendChild(buttonClose)
    currentTagText = tagText
  } else {
    console.log('This tag is already added!!!!')
  }
}

function getMouseCoordinate(element, e) {
  return {
    x: e.clientX - element.offsetLeft,
    y: e.clientY - element.offsetTop
  }
}

function move (span, e) {
  body.onmousemove = (e) => {
    const closeButton = document.getElementById(`close-${span.getAttribute('id')}`)
    const coordinate = getMouseCoordinate(element, e)
    // console.log((element.offsetWidth - 5) + 23)
    if (coordinate.x + span.offsetWidth / 2 >= element.offsetWidth - 5) {
      if (coordinate.y + span.offsetHeight >= element.offsetHeight - 5) {
        span.style.top = `${(element.offsetHeight - 5) - span.offsetHeight}px`
        span.style.left = `${(element.offsetWidth - 5) - span.offsetWidth}px`
      } else if (coordinate.y - span.offsetHeight / 2 <= 5) {
        span.style.top = `${5}px`
        span.style.left = `${(element.offsetWidth - 5) - span.offsetWidth}px`
      } else {
        span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
        span.style.left = `${(element.offsetWidth - 5) - span.offsetWidth}px`
      }
    } else if (coordinate.x - span.offsetWidth / 2 <= 5) {
      if (coordinate.y + span.offsetHeight >= element.offsetHeight - 5) {
        span.style.top = `${(element.offsetHeight - 5) - span.offsetHeight}px`
        span.style.left = `${5}px`
      } else if (coordinate.y - span.offsetHeight / 2 <= 5) {
        span.style.top = `${5}px`
        span.style.left = `${5}px`
      } else {
        span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
        span.style.left = `${5}px`
      }
    } else if (coordinate.y + span.offsetHeight >= element.offsetHeight - 5) {
      span.style.top = `${(element.offsetHeight - 5) - span.offsetHeight}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
      if (closeButton.style.display === 'block') {
        if (+closeButton.style.right.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 >= (element.offsetWidth - 10) - 23) {
          closeButton.style.right = ``
          closeButton.style.left = `-22px`
        } else if (+closeButton.style.left.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 <= span.offsetWidth + 38) {
          closeButton.style.left = ``
          closeButton.style.right = `-22px`
        }
      }
    } else if (coordinate.y - span.offsetHeight / 2 <= 5) {
      span.style.top = `${5}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
      if (closeButton.style.display === 'block') {
        if (+closeButton.style.right.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 >= (element.offsetWidth - 10) - 23) {
          closeButton.style.right = ``
          closeButton.style.left = `-22px`
        } else if (+closeButton.style.left.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 <= span.offsetWidth + 38) {
          closeButton.style.left = ``
          closeButton.style.right = `-22px`
        }
      }
    } else {
      if (closeButton.style.display === 'block') {
        if (+closeButton.style.right.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 >= (element.offsetWidth - 10) - 23) {
          closeButton.style.right = ``
          closeButton.style.left = `-22px`
        } else if (+closeButton.style.left.slice(0, 3) < 0 && coordinate.x + span.offsetWidth / 2 <= span.offsetWidth + 38) {
          closeButton.style.left = ``
          closeButton.style.right = `-22px`
        }
      }
      span.style.top = `${coordinate.y - span.offsetHeight / 2}px`
      span.style.left = `${coordinate.x - span.offsetWidth / 2}px`
    }
  }
}

function stopMove (span, e) {
  body.onmousemove = null
}

function showCloseButton (span) {
  // let isVisible = span.childNodes[1].style.display !== 'none'
  // if (!isVisible) {
  //   document.getElementById(`close-${span.getAttribute('id')}`).style.display = `block`
  //   isVisible = true
  //   console.log('show')
  // } else {
  //   document.getElementById(`close-${span.getAttribute('id')}`).style.display = `none`
  //   isVisible = false
  //   console.log('close')
  // }
  //
  // if (isVisible) {
  //   span.removeAttribute('onclick')
  // }
  document.getElementById(`close-${span.getAttribute('id')}`).style.display = `block`
  span.removeAttribute('onclick')
}

function closeTag (id) {
  const spanId = id.slice(6, id.length)
  document.getElementById(`${spanId}`).style.display = 'none'
}