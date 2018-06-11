/*===================================================================*/
/* jQuery
/*===================================================================*/

$(document).ready(function(){

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