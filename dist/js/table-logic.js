/*Make resizableTable div by Hung Nguyen*/




function makeresizableTableDiv(div) {
  const element = document.querySelector(div);
  const resizerTablesTable = document.querySelectorAll(div + ' .resizerTable')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizerTablesTable.length; i++) {
    const currentresizerTable = resizerTablesTable[i];
    currentresizerTable.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.offsetLeft; // .offsetLeft changed  <==> .getBoundingClientRect().left
      original_y = element.offsetTop;  // .offsetTop changed  <==> .getBoundingClientRect().top
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      
      if (currentresizerTable.classList.contains('bottom-right')) {
        addTopAndBottomChair()
        addLeftAndRightChair()
        replaceLine()
        
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentresizerTable.classList.contains('bottom-left')) {
        addTopAndBottomChair()
        addLeftAndRightChair()
        replaceLine()
     

        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentresizerTable.classList.contains('top-right')) {
        addTopAndBottomChair()
        addLeftAndRightChair()
        replaceLine()
    

        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        addTopAndBottomChair()
        addLeftAndRightChair()
        replaceLine()
  

        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)

      onChangeColor()

    }
  }
}
  
  
  makeresizableTableDiv('.resizableTable')


////////////////////////////////////////////

// перемещение линии
function replaceLine() {
  const table = document.querySelector('.tableCenter')
  const line = document.querySelector('.tableCenter-line')
  // console.log(table.offsetHeight)
  switch(true) {
    case (table.offsetWidth <= table.offsetHeight) : 
      line.style.width = '100%'
      line.style.height = '14px'
      line.style.borderRadius = '15px 15px 0 0'
      break;
    case (table.offsetWidth > table.offsetHeight):
      line.style.width = '14px'
      line.style.height = '100%'
      line.style.borderRadius = '15px 0 0 15px'
    default: return
  }
}
////////////////////////////////////////////////////


function addTopAndBottomChair() {

  let table = document.querySelector('.tableCenter')

  function removeTop(removeClass) {
    if (document.querySelector(removeClass)) {
      removeChair(removeClass) 
    }
  }
  function removeChair(leftClass) {
    const div = document.querySelector(leftClass)
    removed = div.parentNode.removeChild(div)
  }

  switch(true) {
    case (table.offsetWidth > 415 && table.offsetWidth <= 455) : 
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 375 && table.offsetWidth <= 415) : 
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 335 && table.offsetWidth <= 375) : 
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 295 && table.offsetWidth <= 335) : 
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 255 && table.offsetWidth <= 295) : 
      removeTop('.elipsTop7')
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 215 && table.offsetWidth <= 255) : 
      removeTop('.elipsTop6')
      removeTop('.elipsTop7')
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 175 && table.offsetWidth <= 215) : 
      removeTop('.elipsTop5')
      removeTop('.elipsTop6')
      removeTop('.elipsTop7')
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 135 && table.offsetWidth <= 175) : 
      removeTop('.elipsTop4')
      removeTop('.elipsTop5')
      removeTop('.elipsTop6')
      removeTop('.elipsTop7')
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth > 95 && table.offsetWidth <= 135) : 
      removeTop('.elipsTop3')
      removeTop('.elipsTop4')
      removeTop('.elipsTop5')
      removeTop('.elipsTop6')
      removeTop('.elipsTop7')
      removeTop('.elipsTop8')
      removeTop('.elipsTop9')
      removeTop('.elipsTop10')
      removeTop('.elipsTop11')
      break;
    case (table.offsetWidth <= 95) :
      if (document.querySelector('.elipsTop2')) {
        removeTop(".elipsTop2")
        removeTop('.elipsTop3')
        removeTop('.elipsTop4')
        removeTop('.elipsTop5')
        removeTop('.elipsTop6')
        removeTop('.elipsTop7')
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
      }
      break;
  }

  function addTop(addClass) {
    if(!document.querySelector(addClass) ){
      let divTop = document.createElement('div');
      divTop.classList.add('elipsTop');
      divTop.classList.add('chair');
      divTop.classList.add(addClass.slice(1));
      table.appendChild(divTop)

      let divBottom = document.createElement('div');
      divBottom.classList.add('elipsBottom');
      divBottom.classList.add('chair');
      divBottom.classList.add(addClass.slice(1));
      table.appendChild(divBottom)


    }
  }
  switch(true) {
    case (table.offsetWidth > 415) : 
      addTop('.elipsTop10')
      addTop('.elipsTop9')
      addTop('.elipsTop8')
      addTop('.elipsTop7')
      addTop('.elipsTop6')
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 375 && table.offsetWidth <= 415) : 
      addTop('.elipsTop9')
      addTop('.elipsTop8')
      addTop('.elipsTop7')
      addTop('.elipsTop6')
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 335 && table.offsetWidth <= 375) : 
      addTop('.elipsTop8')
      addTop('.elipsTop7')
      addTop('.elipsTop6')
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 295 && table.offsetWidth <= 335) : 
      addTop('.elipsTop7')
      addTop('.elipsTop6')
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 255 && table.offsetWidth <= 295) : 
      addTop('.elipsTop6')
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 215 && table.offsetWidth <= 255) : 
      addTop('.elipsTop5')
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 175 && table.offsetWidth <= 215) : 
      addTop('.elipsTop4')
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 135 && table.offsetWidth <= 175) : 
      addTop('.elipsTop3')
      addTop('.elipsTop2')
      break;
    case (table.offsetWidth > 95 && table.offsetWidth <= 135 ) : 
      addTop('.elipsTop2')
      break;

  }
}
addTopAndBottomChair()

