
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



  /*===================================================================*/
  /* 點擊 Task Name 開闔編輯區塊
  /*===================================================================*/
  function checkTaskExist() {
    
    if ($(this).parent().find('form').is('.active')){
      $(this).parent().removeClass('edit-active'); // 取消li的.edit-active
      $(this).parent().find('form').removeClass('active'); // li內找form
    } else {
      $(this).parent().addClass('edit-active'); // li.edit-active
      $(this).parent().find('form').addClass('active');
      $(this).parent().siblings().find('form').removeClass('active'); // ul內找其他li內的form
    }
    
    var btnCancel = $(this).parent().find('form').find('.btn-cancel');
    console.log(btnCancel);
    $('.btn-cancel').click(function(){

  
    })
  }



  /*========================================================*/
  /* Tab 切換
     
     .each(function(){}) 對選取集合中的每個元件執行一或多個程式敘述，需包含一個參數，此參數為函式，函式內為要對每個元件執行的程式敘述句。
  /*========================================================*/

  // $('.tab-list').each(function () {
  //   var $this = $(this);

  //  //.on('欲回應的事件','針對目標元件的子集合',function(e){})
  //   $this.on('click', '.tab-control', function(e){
  //     // Tab 切換顯示
  //     e.preventDefault();
  //     var $link = $(this);
  //     $link.parent().addClass('active');
  //     $link.parent().siblings().removeClass('active');

  //     // 顯示Tab active 對應到的內容
  //     var id = $(this).attr('href'); // 取得被點擊的tab的a href值
  //     $('.tab-panel').removeClass('active');
  //     $(id).addClass('active'); 
  //     $(id).siblings().removeClass('active');
  //   });
  // });




/*===================================================================*/
/* 宣告
/*===================================================================*/
var data = (localStorage.getItem('mytodoList')) ? JSON.parse(localStorage.getItem('mytodoList')):{
  todo: [],
  completed: []
};



/*===================================================================*/
/*  (待研究)儲存資料
/*===================================================================*/
function dataObjectUpdated() {
  localStorage.setItem('mytodoList', JSON.stringify(data));
}



/*===================================================================*/
/*  (待研究)讀取資料
/*===================================================================*/
// function renderTodoList() {
// };

// renderTodoList();



/*===================================================================*/
/* 切換Task狀態：完成/未完成
/*===================================================================*/
var todoTask = document.getElementById('content-todo');
var completedTask = document.getElementById('content-completed');

function checkTask() {

  var li = this.parentNode;
  var ul = li.parentNode;
  var id = ul.id;

  if (id === 'content-todo') {
    completedTask.appendChild(li);
  } else {
    todoTask.appendChild(li);
  }
  updateCounter();
}


/*===================================================================*/
/* 點擊新增 Task
/*===================================================================*/
var checkSVG = '<svg class="icon icon-check" aria-hidden="true"><use xlink:href="#icon-check"></use></svg>';
var removeSVG = '<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg>';
var orderSVG = '<svg class="icon icon-favorfill" aria-hidden="true"><use xlink:href="#icon-favorfill"></use></svg>';


/* Step 4 : 刪除事件 */
function removeTask(){
  // 移除li
  var li = this.parentNode.parentNode; /* this => <button class="btn-remove"><svg> */
  var ul = li.parentNode;
  var id = ul.id;
  var value = li.querySelector('.task-name').textContent; 
  console.log(value);

  ul.removeChild(li);
  updateCounter();

  // 移除資料，以比對 Task 名稱的方式，移除資料（若有相同名稱則會抓到排在陣列較前面的)我需要知道在是在第幾個li
  if (id === 'content-todo'){
    data.todo.splice(data.todo.indexOf(value),1)
  }

  dataObjectUpdated();
}


