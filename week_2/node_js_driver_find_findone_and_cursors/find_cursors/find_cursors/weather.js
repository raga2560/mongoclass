var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };
	
	var mystate = 'A';

var cursor = db.collection('data').find({}, {"State":true, "Temperature":true, "month_high": true}).sort({State: 1,Temperature:-1 });

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

	//	var operator = {'$set': {"month_high" : true}};
		if(mystate != doc.State)
		{
			mystate = doc.State;
			console.dir(doc);
			/*var _id = doc._id;
			var query1 = {};
			query1['_id'] = doc['_id'];
			var query2 = {"_id": doc._id};
			
			console.log(_id) ;
			
			db.collection('data').update(query2, doc, function (err, updated){
				if(err) throw err;
				console.dir(doc);
				// return d..close()
			}); */ 
		}
        
    });
	
	/*
	var query2 = {"_id": "55745e31f0f762607350b24e"};
	var operator = {'$set': {"month_high" : true}};
	
	db.collection('data').update(query2, operator, function (err, updated){
				if(err) throw err;
				console.dir(updated);
				// return d..close()
			}); 
			*/
			
	
});
