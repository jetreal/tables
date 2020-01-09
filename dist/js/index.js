


// параметры скролла
var scrolled;
windowItem.onscroll = function () {
  scrolled = windowItem.pageYOffset || document.documentElement.scrollTop;
  document.getElementById('scroll').innerHTML = scrolled + 'px : scroll';

}
// ширина, высота окна
$(windowItem).on('load resize', function () {
  var width = $('html').outerWidth();
  var height = $(windowItem).height();
  $('#width').html(width + 'px : width');
  $('#height').html(height + 'px : height');
});
// координаты мыши
document.onmousemove = function (e) {
  var X = e.pageX;
  var Y = e.pageY;
  document.getElementById('mouseX').innerHTML = X + ': mouseX'
  document.getElementById('mouseY').innerHTML = Y + ': mouseY'
}

///////////////////////////////////////////////////////////////////////////////////


/*Make resizable div by Hung Nguyen*/  // and restrict to center by me //

// функция ресайза карты
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
      windowItem.addEventListener('mousemove', resize)
      windowItem.addEventListener('mouseup', stopResize)
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
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          // element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          windowItem.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 40) {
          dropResizeRight()
          return
        }

        if (maxAboutHeight > height - 40) {
          dropResizeBottom()
          return
        }

        if (
          wrapperWidth - draggedMap.offsetWidth > sumPosAndTranslLeft
        ) {
          element.style.width = (width + 10) + 'px'
          // element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        if (
          wrapperHeight - draggedMap.offsetHeight > sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          // element.style.top = (original_y + 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); //имитируем 
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
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          // element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          windowItem.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 40) {
          dropResizeRight()
          return
        }

        if (maxAboutHeight > height - 40) {
          dropResizeBottom()
          return
        }

        if (
          sumPosAndTranslLeft > wrapperWidth
        ) {
          element.style.width = (width + 10) + 'px'
          element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        if (
          wrapperHeight - draggedMap.offsetHeight > sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          element.style.top = (original_y + 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); //имитируем 
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
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          element.style.top = (original_y - 3) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          windowItem.dispatchEvent(clickEvent); // имитируем 
        }

        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)

        if (maxAboutWidth > width - 40) {
          dropResizeRight()
          return
        }

        if (maxAboutHeight > height - 40) {
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
          windowItem.dispatchEvent(clickEvent); //имитируем 
          return
        }
        function dropResizeBottom() {
          element.style.height = (height + 3) + 'px'
          element.style.top = (original_y - 3) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          windowItem.dispatchEvent(clickEvent); // имитируем 
        }

        if (maxAboutWidth > width - 40) {
          dropResizeRight()
          return
        }

        if (maxAboutHeight > height - 40) {
          dropResizeBottom()
          return
        }

        if (
          sumPosAndTranslLeft > wrapperWidth
        ) {
          element.style.width = (width + 10) + 'px'
          element.style.left = (original_x - 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); // имитируем 
          return
        }
        if (
          wrapperHeight < sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          windowItem.dispatchEvent(clickEvent); //имитируем
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
      windowItem.removeEventListener('mousemove', resize)
    }
  }
}
makeResizableDiv('.resizable')

///////////////////////////////////////////

const btnTable = document.querySelector('.j-wrap-content-sidebar__add-table-btn');
const wrapperDraggerMap = document.querySelector('.j-wrap-content-map');
const draggedMap = document.querySelector('.draggedMap');
const restricter = document.querySelector('.resizable__restricter');
const restricterTop = document.querySelector('.resizable-wall__restricter');
const resizers = document.querySelector('.resizers');
const mapConner = document.querySelectorAll('.resizer');
let sides = document.querySelectorAll('.resizerwindowItem');
const addTableBtn = document.querySelector('.j-wrap-content-sidebar__add-table-btn');
let boxItems = document.querySelectorAll('.box-item');
let tableDraggables = document.querySelectorAll('.draggable-item');
const targetElement = document.querySelector('.draggable-item--uno')

// отключение перетаскивания карты при наведение на уголки карты
function disableDragMap(corners) {
  corners.forEach(item => {
    item.addEventListener('mouseover', function () {
      Draggable.get(draggedMap).disable()
    })
  })
  mapConner.forEach(item => {
    item.addEventListener('mouseout', dragMap)
  })

  // dragDisable(sides)
}
disableDragMap(mapConner)
// disableDragMap(sides)

// ограничение карты до центра
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

// объект для перетаскивания карты с ограничением до центра
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

let itemCoords; // array с размерами и координатами всех столов

function getAllItemCoords(arr) {
  itemCoords = []
  arr.forEach((item, index) => {

    let oneItem = {}
    oneItem.id = item.id
    const itemTransform = item.style.transform || 'translate(0px, 0px)';
    oneItem.itemTranslateLeft = getTranslateXValue(itemTransform)
    oneItem.itemTranslateTop = getTranslateYValue(itemTransform)
    oneItem.itemWidth = item.offsetWidth
    oneItem.itemHeight = item.offsetHeight
    oneItem.positionLeft = item.offsetLeft
    oneItem.positionTop = item.offsetTop

    itemCoords = [...itemCoords, oneItem]
    console.log(itemCoords)
   
  })
  return itemCoords
}
itemCoords = getAllItemCoords(boxItems)
console.log(itemCoords)


