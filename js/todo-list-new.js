// 要操作的 DOM 元件
var btnAddTask = document.getElementById('btn-addTask');
var contentTodo = document.getElementById('content-todo');
var contentCompleted = document.getElementById('content-completed');
var counterTodo = document.getElementById('counter-todo');
var counterCompleted = document.getElementById('counter-completed');

var panelEdit = document.querySelector('.panel-edit');
var inputDate = document.getElementById('input-date');
var inputTime = document.getElementById('input-time');
var inputFile = document.getElementById('input-file');
var fileName  = document.getElementById('fileName');
var taskComment = document.getElementById('textarea-comment');
var btnCancel = document.getElementById('btn-cancel');
var btnSave = document.getElementById('btn-save');


// loading 的資料  // 把一個JSON字串轉換成 JavaScript 的物件
var data = JSON.parse(localStorage.getItem('todoTask')) || {
  todo: [],
  completed: []
};
  
/* {
  name: '',
  star: '',
  check: '',
  delect: '',
  order: '',
  date: '',
  time: '',
  fileName: '',
  fileSize: '',
  comment: '',
   }
*/



/*===================================================================*/
/* 讀取 data 的資料，生成 DOM 元件，更新網頁內容
/*===================================================================*/
function updataTask(item) { // item => { todo:[], completed: []}
  
  // 清除輸入的值
  document.getElementById('input-addTask').value = '';

  // 清空 HTML todo DOM
  var nullDOM = '';
  contentTodo.innerHTML = nullDOM;
  contentCompleted.innerHTML = nullDOM;

  // 所有 todo DOM 重新生成並綁索引值
  var todoLen = item.todo.length; // 從空的開始會是， 0筆
  var completedLen = item.completed.length; // 從空的開始會是， 0筆
  
  counterTodo.textContent = todoLen;
  counterCompleted.textContent = completedLen;

  
  for (var i = 0; i < todoLen; i++) {
    var value = item.todo[i];
    addItemToDOM(value, i, true);    
  }

  for (var i = 0; i < completedLen; i++) {
    var value = item.completed[i];
    addItemToDOM(value, i);
  }
}

/*===================================================================*/
/* 生成 DOM 元件，更新網頁內容 (item) => data.todo[i];
/*===================================================================*/
function addItemToDOM(item, i, completed) {  

  var checkSVG = '<svg class="icon icon-check" aria-hidden="true"><use xlink:href="#icon-check"></use></svg>';
  var removeSVG = '<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg>';
  var starSVG = '<svg class="icon icon-favorfill" aria-hidden="true"><use xlink:href="#icon-favorfill"></use></svg>';

  var ulDOM = (completed) ? document.getElementById('content-todo'): document.getElementById('content-completed');

  var newTaskItem = document.createElement('li');
  newTaskItem.dataset.index = i;  // LI DOM 給上索引值 <li data-index='i'>

  // Task Name
  var taskName = document.createElement('input');
  taskName.className = 'task-name';
  taskName.value = item.name;

  // Create - Check Btn
  var btnCheck = document.createElement('button');
  btnCheck.className = 'btn-check';
  btnCheck.innerHTML = checkSVG;

  // Create - Order Btn
  var btnStar = document.createElement('button');
  if (item.star) {
    btnStar.className = 'btn-star active';
  } else {
    btnStar.className = 'btn-star';
  }
  btnStar.innerHTML = starSVG;

  // Create - Remove Btn
  var btnRemove = document.createElement('button');
  btnRemove.className = 'btn-remove';
  btnRemove.innerHTML = removeSVG;

  // Create - div.btn-group 
  var btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';
  btnGroup.appendChild(btnStar);
  btnGroup.appendChild(btnRemove);

  // 組合元件，顯示到 HTML
  newTaskItem.appendChild(btnCheck);
  newTaskItem.appendChild(taskName);

  /*===================================================================*/
  /* Badge 顯示
  /*===================================================================*/
  var badgeGroup = document.createElement('div');
  badgeGroup.className = 'badge-group';

  if (item.date !== '') {
    var dateBadge = badgeDOMdate(item);
    badgeGroup.appendChild(dateBadge);
  }

  if (item.fileName !== '') {
    var fileBadge = badgeDOMfile(item);
    badgeGroup.appendChild(fileBadge);
  } 
  
  if (item.comment !== '') {
    var commentBadge = badgeDOMcomment(item);
    badgeGroup.appendChild(commentBadge);
  }
  
  newTaskItem.appendChild(badgeGroup);
  newTaskItem.appendChild(btnGroup);
  ulDOM.appendChild(newTaskItem);
}