//////////////////////////////////////////////////////////////////
function addLeftAndRightChair() {

  let table = document.querySelector('.tableCenter')

  function removeTop(removeClass) {
    if (document.querySelector(removeClass)) {
      removeChair(removeClass) 
    }
  }
  function removeChair(leftClass) {
    const div = document.querySelector(leftClass)
    removed = div.parentNode.removeChild(div)
  }

  switch(true) {
    case (table.offsetHeight > 415 && table.offsetHeight <= 455) : 
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 375 && table.offsetHeight <= 415) : 
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 335 && table.offsetHeight <= 375) : 
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 295 && table.offsetHeight <= 335) : 
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 255 && table.offsetHeight <= 295) : 
      removeTop('.elipsLeft7')
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 215 && table.offsetHeight <= 255) : 
      removeTop('.elipsLeft6')
      removeTop('.elipsLeft7')
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 175 && table.offsetHeight <= 215) : 
      removeTop('.elipsLeft5')
      removeTop('.elipsLeft6')
      removeTop('.elipsLeft7')
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 135 && table.offsetHeight <= 175) : 
      removeTop('.elipsLeft4')
      removeTop('.elipsLeft5')
      removeTop('.elipsLeft6')
      removeTop('.elipsLeft7')
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight > 95 && table.offsetHeight <= 135) : 
      removeTop('.elipsLeft3')
      removeTop('.elipsLeft4')
      removeTop('.elipsLeft5')
      removeTop('.elipsLeft6')
      removeTop('.elipsLeft7')
      removeTop('.elipsLeft8')
      removeTop('.elipsLeft9')
      removeTop('.elipsLeft10')
      removeTop('.elipsLeft11')
      break;
    case (table.offsetHeight <= 95) :
      if (document.querySelector('.elipsLeft2')) {
        removeTop(".elipsLeft2")
        removeTop('.elipsLeft3')
        removeTop('.elipsLeft4')
        removeTop('.elipsLeft5')
        removeTop('.elipsLeft6')
        removeTop('.elipsLeft7')
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
      }
      break;
  }

  function addTop(addClass) {
    
    if(!document.querySelector(addClass) ){
      let divTop = document.createElement('div');
      divTop.classList.add('elipsLeft');
      divTop.classList.add('chair');
      divTop.classList.add(addClass.slice(1));
      table.appendChild(divTop)

      let divBottom = document.createElement('div');
      divBottom.classList.add('elipsRight');
      divBottom.classList.add('chair');
      divBottom.classList.add(addClass.slice(1));
      table.appendChild(divBottom)

    }
  }
  switch(true) {
    case (table.offsetHeight > 415) : 
      addTop('.elipsLeft10')
      addTop('.elipsLeft9')
      addTop('.elipsLeft8')
      addTop('.elipsLeft7')
      addTop('.elipsLeft6')
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 375 && table.offsetHeight <= 415) : 
      addTop('.elipsLeft9')
      addTop('.elipsLeft8')
      addTop('.elipsLeft7')
      addTop('.elipsLeft6')
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 335 && table.offsetHeight <= 375) : 
      addTop('.elipsLeft8')
      addTop('.elipsLeft7')
      addTop('.elipsLeft6')
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 295 && table.offsetHeight <= 335) : 
      addTop('.elipsLeft7')
      addTop('.elipsLeft6')
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 255 && table.offsetHeight <= 295) : 
      addTop('.elipsLeft6')
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 215 && table.offsetHeight <= 255) : 
      addTop('.elipsLeft5')
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 175 && table.offsetHeight <= 215) : 
      addTop('.elipsLeft4')
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 135 && table.offsetHeight <= 175) : 
      addTop('.elipsLeft3')
      addTop('.elipsLeft2')
      break;
    case (table.offsetHeight > 95) : 
      addTop('.elipsLeft2')
      break;

  }
}
addLeftAndRightChair()

//////////////////////////////////////////////////////////////

var chairs;
function onChangeColor() {
  chairs = document.querySelectorAll('.chair')
    chairs.forEach(item => {
      item.addEventListener('click', changeColorChair)
    })
}

function changeColorChair(e) {
  e.target.classList.toggle('elipsBgColored');
}

onChangeColor()

//////////////////////////////////////////////////
const table = document.querySelector('.resizerTablesTable')
table.addEventListener('mouseover', onTableOver)
table.addEventListener('mouseout', onTableOut)

function onTableOver() {
  const corners = document.querySelectorAll('.resizerTable')
  corners.forEach(item => {
    item.style.opacity = '1'
  })
}

function onTableOut() {
  const corners = document.querySelectorAll('.resizerTable')
  corners.forEach(item => {
    item.style.opacity = '0'
  })
}
//////////////////////////////////////////////////

const tableText = document.querySelector('.tebleTextP')
const tableInput = document.querySelector('.tableText__input')

tableText.addEventListener('dblclick', onTextChange)
console.log(tableText.innerHTML)

function onTextChange() {
  this.style.display = 'none'
  tableInput.style.display = 'block'
  tableInput.focus()
  tableInput.value = tableText.innerHTML
}

tableInput.addEventListener('blur', onInput)
// tableInput.addEventListener('mouseout', onInput)
tableInput.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    onInput()
  }
})

function onInput() {
  tableText.innerHTML = this.value || 'num';
  tableInput.style.display = 'none'
  tableText.style.display = 'block'
}