// функция вычислени ограничение карты при столкновении со столом
let maxAboutWidth = 0
let maxAboutHeight = 0
function getMaxRangeItem() {
  itemCoords = getAllItemCoords(boxItems)
  const widthArr = []
  const heightArr = []
  itemCoords.forEach(item => {
    let sumleft = item.itemTranslateLeft + item.positionLeft + item.itemWidth
    let sumtop = item.itemTranslateTop + item.positionTop + item.itemHeight

    widthArr.push(sumleft)
    let maxLeft = Math.max(...widthArr)

    heightArr.push(sumtop)
    let maxTop = Math.max(...heightArr)

    maxAboutWidth = maxLeft
    maxAboutHeight = maxTop

  })
}
getMaxRangeItem()

// вычисление координат сторон карты
let sumPosAndTranslLeft;
let sumPosAndTranslTop;
function getCornerCoords() {
  let posLeft = draggedMap.offsetLeft; // координата position , без транслейт  
  let posTop = draggedMap.offsetTop;
  const transform = draggedMap.style.transform || 'translate(0px, 0px)';

  let x = getTranslateXValue(transform)  // координата транслейта
  let y = getTranslateYValue(transform)

  sumPosAndTranslLeft = x + posLeft   // сумма координат транслейта и position
  sumPosAndTranslTop = y + posTop
}
getCornerCoords()