/*===================================================================*/
/* badge 顯示
/*===================================================================*/

function badgeDOMdate(item) {
  var calendarSVG = '<svg class="icon icon-calendar" aria-hidden="true"><use xlink:href="#icon-calendar"></use></svg>';

  var badgePill = document.createElement('span');
  badgePill.className = 'badge-pill';

  var dateEl = document.createElement('span');
  dateEl.className = 'date';
  dateEl.textContent = item.date;

  var timeEl = document.createElement('span');
  timeEl.className = 'time';
  timeEl.textContent = item.time;

  badgePill.innerHTML = calendarSVG;
  badgePill.appendChild(dateEl);
  badgePill.appendChild(timeEl);
  return badgePill;
}

function badgeDOMfile() {
  var linkSVG = '<svg class="icon icon-link" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>';

  var badgePill = document.createElement('span');
  badgePill.className = 'badge-pill';

  var dateEl = document.createElement('span');
  dateEl.className = 'file-link';
  
  badgePill.innerHTML = linkSVG + '1';
  badgePill.appendChild(dateEl);
  return badgePill;
}

function badgeDOMcomment() {
  var commentSVG = '<svg class="icon icon-commentfill" aria-hidden="true"><use xlink:href="#icon-commentfill"></use></svg>';

  var badgePill = document.createElement('span');
  badgePill.className = 'badge-pill';
  
  badgePill.innerHTML = commentSVG + '1';
  return badgePill;
}



/*===================================================================*/
/* Task 加入列表，並同步更新網頁與 localStorage
/*===================================================================*/

function addTask(){
  
  var newTask = document.getElementById('input-addTask').value;

  // 判斷有無輸入資料，沒有的話返回不往下執行
  if(newTask == '') { return };

  // 儲存資料
  var taskList =  {
    name: newTask,
    index: '',
    star: false,
    check: false,
    date: '',
    time: '',
    fileName: '',
    fileSize: '',
    comment: ''
  }

  data.todo.push(taskList);
  localStorage.setItem('todoTask', JSON.stringify(data));
  // 生成 HTML 元件
  updataTask(data);

}



/*===================================================================*/
/* 刪除
/*===================================================================*/
function removeTask(e) {
  // 判斷是否點擊到刪除按鈕 (因為button內還有兩個子孫層，點到的若是子孫層也要加入判斷)
  if (e.target.className == 'btn-remove') { 
    /* if e.target => <button class="btn-remove"><svg> */
    var li = e.target.parentNode.parentNode;   
  } else if (e.target.innerHTML == '<use xlink:href="#icon-delete"></use>'){
    /* e.target => <svg class="icon icon-check" aria-hidden="true"> */
    var li = e.target.parentNode.parentNode.parentNode; 
  } else if (e.target.outerHTML == '<use xlink:href="#icon-delete"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode; 
  } else {
    return
  };
  
  // 利用 li 元件上的 data-index 找出點到的是第幾個 Task
  var index = li.dataset.index;                              // 重複code
  var ulId = li.parentNode.id;                               // 重複code

  if (ulId == 'content-todo'){
    data.todo.splice(index, 1);                              // 重複code
  } else if (ulId == 'content-completed'){
    data.completed.splice(index, 1);                         // 重複code
  }
  localStorage.setItem('todoTask', JSON.stringify(data));  // 重複code
  updataTask(data);                                        // 重複code
}



/*===================================================================*/
/* 變更 Task 狀態：todo 進行中 / completed 完成
/*===================================================================*/

function doneTask(e){
  if (e.target.className == 'btn-check') {
    var li = e.target.parentNode;
  } else if (e.target.innerHTML == '<use xlink:href="#icon-check"></use>'){
    var li = e.target.parentNode.parentNode;
  } else if (e.target.outerHTML == '<use xlink:href="#icon-check"></use>'){
    var li = e.target.parentNode.parentNode.parentNode;
  } else {
    return
  }

  var index = li.dataset.index;                              // 重複code
  var ulId = li.parentNode.id;                               // 重複code

  if (ulId == 'content-todo') {                              // 重複code
    if (data.todo[index].star) {
      data.completed.unshift(data.todo[index]);              // 有星號，轉換過去已完成在列表會置頂
    } else {
      data.completed.push(data.todo[index]);
    }
    data.todo.splice(index, 1);                              // 重複code
  } else {
    if (data.completed[index].star) {                        // 有星號，轉回進行中在列表會置頂
      data.todo.unshift(data.completed[index]);  
    } else {
      data.todo.push(data.completed[index]);  
    }
    data.completed.splice(index, 1);                         // 重複code
  }
  localStorage.setItem('todoTask', JSON.stringify(data));  // 重複code
  updataTask(data);                                        // 重複code
}



