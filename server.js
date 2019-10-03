const http = require("http");
const fs = require("fs");
const url = require("url");
var card = fs.readFileSync('./templates/template-card.html')+"";

// const data = require("./data.json");
var count = 0;
var out = "";
var d = fs.readFileSync("./data.json");
// d = "" + d;
d = JSON.parse(d);
var productPageOriginal = fs.readFileSync("./templates/template-product.html");
productPageOriginal = productPageOriginal + "";//convert object in string
// d.replace(/false/,"");// not to replace here, but the file that we are going to render
// console.log(d);
// productPage = productPage.replace(/Fresh Avacados/g,"Organic Avacados");
// productPage = productPage.replace(/{%PRODUCT NAME%}/g, d[0]["productName"] );
// productPage = productPage.replace(/{%IMAGE%}/g, d[0]["image"]);
// productPage = productPage.replace(/{%FROM%}/g, d[0]["from"]);
// productPage = productPage.replace(/{%QUANTITY%}/g, d[0]["quantity"]);
// productPage = productPage.replace(/{%PRICE%}/g, d[0]["price"]);
// productPage = productPage.replace(/{%NUTRIENTS%}/g, d[0]["nutrients"]);
// productPage = productPage.replace(/{%DESCRIPTION%}/g, d[0]["description"]);
// console.log(d[0]);
function getOverview() {
  
  var cardstring="";
    for(var id=1;id<d.length;id++){
    let tempcard=card;
    tempcard = tempcard.replace(/{%PRODUCT NAME%}/g, d[id]["productName"]);
    tempcard = tempcard.replace(/{%IMAGE%}/g, d[id]["image"]);
    tempcard = tempcard.replace(/{%FROM%}/g, d[id]["from"]);
    tempcard = tempcard.replace(/{%QUANTITY%}/g, d[id]["quantity"]);
    tempcard = tempcard.replace(/{%PRICE%}/g, d[id]["price"]);
    tempcard = tempcard.replace(/{%NUTRIENTS%}/g, d[id]["nutrients"]);
    tempcard = tempcard.replace(/{%DESCRIPTION%}/g, d[id]["description"]);
    tempcard=tempcard.replace(/{%ID%}/g,d[id]["id"]);
    
      if (d[id]["organic"]!=false) {
        tempcard=tempcard.replace(/{%ORGANIC%}/g,"Organic");
      }else{
        tempcard=tempcard.replace(/{%ORGANIC%}/g,"");
      }
      cardstring=cardstring+tempcard;
  }
    return cardstring;
   
}


const server = http.createServer(function (req, res) {
  console.log("url requested " + req.url);// ye browser me kaha likha hoga?(yaha to cmd me h) aut yr teen lines firse chalti h. work kaise krti h. incrementer increment kyu ni hota

  // console.log(count++ + "th visit");
  var WholeUrl = url.parse(req.url, true);
  // console.log(WholeUrl)
  //header
  // res.writeHead(200, { "content-type": "text/html" });

  // body
  // res.write("hi we are serving from node js"); 
  if (req.url == "/" || req.url == "/overview") {
    res.writeHead(200,{"content-type":"text/html"})
    var overviewfile=fs.readFileSync("./templates/template-overview.html");
    overviewfile+="";
    var newcard=getOverview();
    overviewfile=overviewfile.replace(/{%PRODUCT_CARDS%}/g,newcard);
    res.write(overviewfile);
  } else if (req.url == "/api") {
    // var d = toString(data);
    // d += "";
    res.write(JSON.stringify(d));
  } else if (WholeUrl["pathname"] == "/product") {
    var id = url.parse(req.url, true).query.id;
    console.log("id" + id)
    console.log(d);
    let productPage = productPageOriginal;//we have made duplicate
    productPage = productPage.replace(/{%PRODUCT NAME%}/g, d[id]["productName"]);
    productPage = productPage.replace(/{%IMAGE%}/g, d[id]["image"]);
    productPage = productPage.replace(/{%FROM%}/g, d[id]["from"]);
    productPage = productPage.replace(/{%QUANTITY%}/g, d[id]["quantity"]);
    productPage = productPage.replace(/{%PRICE%}/g, d[id]["price"]);
    productPage = productPage.replace(/{%NUTRIENTS%}/g, d[id]["nutrients"]);
    productPage = productPage.replace(/{%DESCRIPTION%}/g, d[id]["description"]);
    
    // console.log(d[id]);
    res.write(productPage);
  } else {

    // var parsedUrl = url.parse(req.url, true).query.id;
    // console.log(parsedUrl);
    res.write("Wrong Url");
  }
  //end
  res.end();
});
var port=process.env.port||3000;
server.listen(port);
console.log("server has started at port 3000");
function myFunction(arr) {
  var i;
  for (i = 0; i < arr.length; i++) {
    out += '<a href="' + arr[i].url + '">' + arr[i].display + '</a><br>';
  }
  document.getElementById("id01").innerHTML = out;

}