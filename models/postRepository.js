var fs = require('fs'),
    path = require('path');

const dateformat = require('dateformat');

var filePath = path.join(__dirname, 'data');
var fileName = path.join(filePath, 'blogPost.json');

var postList = [];
var seqArray = [];
var maxSeqID =0;

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
                        
                      //  var testdate = dateformat(new Date(postList[0].pubDate),'mmmm dS, yyyy');
                        //sort the array to display posts in descending order
                        postList.sort(function(a, b) {
                              // return new Date(b.id)- new Date(a.id);
                              return (b.id)- (a.id);
                              //return new Date(b.pubDate)- new Date(a.pubDate);
                        });
                       // formatDate();
                      // maxSeqID =createSequenceID();
                    }
             
                });
            }
        });
    }
};

/*format dates in postRepository JSON file*/
var formatDate = function formatDate(){
   for (var i =0;i < postList.length; i++)
   {
       postList[i].pubDate = dateformat(new Date(postList[i].pubDate),'mmmm dS, yyyy');
   }
};

var createSequenceID = function createSequenceID()
{
           //create sequence ID

           for (var i =0; i < postList.length; i++)
           {
               seqArray.push(postList[i].id);
           }
         return Math.max.apply(null, seqArray);  
 }

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


var repo = {
    postCount: postList.length,
     seqID: maxSeqID,
    getPosts: () => {
      /*  if(postList.length < 1) {
            loadPosts();
        }*/
        return postList;
    },
    getPostById: (postId) => {
       /* if(postList.length < 1) {
            loadPosts();
        }*/
       return postList.find((post) =>{
            return post.id == postId;
       });
    },
    addPost: (newPost) => {
        if(postList.length < 1){
            loadPosts();
        }
        //format date before saving

        newPost.pubDate = dateformat(new Date(newPost.pubDate),'mmmm dS, yyyy');
        postList.push(newPost);
        savePosts();
   },

   createSequenceID: () =>{
       if(postList.length < 1)
       {
           loadPosts();
       }
       createSequenceID();
   }, 

   savePosts: savePosts,
   writeFile: writeFile,
   loadPosts: loadPosts,
   postList: postList
};

module.exports = repo;