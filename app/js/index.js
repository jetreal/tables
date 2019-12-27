
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
        getItemCoords()

        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)

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
        getItemCoords()

        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)

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
        getItemCoords()

        function dropResize() {
          element.style.width = (width + 10) + 'px'
          // element.style.left = (original_x + 10) + (e.pageX - original_mouse_x) + 'px'
          var clickEvent = new Event('mouseup'); //создаем событие
          window.dispatchEvent(clickEvent); //имитируем 
          return
        }

        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        console.log('width: ', width)
        if (itemTranslateLeft + itemWidth > width - 10) {
          dropResize()
          return
        }

        if (
          wrapperWidth - draggedMap.offsetWidth > sumPosAndTranslLeft
        ) {
          dropResize()
          // element.style.width = (width + 10) + 'px'
          // // element.style.left = (original_x + 10) + (e.pageX - original_mouse_x) + 'px'
          // var clickEvent = new Event('mouseup'); //создаем событие
          // window.dispatchEvent(clickEvent); //имитируем 
          return
          
        }
        if (
          wrapperHeight < sumPosAndTranslTop
        ) {
          element.style.height = (height + 10) + 'px'
          element.style.top = (original_y - 10) + (e.pageY - original_mouse_y) + 'px'
          var clickEvent = new Event('mouseup'); // создаем событие
          window.dispatchEvent(clickEvent); // имитируем 
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
        getItemCoords()

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
const topLeftCorner = document.querySelector('.top-left');
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


let itemTranslateLeft;
let itemTranslateTop;
let itemWidth;
let itemHeight;
function getItemCoords() {
  itemWidth = targetElement.offsetWidth
  itemHeight = targetElement.offsetHeight
  const itemTransform = targetElement.style.transform || 'translate(0px, 0px)';
  itemTranslateLeft = getTranslateXValue(itemTransform);
  itemTranslateTop = getTranslateYValue(itemTransform);
  console.log('leftTransl: ', itemTranslateLeft, 'topTransl: ', itemTranslateTop)
  
}


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


//////////////////////////////////////////////////////


// перетаскивание item'ov
function draggable() {
  Draggable.create( boxItems, {
    bounds: draggedMap,
    cursor: 'pointer',
    type: 'x, y',
    inertia: true,
    onPress: onPress,
    onRelease: onRelease,
    onDragStart: onStart,
    onDragEnd: function () {
      /////////////////////////////////////////
      function getCoords(targetElement) { // кроме IE8-

        let top = targetElement.offsetTop;
        let left = targetElement.offsetLeft;

      }
      getCoords(targetElement);
 /////////////////////////////////////////

      // ограничение карты
      // ширина + отступ от родителя
      // targWidth = this.x + targetElement.offsetWidth + 40;
      // targHeight = this.y + targetElement.offsetHeight + 80;
      // console.log(this.x)
      // console.log(this.y)
      // draggedMap.style.minWidth = targWidth + "px";
      // draggedMap.style.minHeight = targHeight + "px";

      boxItems.forEach(item => {
        if (this.hitTest(item)) {
          TweenMax.to(this.target, 1, {
            x: xx,
            y: yy,
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

  const tlPress = new TimelineMax();
  tlPress.to( this.target, 0.1, {
    opacity: 1,
    borderColor: 'red',
    borderWidth: 2,
    ease: Power4.easeIn
  })
}
// ---------------------------------
function onRelease() {
  mapDraggble.enable();

  const tlPress = new TimelineMax();
  tlPress.to(this.target, 0.1, {
    // borderColor: 'green',
    borderWidth: 3,
    ease: Power4.easeIn,
  })
}


/////////////////////////////////////////////////////////////
  // создание стола
btnTable.addEventListener('click', function() {
  let div = document.createElement('div');
  div.classList.add('box-item');
  div.classList.add('draggable-item');
  let span = document.createElement('span');
  span.innerHTML = 'X';
  span.classList.add('spanClose');
  span.addEventListener('click', function() {
    div.parentNode.removeChild(div)
  })
  draggedMap.appendChild(div)
  div.appendChild(span)
  boxItems = document.querySelectorAll( '.box-item' );
  draggable()
})



