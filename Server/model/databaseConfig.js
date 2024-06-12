//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"bed_dvd_root",
            password:"pa$$woRD123",
            database:"bed_dvd_db",
            dateStrings: true,
            multipleStatements : true
        }

        );

        return conn;

    }
}
module.exports=dbConnect;