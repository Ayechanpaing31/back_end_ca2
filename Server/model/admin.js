//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

const db = require('./databaseConfig')
var config = require('../config.js');
var jwt = require('jsonwebtoken');


var adminDB = {
//add actor
addActor: function (first_name, last_name, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = 'Insert into actor (first_name, last_name) values(?,?)';
            conn.query(sql, [first_name, last_name], function (err, result) {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                else {
                    return callback(null, result);
                }
            });
        }
    });
},

addCustomer: function (address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES(?,?,?,(select city_id from city where city=?),?,?);';

            conn.query(sql, [address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password], function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                var sql2 = 'INSERT INTO customer(store_id, first_name, last_name, email, password, address_id) VALUES (?,?,?,?,?,(SELECT address_id FROM address ORDER BY last_update DESC LIMIT 1))';
                conn.query(sql2, [store_id, first_name, last_name, email, password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            })
        }
    });
},

addStaff: function (address_line1, address_line2, district, city, postal_code, phone, first_name, last_name, email, store_id, username, password, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES(?,?,?,(select city_id from city where city=?),?,?);';
            conn.query(sql, [address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password] , function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                var sql = 'INSERT INTO staff(first_name, last_name, address_id, email, store_id,  username, password) VALUES (?,?,(SELECT address_id FROM address ORDER BY last_update DESC LIMIT 1),?,?,?,?)';
                conn.query(sql, [first_name, last_name, email, store_id, username, password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);

                    }

                });
            })
        }
    });
},

loginStaff: function (email, password, callback) {

    var conn = db.getConnection();

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");

            var sql = 'select * from staff where email=? and password=?';

            conn.query(sql, [email, password], function (err, result) {
                conn.end();

                if (err) {
                    console.log("Err: " + err);
                    return callback(err, null, null);
                } else {
                    var token = "";
                    var i;
                    if (result.length == 1) {

                        token = jwt.sign({ id: result[0].staff_id, role: result[0].role }, config.key, {
                            expiresIn: 86400 //expires in 24 hrs
                        });
                        console.log("@@token " + token);
                        return callback(null, token, result);


                    } else {
                        var err2 = new Error("Email/Password does not match.");
                        err2.statusCode = 500;
                        return callback(err2, null, null);
                    }
                }  
            });
        }
    });
},

addFilm: ( title, description, release_year, language,  rental_duration, rental_rate,length, replacement_cost, rating, special_features, actor_id, callback)=>{
    var conn= db.getConnection()
    conn.connect((err)=>{
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else{
            console.log('Connected!!')
            var sql ='INSERT INTO film(title, description, release_year, language_id, rental_duration, rental_rate,length, replacement_cost, rating, special_features) VALUES (?,?,?,(SELECT language_id FROM language WHERE name = ?),?,?,?,?,?,?); INSERT INTO film_actor(actor_id, film_id) values(?,(select film_id from film order by last_update desc limit 1))';
            
            conn.query(sql,[ title, description, release_year, language, rental_duration, rental_rate,length, replacement_cost, rating, special_features,actor_id], (err, result)=>{
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
               
                return callback(null, result[0]);
            }
        })
        }

    })

},


}


module.exports = adminDB;