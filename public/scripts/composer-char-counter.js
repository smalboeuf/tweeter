$(document).ready(function() {
  // --- our code goes here ---

  //Event Handlers
  $('#tweetChars').keydown(() => {
    let maxChars = 140;
    let currentCharLength = $('#tweetChars').val().length + 1;

    if (maxChars - currentCharLength < 0) {
      console.log("Here");
      $('.counter').css('color', 'red');
    }

    $('.counter').html(maxChars - currentCharLength);
    
  });

});

