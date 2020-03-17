var express = require('express');
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


module.exports = router;
