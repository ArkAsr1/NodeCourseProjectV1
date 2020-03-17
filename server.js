/**
 * 1) Create a backend serverNode file that contains data (data house / data authority)
 * 2) Express module Create routes (http url paths) that reach the data for post and get request
 * 3) modify the client side code so that it will do an 'ajax request instead of getting data locally'
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes;
/* try {
    routes = require('./routes/index');

} catch (error) {
    console.log(error); 
} */
//var express = require('express');
var router = express.Router();

let vehicleArray = [];
let orderArray = [];
var ids = 100000; 
// var nextOID = 1; 

var Vehicle = function (vId, vName) {
  this.vId = vId;
  this.vName = vName;
}
/* 
var Order = function(vId, name) {
  this.oId = nextOID;
  this.vId = vId;
  this.name = name;
  
  nextOID = nextOID + 1;
} */
var single = new Vehicle(0, "Single Motor RWD");
var dual = new Vehicle(1, "Dual Motor AWD");
var triple = new Vehicle(2, "Tri Motor AWD");

vehicleArray.push(single);
vehicleArray.push(dual);
vehicleArray.push(triple);


/* data page api */
router.get('/vehicle', function(req, res) {
  // res.render('index', { title: 'My Movies' });
  try {
    res.json(vehicleArray);

  } catch (error) {
      log([JSON.stringify(error), "Error Logging"]); 
      res.json(error); 
  }
});


router.get('/trucks', function( req, res) {
  try {
    res.json(orderArray);

  } catch (error) {
      log([JSON.stringify(error), "Error Logging"]); 
      res.json(error); 
  }
 // console.log(`Gettign truck data ${orderArray}`); 
});


router.get('/delete/:orderId', function( req, res) {
  var id = parseInt(req.params.orderId); 
  var sizeOFArray = orderArray.length; 
  log([id, sizeOFArray, orderArray]); 
   for(let i=0; i < sizeOFArray; i++) {
     if(id == orderArray[i].oId) {
       log(['Found the target!', 'index' + i]); 
     orderArray.splice(i,1);
     break; 
     }
    }

  log(["Something was deleted? ", "orginal Size " + sizeOFArray, orderArray.length]); 
   res.status(200).json(orderArray); // returns back array that is modified 
 });


/* POST to add trucks */
router.post('/addTruck', function(req, res) {
  // console.log(req.body);
  var newObj = req.body; 
  newObj.oId = ids--; 
  orderArray.push(newObj);
  console.log(orderArray);
  //res.sendStatus(200);
  res.status(200).json(orderArray);
});

var log  = (itemsToLog) => {
  itemsToLog.forEach(x => console.log(x)); 
}


//module.exports = router;


var app = express();

app.use('/',express.static(__dirname + '/'));

app.use(logger('dev'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// view engine setup: just used for the error paths defined below
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;

