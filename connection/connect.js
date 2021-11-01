/*var mysql=require('mysql');

function handleDisconnect() {
    var connection = mysql.createConnection({
        host: "remotemysql.com",
        user: "zedSOubhoQ",
        password: "Wh9lIsE4RY",
        database: "zedSOubhoQ"
    });
  
    connection.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                     
                                            
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
  }


module.exports = handleDisconnect;*/

var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'remotemysql.com',
    user     : 'zedSOubhoQ',
    password : 'Wh9lIsE4RY',
    database : 'zedSOubhoQ',
    port     : 3306
});

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};