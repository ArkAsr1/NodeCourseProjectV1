console.log("PAGE LOADED");
var vehicleArray = [];
var orderArray = [];
let nextOID = 1;
let selectedVehicle = 0;

// define a constructor to create player objects

var Order = function(vId, name) {
  this.oId = 0;
  this.vId = vId;
  this.name = name;
  //  nextOID = 0; 
}

document.addEventListener("DOMContentLoaded", function () {
  getAjaxData("/vehicle", "vehicle");  // necessary for the list of vehicles in drop down list 
  getAjaxData("/trucks", "order"); 
  createOrders();


  $(document).on("pagebeforeshow", "#home", function (event) {   // have to use jQuery 
    getAjaxData("/trucks", "order"); 
    createOrders(); 

  });

  $(document).on("pagebeforeshow", "#page1", function (event) {   // have to use jQuery 

    createDropdown();
  });

  $(document).on("pagebeforeshow", "#page2", function (event) {   // have to use jQuery 

    createChoicesList();
  });

  document.getElementById("buttonOrder").addEventListener("click", function () {
    let name =  document.getElementById("name").value;
    let vId = document.getElementById("vId").value;
    document.getElementById("name").value = "";
    postAjaxData("/addTruck", new Order(vId, name), "order" );
    //createOrders(); 
    console.log(orderArray);
  });
});

// HOME PAGE: SHOW PENDING ORDERS
function createOrders() {
  // clear prior data
  var divOrderList = document.getElementById("divOrderList");
   while (divOrderList.firstChild) {
    divOrderList.removeChild(divOrderList.firstChild);
   }
  
  // create a link for each pending order
  ul = document.createElement('ul');
  orderArray.forEach(function (element, ) {
    var li = document.createElement('li');
    var deleteLink = `<button onclick='getAjaxData("/delete/${element.oId}", "order")' style='color:red'> Delete </button>`; 
    li.innerHTML = "<a data-transition='pop' class='oneOrder' data-param="
    + element.oId + " href='#page3'> " + element.name + "</a>" + deleteLink;
    ul.appendChild(li);
  })
  divOrderList.appendChild(ul);
  
  // set up an event for each new li item, if user clicks any, it writes >>that<<
  //  items data-param into the hidden html 
  var classname = document.getElementsByClassName("oneOrder");
  Array.from(classname).forEach(function (element) {
    element.addEventListener('click', function () {
      var orderId = this.getAttribute("data-param");  // passing in the record.Id
      // note; order IDs start at 1
      console.log(orderArray[orderId-1]);
      //do something here with parameter on  pickbet page
      var orderIndex = orderId-1;
      var order = orderArray[orderIndex];
      var vehicleId = order.vId;
      var vehicle =  vehicleArray[vehicleId];
      document.getElementById("IDparamHere").innerHTML = vehicle.vName;
      //selectedVehicle = param;
      document.location.href = "index.html#page3";
    });
  });

};

// PAGE 1 DROPDOWN FOR BUYING A TRUCK
function createDropdown() {
  // clear prior data
  console.log("CREATING DROPDOWN");

  let i = 0;
  let vehiclePicker = document.getElementById("vId");
  console.log(vehiclePicker);
  vehiclePicker.innerHTML = "";
  vehicleArray.forEach( (element) => {   // use handy array forEach method
    var option = document.createElement('option');
    option.innerHTML = element.vName;
    option.value = i;
    i = i + 1;
    vehiclePicker.appendChild(option);
  });
  vehiclePicker.value = selectedVehicle;

  document.getElementById("vId-button").firstChild.innerHTML = vehicleArray[selectedVehicle].vName;
};

async function getAjaxData(url, arrayName){
  let response; 
  try {

    switch(arrayName){
      case "vehicle":
        await fetch(url).then(res => res.json()).then(data => {
          vehicleArray = data; 
        }); 
        break; 
      case "order":
        await fetch(url).then(res => res.json()).then(data => {
          orderArray = data; 
          createOrders(); 
        }); 
        break; 
      default:
        console.log("Error");  
        break; 
    }
  } catch (error) {
    console.log("Error With Fetch! " + JSON.stringify(error) );  
  }
    
}

function postAjaxData(url, objToSend, arrayName){
  $.post(url, objToSend, (data, status)=>{
    switch(arrayName){
      case "vehicle":
        vehicleArray = data; 
        break; 
      case "order":
        orderArray = data; 
        createOrders(); 
        document.location.href = "index.html#"; 
        break; 
      default:
        console.log("Error");  
        break; 
    }
  }); 
}
// PAGE 2 ENGINE OPTIONS
function createChoicesList() {
  // clear prior data
  var divChoicelist = document.getElementById("divChoicelist");
  while (divChoicelist.firstChild) {    // remove any old data so don't get duplicates
    divChoicelist.removeChild(divChoicelist.firstChild);
  };

  let i = 3;
  var ul = document.createElement('ul');
  vehicleArray.forEach(function (element, ) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneVehicle' data-param="
        + element.vId + "  href='#page"+ i + "'> " + element.vName + "</a>";
    i++; // alllows us to go to different pages 
    ul.appendChild(li);
  });
  divChoicelist.appendChild(ul)


  // set up an event for each new li item, if user clicks any, it writes >>that<<
  //  items data-param into the hidden html 
  var classname = document.getElementsByClassName("oneVehicle");
  Array.from(classname).forEach(function (element) {
    element.addEventListener('click', function () {
      var param = this.getAttribute("data-param");  // passing in the record.Id
      console.log(param);

      //do something here with parameter on  pickbet page
      document.getElementById("IDparamHere").innerHTML = vehicleArray[param].vName;
      console.log("SETTING VID TO " + param);
      selectedVehicle = param;

      document.location.href = "index.html#page3";
    });
  });
};


