$(function(){
  function buildHTML(message){
    var img = (message.image.url !== null)? `<img src="${message.image.url}">` : '';
   
    var html = ` 
               <div class="message" data-id='${message.id}' >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                <div class="lower-meesage">
                <p class="lower-message__content">
                   ${message.content}
                </p>
                ${img}
                </div>
                </div>`
                
    return html;
  }
  var reloadMessages = function() {
    
      var path = location.pathname
      
    if (path.includes("/messages")){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').attr("data-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: ('api/messages'),
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: { id:last_message_id }
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      if (messages.length !== 0) {
      messages.forEach(function(message){
        var html = buildHTML(message);
        $('.ajax-message').append(html)
      });
        $('.messages').animate({
          scrollTop: $(document).height()
        })
      
    }
    else {
    }
    })
    .fail(function() {
      alert('error');
    });
  }

  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.ajax-message').append(html)
    $('.form__message').val('')
    $('.hidden').val('')
    $('.form__submit').prop('disabled', false); 
  })
  .fail(function(){
    alert('error');
    $('.form__submit').prop('disabled', false); 
  })
  $('.messages').animate({
    scrollTop: $(document).height()
  })
})

// ドメイン以下のパス名が /sample/sample.html の場合に実行する内容 
setInterval(reloadMessages, 5000);
})
