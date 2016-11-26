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

console.log('users controller');
module.exports = {
   index: function(req,res){
      User.find({}, function(err, users){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting users');
         }
         res.json(users);
      })
   },
   // username: function(req,res){
   //    User.findOne({username: req.body.username}, function(err, user){
   //       if(user){
   //          if (err){
   //               res.json(err);
   //               console.log('issues saving a new user')
   //          }
   //          else{
   //             req.session.user={first_name: user.first_name,
   //                               last_name: user.last_name,
   //                               _id: user._id};
   //             console.log('successful username login')
   //             res.send(user);
   //          }
   //       }else{
   //          res.json({
   //             errors:{
   //                username:{
   //                   message: "username not valid",
   //                }
   //             }
   //          })
   //       }
   //
   //    })
   // },
   register: function(req,res){
      var user = new User(req.body);
      user.save(function(err, user){
         if (err){
              res.json(err);
              console.log('issues saving a new user')
         }
         else{
            req.session.user={first_name: user.first_name,
                              last_name: user.last_name,
                              username: user.username,
                              _id: user._id};
            console.log('successfully added a new user')
            res.status(200).send("session user established")
         }
      })
   },
   login: function(req,res){
      User.findOne({email: req.body.email}, function(err, user){
         if(err){
            console.log('login errors')
            res.json({
               errors: {
                  login: {
                     message: "user name and/or password is invalid",
                     kind: "what didn't work",
                     path: "reference to the schema's name",
                     value: "cause of the initial error"
                  }
               },
               name: "Validation error"
            });
         }
         else if (!req.body.email || !req.body.password){
            res.json({
               errors: {
                  login: {
                     message: "must enter email and password"
                  }
               },
               name: "Validation error"
            });
         }
         else if (user && user.validPassword(req.body.password)){
            console.log('successfully logged in user');
            req.session.user = {
               first_name: user.first_name,
               last_name: user.last_name,
               username: user.username,
               _id: user._id
            };
            res.send(user);
         }
         else{
            res.json({
               errors: {
                  login: {
                     message: "user name and/or password is invalid",
                     kind: "what didn't work",
                     path: "reference to the schema's name",
                     value: "cause of the initial error"
                  }
               },
               name: "Validation error"
            });
         }
      })
   },
   getCurrent: function(req,res){
      if(typeof req.session.user == 'undefined' || null == req.session.user){
         console.log("************session user", req.session.user)
         res.json();
         console.log("**************** issue getting session user")
      }else{
         User.findOne({_id: req.session.user._id}, function(err, user){
            if(err){
               console.log('issue getting session user');
               res.sendStatus('500');
            }else{
               console.log("get current", user);
               var user = {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  username: user.username,
                  _id: user._id
               };
               res.json(user);
            }
         })
      }
   },
   logout: function(req,res){
      req.session.user=null;
      console.log("user logged out")
      res.status(200).send("session user logged out")
   },
   delete: function(req,res){
      User.remove({_id: req.params.id}, function(err){
         if(err){
            console.log('issues deleting a user')
         } else {
            console.log("successfully deleted a user!");
            res.sendStatus(200);
         }
      })
   },
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
   show: function(req,res){
      User.findOne({_id: req.params.id}, function(err, user){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting user');
            res.json(user);
         }
      })
   }
}

// this.update = function(req,res){
//    console.log(req.params.id)
//    user.findOne({_id: req.params.id}, function(err, user){
//        user.first_name = req.body.first_name;
//        user.last_name = req.body.last_name;
//        user.birthdate = req.body.birthdate;
//        user.save(function(err){
//           if(err){
//              console.log('issues updating a user')
//           } else {
//              console.log("successfully updated a user!");
//              res.sendStatus(200);
//           }
//        })
//     })
// };
