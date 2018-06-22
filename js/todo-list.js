
/*===================================================================*/
/* jQuery
/*===================================================================*/

$(document).ready(function(){

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


  /*========================================================*/
  /* Tab 切換
     
     .each(function(){}) 對選取集合中的每個元件執行一或多個程式敘述，需包含一個參數，此參數為函式，函式內為要對每個元件執行的程式敘述句。
  /*========================================================*/

  $('.tab-list').each(function () {
    var $this = $(this);

   //.on('欲回應的事件','針對目標元件的子集合',function(e){})
    $this.on('click', '.tab-control', function(e){
      // Tab 切換顯示
      e.preventDefault();
      var $link = $(this);
      $link.parent().addClass('active');
      $link.parent().siblings().removeClass('active');

      // 顯示Tab active 對應到的內容
      var id = $(this).attr('href'); // 取得被點擊的tab的a href值
      $('.tab-panel').removeClass('active');
      $(id).addClass('active'); 
      $(id).siblings().removeClass('active');
    });
  });
});


/*===================================================================*/
/* 1.監聽新增事項的按鈕，點擊按鈕觸發函式
   2.函式內容：
       2-1 輸入待辦事項，存出input的值
       2-2 在html上顯示一個新的Task項目

/*===================================================================*/
var checkSVG = '<svg class="icon icon-check" aria-hidden="true"><use xlink:href="#icon-check"></use></svg>';

var removeSVG = '<svg class="icon icon-close" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>';

var starSVG = '<svg class="icon icon-favorfill" aria-hidden="true"><use xlink:href="#icon-favorfill"></use></svg>';

var btnAdd = document.getElementById('btn-addTask');
var todoTask = document.getElementById('panel-todo');
var completedTask = document.getElementById('panel-completed');


// 計算task數量
function countTaskNumber(){
  var todoNumber = todoTask.childNodes.length;
  var completedNumber = completedTask.childNodes.length;
  var todoNumberEl = document.getElementById('task-number-todo');
  var completedNumberEl = document.getElementById('task-number-completed');
  todoNumberEl.textContent = todoNumber;
  completedNumberEl.textContent = completedNumber;

  var totalTaskNumberEl = document.getElementById('task-number-total');
  var totalTaskNumber = todoNumber + completedNumber
  totalTaskNumberEl.textContent = totalTaskNumber;
}


// 判斷是否有輸入文字
function checkInput() {
  var taskName = document.getElementById('input-task').value;
  if (taskName) {
    addTask(taskName);
  }
};


// 刪除Task
function removeTask(){
  
  // 移除li
  var li = this.parentNode.parentNode; /* this => <button class="btn-todo"><svg> */
  var ul = li.parentNode;
  ul.removeChild(li);
  countTaskNumber();
}


// 切換Task狀態：完成/未完成
function checkTask(){
  
  var li = this.parentNode; /* this => <button class="btn-todo"><svg> */
  var ul = li.parentNode;
  var id = ul.id;
  console.log(li);
  console.log(id);

  
  if (id ==='panel-todo') {
    console.log(todoTask);
    completedTask.appendChild(li);
  } else {
    todoTask.appendChild(li);
  }

  countTaskNumber();
}


// 優先順序功能
function orderTask() {
  // 取得被點擊的Task li
  var li = this.parentNode.parentNode;
  var ul = li.parentNode;
  ul.insertBefore(li, ul.childNodes[0]);
}


// 新增 Task
function addTask(taskName) {
  document.getElementById('input-task').value = '';
  
  var li = document.createElement('li');

  // task 元件
  var div = document.createElement('div');
  div.className = 'task-name';
  div.innerText = taskName;

  // check btn 元件
  var btnCheck = document.createElement('button');
  btnCheck.className = 'btn-todo';
  btnCheck.innerHTML = checkSVG;

  // Remove btn 元件
  var btnRemove = document.createElement('button');
  btnRemove.className = 'btn-todo';
  btnRemove.innerHTML = removeSVG;

  // star btn 元件
  var btnOrder = document.createElement('button');
  btnOrder.className = 'btn-todo';
  btnOrder.innerHTML = starSVG;

  // btn group 元件
  var btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';
  btnGroup.appendChild(btnOrder);
  btnGroup.appendChild(btnRemove);

  // 顯示到 HTML
  li.appendChild(btnCheck);
  li.appendChild(div);
  li.appendChild(btnGroup);

  // 新增的Task排在最前面 insertBefore(要放入的節點,  要放入的位置.第幾個子節點)
  todoTask.insertBefore(li,todoTask.childNodes[0]);

  // 更新Task數量
  countTaskNumber();

  // 監聽remove按鈕，觸發事件
  btnRemove.addEventListener('click', removeTask, false);

  // 監聽check按鈕，觸發事件
  btnCheck.addEventListener('click', checkTask , false);

  // 監聽優先順序按鈕
  btnOrder.addEventListener('click', orderTask, false);

}

// 點擊新增Task
btnAdd.addEventListener('click', checkInput, false);


// 點擊Task Name進入編輯狀態
function taskEdit(){
  var editPanel = document.createElement('div');
  editPanel.className = 'edit-panel';
  
  var inputdate = document.createElement('input');
  inputdate.classList.add('input-date','input-datepicker');

  var subtitleEl = '<div class="subtitle"><svg class="icon icon-calendar" aria-hidden="true"><use xlink: href="#icon-calendar"></use></svg>新增日期</div>';
  

  alert(inputdate.className);


  
};

function checkTaskExist() {
  var taskNameEl = document.getElementsByClassName('task-name');
  for (var i = 0; i < taskNameEl.length; i++) {
    taskNameEl[i].addEventListener('click', taskEdit, false);
  }
}



function init(){
  countTaskNumber();
  
  // 點擊Task Name可編輯
  var taskDom = document.getElementById('section-task');
  taskDom.addEventListener('DOMSubtreeModified', checkTaskExist, false);
  checkTaskExist();
  sortableEl();
}

init();



/*===================================================================*/
/* Sortable Plugin 拖曳功能
/*===================================================================*/
function sortableEl(){
  var el = document.getElementsByClassName('task');
  for (var i=0; i<el.length; i++){
    var sortable = Sortable.create(el[i]);
  }
}