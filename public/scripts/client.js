/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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

////////////
//Functions
////////////

//Calculate the difference in dates
const dateDifferenceCalculator = function(tweetDate) {

  let today = new Date();
  let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let convertedTweetDate = new Date(tweetDate);
  let differenceInTime = Date.now() - convertedTweetDate.getTime();

  return Math.floor(differenceInTime / 86400000);

}

//Rendering the tweets
const renderTweets = function(tweetObjs) {

  for (let tweet of tweetObjs) {
    let newTweet = createTweetElement(tweet);
    $(".tweetFeed").append(newTweet);
  }

}

//On Load
$(document).ready(function() {

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  }

  loadTweets();
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
    
    if (!tweetContent || tweetContent.length > 140) {
      //Don't submit 
      alert("Error: The field is either empty or you are over the character limit.");
    } else {
      //Submit
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets', { method: 'POST' })
      .then(function (index) {
        console.log('Success: ', index);
    });
    }

    
  });
});