// парсинг данных css translate на 2 переменные
function getTranslateXValue(translateString) {
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


//////////////////////////////////////////////////////

// перетаскивание item'ov (столов)
var draggableCollection;
function draggable() {
  draggableCollection = Draggable.create(tableDraggables, {
    bounds: restricter,
    cursor: 'pointer',
    type: 'x, y',
    // inertia: true,
    onPress: onPress,
    onRelease: onRelease,
    onDragStart: onStart,
    onDragEnd: function () {
      console.log(this)
      tableDraggables.forEach(item => {
        item.style.color = 'blue'
        item.style.pointerEvents = 'auto'


      })
      /////////////////////////////////////////
      // Действие при столкновении столов
      tableDraggables.forEach(item => {
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
// вычисление стартовых координат стола по которому кликнули
function onPress() {
  xx = this.x;
  yy = this.y;

  const tlPress = new TimelineMax(); // для примера что можно создать объект анимации
  tlPress.to(this.target, 0.1, {
    scale: 1,
    opacity: 1,
    // zIndex: 1000,
    ease: Power4.easeIn

  })

  if (this.target.style.opacity < 1) {
    btnTable.addEventListener('click', onCreateTable)
    buttonForTextItem.addEventListener('click', onCreateItem)
  }
}
// -------------------------------------

function onStart() {
  mapDraggble.disable();   // отключение перетаскивания самой карты
  tableDraggables.forEach(item => {
    item.style.pointerEvents = 'none'
  })
  const tlPress = new TimelineMax();
  tlPress.to(this.target, 0.1, {
    opacity: 1

    // ease: Power4.easeIn
  })
}
// ---------------------------------
function onRelease() {
  getMaxRangeItem()  // обновление координат
  itemCoords = getAllItemCoords(boxItems)
  mapDraggble.enable();  // включение перетаскивания самой карты
  // const tlPress = new TimelineMax();
  // tlPress.to(this.target, 0.1, {
  //   // borderColor: 'green',
  //   borderWidth: 3,
  //   ease: Power4.easeIn,
  // })
}


/////////////////////////////////////////////////////////////
// создание стола

btnTable.addEventListener('click', onCreateTable)

function onCreateTable() {

  // создание обвёртки
  const div = document.createElement('div');
  const divId = div.id = 'id' + Date.now()
  console.log(divId)
  div.classList.add(divId);
  div.classList.add('box-item');
  div.classList.add('any-map-item');
  div.classList.add('draggable-item');
  div.classList.add('resizableTable');
  // врутренности ресайзер и уголки
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
  tableDel.addEventListener('click', function () {
    removed = div.parentNode.removeChild(div)
    console.log(removed)
    itemCoords = itemCoords.filter(item => item.id != removed.id)
    boxItems = document.querySelectorAll('.box-item');
    tableDraggables = document.querySelectorAll('.draggable-item');
    
    console.log(itemCoords)
  })

  resizers.appendChild(div)
  // draggedMap.appendChild(div)
  // oбновеление коллекции

  corners = document.querySelectorAll('.resizerTable')
  boxItems = document.querySelectorAll('.box-item');
  tableDraggables = document.querySelectorAll('.draggable-item');
  itemCoords = getAllItemCoords(boxItems) // обновление массива с координатами столов
  onChangeColor('.' + divId)  // обновление коллекции стульев
  disableDraggableParent()
  tables = document.querySelectorAll('.resizerTablesTable')
  replaceLine('.' + divId)


  draggable()   // добавление нового стола в объект с перетаскиванием.
  makeresizableTableDiv('.' + divId)
  // tableTexts = document.querySelectorAll('.tebleTextP') // обновление текска стола с инпутами
  inputsHandler('.' + divId)
  onConflictItemsWithOther()
  onShowTableAnimation('.' + divId)

  buttonForTextItem.removeEventListener('click', onCreateItem)
  btnTable.removeEventListener('click', onCreateTable)
}



/////////////////////////////////////////////////////////////////
// логика стола
///////////////////////////////////////////////////////////////



/*Make resizableTable div by Hung Nguyen*/

// resize столов и всё что должно быть при ресайзе
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
  for (let i = 0; i < resizerTablesTable.length; i++) {
    const currentresizerTable = resizerTablesTable[i];
    currentresizerTable.addEventListener('mousedown', function (e) {
      e.preventDefault()

      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.offsetLeft; // .offsetLeft changed  <==> .getBoundingClientRect().left
      original_y = element.offsetTop;  // .offsetTop changed  <==> .getBoundingClientRect().top
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      windowItem.addEventListener('mousemove', resize)
      windowItem.addEventListener('mouseup', stopResize)
    })


    function resize(e) {

      if (currentresizerTable.classList.contains('bottom-right')) {

        addTopAndBottomChair(div)
        addLeftAndRightChair(div)

        replaceLine(div)

        onChangeColor()
        onConflictItemWithMap(div)
        onConflictItemsWithOther(div)
        // логика resize стола 
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
        addTopAndBottomChair(div)
        addLeftAndRightChair(div)
        replaceLine(div)

        onChangeColor()
        onConflictItemWithMap(div)
        onConflictItemsWithOther(div)

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
        addTopAndBottomChair(div)
        addLeftAndRightChair(div)
        replaceLine(div)
        onChangeColor()
        onConflictItemWithMap(div)
        onConflictItemsWithOther(div)

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
        addTopAndBottomChair(div)
        addLeftAndRightChair(div)
        replaceLine(div)
        onChangeColor()
        onConflictItemWithMap(div)
        onConflictItemsWithOther(div)


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
      windowItem.removeEventListener('mousemove', resize)

    }
  }
}


makeresizableTableDiv('.resizableTable')


////////////////////////////////////////////

// перемещение линии
function replaceLine(cl) {
  const table = document.querySelector(cl)
  // console.log(table.offsetHeight)

  const line = document.querySelector(`${cl} .tableCenter-line`)
  if (line) {
    switch (true) {
      case (table.offsetWidth <= table.offsetHeight):
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
}
////////////////////////////////////////////////////

// Добавление стульев сверху и снизу
function addTopAndBottomChair(el) {

  const table = document.querySelector(el + ' .tableCenter')
  if (table.firstChild.classList.contains('tableCenter-line')) {

    function removeTop(removeClass) {
      removeChair(removeClass)
    }
    function removeChair(leftClass) {
      const div = document.querySelector(el + ' ' + leftClass)
      if (!!div) {
        removed = div.parentNode.removeChild(div)
      }
    }

    switch (true) {
      case (table.offsetWidth > 415 && table.offsetWidth <= 455):
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 375 && table.offsetWidth <= 415):
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 335 && table.offsetWidth <= 375):
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 295 && table.offsetWidth <= 335):
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 255 && table.offsetWidth <= 295):
        removeTop('.elipsTop7')
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 215 && table.offsetWidth <= 255):
        removeTop('.elipsTop6')
        removeTop('.elipsTop7')
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 175 && table.offsetWidth <= 215):
        removeTop('.elipsTop5')
        removeTop('.elipsTop6')
        removeTop('.elipsTop7')
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 135 && table.offsetWidth <= 175):
        removeTop('.elipsTop4')
        removeTop('.elipsTop5')
        removeTop('.elipsTop6')
        removeTop('.elipsTop7')
        removeTop('.elipsTop8')
        removeTop('.elipsTop9')
        removeTop('.elipsTop10')
        removeTop('.elipsTop11')
        break;
      case (table.offsetWidth > 95 && table.offsetWidth <= 135):
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
      case (table.offsetWidth <= 95):
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
      const div = document.querySelector(el + ' ' + addClass)


      if (!div) {
        let chairTop = document.createElement('div');
        chairTop.classList.add('elipsTop');
        chairTop.classList.add('chair');
        chairTop.classList.add(addClass.slice(1));
        table.appendChild(chairTop)

        let chairBottom = document.createElement('div');
        chairBottom.classList.add('elipsBottom');
        chairBottom.classList.add('chair');
        chairBottom.classList.add(addClass.slice(1));
        table.appendChild(chairBottom)

      }
    }
    switch (true) {
      case (table.offsetWidth > 415):
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
      case (table.offsetWidth > 375 && table.offsetWidth <= 415):
        addTop('.elipsTop9')
        addTop('.elipsTop8')
        addTop('.elipsTop7')
        addTop('.elipsTop6')
        addTop('.elipsTop5')
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 335 && table.offsetWidth <= 375):
        addTop('.elipsTop8')
        addTop('.elipsTop7')
        addTop('.elipsTop6')
        addTop('.elipsTop5')
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 295 && table.offsetWidth <= 335):
        addTop('.elipsTop7')
        addTop('.elipsTop6')
        addTop('.elipsTop5')
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 255 && table.offsetWidth <= 295):
        addTop('.elipsTop6')
        addTop('.elipsTop5')
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 215 && table.offsetWidth <= 255):
        addTop('.elipsTop5')
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 175 && table.offsetWidth <= 215):
        addTop('.elipsTop4')
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 135 && table.offsetWidth <= 175):
        addTop('.elipsTop3')
        addTop('.elipsTop2')
        break;
      case (table.offsetWidth > 95 && table.offsetWidth <= 135):
        addTop('.elipsTop2')
        break;

    }
  }

}

