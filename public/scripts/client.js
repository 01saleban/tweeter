/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
$(document).ready(function () {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      for (let tweet of tweets) {
        $('#tweets-container').prepend(createTweetElement(tweet));
      }
    }

  const loadTweets = function() {
    $.ajax({ 
      method: 'GET',
      url: 'http://localhost:8080/tweets',

    }).then((response) => {
      console.log("RESPONSE: ")
      console.log(response);
      renderTweets(response);
    })
  };

  const $newTweet = $('#new-tweet');
  loadTweets();
  $newTweet.submit(function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    if (validateTweet()) {
      $.post('/tweets', $('#new-tweet').serialize(), function() {
        console.log("anythinggg");
        loadTweets();
      })
    }
  });



  // loadTweets();

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const validateTweet = function() {
    const length = $('#tweet-text').val().length;
    console.log("length: " + length);
    let error = $('.invalid-text').slideUp()
    if (length === 0) {
      error.text('You have not written anything! &#9888;').slideDown();
      return false;
    } else if (length > 140) {
      error.text('Too long!').slideDown();
      return false;
    }
    error.slideUp();
    return true;

  }



  const createTweetElement = function(tweet) {
    let date = new Date(tweet.created_at);

    return `
    <article class="tweet">
    <header>
      <div class="info">
        <img src=${tweet.user.avatars} class="avatar"/>
        <span class="name">${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <p class="tweetData">${escape(tweet.content.text)}</p>
    <footer>
      <span class="date">${date}</span>
      <span class ="icons">&#127988 &#128257 &#128153</span>
    </footer>
    </article>
    `
  }

  renderTweets(data);

}); 
