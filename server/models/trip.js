var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var TripSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      minlength: 5,
   },
   description: {
      type: String,
      minlength: 20,
   },
   rating:{
      type: Number,
      min: 0,
      max: 10,
   },
   region: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
   area: {
      type: String,
      required: false,
   },
   coordinates: {
      type: [Number],
      required: false,
   },
   posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
   _user: {type: Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

var Trip = mongoose.model('Trip', TripSchema);