//////////////////////////////////////////////////////////////////
function addLeftAndRightChair(el) {

  const table = document.querySelector(el + ' .tableCenter')
  if (table.firstChild.classList.contains('tableCenter-line')) {
    function removeTop(removeClass) {

      removeChair(removeClass)
    }
    function removeChair(leftClass) {
      const div = document.querySelector(el + ' ' + leftClass)
      if (!!div) {
        removed = div.parentNode.removeChild(div)
      }
    }

    switch (true) {
      case (table.offsetHeight > 415 && table.offsetHeight <= 455):
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 375 && table.offsetHeight <= 415):
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 335 && table.offsetHeight <= 375):
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 295 && table.offsetHeight <= 335):
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 255 && table.offsetHeight <= 295):
        removeTop('.elipsLeft7')
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 215 && table.offsetHeight <= 255):
        removeTop('.elipsLeft6')
        removeTop('.elipsLeft7')
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 175 && table.offsetHeight <= 215):
        removeTop('.elipsLeft5')
        removeTop('.elipsLeft6')
        removeTop('.elipsLeft7')
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 135 && table.offsetHeight <= 175):
        removeTop('.elipsLeft4')
        removeTop('.elipsLeft5')
        removeTop('.elipsLeft6')
        removeTop('.elipsLeft7')
        removeTop('.elipsLeft8')
        removeTop('.elipsLeft9')
        removeTop('.elipsLeft10')
        removeTop('.elipsLeft11')
        break;
      case (table.offsetHeight > 95 && table.offsetHeight <= 135):
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
      case (table.offsetHeight <= 95):
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
      const div = document.querySelector(el + ' ' + addClass)
      if (!div) {
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
    switch (true) {
      case (table.offsetHeight > 415):
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
      case (table.offsetHeight > 375 && table.offsetHeight <= 415):
        addTop('.elipsLeft9')
        addTop('.elipsLeft8')
        addTop('.elipsLeft7')
        addTop('.elipsLeft6')
        addTop('.elipsLeft5')
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 335 && table.offsetHeight <= 375):
        addTop('.elipsLeft8')
        addTop('.elipsLeft7')
        addTop('.elipsLeft6')
        addTop('.elipsLeft5')
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 295 && table.offsetHeight <= 335):
        addTop('.elipsLeft7')
        addTop('.elipsLeft6')
        addTop('.elipsLeft5')
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 255 && table.offsetHeight <= 295):
        addTop('.elipsLeft6')
        addTop('.elipsLeft5')
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 215 && table.offsetHeight <= 255):
        addTop('.elipsLeft5')
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 175 && table.offsetHeight <= 215):
        addTop('.elipsLeft4')
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 135 && table.offsetHeight <= 175):
        addTop('.elipsLeft3')
        addTop('.elipsLeft2')
        break;
      case (table.offsetHeight > 95):
        addTop('.elipsLeft2')
        break;

    }
  }
}
// addLeftAndRightChair()

//////////////////////////////////////////////////////////////
// изменение цвета выбранного стула
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

// onChangeColor()

//////////////////////////////////////////////////

function disableDraggableParent() {
  const tables = document.querySelectorAll('.resizerTablesTable')
  tables.forEach(item => {
    item.addEventListener('mouseover', onTableOver)
    item.addEventListener('mouseout', onTableOut)

    function onTableOver() {
      const corners = document.querySelectorAll('.resizerTable')

      corners.forEach(item => {
        this.style.opacity = '1'
      })

      dragDisable(mapDraggble, draggableCollection)
    }
    function onTableOut() {
      const corners = document.querySelectorAll('.resizerTable')
      corners.forEach(item => {
        this.style.opacity = '0'
      })

      dragEnable(mapDraggble, draggableCollection)
    }
  })

}
disableDraggableParent()

// функции отключения перетаскивания карты и столов
function dragDisable(map, collection) {
  map.disable();

  collection.forEach(item => {
    item.disable()
  })
}
function dragEnable(map, collection) {
  map.enable();

  collection.forEach(item => {
    item.enable()
  })
}
//////////////////////////////////////////////////

function inputsHandler(el) {

  let tableText = document.querySelector(el + ' .tebleTextP')

  const tableInput = document.querySelector(el + ' .tableText__input')

  tableText.addEventListener('dblclick', onTextChange)

  function onTextChange() {
    // console.log('tableTexts: ', tableTexts)           
    this.style.display = 'none'
    tableInput.style.display = 'block'
    tableInput.focus()
    tableInput.value = tableText.innerHTML

    tableInput.addEventListener('blur', onInput)
    // tableInput.addEventListener('mouseout', onInput)
    tableInput.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        onInput()
      }
    })

    function onInput() {
      tableText.innerHTML = this.value || 'num';
      tableInput.style.display = 'none'
      tableText.style.display = 'block'
    }

  }
}
///////////////////////////////////////////////////
// logic on conflict items


