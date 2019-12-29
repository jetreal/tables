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

        addTopChair()
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
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          console.log('original_x: ', original_x)
          console.log('pageX: ', e.pageX)
          console.log('original_mouse_x: ', original_mouse_x)
        }
      }
      else if (currentresizerTable.classList.contains('top-right')) {
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
    case (table.offsetWidth < table.offsetHeight) : 
      line.style.width = '100%'
      line.style.height = '14px'
      line.style.borderRadius = '15px 15px 0 0'
      break;
    case (table.offsetWidth >= table.offsetHeight):
      line.style.width = '14px'
      line.style.height = '100%'
      line.style.borderRadius = '15px 0 0 15px'
    default: return
  }
}



function addTopChair() {

  let table = document.querySelector('.tableCenter')


  function onTop(addClass, removeClass) {
    if (document.querySelector(removeClass)) {
      removeChair(removeClass) 
    }
    if(!document.querySelector(addClass) ){
      let div = document.createElement('div');
      div.classList.add('elipsTop');
      div.classList.add(addClass.slice(1));
      table.appendChild(div)
    }
  }

  switch(true) {
    case (table.offsetWidth > 415 && table.offsetWidth <= 455) : 
      onTop('.elipsTop10', '.elipsTop11')
      break;
    case (table.offsetWidth > 375 && table.offsetWidth <= 415) : 
      onTop('.elipsTop9', '.elipsTop10')
      break;
    case (table.offsetWidth > 335 && table.offsetWidth <= 375) : 
      onTop('.elipsTop8', '.elipsTop9')
      break;
    case (table.offsetWidth > 295 && table.offsetWidth <= 335) : 
      onTop('.elipsTop7', '.elipsTop8')
      break;
    case (table.offsetWidth > 255 && table.offsetWidth <= 295) : 
      onTop('.elipsTop6', '.elipsTop7')
      break;
    case (table.offsetWidth > 215 && table.offsetWidth <= 255) : 
      onTop('.elipsTop5', '.elipsTop6')
      break;
    case (table.offsetWidth > 175 && table.offsetWidth <= 215) : 
      onTop('.elipsTop4', '.elipsTop5')
      break;
    case (table.offsetWidth > 135 && table.offsetWidth <= 175) : 
      onTop('.elipsTop3', '.elipsTop4')
      break;
    case (table.offsetWidth > 95 && table.offsetWidth <= 135) : 
      onTop('.elipsTop2', '.elipsTop3')
      break;
    case (table.offsetWidth <= 95) :
      if (document.querySelector('.elipsTop2')) {
        removeChair(".elipsTop2") 
      }
      break;
  }
}
addTopChair()


function removeChair(leftClass) {
  const div = document.querySelector(leftClass)
  removed = div.parentNode.removeChild(div)
}
