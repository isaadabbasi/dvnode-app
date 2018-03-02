const 
    mongoose = require('mongoose'),
    host = process.env.HOST,
    port = process.env.DB_PORT,
    schema = process.env.SCHEMA,
    connection_url = `mongodb://${host}:${port}/${schema}`,
    options = {
        useMongoClient: true
    };

class DatabaseConnection {
    constructor(){
    }

    connect(){
        console.log(`ESTABLISHING DATABASE CONNECTION...`);
        function connection_cb (err){
            if(err)
                throw new Error(err);
            if(!err)
                console.log(`DATABASE CONNECTION ESTABLISHED.`);
        };
    
        mongoose.connect(connection_url, options, connection_cb);
    }
}
module.exports = new DatabaseConnection();