function onConflictItemWithMap(el) {
  // const allItems = document.querySelectorAll('.any-map-item')
  const item = document.querySelector(el)
  // console.log(el)
  if (item) {
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;
    let sumPosAndTranslLeft;
    let sumPosAndTranslTop;
    let stopPointRight;
    let stopPointBottom;
    let stopPointLeft;
    let stopPointTop;

    const width = draggedMap.offsetWidth
    const height = draggedMap.offsetHeight
    // const width = original_width - (e.pageX - original_mouse_x)
    // const height = original_height - (e.pageY - original_mouse_y)

    function getCornerCoords() {
      let posLeft = item.offsetLeft; // координата position , без транслейт  
      let posTop = item.offsetTop;
      const transform = item.style.transform || 'translate(0px, 0px)';

      let x = getTranslateXValue(transform)  // координата транслейта
      let y = getTranslateYValue(transform)

      sumPosAndTranslLeft = x + posLeft   // сумма координат транслейта и position
      sumPosAndTranslTop = y + posTop
    }
    getCornerCoords()

    function dropOnRightMap() {

      if (itemWidth + sumPosAndTranslLeft > width - 40) {
        var clickEvent = new Event('mouseup'); //создаем событие
        windowItem.dispatchEvent(clickEvent); //имитируем 
        stopPointRight = sumPosAndTranslLeft;
        item.style.maxWidth = (itemWidth - 7) + 'px'
      }
      if (stopPointRight !== sumPosAndTranslLeft) {
        item.style.maxWidth = ''
      }
    }
    dropOnRightMap()

    function dropOnBottomMap() {
      if (itemHeight + sumPosAndTranslTop > height - 40) {
        var clickEvent = new Event('mouseup'); //создаем событие
        windowItem.dispatchEvent(clickEvent); //имитируем 
        stopPointBottom = sumPosAndTranslTop;
        item.style.maxHeight = (itemHeight - 7) + 'px'
      }
      if (stopPointBottom !== sumPosAndTranslTop) {
        item.style.maxHeight = ''
      }
    }
    dropOnBottomMap()

    function dropOnLeftMap() {
      if (sumPosAndTranslLeft < 45) {
        var clickEvent = new Event('mouseup'); //создаем событие
        windowItem.dispatchEvent(clickEvent); //имитируем 
        item.style.maxWidth = (width - 10) + 'px'
        stopPointRight = item.style.width;
        item.style.left = '40px'
      }
    }
    dropOnLeftMap()
    function dropOnTopMap() {
      if (sumPosAndTranslTop < 45) {
        var clickEvent = new Event('mouseup'); //создаем событие
        windowItem.dispatchEvent(clickEvent); //имитируем

      }
    }
    dropOnTopMap()
  }
}


function onConflictItemsWithOther(el) {
  const currentItem = document.querySelector(el)

  if (currentItem) {
    const itemsWithoutCurrent = itemCoords.filter(item => item.id !== currentItem.id)
    const itemWidth = currentItem.offsetWidth
    const itemHeight = currentItem.offsetHeight
    const itemposLeft = currentItem.offsetLeft
    const itemposTop = currentItem.offsetTop
    const itemTransform = currentItem.style.transform || 'translate(0px, 0px)';
    const itemTranslateLeft = getTranslateXValue(itemTransform);
    const itemTranslateTop = getTranslateYValue(itemTransform);


    function onRightConflict() {
      const itemsThatRight = itemsWithoutCurrent.filter(item => {
        return item.itemTranslateTop + item.positionTop + item.itemHeight > itemposTop + itemTranslateTop &&
          item.itemTranslateTop + item.positionTop < itemposTop + itemTranslateTop + itemHeight &&
          item.itemTranslateLeft + item.positionLeft > itemposLeft + itemTranslateLeft
      })
      const itemsOnConflictLine = itemsThatRight
      const nearestItems = itemsOnConflictLine.map(item => {
        return item.positionLeft + item.itemTranslateLeft
      })

      let leftSideNearestItemCoord;
      leftSideNearestItemCoord = Math.min(...nearestItems)


      switch (true) {
        case (leftSideNearestItemCoord !== undefined &&
          itemWidth + itemposLeft + itemTranslateLeft > leftSideNearestItemCoord &&
          itemposLeft + itemTranslateLeft < leftSideNearestItemCoord):
          leftSideNearestItemCoord = Math.min(...nearestItems)
          let clickEvent = new Event('mouseup'); // создаем событие drop'a
          windowItem.dispatchEvent(clickEvent); // имитируем 
          console.log('bum bum')
          break;
        default:
          return false
      }

    }
    onRightConflict()

    function onBottomConflict() {
      const itemsThatBottom = itemsWithoutCurrent.filter(item => {
        return item.itemTranslateLeft + item.positionLeft + item.itemWidth > itemposLeft + itemTranslateLeft &&
          item.itemTranslateLeft + item.positionLeft < itemposLeft + itemTranslateLeft + itemWidth
      })

      const itemsOnConflictLine = itemsThatBottom
      const nearestItems = itemsOnConflictLine.map(item => {
        return item.positionTop + item.itemTranslateTop
      })
      const nearestObjHeight = itemsThatBottom.find(item => item.positionTop + item.itemTranslateTop == nearestItems)

      let neareastH;
      if (nearestObjHeight) {
        neareastH = nearestObjHeight.itemHeight || 0;
      }

      const BottomSideNearestItemCoord = Math.min(...nearestItems)
      if (itemHeight + itemposTop + itemTranslateTop > BottomSideNearestItemCoord &&
        itemposTop + itemTranslateTop < BottomSideNearestItemCoord + (neareastH)) {
        var clickEvent = new Event('mouseup'); // создаем событие drop'a
        windowItem.dispatchEvent(clickEvent); // имитируем 
        console.log('slam')
        console.log(BottomSideNearestItemCoord)
      }
    }
    onBottomConflict()

    function onLeftConflict() {
      const itemsThatLeft = itemsWithoutCurrent.filter(item => {
        return item.itemTranslateTop + item.positionTop + item.itemHeight > itemposTop + itemTranslateTop &&
          item.itemTranslateTop + item.positionTop < itemposTop + itemTranslateTop + itemHeight &&
          item.itemTranslateLeft + item.positionLeft < itemposLeft + itemTranslateLeft
      })
      const itemsOnConflictLine = itemsThatLeft
      const nearestItems = itemsOnConflictLine.map(item => {
        return item.positionLeft + item.itemTranslateLeft
      })

      let leftSideNearestItemCoord = Math.max(...nearestItems)

      let nearestObj;
      if (itemsThatLeft) {
        nearestObj = itemsThatLeft.find(item => item.positionLeft + item.itemTranslateLeft == leftSideNearestItemCoord)
      }

      let nearestPoint
      if (nearestObj) {
        nearestPoint = nearestObj.positionLeft + nearestObj.itemTranslateLeft + nearestObj.itemWidth || 0
      }
      switch (true) {
        case (nearestObj !== undefined &&
          itemposLeft + itemTranslateLeft < nearestPoint):
          let clickEvent = new Event('mouseup'); // создаем событие drop'a
          windowItem.dispatchEvent(clickEvent); // имитируем 
          console.log('bumssss')
          break;
        default:
          return false
      }
    }
    onLeftConflict()

 
  }
}

