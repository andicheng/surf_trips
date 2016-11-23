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

console.log('comments controller');
module.exports = {
   getC: function(req,res){
      Post.find({}).populate('_user').exec(function(err, posts){
         if(err){
            console.log('loading error');
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
            post._user = user._id;
            post.save(function(err){
               user.posts.push(post);
               user.save(function(err){
                  if(err){
                     console.log('post loading error');
                     return res.sendStatus('500');
                  }else{
                     console.log('successfully added a new post');
                     res.json(post);
                  }
               })
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
