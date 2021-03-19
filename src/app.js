const express = require("express");
const weatherData = require("./utils/weatherrequest");
const path = require("path");
const viewsPath = path.join(__dirname, "../partial/view"); //go to the view directory, ByDefault it gone to views directory

const app = express();

const hbs = require("hbs");
//const weatherRequest = require('./utils/weatherrequest');

const directoryPath = path.join(__dirname, "../public"); //__dirname provide the path of current directory
const partialPath = path.join(__dirname, "../partial");

hbs.registerPartials(partialPath); //register partial, Which help to maintain comman things without rendering multple time

app.set("views", viewsPath); //set the customize path
app.set("view engine", "hbs"); //This is the npm package, which used to render a page dynamically,

app.use(express.static(directoryPath)); //this is the ststic method, where we can display the page using provoding the path

app.get("", (req, response) => {
  response.render("index", {
    //send the dynamic value to the page
    title: "This is hbs package",
    name: "Using in node.js to render dynamic page",
  });
});

app.get("/about", (req, response) => {
  response.render("about", {
    title: "this is about page",
  });
});

/*
----This is the method through which we can get request and send back to the respond,
like wise : - 
// app.get('',(req,response)=>{
//     response.send('<h1>Hello Express!</h1>');
// })

*/

app.get("/weather", (req, response) => {
  if (!req.query.city) {
    //getting data from the user
    return response.send({ Error: "City not found in your URL" });
  }
  weatherData(req.query.city, (error, data) => {
    if (error) response.send({ error: error });
    else {
      response.send({
        city: req.query.city,
        temprature: data.tempreture,
        feels: data.feel,
      });
    }
  });
  // response.send({request: req.query});
});

// app.get('/about',(req,response)=>{
//     response.send({name:'DISHAN',surname:'kheni',goal:'infinity'});
// })

app.get("/about/*", (req, response) => {
  response.send("About page not found!");
});

app.get("*", (req, response) => {
  //It's for handelling error at the display leve;
  response.render("404", {
    title: "Error Page",
    errorMessage: "Page is not found!, try it later",
  }); // This is at the end of the every request resone is it'll execute whwnever req will not match with specific one
});

app.listen(3000, () => {
  console.log("server is starting");
});

/*
For Stating the server we're calling listen mathod  & in where we're passing a port number whicg\h is bydefault 3000
*/

// request('localhost:3000/weather',(error,response)=>{
//     console.log(response)
// })
