
var express = require('express'),
router = express.Router(),
repo = require('../models/postRepository');
repo.loadPosts();

/* GET home page. */
router.get('/', function(req, res) {

  //retrieve posts in descending date order
  var allPosts = repo.getPosts();

  //Create and load navigation
  var pageNav =  [{ Link: '/Training', Text: 'Home' },{ Link: '/Training', Text: 'Training' }, { Link: '/NewPost',
  Text: 'Add Post' }, { Link: '/Training', Text: 'About Me'}];

  res.render('index', { pageNav: pageNav, allPosts: allPosts});


});




module.exports = router;
