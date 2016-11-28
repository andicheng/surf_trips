var mongoose = require('mongoose');
var users = require('./../controllers/users.js');
var posts = require('./../controllers/posts.js');
var trips = require('./../controllers/trips.js');

module.exports = function(app){
   // app.post('/users/username', users.username);
   app.post('/users/registration', users.register);
   app.post('/users/login', users.login);
   app.get('/currentUser', users.getCurrent);
   app.get('/trips', trips.index);
   app.get('/areaTrips/:id', trips.areaTrips);
   app.get('/countryTrips/:id', trips.countryTrips);
   app.get('/regionTrips/:id', trips.regionTrips);
   app.get('/userTrips/:id', trips.userTrips);
   app.get('/users', users.index);
   app.use(userAuth);
   app.post('/newTrip', trips.newTrip);
   app.post('/newPost/:id', trips.newPost);
   app.post('/newComment/:id', trips.newComment);
   app.get('/logout', users.logout);
   app.delete('/users/:id', users.delete);
   // app.get('/posts', posts.getPosts);
   app.post('/newComment/:id', posts.newComment);
}

function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}
