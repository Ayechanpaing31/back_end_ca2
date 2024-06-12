//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

const express = require("express");
const app = express();
const path=require("path");
app.use("/static",express.static("public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
  });

  app.get("/dvds/:id", (req, res) => {
    res.sendFile("/public/dvdDetails.html", { root: __dirname });
  });
  
  app.get("/dvds/", (req, res) => {
    res.sendFile("/public/dvds.html", { root: __dirname });
  });

  app.get("/films", (req, res) => {
    res.sendFile("/public/films.html", { root: __dirname });
  });
  
  app.get("/customerReview/:film_id", (req, res) => {
    res.sendFile("/public/rating.html", { root: __dirname });
  });

  app.get("/newActor/", (req, res) => {
    res.sendFile("/public/addActor.html", { root: __dirname });
  });  
  
  app.get("/newCustomer/", (req, res) => {
    res.sendFile("/public/addCustomer.html", { root: __dirname });
  });

  app.get("/newAdmin/", (req, res) => {
    res.sendFile("/public/addStaff.html", { root: __dirname });
  });
  
  app.get("/newFilm/", (req, res) => {
    res.sendFile("/public/addFilm.html", { root: __dirname });
  });
  
  app.get("/adminLogIn/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
  });

  app.get("/adminHome/", (req, res) => {
    res.sendFile("/public/adminHome.html", { root: __dirname });
  });

  app.get("/film_categories/:category_id", (req, res) => {
    res.sendFile("/public/dvds.html", { root: __dirname });
  });

  app.get("/filmsbyname/:title/:maxprice", (req, res) => {
    res.sendFile("/public/dvds.html", { root: __dirname });
  });

  app.get("/comingsoon", (req, res) => {
    res.sendFile("/public/cart.html", { root: __dirname });
  });

const PORT=3001


app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
  });
  
