
var express = require('express'),
router = express.Router(),
repo = require('../models/postRepository');
repo.loadPosts();

/* GET home page. */
router.get('/', function(req, res) {
  var allPosts = repo.getPosts();
 // var blogPosts = { posts: [] };
 //res.end();

 /* blogPosts.posts.push({
    id: "123",
    title: "My First Blog Post",
    author: {
      fName: "Jeff",
      lName: "Ammons",
      email: "jeffa@codecareeracademy.com"
    },
    content: "<h1>Hello, World!</h1>"
  });
  blogPosts.posts.push({
    id: "second-post",
    title: "My Second Blog Post",
    author: {
      fName: "Jeff",
      lName: "Ammons",
      email: "jeffa@codecareeracademy.com"
    },
    content: "<h1>Hello, Again World!</h1>"
  });*/

  res.render('index', {allPosts: allPosts});

  // res.render('index', { title: 'My Blog',
  //   author: "Jeff",
  //   randomNumber: Math.random() });
});




module.exports = router;
