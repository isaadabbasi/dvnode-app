const 
    mongoose = require('mongoose'),
    host = process.env.HOST || '127.0.0.1',
    port = process.env.DB_PORT || 27017,
    schema = process.env.SCHEMA || 'dvna',
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
