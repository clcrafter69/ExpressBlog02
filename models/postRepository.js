var fs = require('fs'),
    path = require('path');

var filePath = path.join(__dirname, 'data');
var fileName = path.join(filePath, 'blogPost.json');

var postList = [];

var loadPosts = function loadPosts() {
    if(postList.length < 1) {
        fs.stat(fileName, (err, stat) =>{
            if(err) {
                console.log("Couldn't find posts file. " + err.message);
             //   savePosts();
            } else {
                fs.readFile(fileName, 'utf8', (err, data)=>{
                    if(err) {
                        console.log("Couldn't read posts file. " + err.message);
                        throw err;
                    }

                   var newPosts = JSON.parse(data);
                    if(newPosts.length > 0){
                        postList = newPosts;
                        //sort the array to display posts in descending order
                        postList.sort(function(a, b) {
                               return b.id - a.id;
                        });
                    }
             
                });
            }
        });
    }
};


var writeFile = function writeFile(){
    var json = JSON.stringify(postList);
    fs.writeFile(fileName, json, (err)=>{
        if(err){
            console.log("Error writing file. " + err.message);
            throw err;
        }

        console.log("The file has been saved.");
    });
};

var savePosts = function savePosts() {
    fs.stat(filePath, (err, stat) => {
        if(err){
            fs.mkdir(filePath, (err) => {
                console.log("Error creating directory. " + err.message);
                writeFile();
            });
        } else {
            writeFile();
        }
    });
};

// loadPosts();

var repo = {
    postCount: postList.length,

    getPosts: () => {
      /*  if(postList.length < 1) {
            loadPosts();
        }*/
        return postList;
    },
    getPostById: (postId) => {
        if(postList.length < 1) {
            loadPosts();
        }
       return postList.find((post) =>{
            return post.id == postId;
       });
    },
    addPost: (newPost) => {
        if(postList.length < 1){
            loadPosts();
        }
        postList.push(newPost);
        savePosts();
   },

   savePosts: savePosts,
   writeFile: writeFile,
   loadPosts: loadPosts,
   postList: postList
};

module.exports = repo;