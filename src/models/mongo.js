const { MONGODB_URI } = require('../utils/config');
var MongoClient = require('mongodb').MongoClient;

exports.mongoResponse = async () => {
    var res = await response()
    return res;
}

async function response() {
    let client, db;
    try {
        client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db("mydb");
        let dCollection = db.collection('testSample');
        let result = await dCollection.find().toArray();
        client.close(); 
        return result;

    }
    catch (err) { console.error(err); } // catch any mongo error here
    finally {  } // make sure to close your connection after
};

exports.insertData = async (jsonObj)=>{
    let client, db;
    let result=0;
    client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db("mydb");
    let dCollection = db.collection('testSample');
    for (let index = 0; index < 5; index++) {
          result =     await dCollection.insertOne(jsonObj[index])
    }
    client.close(); 
    if(result!=0){
        return 1
    }else{
        return 0;
    }
};