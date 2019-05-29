$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user= "${user}" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`
  return html
   }
   function appendErrMsgToHTML(msg) {
    var html = `<div>
                  <div class='listview__element--right-icon'>${ msg }</div>
                </div>`
                return html
   }
   function definedUser(name, id) {
     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
     <input name='group[user_ids][]' type='hidden' value='${id}'>
     <p class='chat-group-user__name'>${name}</p>
     <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' >削除</div>
   </div>`
   return html
   }
  $(document).on('turbolinks:load', function(){ 
  $(".chat-group-user-form__input").on("keyup", function() {
    var input = $(".chat-group-user-form__input").val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })
  
  .done(function(users) {
    $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        var html = appendUser(user);
        $('#user-search-result').append(html)
      });
    }
    else {
      var html = appendErrMsgToHTML("一致するユーザーが見つかりません");
      $('#user-search-result').append(html)
    }
  })
  .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
})

$('#user-search-result').on('click', '.chat-group-user__btn', function(){
  $(this).parent().remove();
  var name = $(this).attr('data-user-name')
  var id = $(this).attr('data-user-id')
  var html = definedUser(name, id);
  $('#user-defined-result').append(html)
});

$('#user-defined-result').on('click', '.user-search-remove', function(){
  $(this).parent().remove();
  });
})
});