/* Step 3 : 新增 Task */
function createTask(newTaskName) {

  // 清除輸入的值
  document.getElementById('input-addtask').value = '';

  // 建構 Task 元件
  var li = document.createElement('li');

  // Task Name
  var taskName = document.createElement('input');
  taskName.className = 'task-name';
  taskName.value = newTaskName;

  // Create - Check Btn
  var btnCheck = document.createElement('button');
  btnCheck.className = 'btn-check';
  btnCheck.innerHTML = checkSVG;

  // Create - Order Btn
  var btnOrder = document.createElement('button');
  btnOrder.innerHTML = orderSVG;

  // Create - Remove Btn
  var btnRemove = document.createElement('button');
  btnRemove.className = 'btn-remove';
  btnRemove.innerHTML = removeSVG;

  // Create - div.btn-group 
  var btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';
  btnGroup.appendChild(btnOrder);
  btnGroup.appendChild(btnRemove);

  // 顯示到 HTML
  li.appendChild(btnCheck);
  li.appendChild(taskName);
  li.appendChild(btnGroup);

  todoTask.appendChild(li);

  // Create - Edit 元件
  var formEl = document.createElement('form');
  formEl.className = 'panel-edit';
  var editEl = `<!-- Add Date -->
        <div class="edit-item">
          <svg class="icon icon-calendar" aria-hidden="true"><use xlink:href="#icon-calendar"></use></svg>
          新增日期
          <div class="edit-item-content">
            <input type="text" class="input-date input-datepicker" placeholder="選擇日期" id='id'>
            <input type="text" class="input-time input-datepicker" placeholder="選擇日期">
          </div>
        </div>
        <!-- Add File -->
        <div class="edit-item">
          <svg class="icon icon-link" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>
          附檔
          <div class="edit-item-content">
            <label class="add-file">
              <svg class="icon icon-add" aria-hidden="true"><use xlink:href="#icon-add"></use></svg>
              <input type="file" accept=".jpg, .jpeg, .png" class="add-file" multiple>
            </label>
          </div>
        </div>
        <!-- Add Comment -->
        <div class="edit-item">
          <svg class="icon icon-comment" aria-hidden="true"><use xlink:href="#icon-comment"></use></svg>
          備註
          <div class="edit-item-content">
            <textarea placeholder="新增詳細資訊"></textarea>
          </div>
        </div>
        <!-- Btn Save & Cancel -->
        <div class="buttons">
          <button class="btn-cancel">
            <svg class="icon icon-close" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>
            取消
          </button>
          <button class="btn-save" type="submit">
            <svg class="icon icon-copy" aria-hidden="true"><use xlink:href="#icon-copy"></use></svg>
            確認新增
          </button>
        </div>`;
  formEl.innerHTML = editEl;
  li.appendChild(formEl);
  

  taskName.addEventListener('click', checkTaskExist, false);


  // 新增的 Task 排在最前面 
  // todoTask.insertBefore(li, todoTask.childNodes[0]);
  // insertBefore(要放入的節點, 要放入的位置.第幾個子節點)

  
  // 儲存資料
  data.todo.push(newTaskName);
  dataObjectUpdated();



  // 監聽remove按鈕，觸發事件
  btnRemove.addEventListener('click', removeTask, false);

  // 監聽check按鈕，觸發事件
  btnCheck.addEventListener('click', checkTask, false);

  // // 監聽優先順序按鈕
  btnOrder.addEventListener('click', orderTask, false);


}


/* Step 1 */
var btnAdd = document.getElementById('btn-addTask');
btnAdd.addEventListener('click', function(){

  /* Step 2 : 判斷是否有輸入文字，有的話新增 Task項目 */
  var newTaskName = document.getElementById('input-addtask').value;
  if (newTaskName) {
    createTask(newTaskName);
  }

}, false);



/*===================================================================*/
/* 點擊 Task Name 展開 Edit 面板
   第二次點擊，會收起面板
/*===================================================================*/
var taskNameEl = document.getElementsByClassName('task-name');


// 最初載入 & Task DOM 元件變動皆重新抓取 Task 數量
// function checkTaskExist() {
//   var taskNameEl2 = document.getElementsByClassName('task-name');
//   for (var i = 0; i < taskNameEl2.length; i++) {
//     taskNameEl2[i].addEventListener('click', taskEdit, false);
//   }
// }



/*===================================================================*/
/* 偵測 DOM 結構改變而觸發事件
/*===================================================================*/
var counterTodo, counterCompleted;
var counterTodoEl = document.getElementById('counter-todo');
var counterCompletedEl = document.getElementById('counter-completed');

function updateCounter(){
  counterTodo = todoTask.getElementsByTagName('li').length; 
  counterTodoEl.textContent = counterTodo;

  counterCompleted = completedTask.getElementsByTagName('li').length; 
  counterCompletedEl.textContent = counterCompleted;

}

todoTask.addEventListener('DOMNodeInserted', updateCounter, false);



/*===================================================================*/
/* 優先順序功能
/*===================================================================*/
function orderTask() {
  var li = this.parentNode.parentNode;
  var ul = li.parentNode;
  var noStarPosition = $('ul').find($('button.active')).length;
  
  if( this.hasAttribute('class')){
    this.removeAttribute('class');
    // Task 解除星號，該 Task 的位置會調到最後一個星號 Task 的後面
    ul.insertBefore(li, ul.childNodes[noStarPosition]);
  } else {
    this.className = 'active';
    // Task 加上星號標記，該 Task 的位置會排到第一順位
    ul.insertBefore(li, ul.childNodes[0]);
  };
};



/*===================================================================*/
/* init
/*===================================================================*/

function init(){
  updateCounter();
  // checkTaskExist();
  sortableEl();
}


// 執行初始化
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

});