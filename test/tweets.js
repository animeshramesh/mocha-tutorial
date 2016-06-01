var chai = require('chai');
var should = chai.should();
var request = require('supertest');
var server = require('../app');
var Tweet = require('../models/Tweet');


describe('Tweet Test suite', function(){

    beforeEach(function(done) {
        Tweet.remove({}, function(){
            done();
        });
    });

    afterEach(function(done) {
        Tweet.remove({}, function(){
            done();
        });
    });

    describe('Tweet Create', function(){
        it('should create a tweet successfully', function(done){
            request(server)
                .post('/tweets/')
                .send({"content":"Test content", "creator":"Animesh"})
                .end(function(error, response){
                    response.body.content.should.equal("Test content");
                    response.body.creator.should.equal("Animesh");
                    response.body._id.length.should.be.above(0);
                    done();
                });
        });

        it('should read a tweet successfully', function(done){
            request(server)
                .post('/tweets/')
                .send({"content":"Test content", "creator":"Animesh"})
                .end(function(error, response){

                    request(server)
                        .get('/tweets/'+response.body._id)
                        .end(function(error, res){
                            res.body.content.should.equal("Test content");
                            res.body.creator.should.equal("Animesh");
                            res.body._id.length.should.be.above(0);
                            done();
                        });


                });
        });

        it('should update a tweet successfully', function(done){
            request(server)
                .post('/tweets/')
                .send({"content":"Test content", "creator":"Animesh"})
                .end(function(error, response){

                    request(server)
                        .put('/tweets/'+response.body._id)
                        .send({"content":"Test content - update", "creator":"Anim"})
                        .end(function(error, res){
                            res.body.ok.should.equal(1);
                            res.body.nModified.should.equal(1);
                            done();
                        });
                });
        });

        it('should delete a tweet successfully', function(done){
            request(server)
                .post('/tweets/')
                .send({"content":"Test content", "creator":"Animesh"})
                .end(function(error, response){

                    request(server)
                        .delete('/tweets/'+response.body._id)
                        .end(function(error, res){
                            res.body.ok.should.equal(1);
                            res.body.n.should.equal(1);
                            done();
                        });
                });
        });
    });

});


