$(function(){
  function buildHTML(message){
    var img = (message.image.url !== null)? `<img src="${message.image.url}">` : '';
   
    var html = ` 
               <div class="message">
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
    $('.form__message').val('').reset()
    $('.hidden').val('').reset()
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

})
