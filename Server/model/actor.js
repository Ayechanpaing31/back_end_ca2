//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

const db = require('./databaseConfig')
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var actorDB = {



    getCategoryDetail: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM category';
                conn.query(sql, [], function (err, result) {
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

    //get store address
    getAllStoreAddress: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select a.*, c.city from address a, store s, city c where s.address_id = a.address_id and c.city_id = a.city_id';
                conn.query(sql, [], function (err, result) {
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

    getCustomer: function (customer_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT customer_id, first_name, last_name FROM customer WHERE customer_id = ?';
                conn.query(sql, [customer_id], function (err, result) {
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



    getFilmsByCat: function (category_id, maxprice, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                if (maxprice == 0) {
                    var sqlvar = 'SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.rental_rate, f.release_year, f.length FROM film f, film_category fcat, category cat WHERE (fcat.category_id = ?) AND (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id)'
                } else {
                    var sqlvar = 'SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.rental_rate, f.release_year, f.length FROM film f, film_category fcat, category cat WHERE (fcat.category_id = ?) AND (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id) AND (f.rental_rate<=?)'
                }
                console.log("Connected!");
                var sql = sqlvar;


                conn.query(sql, [category_id, maxprice], function (err, result) {
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






    getFilmsByName: function (title, maxprice, callback) {
        var titleInput = title;
        var priceInput = maxprice;
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                if (maxprice == 0) {
                    var sqlvar = `
                    SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.release_year, f.length FROM film f, film_category fcat, category cat
                        WHERE 
                            (f.title LIKE "% ${titleInput} %" OR 
                            f.title LIKE "${titleInput} %" OR 
                            f.title LIKE "% ${titleInput}" OR 
                            f.title LIKE "${titleInput}") 
                            AND (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id)
                            `;
                } else {
                    var sqlvar = `
                    SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.release_year, f.length FROM film f, film_category fcat, category cat
                        WHERE 
                            (f.title LIKE "% ${titleInput} %" OR 
                            f.title LIKE "${titleInput} %" OR 
                            f.title LIKE "% ${titleInput}" OR 
                            f.title LIKE "${titleInput}") 
                            AND (f.rental_rate<=${priceInput})
                            AND (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id)
                            `;
                }
                console.log("Connected!");
                var sql = sqlvar;


                conn.query(sql, [title, maxprice], function (err, result) {
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

    getAllFilms: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.release_year, f.length FROM film f, film_category fcat, category cat WHERE (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id)';
                conn.query(sql, function (err, result) {
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

    getFilmCat: function (category_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT name from category where category_id=?';
                conn.query(sql, [category_id], function (err, result) {
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


    



    getFilmCategoryByName: function (name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT category_id from category where name=?';
                conn.query(sql, [name], function (err, result) {
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

   
    getFilm: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM film WHERE film_id = ?;';
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    getActorByFilm: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select a.first_name, a.last_name from film_actor f, actor a where f.film_id=? and f.actor_id = a.actor_id;';
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //rating and comment
    addRating: function (film_id, rating, comment, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Insert into rating (film_id, rating , comment) values(?,?,?)';
                conn.query(sql, [film_id, rating, comment], function (err, result) {
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

    //get rating and comment
    getRating: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select a.rating, a.comment from film f, rating a where f.film_id=? and f.film_id = a.film_id;';
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //get film by limit 8
    getFilmbyLimit: function (limit, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }

            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM FILM LIMIT 8;';
                conn.query(sql, [limit], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

}

module.exports = actorDB;