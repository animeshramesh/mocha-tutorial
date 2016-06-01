var express = require('express');
var router = express.Router();
var Tweet = require('../models/Tweet');


// Create Tweet
router.post('/', function(req, res, next) {
    console.log("API hitting");
    Tweet.create(req.body, function(err, tweet){
        if (!err) res.send(tweet);
    });
});

// GET all tweets
router.get('/', function(req, res, next) {
    Tweet.find({}, function(err, tweets){
        if (!err) res.send(tweets);
    });
});

// Get tweet by _id
router.get('/:tweetId', function(req, res, next) {
    Tweet.findOne({"_id":req.params.tweetId}, function(err, tweet){
        if (!err) res.send(tweet);
    });
});

// Edit tweet
router.put('/:tweetId', function(req, res, next) {
    Tweet.update({"_id":req.params.tweetId}, req.body, function(err, num, response){
        if (!err) res.send(num);
    });
});

// Delete tweet
router.delete('/:tweetId', function(req, res, next) {
    Tweet.remove({"_id":req.params.tweetId}, function(err, removed){
        if (!err) res.send(removed);
    });
});


module.exports = router;

