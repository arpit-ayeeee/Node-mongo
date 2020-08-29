//USAGE OF MONGODB DRIVER MODULE TO CONNECT MONGODB WITH OUR NODE APPLICATION2
 const MongoClient = require('mongodb').MongoClient;            //mongoclient enables us to connect to the mongodb server
 const dboper = require("./operations");

 const url = 'mongodb://localhost:27017/';          //the url where mongodb server is running
 const dbname = 'conFusion';        //we'll declare a variable for the database we created in mongodb server

//Now, we'll use promises here, so that callback hell doesnt happen
 MongoClient.connect(url).then((client) => {        //this is how we connect to server, first para is url to the server and second is a callback function
    console.log("Connected correctly ot the server");//if assert doesn't passes, then it's connected

    //Now we'll access the server
    const db = client.db(dbname);                    //First we'll access the database

    //TO INSERT, we'll access the functions we made in operations.js
    dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, 'dishes')
        .then((result) => { //As the function, it takes database(db), document, collection and a callback function which recieves the result
            console.log('Insert document\n', result.ops);
            return dboper.findDocument(db, 'dishes')
        })
        .then((docs) => { //Inside insert, we'll call find function and display the found documents in the callback function
            console.log("Found documents:\n", docs);
            return dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated test"}, 'dishes')
        })
        .then((result) => {//We'll call update function, which takes db, document(only one field and it'll find it), the update to be made doc, collection and the callback function which recieves the result
            console.log("Updated document:\n", result.result);
            return dboper.findDocument(db, 'dishes')
        })
        .then((docs) => {//Again we'll find the updated docs and print it
            console.log("Found updated document:\n", docs);     
            return db.dropCollection('dishes')
        })
        .then((result) => {//Now atlast, we'll clean up the database
            console.log("Dropped collection:\n", result);
            client.close();
        })
        .catch((err) => console.log(err));       //We'll catch the errors here, and print em
 })
.catch((err) => console.log(err));
