var express = require('express'),
    router = express.Router(),
    repo = require('../models/postRepository');

    /* GET newpost page. */
   router.get('/index', function(req, res, next){
        res.render('index', { pageNav: pageNav, allPosts: allPosts});
    });


    router.post("/", function(req, res, next){
        var newPost = {};
        newPost.id = req.body.id;
        newPost.title = req.body.title;
        newPost.author = {};
        newPost.author.firstName = req.body.firstName;
        newPost.author.lastName = req.body.lastName;
        newPost.author.email = req.body.email;
        newPost.pubDate = req.body.pubDate;
        newPost.content = req.body.content;

        repo.addPost(newPost);

        res.redirect("/");

        // res.send("DONE! Received: " + req.body.id); // This was our tracer bullet
    });
module.exports = router;