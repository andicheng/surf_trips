var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    session  = require('express-session'),
    path     = require( 'path' ),
    multer   = require('multer'),
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

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
/** Serving from the same express Server
   No cors required */
app.use(express.static('../client'));
// app.use(bp.json());
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
              storage: storage
          }).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
       res.json({error_code:0,err_desc:null});
  })
});

app.listen( port, function() {
  console.log( `server running on port ${port}` );
});
