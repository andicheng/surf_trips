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

console.log('trips controller');
module.exports = {
   index: function(req,res){
      Trip.find({}).populate('_user').populate({path:'posts',model:'Post',populate:{path:'_user',model:'User'}}).sort('-rating').exec(function(err, trips){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting trips');
         }
         res.json(trips);
      })
   },
   areaTrips: function(req,res){
      Trip.find({area: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting area trips');
         }
         res.json(trips);
      })
   },
   regionTrips: function(req,res){
      Trip.find({region: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting region trips');
         }
         res.json(trips);
      })
   },
   userTrips: function(req,res){
      User.findOne({_id: req.params.id}).exec(function(err, user){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            Trip.find({_user: user}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
               if(err){
                  console.log('loading error');
                  return res.sendStatus('500');
               }else{
                  console.log('successfully getting user trips');
               }
               res.json(trips);
            })
         }
      })
   },
   newTrip: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            var trip = new Trip(req.body);
            if(req.body.area2){
               trip.area = req.body.area2;
            }else{
               trip.area = req.body.area.area;
            }
            trip._user = req.session.user._id;
            trip.save(function(err){
               user.trips.push(trip);
               user.save(function(err){
                  if(err){
                     console.log('trip loading error');
                     res.sendStatus('500');
                  }else{
                     console.log('successfully added a new trip');
                     res.json(trip);
                  }
               })
            })
         }
      })
   },
   newPost: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Trip.findOne({_id: req.params.id}, function(err, trip){
               var post = new Post(req.body);
               post._user = user._id;
               post.save(function(err){
                  user.posts.push(post);
                  user.save(function(err){
                     trip.posts.push(post)
                     trip.save(function(err){
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
               })
            })
         }
      })
   },
   newComment: function(req,res){
      console.log('***************', req.body)
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Post.findOne({_id: req.params.id}, function(err, post){
               var comment = new Comment(req.body);
               comment._user = user._id;
               comment.save(function(err){
                  user.comments.push(comment);
                  user.save(function(err){
                     post.comments.push(comment)
                     post.save(function(err){
                        if(err){
                           console.log('comment loading error');
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a new comment');
                           res.json(comment);
                           req.session.user = user;
                        }
                     })
                  })
               })
            })
         }
      })
   },
}
