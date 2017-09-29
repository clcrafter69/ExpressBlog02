
var express = require('express'),
router = express.Router(),
repo = require('../models/postRepository');
repo.loadPosts();
var allPosts; 

/* GET home page. */
router.get('/', function(req, res) {

  //retrieve posts in descending date order
   allPosts = repo.getPosts();

  //Create and load navigation
  var pageNav =  [{ Link: '/Training', Text: 'Home' },{ Link: '/Training', Text: 'Training' }, { Link: '/NewPost',
  Text: 'Add Post' }, { Link: '/Training', Text: 'About Me'}];

  res.render('index', { pageNav: pageNav, allPosts: allPosts});


});

router.get('/:id',function(req,res)
{
   var id =req.params.id;
   var singlePost = repo.getPostById(id);
   res.render ('singlePost',{ post: singlePost});

});






module.exports = router;