onConflictItemsWithOther()


////////////////////////////////////////////////////////////////
// create TextItem
////////////////////////////////////////////////////////////////
const buttonForTextItem = document.getElementById('addElement')
buttonForTextItem.addEventListener('click', onCreateItem)



function onCreateItem() {
  // создание обвёртки
  const div = document.createElement('div');
  const divId = div.id = 'id' + Date.now()
  console.log(divId)
  div.classList.add(divId);
  div.classList.add('box-item');
  div.classList.add('any-map-item');
  div.classList.add('draggable-item');
  div.classList.add('resizableTable');
  // врутренности ресайзер и уголки
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
  table.classList.add('text-item');
  div.appendChild(table)
  // линия стола

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

  // логика удалялки 
  let removed;
  tableDel.addEventListener('click', function () {
    removed = div.parentNode.removeChild(div)
    console.log(removed)
    itemCoords = itemCoords.filter(item => item.id != removed.id)
    boxItems = document.querySelectorAll('.box-item');
    tableDraggables = document.querySelectorAll('.draggable-item');
    console.log(itemCoords)
  })

  resizers.appendChild(div)
  // draggedMap.appendChild(div)
  // oбновеление коллекции

  corners = document.querySelectorAll('.resizerTable')
  boxItems = document.querySelectorAll('.box-item');
  tableDraggables = document.querySelectorAll('.draggable-item');
  itemCoords = getAllItemCoords(boxItems) // обновление массива с координатами столов
  disableDraggableParent()
  tables = document.querySelectorAll('.resizerTablesTable')

  draggable()   // добавление нового стола в объект с перетаскиванием.
  makeresizableTableDiv('.' + divId)
  // tableTexts = document.querySelectorAll('.tebleTextP') // обновление текска стола с инпутами
  inputsHandler('.' + divId)
  onConflictItemsWithOther()
  // onConflictItemWithMap()
  onShowTableAnimation('.' + divId)

  buttonForTextItem.removeEventListener('click', onCreateItem)
  btnTable.removeEventListener('click', onCreateTable)
}


///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// для перетаскивания окна
let windowItemsDrag = document.querySelectorAll('.windowItemsDrag')
const windowItemTopRestrictor = document.querySelector('.resizable-wall.resizable-wall--top')
let windowItemDraggbleTop;
let startX;
let startY;
function dragwindowItem(items, restricter, type) {
    windowItemDraggbleTop = Draggable.create(items, {
      type: type,
      onPress: function() {
        startX = this.x;
        startY = this.y;
        

        if (this.target.style.opacity < 1) {
          windowItemButtonTop.addEventListener('click', createwindowItem)
        }
      },
      onDragStart: function () {
        mapDraggble.disable();
        this.target.style.opacity = 1;
      },
      onRelease: function () {
        mapDraggble.enable()
      },
      onDragEnd: function () {
        
        /////////////////////////////////////////
        // Действие при столкновении столов
        items.forEach(item => {
          if (this.hitTest(item)) {
            TweenMax.to(this.target, .1, {
              x: startX,
              y: startY
              // rotate: 90
            });
          }
        })
      },
      bounds: restricterTop
    })

}

dragwindowItem(windowItemsDrag, windowItemTopRestrictor, 'x')


//////////////////////////////////////////////////////////

const windowItemButtonTop = document.querySelector('#addwindowItemTop')
const windowItemButtonBottom = document.querySelector('#addwindowItemBottom')
const windowItemButtonLeft = document.querySelector('#addwindowItemLeft')
const windowItemButtonRight = document.querySelector('#addwindowItemRight')

