//get modules to use
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");

var action = process.argv[2];
var userInput = process.argv[3];

//take the twitterKeys object from 
//keys.js and import it into Twitter
var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret, 
    access_token_key: keys.access_token_key, 
    access_token_secret: keys.access_token_secret
});

var spotifyClient = new Spotify({
    id: "568cf1cde13d43cd868f56e59435e241",
    secret: "61ce0dc4b9f8434bb21935e3de8bfee8",
});


if(action === "movie-this") {
    request("http://www.omdbapi.com/?t=" + userInput + "&apiKey=40e9cece", function (error, response, body) {
        if(error) {
            console.log("error:", error);
        } else {
            var bodyObject = JSON.parse(body);
            console.log("Title", bodyObject.Title);
            console.log("Year", bodyObject.Year);
            console.log("Rating", bodyObject.Ratings[1].Value);
            console.log("Country", bodyObject.Country);
            console.log("Language", bodyObject.Language);
            console.log("Plot", bodyObject.Plot);
            console.log("Actors", bodyObject.Actors);
        }
    });
}

if(action === "my-tweets") {
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

if(action === "spotify-this-song") {
    spotifyClient.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var result = data.tracks.items[0];
        // console.log(result);
        console.log("Artist:", result.album.artists[0].name);
        console.log("Song Name:", result.name);
        console.log("Album:", result.album.name);
        console.log("Preview Link:", result.album.external_urls.spotify);

    });
}