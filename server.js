var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    session  = require('express-session'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8888,
    app      = express();
var colors = require('colors/safe');
var sessionConfig = {
   secret: 'Secret',
   resave: false,
   saveUninitialized: true,
   name: 'myCookie',
   cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 3600000
   }
}
app.use(session(sessionConfig));

app.use(express.static(path.join( root, 'client' )));
app.use(express.static(path.join( root, 'bower_components' )));

app.use(express.static("unprotected/static/path"))
app.use(express.static("protected/static/path"))

app.use(bp.json({extended:true}));
app.use(bp.urlencoded({extended:true}));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

app.listen( port, function() {
  console.log( `server running on port ${port}` );
});