windowItemButtonTop.addEventListener('click', function() {
  createwindowItem(".resizable-wall--top", "resizablewindowItemWrapperTopAndBottom--top")
  })
windowItemButtonBottom.addEventListener('click', function() {
  createwindowItem(".resizable-wall--bottom", "resizablewindowItemWrapperTopAndBottom--bottom")
})

// 1 направление ,
function createwindowItem(sideClass, borderClass) {

  // создание обвёртки
  const side = document.querySelector(sideClass)
  const windowItem = document.createElement('div');
  windowItem.style.display = 'block'
  const windowItemId = windowItem.id = 'id' + Date.now()
  console.log(windowItemId)
  windowItem.classList.add(windowItemId);
  windowItem.classList.add('resizablewindowItemWrapperTopAndBottom', 'box-item');
  windowItem.classList.add(borderClass);
  windowItem.classList.add('windowItemsDrag');
  // врутренности ресайзер и уголки
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('resizerwindowItemInnerTopAndBottom', borderClass );
  windowItem.appendChild(innerDiv)

  const corner1 = document.createElement('div');
  corner1.classList.add('resizerwindowItem', 'left-side');
  const corner2 = document.createElement('div');
  // corner2.classList.add('resizerwindowItem', 'top-side');
  const corner3 = document.createElement('div');
  // corner3.classList.add('resizerwindowItem', 'bottom-side');
  const corner4 = document.createElement('div');
  corner4.classList.add('resizerwindowItem', 'right-side');

  innerDiv.appendChild(corner1)
  innerDiv.appendChild(corner2)
  innerDiv.appendChild(corner3)
  innerDiv.appendChild(corner4)

  side.appendChild(windowItem)

  const tableTextDiv = document.createElement('div');
  tableTextDiv.classList.add('tableText', 'windowItem-text');
  tableTextDiv.style.display = 'block'
  const tableText = document.createElement('p');
  tableText.innerHTML = 'text'
  tableText.classList.add('tebleTextP');
  tableTextDiv.appendChild(tableText)
  windowItem.appendChild(tableTextDiv)
  // input
  const tableInput = document.createElement('input');
  tableInput.classList.add('tableText__input', 'windowItem-input');
  tableInput.type = 'text'
  tableInput.name = 'tableText'
  tableInput.value = ''
  windowItem.appendChild(tableInput)
  // удалялка 
  const windowItemDel = document.createElement('div');
  windowItemDel.innerHTML = "x";
  windowItemDel.classList.add('tableCenter-del');
  innerDiv.appendChild(windowItemDel)

  // логика удалялки 
  let removed;
  windowItemDel.addEventListener('click', function () {
    removed = windowItem.parentNode.removeChild(windowItem)
    itemCoords = itemCoords.filter(item => item.id != removed.id)
    boxItems = document.querySelectorAll('.box-item');
  })



  // oбновеление коллекции
  boxItems = document.querySelectorAll('.box-item')
  sides = document.querySelectorAll('.resizerwindowItem')
  windowItemsDrag = document.querySelectorAll('.windowItemsDrag')
  itemCoords = getAllItemCoords(boxItems)
  disablewindowItemParent(sides)
  makeresizablewindowItemDiv('.' + windowItemId)
  dragwindowItem(windowItemsDrag, windowItemTopRestrictor, 'x')
  inputsHandler('.' + windowItemId)
  onConflictItemsWithOther()
  onShowwindowItemAnimation('.' + windowItemId)

  windowItemButtonTop.removeEventListener('click', createwindowItem)
}

/////////////////////////////////////////////////////////

function onShowTableAnimation(div) {

  const option1 = {
    x: 0,
    y: 0,
    opacity: 0.2,
    // rotation: 250,
    scale: 0.4,
    delay: 0.2
  };
  const option2 = {
    x: (draggedMap.offsetWidth / 2) - 50,
    y: (draggedMap.offsetHeight / 2) - 50,
    opacity: 0.6,
    // rotation: 250,
    scale: 0.96,
    zIndex: 1005

  };
  TweenMax.fromTo(div, .2, option1, option2);
}

//////////////////////////////////////////////////////////


