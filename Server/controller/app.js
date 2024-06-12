//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

var express = require('express');
var app = express();
var actor = require('../model/actor.js');
var admin = require('../model/admin.js');

const jwt = require("jsonwebtoken");
const config = require("../config.js");
const verifyToken = require("../auth/verifyToken.js");

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const cors = require("cors");
const { verify } = require('crypto');
app.use(cors());

app.use(bodyParser.json());
app.use(urlencodedParser);

//getting details from category
app.get('/category/', (req, res, next) => {
    actor.getCategoryDetail((err, result) => {

        if (err) {
            res.status(500).send();
            console.log(err);
        }
        res.status(200).send(result);
    });
});


//get the address of store
app.get('/address/', (req, res, next) => {
    actor.getAllStoreAddress((err, result) => {

        if (err) {
            res.status(500).send();
            console.log(err);
        }
        res.status(200).send(result);
    });
});


app.get('/customers/:customer_id', function (req, res) {
    var customer_id = req.params.customer_id;
    actor.getCustomer(customer_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result[0]);
        }
    });
});



// Add actors
app.post('/actors', verifyToken, function (req, res) {
    var { first_name, last_name } = req.body;
    if (first_name.length == 0 || last_name.length == 0) {
        res.status(400).send({ "error_msg": "missing data" });
        //insertID
    } else {
        admin.addActor(first_name, last_name, function (err, result) {

            if (err) {
                res.status(500).send({ "error_msg": "Internal server error" });
            } else {
                res.status(201).send({ actor_id: String(result.insertId) });
            }
        });
    }
});




// get films by category
app.get('/film_categories/:category_id/:maxprice/films', function (req, res) {
    var category_id = req.params.category_id;
    var maxprice = req.params.maxprice;
    actor.getFilmsByCat(category_id, maxprice, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});

//get films
app.get('/films', function (req, res) {
    
    actor.getAllFilms(function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.send(result);
        }
    });
});

//get cat name  by id
app.get('/film_categories/:category_id', function (req, res) {
    var category_id = req.params.category_id;
    actor.getFilmCat(category_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});

//get cat by name
app.get('/film_categories/:name', function (req, res) {
    var name = req.params.name;
    actor.getFilmCategoryByName(name, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});


//get flims by title
app.get('/filmsbyname/:title/:maxprice', function (req, res) {
    var title = req.params.title;
    var maxprice = req.params.maxprice;
   

    actor.getFilmsByName(title, maxprice, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});

//get cat of film
app.get('/film_names/:title', function (req, res) {
    var title = req.params.title;
    actor.getFilmCat(title, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});



//add customers
app.post('/customers', verifyToken, function (req, res, next) {
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
    var district = req.body.district;
    var city = req.body.city;
    var postal_code = req.body.postal_code;
    var phone = req.body.phone;
    var store_id = req.body.store_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;

    var address = req.body.address;


    admin.addCustomer(address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password, function (err, result) {
        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ "error_msg": "email already exist" });
            }
            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
        }
        else {
            res.status(201).send({ customer_id: result.insertId });
        }
    });
});


// add staff/admin
app.post('/staff', verifyToken, function (req, res, next) {
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
    var district = req.body.district;
    var city = req.body.city;
    var postal_code = req.body.postal_code;
    var phone = req.body.phone;

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var store_id = req.body.store_id;
    var username = req.body.username;
    var password = req.body.password;

    var address = req.body.address;



    admin.addStaff(address_line1, address_line2, district, city, postal_code, phone, first_name, last_name, email, store_id, username, password, function (err, result) {
        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ "error_msg": "email already exist" });
            }
            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
        }
        else {
            res.status(201).send({ customer_id: result.insertId });
        }
    });
});



//staff login
app.post('/staff/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    admin.loginStaff(email, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
            res.send();
        } else {
            res.status(500);
            res.send(err.statusCode);
        }
    });
});


//getfilm
app.get('/dvds/:dvdID', function (req, res) {
    var id = req.params.dvdID;
    actor.getFilm(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Film Found");
            } else {
                res.send(result[0]);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});

//getactor by film
app.get('/dvds/:dvdID/actors', function (req, res) {
    var id = req.params.dvdID;
    actor.getActorByFilm(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Film Found");
            } else {
                res.send(result);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});

//post rating and comment
app.post('/rating/:filmID', function (req, res) {
    var id = req.params.filmID;
    var rating = req.body.rating;
    var comment = req.body.comment;



    if (rating == undefined || comment == undefined) {
        return res.status(400).send({ "error_msg": "missing data" });
    }
    else {
        actor.addRating(id, rating, comment, function (err, result) {
            if (err) {
                res.status(500).send({ "error_msg": "Internal server error" });
            } else {
                res.status(201).send({ actor_id: String(result.insertId) });
            }
        });
    }
});

//get rating and comment
app.get('/films/:filmID/rating', function (req, res) {
    var id = req.params.filmID;

    actor.getRating(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Rating Found");
            } else {
                res.send(result);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});


//limit
app.get('/dvdslimt', function (req, res) {
    //neeed parseInt for num
    var limit = parseInt(req.query.limit);


    actor.getFilmbyLimit(limit, function (err, result) {
        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });

        } else {
            res.status(200).send(result);
        }

    });

});


//add film
app.post('/film',verifyToken, function (req, res) {
    var { title, description, release_year, language, rental_duration, rental_rate,length, replacement_cost, rating, special_features, actor_id } = req.body;


    admin.addFilm(title, description, release_year, language, rental_duration, rental_rate,length, replacement_cost, rating, special_features, actor_id, function (err, result) {
        if (!err) {
            console.log(result);
            res.status(201).json({ film_id: String(result.insertId) })
        } else if (err.code === "ER_BAD_NULL_ERROR") {
           
             res.writeHead(400, 'Missing information from body object. ');
             res.end('{\n\t"error_msg" : "missing data"\n}');

        }
        else {
            res.status(500).json({ error_message: 'Internal server error' })

        }

    });
});

module.exports = app