/*===================================================================*/
/* 編輯 
     做法一：點擊 Task Name 才讀取資料，若資料大，則會造成使用者等待
     做法二： 
/*===================================================================*/

function editTask(e) {
  if (e.target.className !== 'task-name') { return }
  
  // 打開編輯面板
  var li = e.target.parentNode;
  var index = li.dataset.index;
  li.appendChild(panelEdit);
  panelEdit.style.display=  'block';

  // 讀取 Task 詳細資料
  var ulId = li.parentNode.id;
  if (ulId == 'content-todo') {
    inputDate.value = data.todo[index].date;
    // inputTime.value = data.todo[index].time;
    fileName.textContent = data.todo[index].fileName;
    taskComment.value = data.todo[index].comment;
  } else {
    inputDate.value = data.completed[index].date;
    // inputTime.value = data.completed[index].time;
    fileName.textContent = data.completed[index].fileName;
    taskComment.value = data.completed[index].comment;
  }

  document.getElementById('input-file').addEventListener('change', function (e) {
    var files = e.target.files;     // 為物件 FileList {0: File(4639), length: 1 }
    fileName.textContent = files[0].name;
  }, false);
}



/*===================================================================*/
/* 儲存編輯狀態  
/*===================================================================*/

function saveTask(e){
     
  if (e.target.className == 'btn-save') {
    var li = e.target.parentNode.parentNode.parentNode;
  } else if (e.target.innerHTML == '<use xlink:href="#icon-copy"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode;
  } else if (e.target.outerHTML == '<use xlink:href="#icon-copy"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  } else {
    return
  };

  var index = li.dataset.index;                              // 重複code
  var ulId = li.parentNode.id;                               // 重複code

  if (ulId == 'content-todo') {
    var taskNameEl = li.parentNode.querySelectorAll('.task-name');
    console.log(taskNameEl);
    data.todo[index].name = taskNameEl[index].value;
    data.todo[index].date = inputDate.value;
    // data.todo[index].time = inputTime.value;
    data.todo[index].fileName = fileName.textContent;
    data.todo[index].comment = taskComment.value;   
  } else {
    var taskNameEl = li.parentNode.querySelectorAll('.task-name');
    console.log(taskNameEl);

    data.completed[index].name = taskNameEl[index].value;
    data.completed[index].date = inputDate.value;
    // data.completed[index].time = inputTime.value;
    data.completed[index].fileName = fileName.textContent;
    data.completed[index].comment = taskComment.value;
  }
  localStorage.setItem('todoTask', JSON.stringify(data)); // 重複code
  updataTask(data);
  panelEdit.style.display = 'none';
}


/*===================================================================*/
/* 取消編輯狀態  
/*===================================================================*/

function cancelTask(e) {

  if (e.target.className == 'btn-cancel') {
    var li = e.target.parentNode.parentNode.parentNode;
  } else if (e.target.innerHTML == '<use xlink:href="#icon-close"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode;
  } else if (e.target.outerHTML == '<use xlink:href="#icon-close"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  } else {
    return
  };
  panelEdit.style.display = 'none';
}


/*===================================================================*/
/* 星號 Task 排序置頂
/*===================================================================*/

function shiftTask(e){
  if (e.target.className == 'btn-star') {
    var li = e.target.parentNode.parentNode;
  } else if (e.target.innerHTML == '<use xlink:href="#icon-favorfill"></use>') {
    var li = e.target.parentNode.parentNode.parentNode;
  } else if (e.target.outerHTML == '<use xlink:href="#icon-favorfill"></use>') {
    var li = e.target.parentNode.parentNode.parentNode.parentNode;
  } else {
    return
  };
  
  var index = li.dataset.index;
  var ul = li.parentNode;
  var ulId = ul.id; 
  var btnStar = li.querySelector('.btn-star');  
  
  if (ulId == 'content-todo') {
    if (!data.todo[index].star) { 
      data.todo[index].star = true;  // 加上星號
      var starTask = data.todo[index];
      data.todo.splice(index, 1); 
      data.todo.unshift(starTask);   // 資料加入至陣列起始端
    } else {
      // 計算星號筆數，取消星號的 Task 會排到所有星號的 Task 後面
      var starNum = ul.querySelectorAll('.btn-star.active').length;
      data.todo[index].star = false; // 取消星號
      var starTask = data.todo[index];
      data.todo.splice(index, 1);
      data.todo.splice(starNum - 1, 0, starTask); // 從第(starNum-1)筆，刪除0筆資料，插入starTask => 實現資料可指定插入陣列第幾筆
    }
  } else {
    if (!data.completed[index].star) {
      data.completed[index].star = true;  // 加上星號，排序置頂
      var starTask = data.completed[index];
      data.completed.splice(index, 1);
      data.completed.unshift(starTask);   // 資料加入至陣列起始端
    } else {
      var starNum = ul.querySelectorAll('.btn-star.active').length;
      data.completed[index].star = false; // 取消星號，排序置頂
      var starTask = data.completed[index];
      data.completed.splice(index, 1);
      data.completed.splice(starNum - 1, 0, starTask);
    }
  } 
  localStorage.setItem('todoTask', JSON.stringify(data));  // 重複code
  updataTask(data);                                        // 重複code
}



