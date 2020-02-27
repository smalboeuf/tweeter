////////////
//Functions
////////////

//Event handler for when they make a tweet
const createTweetElement = function (tweetObj) {

  let tweetElement = $("<div>").addClass("tweet");
  let profile = $("<div>").addClass("profile");
  let person = $("<div>").addClass("person");
  let userImg = $("<img>").addClass("tweetPic");

  //Settings content of the tweet
  let tweetContent = $("<span>").addClass("tweetContent").text(tweetObj.content.text);
  let username = $("<span>").addClass("handle").text(tweetObj.user.handle);;
  let tweetFooter = $("<div>").addClass("tweetFooter");


  //Calculating how many days ago this was created
  let tweetDate = new Date(tweetObj.created_at)
  let daysAgoPosted = $("<span>").text(dateDifferenceCalculator(tweetDate) + " days ago");

  //Add icons
  let heartIcon = $("<i>").addClass("fa fa-heart icons");
  let flagIcon = $("<i>").addClass("fa fa-flag icons");
  let retweetIcon = $("<i>").addClass("fa fa-retweet icons");

  //Adding Icons
  let footerIcons = $("<span>");
  footerIcons.append(heartIcon);
  footerIcons.append(flagIcon);
  footerIcons.append(retweetIcon);
  tweetFooter.append(daysAgoPosted);
  tweetFooter.append(footerIcons);

  //User Profile
  userImg.attr("src", tweetObj.user.avatars);
  person.append(userImg);
  
  //User's Name
  let usersName = $("<span>").addClass("name").text(tweetObj.user.name);;
  person.append(usersName);
  profile.append(person);

  //Handle tag
  profile.append(username);

  //Bringing together all crafted elements
  tweetElement.append(profile);
  tweetElement.append(tweetContent);
  tweetElement.append("<br>");
  tweetElement.append("<br>");
  tweetElement.append("<hr>");
  tweetElement.append(tweetFooter);

  return tweetElement;
}

//Calculate the difference in dates
const dateDifferenceCalculator = function(tweetDate) {

  let convertedTweetDate = new Date(tweetDate);
  let differenceInTime = Date.now() - convertedTweetDate.getTime();

  return Math.floor(differenceInTime / 86400000);

}

//Rendering the tweets
const renderTweets = function(tweetObjs) {

  for (let tweet of tweetObjs) {
    let newTweet = createTweetElement(tweet);
    $(".tweetFeed").prepend(newTweet);
  }

}

//Validate tweets
const tweetValidationCheck = function (tweetContent) {
  if (!tweetContent || tweetContent.length > 140) {
    return false;
  } else {
    $(".errorMessage").slideUp();
    return true;
  }
}

//Ajax request for tweets
const loadTweets = function () {

  $.ajax({
    method: 'GET',
    url: "http://localhost:8080/tweets"
  })
  .done(renderTweets);
}

//Load new tweet
const loadNewTweet = function () {
  $.ajax({
    method: 'GET',
    url: "http://localhost:8080/tweets"
  })
  .done(renderNewTweet);
}
//Make tweet appear on page
const renderNewTweet = function (tweets) {
  let newTweet = createTweetElement(tweets[tweets.length - 1]);
  $(".tweetFeed").prepend(newTweet);
}

//Toggle drawer effect on specific div
const toggleSlide = function () {
  $(".drawer").toggleClass("slide-out");
}

//Scroll to the top of the page
const scrollToTop = function () {
  $("#writeATweet").scroll();
}

//On Load
$(document).ready(function() {

  loadTweets();

  $(".circleClicker").hide();
  $(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
      $(".circleClicker").fadeIn();
    } else {
      $(".circleClicker").fadeOut();
    }
  });
});


////////////////
//AJAX requests
////////////////

$("#addNewTweet").submit(function(event) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});

$(function() {
  const $button = $('#addNewTweet');
  $button.on('click', function (event) {
    event.preventDefault(); 
    
    let tweetContent = $("#tweetChars").val();

    if (tweetValidationCheck(tweetContent)) {
      //Submit
      console.log('Button clicked, performing ajax call...');

      let postData = {
        //My specific info
        // "user": {
        //   "name": "Sheldon",
        //   "avatars": "https://i.imgur.com/73hZDYK.png"
        //   ,
        //   "handle": "@SeaShel"
        // },

          "text": tweetContent,
    
      };
      
      $.ajax({
        method: 'POST',
        url: "http://localhost:8080/tweets",
        data: postData
      })
      .done(loadNewTweet);

      $("#tweetChars").val("");
      
    } else {
      //Don't submit 
      $(".errorMessage").slideDown();
    }
  });
});
