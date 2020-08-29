//ALL THESE FOUR FUNCTIONS WILL BE RETURNING A PROMISE THAT IS ALREADY RETURNED BY THE CALLS INSIDE THEM TO THE MONGODB DRIVER FUNCTIONS

//We'll export the method to insert document. It takes database, document to be inserted, collection where we'll insert and a callback function
exports.insertDocument = (db, document, collection, callback) => {      //USAGE of the this function is in a way, that we'll provide the callback which will have the return
    const coll = db.collection(collection);
    return coll.insert(document);           //It'll return a promise 
    //To display it we use result.ops in insert method
};

//We'll export the method to find the docs
exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();         //It'll return a promise 
};//To display we use just docs in find method

//We'll export the method to remove the docs
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);        //It'll return a promise 
};

//We'll export the method to update the docs
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update}, null); //It'll return a promise
    //To display, we use result.result in updateOne method
};


