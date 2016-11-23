var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var Trip = mongoose.model('Trip');

function response_additions(err, data) {
    if (err) {
        this.json({
            error: err
        });
    }
    this.json({
        data
    });
}

console.log('posts controller');
module.exports = {
   getPosts: function(req,res){
      Post.find({}).populate('_user').populate({path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}).sort('-createdAt').exec(function(err, posts){
         if(err){
            console.log('loading error');s
            return res.sendStatus('500');
         }else{
            console.log('successfully getting posts');
         }
         res.json(posts);
      })
   },
   newPost: function(req,res){
      User.findOne({_id: req.params.id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            var post = new Post(req.body);
            post._user = req.session.user._id;
            post.save(function(err){
               user.posts.push(post);
               user.save(function(err){
                  if(err){
                     console.log('post loading error');
                     return res.sendStatus('500');
                  }else{
                     console.log('successfully added a new post');
                     res.json(post);
                     req.session.user = user;
                  }
               })
            })
         }
      })
   },
   newComment: function(req,res){
      Post.findOne({_id: req.params.id}, function(err, post){
         if(err){
            return res.sendStatus('500');
         }else{
            var comment = new Comment(req.body);
            console.log(req.body)
            comment._post = post._id;
            User.findOne({_id: req.session.user._id},function(err, user){
               if(err){
                  return res.sendStatus('500');
               }else{
                  console.log("user",user)
                  comment._user = user._id;
                  comment.save(function(err){
                     post.comments.push(comment);
                     post.save(function(err){
                        user.comments.push(comment);
                        user.save(function(err){
                           if(err){
                              console.log('post loading error');
                              return res.sendStatus('500');
                           }else{
                              console.log('successfully added a new comment');
                              res.json(comment);
                           }
                        })
                     })
                  })
               }
            })
         }
      })
   }
   // delete: function(req,res){
   //    User.remove({_id: req.params.id}, function(err){
   //       if(err){
   //          console.log('issues deleting a user')
   //       } else {
   //          console.log("successfully deleted a user!");
   //          res.sendStatus(200);
   //       }
   //    })
   // },
   // getUser: function(req,res){
   //    User.findOne({_id: req.params.id}, function(err, user){
   //       if(err){
   //          console.log('loading error');
   //          return res.sendStatus('500');
   //       }else{
   //          console.log('successfully getting user');
   //          res.json(user);
   //       }
   //    })
   // },
   // show: function(req,res){
   //    User.findOne({_id: req.params.id}, function(err, user){
   //       if(err){
   //          console.log('loading error');
   //          return res.sendStatus('500');
   //       }else{
   //          console.log('successfully getting user');
   //          res.json(user);
   //       }
   //    })
   // }
}