/*===================================================================*/
/* Sortable Plugin 拖曳功能
/*===================================================================*/
function sortableEl(e) {
  
  // 假設點到 li
  // var liIndex = e.target.dataset.index; // string
  // var ul= e.target.parentNode;
  // var ulId = ul.id;
  // var liEl = ul.querySelectorAll('li');
  // var liLen = liEl.length;

  // 假設點到ul
  var ul = e.target;
  var ulId= ul.id;
  var liEl = ul.querySelectorAll('li');
  var liLen = liEl.length;

  console.log(e.target);

  if (ulId == 'content-todo') {
    // Sortable.create(e.target);
    console.log('移動完');
    console.log(liLen);

      
    
    for (var i = 0; i< liLen; i++) {
      var liClass = liEl[i].getAttribute('class');
      console.log('liClass='+liClass);

      if (liClass == 'ui-sortable-handle ui-sortable-helper'){
        var saveEl = data.todo[i];
        var saveIndex = i;
        alert('第' + i + '個移動');
        console.log(saveEl);
      }
      if (liClass == 'ui-sortable-placeholder ui-sortable-handle') {
        var newPosition = i-1; 
        console.log('got移到第' + i + '個');
      }
    }

    data.todo.splice(saveIndex,1);
    console.log(data.todo);
    data.todo.splice(newPosition, 0, saveEl);
    alert('資料已更新');

    localStorage.setItem('todoTask', JSON.stringify(data));  // 重複code
    // updataTask(data);                                        // 重複code
  }
}




/*===================================================================*/
/* 監聽與更新
/*===================================================================*/

// 新增 todo - 按 + 新增
btnAddTask.addEventListener('click', addTask, false);
// 新增 todo - input focus 時，按 Enter 新增
document.getElementById('input-addTask').addEventListener('keydown', function (e) {
  var value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addTask();
  }
});

btnAddTask.addEventListener('click', addTask, false); 

// 刪除
document.addEventListener('click', removeTask, true); // 從外層往內找

// 變更 Task 狀態
document.addEventListener('click', doneTask, true);

// 編輯
document.addEventListener('click', editTask, true);

// 儲存編輯內容
document.addEventListener('click', saveTask, true);

// 取消編輯內容
document.addEventListener('click', cancelTask, true);

// 星號 Task 排序置頂
document.addEventListener('click', shiftTask, true);

// 拖曳功能
// document.addEventListener('click', sortableEl, true);
// document.addEventListener('mouseup', sortableEl, true);

// init
updataTask(data);


/*===================================================================*/
/* jQuery
/*===================================================================*/

$(document).ready(function () {
  
  $('.tab-control').each(function () {

   //.on('欲回應的事件','針對目標元件的子集合',function(e){})
    $(this).on('click', function(e){
      // Tab 切換顯示
      e.preventDefault();
      var $thisTarget = $(this);
      $thisTarget.parent().addClass('active');
      $thisTarget.parent().siblings().removeClass('active');

      // 顯示Tab 對應到的內容
      
      var id = $thisTarget.attr('id');  // jQuery 取得 id 的方法
      if (id === "tab-todo"){
        $('#content-todo').css('display', 'block');
        $('#content-completed').css('display', 'none');
      } else if (id === "tab-completed") {
        $('#content-todo').css('display', 'none');
        $('#content-completed').css('display', 'block');
      }
    });
  });


  /*===================================================================*/
  /* Plugin - Datepicker - 取得id觸發函式
  /*===================================================================*/

  $('.input-datepicker').each(function () {
    var thisId = this.id;
    var inputId = '#' + thisId;
    $(inputId).datepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
    });
  });

  // $("#content-todo").sortable();
  // $("#content-todo").disableSelection();
});