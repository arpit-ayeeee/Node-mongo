//USAGE OF MONGODB DRIVER MODULE TO CONNECT MONGODB WITH OUR NODE APPLICATION
const MongoClient = require('mongodb').MongoClient;            //mongoclient enables us to connect to the mongodb server
 const assert = require('assert');

 const url = 'mongodb://localhost:27017/';          //the url where mongodb server is running
 const dbname = 'conFusion';        //we'll declare a variable for the database we created in mongodb server


 MongoClient.connect(url, (err, client) => {            //this is how we connect to server, first para is url to the server and second is a callback function

    assert.equal(err,null);        //First we'll check to see if error is null, buy using assert' equal which checks

    console.log("Connected correctly ot the server");           //if assert doesn't passes, then it's connected

    //Now we'll access the server
    const db = client.db(dbname);     //First we'll access the database
    const collection = db.collection("dishes");         //Then, collection

    collection.insertOne({'name': 'Uthapizza', 'description': 'test'}, (err, result) => { //Now, we'll insert one object into the database, here in insertOne method, object is first para and a callback function is second para
        //In this callback function if result is obtained, then we can access the collection and perform further operations.
        assert.equal(err,null);        //First we'll check if error is not null

        console.log("After Insert:\n");
        console.log(result.ops);    //OPS property tells the number of operations carried out successfully

        //Now, we'll find data with any conditon/filter in collection(for now it's empty),and then will convert it to array of json. This toArray method converts, and it takes a callback function as para, which first check the err if it;s empty and then displays the result a docs.
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(docs);
            db.dropCollection("dishes", (err, result) => {            //dropCollection is used to drop/empty the specifed collection and empty the collection eventually
                assert.equal(err,null);
                client.close();     //Now, we'll close the connection to database
            });    
        })
    });       
 })

