//get modules to use
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var keys = require("./keys");

var userInput = process.argv;

//take the twitterKeys object from 
//keys.js and import it into Twitter
var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret, 
    access_token_key: keys.access_token_key, 
    access_token_secret: keys.access_token_secret
});

if(userInput[2] === "movie-this") {
    console.log('will get me movie info');
}

if(userInput[2] === "my-tweets") {
    var params = {q: 'susantarnowski1', count: 20};
    client.get('search/tweets', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets.statuses);
        // console.log(tweets.statuses[0].text);
        for(var i = 0; i < tweets.statuses.length; i++){
            console.log(tweets.statuses[i].text);
        }
      } else {
          console.log(error);
      }
    });
}