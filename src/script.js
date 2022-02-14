
var items = [
  {
    id: "100",
    name: "iPhone 4S",
    brand: "Apple",
    os: "iOS",
  },{
    id: "101",
    name: "Moto X",
    brand: "Motorola",
    os: "Android",
  },
  {
    id: "102",
    name: "iPhone 6",
    brand: "Apple",
    os: "iOS",
  },
  {
    id: "103",
    name: "Samsung Galaxy S",
    brand: "Samsung",
    os: "Android",
  },
  {
    id: "104",
    name: "Google Nexus",
    brand: "ASUS",
    os: "Android",
  },
  {
    id: "105",
    name: "Surface",
    brand: "Microsoft",
    os: "Windows",
  },
];
var filter = [];
var osArray=[];
var filterArray=[];
var filterOsVal=0;
var filterBrandVal=0;
$(document).ready(function () {
  displayPage(items);
  displayTable();
  $("body").on("click", "#submit", function () {
    var searchItem = $("#search").val();
    searchItemFunction(searchItem, items);
  });

  $("body").on("click",".delete",function(){
    $(this).parent().hide();
  });

  $("body").on("click", "#osDrop", function(){
    var filOs=$("#osDrop").find('option:selected').val();
    if(filOs!="All"){
      filterOsVal=filOs;
      filter_p(filterOsVal,filterBrandVal,items);
    }else{
      displayTable();
      filterOsVal=0;
    }
  });

  $("body").on("click", "#brandDrop", function(){
    var filBrand=$("#brandDrop").find('option:selected').val();
    if(filBrand!="All"){
        filterBrandVal=filBrand;
        filter_p(filterOsVal,filterBrandVal,items);
    }else{
      displayTable();
      filterBrandVal=0;
    }
  });
});




function filteritems(filterOsVal,filterBrandVal,items){
var error=0;
for(i=0;i<items.length;i++){
  if(filterOsVal==items[i].os && filterBrandVal==0){
    filterArray.push(items[i]);
  }
}
for(i=0;i<items.length;i++){
  if(filterBrandVal==items[i].brand && filterOsVal==0){
    filterArray.push(items[i]);
  }
}

for(i=0;i<items.length;i++){
  if(filterBrandVal!=0 && filterOsVal!=0){
    if(filterBrandVal==items[i].brand && filterOsVal==items[i].os){
      filterArray.push(items[i]);
    }else{
      displayError();
    }
  }
}
displayFilter(filterArray);
}

function displayFilter(filterArray){
  var filterItem = "";
  filterItem=
    "<table>\
    <tr><th>Product ID</th>\
    <th> Product Name</th>\
    <th>Brand</th><th>Operating system</th><th>Remove</th>\
    </tr>";
  for (i = 0; i < filterArray.length; i++) {
    filterItem+=
      "<tr>\
                    <td>" +
      filterArray[i].id +
      "</td>\
                    <td>" +
      filterArray[i].name +
      "</td>\
                    <td>" +
      filterArray[i].brand +
      "</td>\
                    <td>" +
      filterArray[i].os +
      "</td>\
                    <td  class='delete'>\
                    <a href='#' data-id=" +
      filterArray[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  filterItem+= "</table>";
  $("#content").html(filterItem);
  style();
  filterArray.splice(0, filterArray.length);
}


function searchItemFunction(searchItem, items) {
  if (searchItem.length===0){
    displayTable();
  }else for (i = 0; i < items.length; i++) {
    if (searchItem == items[i].id || searchItem === items[i].name){
      filter.push(items[i]);
      displaySearch(filter);
      break;
  }else{
        displayError();
    }
  }
}

function displayError(){
$("#content").html("Error 404");
}

function displaySearch(filter) {
  var search = "";
  search =
    "<table>\
    <tr><th>Product ID</th>\
    <th> Product Name</th>\
    <th>Brand</th><th>Operating system</th><th>Remove</th>\
    </tr>";
  for (i = 0; i < filter.length; i++) {
    search +=
      "<tr>\
                    <td>" +
      filter[i].id +
      "</td>\
                    <td>" +
      filter[i].name +
      "</td>\
                    <td>" +
      filter[i].brand +
      "</td>\
                    <td>" +
      filter[i].os +
      "</td>\
                    <td class='delete'>\
                    <a href='#'  data-id=" +
      filter[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  search += "</table>";
  $("#content").html(search);
  style();
  filter.splice(0, filter.length);
}


function displayPage(items) {
  var osDrop ="<select id='osDrop'>\
                  <option class='osDropList' value='All'>All</option>\
                  <option class='osDropList' data-os ='i'>iOS</option>\
                  <option class='osDropList' data-os ='i'>Android</option>\
                  <option class='osDropList' data-os ='i'>Windows</option>\
            </select>";
  

  var brandDrop="<select id='brandDrop'>\
                   <option class='brandDropList' value='All'>All</option>"
      for(i=0;i<items.length;i++){
          brandDrop +="<option class ='brandDropList' data-brand="+items[i].brand+">"+items[i].brand+"</option>";
        }
    brandDrop+="</select>";

  var search = "<input id='search' type='text' placeholder='Search..'>";
  var submit =
    "<input \
                type='button'\
                id='submit'\
                class='input'\
                value='submit'>";
  
  $("#header").before(osDrop);
  $("#header").before(brandDrop);
  $("#header").before(search);
  $("#header").before(submit);
  $("table").css("width","100%");
}


function displayTable() {
  var html = " ";
  html +=
    "<table><tr><th>Product ID</th><th> Product Name</th><th>Brand</th><th>Operating system</th><th>Remove</th></tr>";
  for (i = 0; i < items.length; i++) {
    html +=
      "<tr>\
                    <td>" +
      items[i].id +
      "</td>\
                    <td>" +
      items[i].name +
      "</td>\
                    <td>" +
      items[i].brand +
      "</td>\
                    <td>" +
      items[i].os +
      "</td>\
                    <td  class='delete'>\
                    <a href='#' data-id=" +
      items[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  html += "</table>";
  $("#content").html(html);
  style();
 
 
}

function style(){
  $("table").css("width", "100%");
 



  $("#search").css({
    "border-color": "black",
    "cursor": "pointer",
    "float":"right",
  });
 
  $("#submit").css({
  "color": "black",
  "font-size": "16px",
  "border-color": "black",
  "cursor": "pointer",
  "margin-right":"5px",
  "margin-left":"5px",
  "float":"right",
  });


  $("#osDrop").css({
    "color": "black",
    "font-size": "16px",
    "border-color": "black",
    "cursor": "pointer",
    "margin-left":"20px",
  });


  $("#brandDrop").css({
    "color": "black",
    "font-size": "16px",
    "border-color": "black",
    "cursor": "pointer",
    
  });
}
