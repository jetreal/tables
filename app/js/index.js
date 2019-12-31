
  

// параметры 
var scrolled;
window.onscroll = function () {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
  document.getElementById('scroll').innerHTML = scrolled + 'px : scroll';

}
$(window).on('load resize', function () {
  var width = $('html').outerWidth();
  var height = $(window).height();
  $('#width').html(width + 'px : width');
  $('#height').html(height + 'px : height');
});

document.onmousemove = function (e) {
  var X = e.pageX;
  var Y = e.pageY;
  document.getElementById('mouseX').innerHTML = X + ': mouseX'
  document.getElementById('mouseY').innerHTML = Y + ': mouseY'

}

///////////////////////////////////////////////////////////////////////////////////


/*Make resizable div by Hung Nguyen*/  // and restrict to center by me //


function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function (e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.offsetLeft; // .offsetLeft changed  <==> .getBoundingClientRect().left   if need absolute
      original_y = element.offsetTop;  // .offsetTop changed  <==> .getBoundingClientRect().top
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {

      if (currentResizer.classList.contains('bottom-right')) {

        getParentCenter()
        getCornerCoords()
        getMaxRangeItem()
 

        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)

        function dropResizeRight() {
          element.style.width = (width + 3) + 'px'
          // element.style.left = (original_x + 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          // element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 10) {
          dropResizeRight()
          return
        }
        
        if (maxAboutHeight > height - 10) {
          dropResizeBottom()
          return
        }

        if (
          wrapperWidth - draggedMap.offsetWidth > sumPosAndTranslLeft
        ) {
          element.style.width = (width + 10) + 'px'
          // element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        if (
          wrapperHeight - draggedMap.offsetHeight > sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          // element.style.top = (original_y + 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }

        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        getParentCenter()
        getCornerCoords()
        getMaxRangeItem()
 

        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)

        function dropResizeRight() {
          element.style.width = (width + 3) + 'px'
          element.style.left = (original_x - 3) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          // element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 10) {
          dropResizeRight()
          return
        }
        
        if (maxAboutHeight > height - 10) {
          dropResizeBottom()
          return
        }

        if (
          sumPosAndTranslLeft > wrapperWidth
        ) {
          element.style.width = (width + 10) + 'px'
          element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        if (
          wrapperHeight - draggedMap.offsetHeight > sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          element.style.top = (original_y + 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }

        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'

        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        getParentCenter()
        getCornerCoords()
        getMaxRangeItem()

        function dropResizeRight() {
          element.style.width = (width + 3) + 'px'
          // element.style.left = (original_x + 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          element.style.top = (original_y - 3) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
        }

        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)

        if (maxAboutWidth > width - 10) {
          dropResizeRight()
          return
        }

        if (maxAboutHeight > height - 10) {
          dropResizeBottom()
          return
        }

        if (
          wrapperWidth - draggedMap.offsetWidth > sumPosAndTranslLeft
        ) {
          dropResizeRight()
          return
        }


        if (
          wrapperHeight < sumPosAndTranslTop
        ) {
          dropResizeBottom()
          return
        }

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
        
        getParentCenter()
        getCornerCoords()
        getMaxRangeItem()

        function dropResizeRight() {
          element.style.width = (width + 3) + 'px'
          element.style.left = (original_x - 3) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          element.style.top = (original_y - 3) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 10) {
          dropResizeRight()
          return
        }
        
        if (maxAboutHeight > height - 10) {
          dropResizeBottom()
          return
        }

        if (
          sumPosAndTranslLeft > wrapperWidth
        ) {
          element.style.width = (width + 10) + 'px'
          element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
          return
        }
        if (
          wrapperHeight < sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем
          return
        }

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
makeResizableDiv('.resizable')

///////////////////////////////////////////

const btnTable = document.querySelector( '.j-wrap-content-sidebar__add-table-btn' );
const wrapperDraggerMap = document.querySelector('.j-wrap-content-map');
const draggedMap = document.querySelector('.draggedMap');
const mapConner = document.querySelectorAll('.resizer');
const addTableBtn = document.querySelector('.j-wrap-content-sidebar__add-table-btn');
let boxItems = document.querySelectorAll( '.box-item' );
const targetElement = document.querySelector( '.draggable-item--uno')

mapConner.forEach(item => {

  item.addEventListener('mouseover', function () {
    Draggable.get(draggedMap).disable()
  })
})

mapConner.forEach(item => {
  item.addEventListener('mouseout', dragMap)
})


function onDragRestrictMap() {
  getParentCenter()
  getCornerCoords()

  let x, y;
  switch (true) {
    case (wrapperWidth < sumPosAndTranslLeft): {
      Draggable.get(draggedMap).endDrag();
      x = Draggable.get(draggedMap).x
      y = Draggable.get(draggedMap).y
      TweenLite.set(this.target, { x: (x - 20), y: y })
    }
      break;
    case (wrapperHeight < sumPosAndTranslTop): {
      Draggable.get(draggedMap).endDrag();
      x = Draggable.get(draggedMap).x
      y = Draggable.get(draggedMap).y
      TweenLite.set(this.target, { x: x, y: (y - 20) })
    }
      break;
    case (wrapperWidth - draggedMap.offsetWidth > sumPosAndTranslLeft): {
      Draggable.get(draggedMap).endDrag();
      x = Draggable.get(draggedMap).x
      y = Draggable.get(draggedMap).y
      TweenLite.set(this.target, { x: (x + 20), y: y })
    }
      break;
    case (wrapperHeight - draggedMap.offsetHeight > sumPosAndTranslTop): {
      Draggable.get(draggedMap).endDrag();
      x = Draggable.get(draggedMap).x
      y = Draggable.get(draggedMap).y
      TweenLite.set(this.target, { x: x, y: (y + 20) })
    }
      break;
    default: return
  }
}

// для перетаскивания карты
var mapDraggble;
function dragMap() {
  mapDraggble = Draggable.create(draggedMap, {
    onDrag: onDragRestrictMap,
  })[0]
}
dragMap()


// ширина и высота родителя  (вычисления центра)
let wrapperWidth;
let wrapperHeight;
function getParentCenter() {
  wrapperWidth = parseFloat(getComputedStyle(wrapperDraggerMap, null).getPropertyValue('width').replace('px', '')) / 2;
  wrapperHeight = parseFloat(getComputedStyle(wrapperDraggerMap, null).getPropertyValue('height').replace('px', '')) / 2;
  // console.log('wrapperWidth / 2: ', wrapperWidth,'wrapperHeight / 2: ', wrapperHeight)
}


// let itemTranslateLeft;
// let itemTranslateTop;
// let itemWidth;
// let itemHeight;

// let maxItemWidth;
// let maxItemHeight;


// function getItemCoords() {
//   itemWidth = targetElement.offsetWidth
//   itemHeight = targetElement.offsetHeight
//   const itemTransform = targetElement.style.transform || 'translate(0px, 0px)';
//   itemTranslateLeft = getTranslateXValue(itemTransform);
//   itemTranslateTop = getTranslateYValue(itemTransform);

// }

let itemCoords; // array с со всеми столами

function getAllItemCoords() {
  itemCoords = []
  boxItems.forEach((item, index) => {

    let oneItem = {}
    oneItem.id = item.id
    const itemTransform = item.style.transform || 'translate(0px, 0px)';
    oneItem.itemTranslateLeft = getTranslateXValue(itemTransform)
    oneItem.itemTranslateTop = getTranslateYValue(itemTransform)
    oneItem.itemWidth = item.offsetWidth
    oneItem.itemHeight = item.offsetHeight
    oneItem.positionLeft = item.offsetLeft
    oneItem.positiaddTop = item.offsetTop

    itemCoords = [...itemCoords, oneItem ]
    // console.log(itemCoords)
  })
}
getAllItemCoords()


let maxAboutWidth = 0
let maxAboutHeight = 0
function getMaxRangeItem() {
  getAllItemCoords()
  const widthArr = []   
  const heightArr = []
  itemCoords.forEach(item => {
    let sumleft = item.itemTranslateLeft + item.positionLeft + item.itemWidth
    let sumtop = item.itemTranslateTop + item.positiaddTop + item.itemHeight

    widthArr.push(sumleft)
    let maxLeft = Math.max(...widthArr)

    heightArr.push(sumtop)
    let maxTop = Math.max(...heightArr)

    // console.log(widthArr)
    // console.log(maxLeft)
    maxAboutWidth = maxLeft
    maxAboutHeight = maxTop
    // console.log(maxAboutHeight)
    
  })
}
getMaxRangeItem()

let sumPosAndTranslLeft;
let sumPosAndTranslTop;
let posLeft;
let posTop;
function getTranslateXValue(translateString) {
  // debugger
  var n = translateString.indexOf("(");
  var n1 = translateString.indexOf(",");

  var res = parseInt(translateString.slice(n + 1, n1 - 2));

  return res;

}
function getTranslateYValue(translateString) {

  var n = translateString.indexOf(",");
  var n1 = translateString.indexOf(")");

  var res = parseInt(translateString.slice(n + 1, n1 - 1));
  return res;

}

// вычисление координат углов карты
function getCornerCoords() {
  posLeft = draggedMap.offsetLeft; // координата position , без транслейт  
  posTop = draggedMap.offsetTop;
  const transform = draggedMap.style.transform || 'translate(0px, 0px)';

  let x = getTranslateXValue(transform)  // координата транслейта
  let y = getTranslateYValue(transform)

  sumPosAndTranslLeft = x + posLeft   // сумма координат транслейта и position
  sumPosAndTranslTop = y + posTop
}

getParentCenter()
getCornerCoords()
// draggable()

//////////////////////////////////////////////////////

// перетаскивание item'ov
var draggableCollection;
function draggable() {
  draggableCollection = Draggable.create( boxItems, {
    bounds: draggedMap,
    cursor: 'pointer',
    type: 'x, y',
    inertia: true,

    onPress: onPress,
    onRelease: onRelease,
    onDragStart: onStart,
    onDragEnd: function () {
      
      boxItems.forEach(item => {
        item.style.color = 'blue'
        item.style.pointerEvents = 'auto'
      })
 /////////////////////////////////////////

      boxItems.forEach(item => {
        if (this.hitTest(item)) {
          TweenMax.to(this.target, .1, {
            x: xx,
            y: yy
            // rotate: 90
          });
        }
      })
    }
  })
}
draggable()


var xx = 0;
var yy = 0;
function onPress() {
  xx = this.x;
  yy = this.y;

const tlPress = new TimelineMax();
tlPress.to( this.target, 0.1, {
  borderColor: 'white',
  borderWidth: 6,
  ease: Power4.easeIn
})
}
// -------------------------------------
function onStart() {

  mapDraggble.disable();
  boxItems.forEach(item => {
    item.style.color = 'red'
    item.style.pointerEvents = 'none'
  })
  const tlPress = new TimelineMax();
  tlPress.to( this.target, 0.1, {
    opacity: 1,
    borderColor: '#828282',
    borderWidth: 2,
    ease: Power4.easeIn
  })
}
// ---------------------------------
function onRelease() {
  getMaxRangeItem()
  mapDraggble.enable();
  
  const tlPress = new TimelineMax();
  tlPress.to(this.target, 0.1, {
    // borderColor: 'green',
    borderWidth: 3,
    ease: Power4.easeIn,
  })
  getAllItemCoords()
}


/////////////////////////////////////////////////////////////
  // создание стола

btnTable.addEventListener('click', function() {
  // создание обвёртки
  const div = document.createElement('div');
  div.classList.add('box-item');
  div.classList.add('draggable-item');
  div.classList.add('resizableTable');
  div.id = Date.now()
  // врутринности ресайзер и уголки
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('resizerTablesTable');
  div.appendChild(innerDiv)

  const corner1 = document.createElement('div');
  corner1.classList.add('resizerTable', 'top-left');
  const corner2 = document.createElement('div');
  corner2.classList.add('resizerTable', 'top-right');
  const corner3 = document.createElement('div');
  corner3.classList.add('resizerTable', 'bottom-left');
  const corner4 = document.createElement('div');
  corner4.classList.add('resizerTable', 'bottom-right');
 
  innerDiv.appendChild(corner1)
  innerDiv.appendChild(corner2)
  innerDiv.appendChild(corner3)
  innerDiv.appendChild(corner4)

  // сам стол
  const table = document.createElement('div');
  table.classList.add('tableCenter');
  div.appendChild(table)
  // линия стола
  const line = document.createElement('div');
  line.classList.add('tableCenter-line');
  table.appendChild(line)
  // удалялка 
  const tableDel = document.createElement('div');
  tableDel.innerHTML = "x";
  tableDel.classList.add('tableCenter-del');
  table.appendChild(tableDel)
  // text
  const tableTextDiv = document.createElement('div');
  tableTextDiv.classList.add('tableText');
  const tableText = document.createElement('p');
  tableText.innerHTML = 'text'
  tableText.classList.add('tebleTextP');
  tableTextDiv.appendChild(tableText)
  table.appendChild(tableTextDiv)
  // input
  const tableInput = document.createElement('input');
  tableInput.classList.add('tableText__input');
  tableInput.type = 'text'
  tableInput.name = 'tableText'
  tableInput.value = ''
  table.appendChild(tableInput)
  // стулья
  const chairTop = document.createElement('div');
  chairTop.classList.add('chair', 'elipsTop');
  const chairBottom = document.createElement('div');
  chairBottom.classList.add('chair', 'elipsBottom');
  const chairLeft = document.createElement('div');
  chairLeft.classList.add('chair', 'elipsLeft');
  const chairRight = document.createElement('div');
  chairRight.classList.add('chair', 'elipsRight');
  table.appendChild(chairTop)
  table.appendChild(chairBottom)
  table.appendChild(chairLeft)
  table.appendChild(chairRight)
  // логика удалялки 
  let removed;
  tableDel.addEventListener('click', function() {
    removed = div.parentNode.removeChild(div)
    console.log(removed)
    itemCoords = itemCoords.filter(item => item.id != removed.id)
    boxItems = document.querySelectorAll( '.box-item' );
    console.log(itemCoords)

  })
  draggedMap.appendChild(div)
  // oбновеление коллекции
  boxItems = document.querySelectorAll( '.box-item' );
  draggable()
  getAllItemCoords()
  
})



/////////////////////////////////////////////////////////////////
// логика стола
///////////////////////////////////////////////////////////////
function dragTableDisable() {
  mapDraggble.disable();
  draggableCollection.forEach(item => {
    item.disable()
  })
}

function dragTableEnable() {
  mapDraggble.enable();
  draggableCollection.forEach(item => {
    item.enable()
  })
}

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
      dragTableDisable()
      
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
      e.stopPropagation()
      e.stopImmediatePropagation()
      
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
// Добавление стульев

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

// let corners = document.querySelectorAll('.resizerTable')
function onTableOver() {
  const corners = document.querySelectorAll('.resizerTable')
  corners.forEach(item => {
    item.style.opacity = '1'
  })

  dragTableDisable()
}

function onTableOut() {
  const corners = document.querySelectorAll('.resizerTable')
  corners.forEach(item => {
    item.style.opacity = '0'
  })

  dragTableEnable()
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

///////////////////////////////////////////////////
// var tableCornerDraggble;
// function dragCorner() {
//   const corners = document.querySelectorAll('.resizerTable')

//   tableCornerDraggble = Draggable.create(corners, {
//     onPress:function(e){e.stopPropagation()},

//     onRelease: function() {
//       draggableCollection.forEach(item => {
//         item.enable()
//       })
      
//     },
//     onDragStart: function() {
//       draggableCollection.forEach(item => {
//         item.disable()
//       })
//     },
//   })[0]
// }
// dragCorner()
