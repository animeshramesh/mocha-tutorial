var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({

    content: {type: String, required: true, maxlength: 140},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    creator: {type: String, required: true}

});

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;