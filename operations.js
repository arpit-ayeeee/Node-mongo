const assert = require('assert');
const { AssertionError } = require('assert');

//We'll export the method to insert document. It takes database, document to be inserted, collection where we'll insert and a callback function
//USAGE of the this function is in a way, that we'll provide the callback which will have the return
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {      //insert method is supported by the mongdb driver
        assert.equal(err, null);                  //We'll check if error is null, if it is, then this step clears
        console.log("Inserted " + result.result.n + //result has a property called result which has 'n' property which tells hw many docs has been inserted
         " document into the collection " + collection); 
        callback(result);                         //Then we'll return the final result in the callback function
    });//To display it we use result.ops in insert method
};


//We'll export the method to find the docs
exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {        //find method is supported by the mongdb driver which find on based conditions, but now we'll provide empty array ie we'll find all elements
        assert.equal(err, null);
        callback(docs);                           //We'll simply pass back the retrieved documents
    });
};//To display we use just docs in find method

//We'll export the method to remove the docs
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {   //deleteOne method is supported by the mongdb driver,which finds the first mentioned document and deletes it
        assert.equal(err, null);
        console.log("Removed the document ", document);//document is printed as it's JS object, when we just use comma
        callback(result);
    });
};

//We'll export the method to update the docs
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update}, null, (err, result) => {//updateOne method is supported by the mongdb driver,which finds the first mentioned document and updates it. 
        assert.equal(err, null);                                      //The second parameter tells us the field of the document that needs to be updated
        console.log("Updated the document with ", update);
        callback(result);
    });//To display, we use result.result in updateOne method
};


