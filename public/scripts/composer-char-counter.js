//Updates number counter for tweet
$(document).ready(function() {
  $('#tweetChars').keyup(() => {
    let maxChars = 140;
    let currentCharLength = $('#tweetChars').val().length;

    if (maxChars - currentCharLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
    $('.counter').html(maxChars - currentCharLength);
    
  });

});

