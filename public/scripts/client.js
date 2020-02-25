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
  let username = $("<span>");
  let tweetFooter = $("<div>").addClass("tweetFooter");
  let daysAgoPosted = $("<span>").text("10 days ago"); //Need to learn how to calculate the amount of days
  let footerIcons = $("<span>").text("Icons");


  tweetFooter.append(daysAgoPosted);
  tweetFooter.append(footerIcons);

  userImg.attr("src", tweetObj.user.avatars);

  person.append(userImg);
  person.append(tweetObj.user.name);
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