function makeresizablewindowItemDiv(div) {
  const element = document.querySelector(div);
  const resizerTablesTable = document.querySelectorAll(div + ' .resizerwindowItem')
  const minimum_size = 60;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizerTablesTable.length; i++) {
    const currentresizerTable = resizerTablesTable[i];
    currentresizerTable.addEventListener('mousedown', function (e) {
      elCoords = getAllItemCoords(windowItemsDrag)
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.offsetLeft; // .offsetLeft changed  <==> .getBoundingClientRect().left
      original_y = element.offsetTop;  // .offsetTop changed  <==> .getBoundingClientRect().top
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      windowItem.addEventListener('mousemove', resize)
      windowItem.addEventListener('mouseup', stopResize)
    })

    function resize(e) {

      if (currentresizerTable.classList.contains('right-side')) {
        windowItemsOnConflict(div)
        elCoords = getAllItemCoords(windowItemsDrag)
        const width = original_width + (e.pageX - original_mouse_x);
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
      }
      else if (currentresizerTable.classList.contains('bottom-side')) {
        windowItemsOnConflict(div)
        elCoords = getAllItemCoords(windowItemsDrag)
        const height = original_height + (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentresizerTable.classList.contains('top-side')) {
        windowItemsOnConflict(div)
        elCoords = getAllItemCoords(windowItemsDrag)
        const height = original_height - (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        windowItemsOnConflict(div)
        elCoords = getAllItemCoords(windowItemsDrag)
        const width = original_width - (e.pageX - original_mouse_x)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
    }

    function stopResize() {
      windowItem.removeEventListener('mousemove', resize)
    }
  }
}

makeresizablewindowItemDiv('.resizablewindowItemWrapperTopAndBottom')
///////////////////////////////////////////////////////

const collectionwindowItemItems = document.querySelectorAll('.resizerwindowItemInnerTopAndBottom')

function disablewindowItemParent(elems) {
  elems.forEach(item => {
    item.addEventListener('mouseover', disable)
    item.addEventListener('mouseout', enable)
  })

  function disable() {
    dragDisable(mapDraggble, windowItemDraggbleTop)
  }
  function enable() {
    dragEnable(mapDraggble, windowItemDraggbleTop)
  }
}
disablewindowItemParent(sides)


//////////////////////////////////////////////////////////

let elCoords = getAllItemCoords(windowItemsDrag)
function windowItemsOnConflict(el) {
  const currentItem = document.querySelector(el)
  console.log(currentItem)


    if (currentItem) {
      const itemsWithoutCurrent = elCoords.filter(item => item.id !== currentItem.id)
      const itemWidth = currentItem.offsetWidth
      const itemHeight = currentItem.offsetHeight
      const itemposLeft = currentItem.offsetLeft
      const itemposTop = currentItem.offsetTop
      const itemTransform = currentItem.style.transform || 'translate(0px, 0px)';
      const itemTranslateLeft = getTranslateXValue(itemTransform);
      const itemTranslateTop = getTranslateYValue(itemTransform);



      function onRightConflict() {
        const topSideElement = document.querySelector('.resizable-wall--top')
        console.log(topSideElement.offsetLeft)
  

        const itemsThatRight = itemsWithoutCurrent.filter(item => { return item.itemTranslateTop + item.positionTop + item.itemHeight > itemposTop + itemTranslateTop &&
          item.itemTranslateTop + item.positionTop < itemposTop + itemTranslateTop + itemHeight &&
           item.itemTranslateLeft + item.positionLeft > itemposLeft + itemTranslateLeft
        })
        const itemsOnConflictLine = itemsThatRight
        const nearestItems = itemsOnConflictLine.map(item => {
          return item.positionLeft + item.itemTranslateLeft
        })
  
        let leftSideNearestItemCoord;
        leftSideNearestItemCoord = Math.min(...nearestItems)
        console.log(itemsThatRight)
        console.log(itemWidth + itemposLeft + itemTranslateLeft)
        switch (true) {
          case (leftSideNearestItemCoord !== undefined &&
            itemWidth + itemposLeft + itemTranslateLeft > leftSideNearestItemCoord - 15 ||
            itemWidth + itemposLeft + itemTranslateLeft > topSideElement.offsetWidth - 40
            ):
            leftSideNearestItemCoord = Math.min(...nearestItems)
            let clickEvent = new Event('mouseup'); // создаем событие drop'a
            windowItem.dispatchEvent(clickEvent); // имитируем 
            console.log('bum bum')
            break;
          default:
            return false
        }
  
      }
      onRightConflict()

      function onLeftConflict() {
        const itemsThatLeft = itemsWithoutCurrent.filter(item => {return item.itemTranslateTop + item.positionTop + item.itemHeight > itemposTop + itemTranslateTop &&
          item.itemTranslateTop + item.positionTop < itemposTop + itemTranslateTop + itemHeight &&
          item.itemTranslateLeft + item.positionLeft < itemposLeft + itemTranslateLeft
        })
        const nearestItems = itemsThatLeft.map(item => {
          return item.positionLeft + item.itemTranslateLeft
        })
  
        let leftSideNearestItemCoord = Math.max(...nearestItems)
  
        let nearestObj;
        if (itemsThatLeft) {
          nearestObj = itemsThatLeft.find(item => item.positionLeft + item.itemTranslateLeft == leftSideNearestItemCoord)
        }
  
        let nearestPoint
        if (nearestObj) {
          nearestPoint = nearestObj.positionLeft + nearestObj.itemTranslateLeft + nearestObj.itemWidth || 0
        }
        console.log(itemposLeft, itemTranslateLeft )
        switch (true) {
          case (nearestObj !== undefined &&
            itemposLeft + itemTranslateLeft < nearestPoint + 15 ||
            itemposLeft + itemTranslateLeft < 40):
            let clickEvent = new Event('mouseup'); // создаем событие drop'a
            windowItem.dispatchEvent(clickEvent); // имитируем 
            console.log('bumssss')
            break;
          default:
            return false
        }
      }
      onLeftConflict()
    }
  
}
/////////////////////////////////////////////////////////////////////////
function onShowwindowItemAnimation(div) {

  const option1 = {
    x: 0,
    opacity: 0.2,
    delay: 0.2
  };
  const option2 = {
    x: (draggedMap.offsetWidth / 2) - 50,
    opacity: 0.8,
  };
  TweenMax.fromTo(div, .2, option1, option2);
}