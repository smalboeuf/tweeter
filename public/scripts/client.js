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
  let tweetContent = $("<span>").addClass("tweetContent");
  let username = $("<span>").addClass("handle");
  let tweetFooter = $("<div>").addClass("tweetFooter");


  //Calculating how many days ago this was created
  let tweetDate = new Date(tweetObj.created_at)
  let daysAgoPosted = $("<span>").text(dateDifferenceCalculator(tweetDate) + " days ago");

  //Add icons
  let heartIcon = $("<i>").addClass("fa fa-heart icons");
  let flagIcon = $("<i>").addClass("fa fa-flag icons");
  let retweetIcon = $("<i>").addClass("fa fa-retweet icons");

  let footerIcons = $("<span>");
  footerIcons.append(heartIcon);
  footerIcons.append(flagIcon);
  footerIcons.append(retweetIcon);
  

  tweetFooter.append(daysAgoPosted);
  tweetFooter.append(footerIcons);

  userImg.attr("src", tweetObj.user.avatars);

  person.append(userImg);
  let usersName = $("<span>").addClass("name");
  usersName.text(tweetObj.user.name);
  person.append(usersName);
  profile.append(person);

  //Username tag
  username.text(tweetObj.user.handle);
  profile.append(username);

  //Setting content of the tweet
  tweetContent.text(tweetObj.content.text);

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

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

//On Load execute new tweet

$(document).ready(function() {

  //Creating a new tweet and appending it to the tweet feed
  // const $tweet = createTweetElement(tweetData);
  // $(".tweetFeed").append($tweet);

  renderTweets(data);


});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

